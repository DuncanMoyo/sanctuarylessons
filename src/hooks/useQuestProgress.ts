import { useCallback, useEffect, useRef, useState } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { LESSONS, getRankForXp } from '../data/lessons';
import {
  OperationType,
  auth,
  db,
  googleProvider,
  handleFirestoreError,
} from '../lib/firebase';

const STORAGE_KEYS = {
  DONE: 'sqdone',
  XP: 'sqxp',
  QUIZ_BONUS: 'sqquizbonus',
  NOTES: 'sqnotes',
  VERSES: 'sqverses',
} as const;

export type SyncStatus = 'local' | 'syncing' | 'synced' | 'error';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function clampIntArray(arr: number[], maxLen: number): number[] {
  return Array.from(
    new Set(
      arr.filter((n) => Number.isInteger(n) && n >= 0 && n < LESSONS.length)
    )
  ).slice(0, maxLen);
}

function clampVerseArray(arr: string[]): string[] {
  return Array.from(
    new Set(
      arr.filter((s) => typeof s === 'string' && s.length > 0 && s.length <= 16)
    )
  ).slice(0, 100);
}

function clampXp(val: number): number {
  return Math.max(0, Math.min(5000, Math.round(val)));
}

export function useQuestProgress() {
  const [completed, setCompleted] = useState<number[]>(() => {
    const parsed = readJson<unknown[]>(STORAGE_KEYS.DONE, []);
    return Array.isArray(parsed)
      ? clampIntArray(
          parsed.filter((id): id is number => typeof id === 'number'),
          13
        )
      : [];
  });

  const [xp, setXp] = useState<number>(() => {
    const raw = Number(localStorage.getItem(STORAGE_KEYS.XP) || 0);
    return Number.isFinite(raw) ? clampXp(raw) : 0;
  });

  const [quizBonusEarned, setQuizBonusEarned] = useState<number[]>(() => {
    const parsed = readJson<unknown[]>(STORAGE_KEYS.QUIZ_BONUS, []);
    return Array.isArray(parsed)
      ? clampIntArray(
          parsed.filter((id): id is number => typeof id === 'number'),
          13
        )
      : [];
  });

  const [readVerses, setReadVerses] = useState<string[]>(() => {
    const parsed = readJson<unknown[]>(STORAGE_KEYS.VERSES, []);
    return Array.isArray(parsed)
      ? clampVerseArray(parsed.filter((s): s is string => typeof s === 'string'))
      : [];
  });

  const [notes, setNotes] = useState<Record<number, string>>(() =>
    readJson<Record<number, string>>(STORAGE_KEYS.NOTES, {})
  );

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('local');
  const [syncError, setSyncError] = useState<string | null>(null);

  const noteSaveTimers = useRef<Record<number, number>>({});
  const stateRef = useRef({
    completed,
    xp,
    quizBonusEarned,
    readVerses,
    notes,
  });

  useEffect(() => {
    stateRef.current = { completed, xp, quizBonusEarned, readVerses, notes };
    try {
      localStorage.setItem(STORAGE_KEYS.DONE, JSON.stringify(completed));
      localStorage.setItem(STORAGE_KEYS.XP, String(xp));
      localStorage.setItem(
        STORAGE_KEYS.QUIZ_BONUS,
        JSON.stringify(quizBonusEarned)
      );
      localStorage.setItem(STORAGE_KEYS.VERSES, JSON.stringify(readVerses));
      localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
    } catch {
      // Ignore storage quota errors gracefully
    }
  }, [completed, xp, quizBonusEarned, readVerses, notes]);

  // Listen for Firebase Auth state changes and sync with Firestore
  useEffect(() => {
    let unsubProfile: (() => void) | null = null;
    let unsubNotes: (() => void) | null = null;

    const unsubAuth = onAuthStateChanged(auth, async (nextUser) => {
      if (unsubProfile) {
        unsubProfile();
        unsubProfile = null;
      }
      if (unsubNotes) {
        unsubNotes();
        unsubNotes = null;
      }

      setUser(nextUser);
      setAuthReady(true);

      if (!nextUser || !nextUser.emailVerified) {
        setSyncStatus('local');
        return;
      }

      const profilePath = `studyProfiles/${nextUser.uid}`;
      const notesPath = `studyProfiles/${nextUser.uid}/notes`;
      setSyncStatus('syncing');
      setSyncError(null);

      try {
        const profileRef = doc(db, 'studyProfiles', nextUser.uid);
        let profileSnap;
        try {
          profileSnap = await getDoc(profileRef);
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, profilePath);
        }

        const local = stateRef.current;

        if (!profileSnap.exists()) {
          // Initialize cloud profile from local guest progress
          try {
            await setDoc(profileRef, {
              ownerId: nextUser.uid,
              completedMissions: clampIntArray(local.completed, 13),
              quizBonusEarned: clampIntArray(local.quizBonusEarned, 13),
              readVerses: clampVerseArray(local.readVerses),
              xp: clampXp(local.xp),
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            });
          } catch (err) {
            handleFirestoreError(err, OperationType.CREATE, profilePath);
          }
        } else {
          // Merge local guest progress with existing cloud profile if local has extras
          const cloudData = profileSnap.data();
          const cloudCompleted = Array.isArray(cloudData.completedMissions)
            ? clampIntArray(cloudData.completedMissions as number[], 13)
            : [];
          const cloudQuiz = Array.isArray(cloudData.quizBonusEarned)
            ? clampIntArray(cloudData.quizBonusEarned as number[], 13)
            : [];
          const cloudVerses = Array.isArray(cloudData.readVerses)
            ? clampVerseArray(cloudData.readVerses as string[])
            : [];
          const cloudXp =
            typeof cloudData.xp === 'number' ? clampXp(cloudData.xp) : 0;

          const mergedCompleted = clampIntArray(
            [...cloudCompleted, ...local.completed],
            13
          );
          const mergedQuiz = clampIntArray(
            [...cloudQuiz, ...local.quizBonusEarned],
            13
          );
          const mergedVerses = clampVerseArray([
            ...cloudVerses,
            ...local.readVerses,
          ]);
          const mergedXp = clampXp(
            Math.max(
              cloudXp,
              local.xp,
              mergedCompleted.length * 50 + mergedQuiz.length * 10
            )
          );

          const needsCloudMerge =
            mergedCompleted.length !== cloudCompleted.length ||
            mergedQuiz.length !== cloudQuiz.length ||
            mergedVerses.length !== cloudVerses.length ||
            mergedXp !== cloudXp;

          if (needsCloudMerge) {
            try {
              await updateDoc(profileRef, {
                completedMissions: mergedCompleted,
                quizBonusEarned: mergedQuiz,
                readVerses: mergedVerses,
                xp: mergedXp,
                updatedAt: serverTimestamp(),
              });
            } catch (err) {
              handleFirestoreError(err, OperationType.UPDATE, profilePath);
            }
          }
        }

        // Merge any local reflection notes that aren't in cloud yet
        let existingNotesSnap;
        try {
          existingNotesSnap = await getDocs(
            collection(db, 'studyProfiles', nextUser.uid, 'notes')
          );
        } catch (err) {
          handleFirestoreError(err, OperationType.LIST, notesPath);
        }

        const cloudNoteIds = new Set(existingNotesSnap.docs.map((d) => d.id));
        for (const [missionKey, rawContent] of Object.entries(local.notes)) {
          const trimmed = rawContent.slice(0, 5000);
          if (trimmed.trim().length > 0 && !cloudNoteIds.has(missionKey)) {
            const notePath = `${notesPath}/${missionKey}`;
            try {
              await setDoc(
                doc(db, 'studyProfiles', nextUser.uid, 'notes', missionKey),
                {
                  ownerId: nextUser.uid,
                  missionId: missionKey,
                  content: trimmed,
                  createdAt: serverTimestamp(),
                  updatedAt: serverTimestamp(),
                }
              );
            } catch (err) {
              handleFirestoreError(err, OperationType.CREATE, notePath);
            }
          }
        }

        // Attach real-time profile listener
        unsubProfile = onSnapshot(
          profileRef,
          (snap) => {
            if (!snap.exists()) return;
            const d = snap.data();
            if (Array.isArray(d.completedMissions)) {
              setCompleted(clampIntArray(d.completedMissions as number[], 13));
            }
            if (Array.isArray(d.quizBonusEarned)) {
              setQuizBonusEarned(
                clampIntArray(d.quizBonusEarned as number[], 13)
              );
            }
            if (Array.isArray(d.readVerses)) {
              setReadVerses(clampVerseArray(d.readVerses as string[]));
            }
            if (typeof d.xp === 'number') {
              setXp(clampXp(d.xp));
            }
            setSyncStatus('synced');
          },
          (err) => {
            setSyncStatus('error');
            handleFirestoreError(err, OperationType.GET, profilePath);
          }
        );

        // Attach real-time notes listener
        unsubNotes = onSnapshot(
          collection(db, 'studyProfiles', nextUser.uid, 'notes'),
          (snap) => {
            const cloudNotes: Record<number, string> = {};
            snap.forEach((docSnap) => {
              const idNum = Number(docSnap.id);
              const data = docSnap.data();
              if (
                Number.isInteger(idNum) &&
                idNum >= 0 &&
                idNum < LESSONS.length &&
                typeof data.content === 'string'
              ) {
                cloudNotes[idNum] = data.content;
              }
            });
            setNotes((prev) => ({ ...prev, ...cloudNotes }));
          },
          (err) => {
            setSyncStatus('error');
            handleFirestoreError(err, OperationType.LIST, notesPath);
          }
        );
      } catch (err) {
        setSyncStatus('error');
        setSyncError(
          err instanceof Error
            ? err.message
            : 'Unable to sync study profile with cloud.'
        );
      }
    });

    return () => {
      unsubAuth();
      if (unsubProfile) unsubProfile();
      if (unsubNotes) unsubNotes();
    };
  }, []);

  const syncProfileUpdate = useCallback(
    async (
      nextCompleted: number[],
      nextQuizBonus: number[],
      nextVerses: string[],
      nextXp: number
    ) => {
      const currentUser = auth.currentUser;
      if (!currentUser || !currentUser.emailVerified) return;

      const profilePath = `studyProfiles/${currentUser.uid}`;
      setSyncStatus('syncing');
      try {
        await updateDoc(doc(db, 'studyProfiles', currentUser.uid), {
          completedMissions: clampIntArray(nextCompleted, 13),
          quizBonusEarned: clampIntArray(nextQuizBonus, 13),
          readVerses: clampVerseArray(nextVerses),
          xp: clampXp(nextXp),
          updatedAt: serverTimestamp(),
        });
        setSyncStatus('synced');
      } catch (err) {
        setSyncStatus('error');
        handleFirestoreError(err, OperationType.UPDATE, profilePath);
      }
    },
    []
  );

  const awardQuizBonus = useCallback(
    (lessonId: number): boolean => {
      if (quizBonusEarned.includes(lessonId)) {
        return false;
      }
      const nextBonus = clampIntArray([...quizBonusEarned, lessonId], 13);
      const nextXp = clampXp(xp + 10);
      setQuizBonusEarned(nextBonus);
      setXp(nextXp);
      void syncProfileUpdate(completed, nextBonus, readVerses, nextXp);
      return true;
    },
    [completed, quizBonusEarned, readVerses, syncProfileUpdate, xp]
  );

  const completeMission = useCallback(
    (lessonId: number): boolean => {
      if (completed.includes(lessonId)) {
        return false;
      }
      const nextCompleted = clampIntArray([...completed, lessonId], 13);
      const nextXp = clampXp(xp + 50);
      setCompleted(nextCompleted);
      setXp(nextXp);
      void syncProfileUpdate(nextCompleted, quizBonusEarned, readVerses, nextXp);
      return true;
    },
    [completed, quizBonusEarned, readVerses, syncProfileUpdate, xp]
  );

  const toggleVerseRead = useCallback(
    (lessonId: number, verseIdx: number) => {
      const key = `${lessonId}-${verseIdx}`;
      const exists = readVerses.includes(key);
      const nextVerses = exists
        ? readVerses.filter((v) => v !== key)
        : clampVerseArray([...readVerses, key]);
      setReadVerses(nextVerses);
      void syncProfileUpdate(completed, quizBonusEarned, nextVerses, xp);
    },
    [completed, quizBonusEarned, readVerses, syncProfileUpdate, xp]
  );

  const saveNote = useCallback((lessonId: number, text: string) => {
    const clamped = text.slice(0, 5000);
    setNotes((prev) => ({ ...prev, [lessonId]: clamped }));

    const currentUser = auth.currentUser;
    if (!currentUser || !currentUser.emailVerified) return;

    if (noteSaveTimers.current[lessonId]) {
      window.clearTimeout(noteSaveTimers.current[lessonId]);
    }

    noteSaveTimers.current[lessonId] = window.setTimeout(async () => {
      const missionKey = String(lessonId);
      const notePath = `studyProfiles/${currentUser.uid}/notes/${missionKey}`;
      const noteRef = doc(
        db,
        'studyProfiles',
        currentUser.uid,
        'notes',
        missionKey
      );
      setSyncStatus('syncing');
      try {
        const snap = await getDoc(noteRef);
        if (snap.exists()) {
          await updateDoc(noteRef, {
            content: clamped,
            updatedAt: serverTimestamp(),
          });
        } else {
          await setDoc(noteRef, {
            ownerId: currentUser.uid,
            missionId: missionKey,
            content: clamped,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        }
        setSyncStatus('synced');
      } catch (err) {
        setSyncStatus('error');
        handleFirestoreError(err, OperationType.WRITE, notePath);
      }
    }, 450);
  }, []);

  const signInWithGoogle = useCallback(async () => {
    setSyncError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : 'Sign-in was cancelled or failed.';
      if (!msg.includes('popup-closed-by-user')) {
        setSyncError(msg);
      }
    }
  }, []);

  const signOutFromCloud = useCallback(async () => {
    setSyncError(null);
    await signOut(auth);
    setSyncStatus('local');
  }, []);

  const resetProgress = useCallback(async () => {
    setCompleted([]);
    setXp(0);
    setQuizBonusEarned([]);
    setReadVerses([]);
    setNotes({});
    try {
      localStorage.removeItem(STORAGE_KEYS.DONE);
      localStorage.removeItem(STORAGE_KEYS.XP);
      localStorage.removeItem(STORAGE_KEYS.QUIZ_BONUS);
      localStorage.removeItem(STORAGE_KEYS.VERSES);
      localStorage.removeItem(STORAGE_KEYS.NOTES);
    } catch {
      // Ignore
    }

    const currentUser = auth.currentUser;
    if (currentUser && currentUser.emailVerified) {
      const notesPath = `studyProfiles/${currentUser.uid}/notes`;
      const profilePath = `studyProfiles/${currentUser.uid}`;
      try {
        const notesSnap = await getDocs(
          collection(db, 'studyProfiles', currentUser.uid, 'notes')
        );
        for (const d of notesSnap.docs) {
          await deleteDoc(d.ref);
        }
        await updateDoc(doc(db, 'studyProfiles', currentUser.uid), {
          completedMissions: [],
          quizBonusEarned: [],
          readVerses: [],
          xp: 0,
          updatedAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `${profilePath} / ${notesPath}`);
      }
    }
  }, []);

  const nextRecommendedMissionId =
    LESSONS.find((l) => !completed.includes(l.id))?.id ?? 0;

  const rank = getRankForXp(xp);
  const completionPct = Math.round((completed.length / LESSONS.length) * 100);

  return {
    completed,
    xp,
    quizBonusEarned,
    readVerses,
    notes,
    rank,
    completionPct,
    nextRecommendedMissionId,
    user,
    authReady,
    syncStatus,
    syncError,
    awardQuizBonus,
    completeMission,
    toggleVerseRead,
    saveNote,
    signInWithGoogle,
    signOutFromCloud,
    resetProgress,
  };
}
