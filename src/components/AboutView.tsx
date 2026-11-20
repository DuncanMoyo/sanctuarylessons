import { useState } from 'react';
import { User } from 'firebase/auth';
import { ArrowLeft, BookOpen, Cloud, CloudOff, LogOut, RotateCcw } from 'lucide-react';
import { RANKS } from '../data/lessons';
import { SyncStatus } from '../hooks/useQuestProgress';
import { BookReaderModal } from './BookReaderModal';

interface AboutViewProps {
  xp: number;
  user: User | null;
  syncStatus: SyncStatus;
  syncError: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onBackHome: () => void;
  onOpenBook: (page?: number) => void;
  onResetProgress: () => void;
}

export function AboutView({
  xp,
  user,
  syncStatus,
  syncError,
  onSignIn,
  onSignOut,
  onBackHome,
  onOpenBook,
  onResetProgress,
}: AboutViewProps) {
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [resetMessage, setResetMessage] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const handleConfirmReset = () => {
    onResetProgress();
    setConfirmingReset(false);
    setResetMessage(true);
  };

  return (
    <section className="mx-auto max-w-[820px] px-5 py-10 sm:px-8 sm:py-12 space-y-6">
      <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-9">
        <p className="text-xs font-semibold tracking-wider text-[#E6B35A]">
          Study Framework
        </p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#F8FAFC]">
          About Sanctuary Quest
        </h1>

        <div className="mt-5 space-y-4 text-base leading-relaxed text-[#CBD5E1]">
          <p>
            This interactive study journey includes the complete 1914 text and pages of S. N. Haskell’s{' '}
            <em className="text-[#F8FAFC]">The Cross and Its Shadow</em>. It pairs full-chapter reading with Bible passages, interactive blueprint and prophetic explorers, knowledge checks, and personal reflection.
          </p>
          <p>
            You can read every chapter directly inside the{' '}
            <strong className="font-medium text-[#F8FAFC]">Book</strong> tab, view the original 1914 typeset pages, or jump straight from any mission or sanctuary station to Haskell’s corresponding chapter.
          </p>
          <p>
            Progress is always saved automatically on this device, and you can optionally sign in with Google below to sync your completed missions, XP, Scripture checkboxes, and study journal across devices.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#EEBF6D]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back home</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenBook(2)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#0D1627] px-4 py-2.5 text-sm font-semibold text-[#CBD5E1] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
          >
            <BookOpen className="h-4 w-4 text-[#E6B35A]" />
            <span>Read Full Book (50 Chapters)</span>
          </button>

          <button
            type="button"
            onClick={() => setBookOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#0D1627] px-4 py-2.5 text-sm font-medium text-[#9CAEC4] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
          >
            <span>Quick Reader Modal</span>
          </button>
        </div>
      </div>

      {/* Optional Cloud Sync Panel */}
      <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            {user ? (
              <Cloud className="h-5 w-5 text-[#4DC0B0]" />
            ) : (
              <CloudOff className="h-5 w-5 text-[#9CAEC4]" />
            )}
            <h2 className="font-display text-2xl font-semibold text-[#F8FAFC]">
              Cross-Device Cloud Sync
            </h2>
          </div>

          <span className="font-mono text-xs text-[#4DC0B0]">
            {syncStatus === 'synced'
              ? 'Synced to cloud'
              : syncStatus === 'syncing'
                ? 'Syncing...'
                : syncStatus === 'error'
                  ? 'Sync attention needed'
                  : 'Device-only mode'}
          </span>
        </div>

        {user ? (
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-[#243450] pt-4">
            <div>
              <p className="text-sm font-medium text-[#F8FAFC]">
                Signed in as {user.displayName || user.email}
              </p>
              <p className="text-xs text-[#9CAEC4]">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={onSignOut}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-[#243450] bg-[#0D1627] px-4 py-2 text-xs font-semibold text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        ) : (
          <div className="mt-4">
            <p className="text-sm text-[#9CAEC4]">
              Sign in with Google to back up your Sanctuary Quest XP, Scripture checklists, and journal reflections across desktop and mobile. Existing local progress is merged automatically.
            </p>
            <button
              type="button"
              onClick={onSignIn}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
            >
              <Cloud className="h-4 w-4" />
              <span>Sign in with Google to Sync</span>
            </button>
          </div>
        )}

        {syncError && (
          <p className="mt-3 text-xs font-medium text-[#E6B35A]">{syncError}</p>
        )}
      </div>

      {/* Rank Progression Ladder */}
      <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-[#F8FAFC]">
          Study Rank Progression
        </h2>
        <div className="mt-4 divide-y divide-[#243450]">
          {RANKS.map((rank) => {
            const unlocked = xp >= rank.minXp;
            return (
              <div
                key={rank.name}
                className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <span
                    className={`font-medium ${
                      unlocked ? 'text-[#F8FAFC]' : 'text-[#9CAEC4]'
                    }`}
                  >
                    {rank.name}
                  </span>
                  <p className="text-xs text-[#9CAEC4]">{rank.description}</p>
                </div>
                <span
                  className={`font-mono text-xs tabular-nums ${
                    unlocked ? 'text-[#4DC0B0]' : 'text-[#6B809E]'
                  }`}
                >
                  {rank.minXp} XP {unlocked ? '· Unlocked' : ''}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safe Two-Step Progress Reset */}
      <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-[#F8FAFC]">
          Study Data Management
        </h2>
        <p className="mt-2 text-sm text-[#9CAEC4]">
          Clear your completed missions, XP, Scripture checkmarks, and reflection notes if you want to begin the study anew.
        </p>

        {!confirmingReset ? (
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                setConfirmingReset(true);
                setResetMessage(false);
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#0D1627] px-4 py-2 text-xs font-semibold text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset study progress</span>
            </button>
            {resetMessage && (
              <span className="text-xs font-medium text-[#4DC0B0]">
                Study progress has been cleared.
              </span>
            )}
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap items-center gap-3 rounded-xl border border-[#E6B35A]/40 bg-[#0D1627] p-4">
            <span className="text-xs font-medium text-[#F8FAFC]">
              Clear all completed missions, XP, and saved journal reflections?
            </span>
            <button
              type="button"
              onClick={handleConfirmReset}
              className="rounded-lg bg-[#DC2626] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#B91C1C]"
            >
              Confirm Reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmingReset(false)}
              className="rounded-lg border border-[#243450] bg-[#111A2B] px-3.5 py-1.5 text-xs font-medium text-[#CBD5E1] hover:text-[#F8FAFC]"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <BookReaderModal
        isOpen={bookOpen}
        title="Author’s Preface & Complete 1914 Volume"
        page={2}
        onClose={() => setBookOpen(false)}
        onOpenFullBook={onOpenBook}
      />
    </section>
  );
}
