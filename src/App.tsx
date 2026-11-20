import { useCallback, useEffect, useState } from 'react';
import { AboutView } from './components/AboutView';
import { BookView } from './components/BookView';
import { HomeView } from './components/HomeView';
import { JournalView } from './components/JournalView';
import { LessonView } from './components/LessonView';
import { MissionsView } from './components/MissionsView';
import { AppView, Navbar } from './components/Navbar';
import { SanctuaryBlueprint } from './components/SanctuaryBlueprint';
import { TOTAL_BOOK_PAGES } from './data/book';
import { LESSONS } from './data/lessons';
import { useQuestProgress } from './hooks/useQuestProgress';

function parseHashRoute(): { view: AppView; lessonId: number; bookPage: number } {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash) return { view: 'home', lessonId: 0, bookPage: 2 };

  if (hash === 'missions') return { view: 'missions', lessonId: 0, bookPage: 2 };
  if (hash === 'blueprint') return { view: 'blueprint', lessonId: 0, bookPage: 2 };
  if (hash === 'book') return { view: 'book', lessonId: 0, bookPage: 2 };
  if (hash === 'journal') return { view: 'journal', lessonId: 0, bookPage: 2 };
  if (hash === 'about') return { view: 'about', lessonId: 0, bookPage: 2 };

  const bookPageMatch = hash.match(/^book\/p\/(\d{1,3})$/);
  if (bookPageMatch) {
    const pageNum = Number(bookPageMatch[1]);
    if (Number.isInteger(pageNum) && pageNum >= 1 && pageNum <= TOTAL_BOOK_PAGES) {
      return { view: 'book', lessonId: 0, bookPage: pageNum };
    }
  }

  const missionMatch = hash.match(/^mission\/(\d{1,2})$/);
  if (missionMatch) {
    const oneBased = Number(missionMatch[1]);
    if (Number.isInteger(oneBased) && oneBased >= 1 && oneBased <= LESSONS.length) {
      return { view: 'lesson', lessonId: oneBased - 1, bookPage: 2 };
    }
  }

  return { view: 'home', lessonId: 0, bookPage: 2 };
}

function buildHash(view: AppView, lessonId: number, bookPage = 2): string {
  if (view === 'lesson') {
    return `#/mission/${String(lessonId + 1).padStart(2, '0')}`;
  }
  if (view === 'book') {
    return bookPage !== 2 ? `#/book/p/${bookPage}` : '#/book';
  }
  if (view === 'home') return '#/';
  return `#/${view}`;
}

export default function App() {
  const initialRoute = parseHashRoute();
  const [activeView, setActiveView] = useState<AppView>(initialRoute.view);
  const [activeLessonId, setActiveLessonId] = useState<number>(initialRoute.lessonId);
  const [activeBookPage, setActiveBookPage] = useState<number>(initialRoute.bookPage);

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
      setActiveBookPage(next.bookPage);
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
    const targetHash = buildHash(view, 0, activeBookPage);
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    scrollToTop();
  }, [activeBookPage]);

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

  const handleOpenBook = useCallback((page = 2) => {
    const safePage = Math.max(1, Math.min(TOTAL_BOOK_PAGES, page));
    setActiveBookPage(safePage);
    setActiveView('book');
    const targetHash = buildHash('book', 0, safePage);
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
            onOpenBook={handleOpenBook}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'missions' && (
          <MissionsView
            completed={completed}
            readVerses={readVerses}
            quizBonusEarned={quizBonusEarned}
            notes={notes}
            onToggleVerseRead={toggleVerseRead}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeView === 'blueprint' && (
          <SanctuaryBlueprint
            completedMissions={completed}
            onOpenMission={handleOpenLesson}
            onOpenBook={handleOpenBook}
          />
        )}

        {activeView === 'book' && (
          <BookView
            initialPage={activeBookPage}
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
            onOpenBook={handleOpenBook}
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
            onOpenBook={handleOpenBook}
          />
        )}
      </main>

      <footer className="no-print border-t border-[#243450]/80 py-8 text-center text-xs leading-relaxed text-[#9CAEC4]">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8">
          <p>
            A Bible learning adventure featuring the full 1914 text of{' '}
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
