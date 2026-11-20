import { useCallback, useEffect, useState } from 'react';
import { AboutView } from './components/AboutView';
import { HomeView } from './components/HomeView';
import { JournalView } from './components/JournalView';
import { LessonView } from './components/LessonView';
import { MissionsView } from './components/MissionsView';
import { AppView, Navbar } from './components/Navbar';
import { SanctuaryBlueprint } from './components/SanctuaryBlueprint';
import { LESSONS } from './data/lessons';
import { useQuestProgress } from './hooks/useQuestProgress';

function parseHashRoute(): { view: AppView; lessonId: number } {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash) return { view: 'home', lessonId: 0 };

  if (hash === 'missions') return { view: 'missions', lessonId: 0 };
  if (hash === 'blueprint') return { view: 'blueprint', lessonId: 0 };
  if (hash === 'journal') return { view: 'journal', lessonId: 0 };
  if (hash === 'about') return { view: 'about', lessonId: 0 };

  const missionMatch = hash.match(/^mission\/(\d{1,2})$/);
  if (missionMatch) {
    const oneBased = Number(missionMatch[1]);
    if (Number.isInteger(oneBased) && oneBased >= 1 && oneBased <= LESSONS.length) {
      return { view: 'lesson', lessonId: oneBased - 1 };
    }
  }

  return { view: 'home', lessonId: 0 };
}

function buildHash(view: AppView, lessonId: number): string {
  if (view === 'lesson') {
    return `#/mission/${String(lessonId + 1).padStart(2, '0')}`;
  }
  if (view === 'home') return '#/';
  return `#/${view}`;
}

export default function App() {
  const initialRoute = parseHashRoute();
  const [activeView, setActiveView] = useState<AppView>(initialRoute.view);
  const [activeLessonId, setActiveLessonId] = useState<number>(initialRoute.lessonId);

  const {
    completed,
    xp,
    quizBonusEarned,
    readVerses,
    notes,
    completionPct,
    nextRecommendedMissionId,
    user,
    syncStatus,
    syncError,
    awardQuizBonus,
    completeMission,
    toggleVerseRead,
    saveNote,
    signInWithGoogle,
    signOutFromCloud,
    resetProgress,
  } = useQuestProgress();

  useEffect(() => {
    const handleHashChange = () => {
      const next = parseHashRoute();
      setActiveView(next.view);
      setActiveLessonId(next.lessonId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigate = useCallback((view: AppView) => {
    setActiveView(view);
    const targetHash = buildHash(view, 0);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    scrollToTop();
  }, []);

  const handleOpenLesson = useCallback((id: number) => {
    const safeId = Math.max(0, Math.min(LESSONS.length - 1, id));
    setActiveLessonId(safeId);
    setActiveView('lesson');
    const targetHash = buildHash('lesson', safeId);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    scrollToTop();
  }, []);

  const handleContinueStudy = useCallback(() => {
    handleOpenLesson(nextRecommendedMissionId);
  }, [handleOpenLesson, nextRecommendedMissionId]);

  const activeLesson = LESSONS[activeLessonId] ?? LESSONS[0];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        onContinueStudy={handleContinueStudy}
        hasStarted={completed.length > 0 || xp > 0}
      />

      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            completed={completed}
            xp={xp}
            completionPct={completionPct}
            user={user}
            syncStatus={syncStatus}
            onSignIn={() => void signInWithGoogle()}
            onOpenMissions={() => handleNavigate('missions')}
            onOpenBlueprint={() => handleNavigate('blueprint')}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'missions' && (
          <MissionsView
            completed={completed}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'blueprint' && (
          <SanctuaryBlueprint
            completedMissions={completed}
            onOpenMission={handleOpenLesson}
          />
        )}

        {activeView === 'journal' && (
          <JournalView
            notes={notes}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'about' && (
          <AboutView
            xp={xp}
            user={user}
            syncStatus={syncStatus}
            syncError={syncError}
            onSignIn={() => void signInWithGoogle()}
            onSignOut={() => void signOutFromCloud()}
            onBackHome={() => handleNavigate('home')}
            onResetProgress={() => void resetProgress()}
          />
        )}

        {activeView === 'lesson' && (
          <LessonView
            lesson={activeLesson}
            isCompleted={completed.includes(activeLesson.id)}
            quizBonusEarned={quizBonusEarned.includes(activeLesson.id)}
            readVerses={readVerses}
            savedNote={notes[activeLesson.id] ?? ''}
            onToggleVerseRead={toggleVerseRead}
            onSaveNote={saveNote}
            onAwardQuizBonus={awardQuizBonus}
            onCompleteMission={completeMission}
            onBackToMissions={() => handleNavigate('missions')}
            onNavigateLesson={handleOpenLesson}
          />
        )}
      </main>

      <footer className="border-t border-[#243450]/80 py-8 text-center text-xs leading-relaxed text-[#9CAEC4]">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
          <p>
            A Bible learning adventure inspired by{' '}
            <em className="text-[#CBD5E1]">The Cross and Its Shadow</em> by S. N. Haskell.
          </p>
          <p className="mt-1">
            Study the Scriptures for yourself. Progress is saved on this device{user ? ' and synced to your cloud account' : ''}.
          </p>
        </div>
      </footer>
    </div>
  );
}
