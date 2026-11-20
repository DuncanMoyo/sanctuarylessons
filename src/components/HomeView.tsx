import { ArrowRight, CheckCircle2, Cloud, Compass } from 'lucide-react';
import { User } from 'firebase/auth';
import { HERO_IMAGE, LESSONS, getRankForXp } from '../data/lessons';
import { SyncStatus } from '../hooks/useQuestProgress';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  completed: number[];
  xp: number;
  completionPct: number;
  user: User | null;
  syncStatus: SyncStatus;
  onSignIn: () => void;
  onOpenMissions: () => void;
  onOpenBlueprint: () => void;
  onOpenLesson: (id: number) => void;
}

export function HomeView({
  completed,
  xp,
  completionPct,
  user,
  syncStatus,
  onSignIn,
  onOpenMissions,
  onOpenBlueprint,
  onOpenLesson,
}: HomeViewProps) {
  const rank = getRankForXp(xp);
  const starterLessons = LESSONS.slice(0, 4);

  return (
    <div className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8 sm:py-14">
      {/* Hero Section: Balanced 2-Column Split with items-stretch */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-center py-2">
          <p className="text-xs font-semibold tracking-wider text-[#E6B35A]">
            An Interactive Bible Study Adventure
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#F8FAFC] sm:text-6xl text-balance">
            Discover Jesus in the Sanctuary.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#9CAEC4] sm:text-lg">
            Explore the symbols, services, priesthood, and prophetic story of the sanctuary through Scripture and{' '}
            <em className="text-[#CBD5E1] not-italic font-medium">The Cross and Its Shadow</em> by S. N. Haskell.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onOpenMissions}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-5 py-3 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#EEBF6D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
            >
              <span>Begin your journey</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onOpenBlueprint}
              className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#111A2B] px-5 py-3 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
            >
              <Compass className="h-4 w-4 text-[#E6B35A]" />
              <span>Explore Sanctuary Blueprint</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="h-full min-h-[260px] overflow-hidden rounded-2xl border border-[#243450] bg-[#111A2B]">
            <ResilientImage
              src={HERO_IMAGE}
              alt="Wilderness tabernacle courtyard at twilight with golden light glowing from the sanctuary entrance"
              fallbackTitle="The Wilderness Sanctuary"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Full-Width 3-Column Progress Strip directly below Hero Split */}
      <section
        aria-label="Study progress summary"
        className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6">
          <p className="text-xs font-medium text-[#9CAEC4]">Missions Completed</p>
          <div className="mt-2 flex items-baseline justify-between gap-2">
            <span className="font-mono text-3xl font-semibold tabular-nums text-[#E6B35A]">
              {completed.length}/{LESSONS.length}
            </span>
            <span className="font-mono text-sm tabular-nums text-[#9CAEC4]">
              {completionPct}%
            </span>
          </div>
          <div
            role="progressbar"
            aria-valuenow={completionPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Mission completion percentage"
            className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#1C2A44]"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#E6B35A] to-[#4DC0B0] transition-transform duration-300 origin-left"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6 flex flex-col justify-between">
          <div>
            <p className="text-xs font-medium text-[#9CAEC4]">Experience Points</p>
            <div className="mt-2 font-mono text-3xl font-semibold tabular-nums text-[#E6B35A]">
              {xp} XP
            </div>
            <p className="mt-2 text-sm text-[#9CAEC4]">
              +50 XP per mission · +10 XP per perfect check.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-[#243450] flex items-center justify-between text-xs">
            {user ? (
              <span className="inline-flex items-center gap-1.5 text-[#4DC0B0]">
                <Cloud className="h-3.5 w-3.5" />
                <span>
                  {syncStatus === 'syncing' ? 'Syncing to cloud...' : 'Synced to cloud'}
                </span>
              </span>
            ) : (
              <>
                <span className="text-[#9CAEC4]">Saved on this device</span>
                <button
                  type="button"
                  onClick={onSignIn}
                  className="font-semibold text-[#E6B35A] hover:text-[#EEBF6D]"
                >
                  Sync across devices
                </button>
              </>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-6">
          <p className="text-xs font-medium text-[#9CAEC4]">Current Study Rank</p>
          <div className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
            {rank.name}
          </div>
          <p className="mt-3 text-sm text-[#9CAEC4]">{rank.description}</p>
        </div>
      </section>

      {/* Curated Starting Journey Preview */}
      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold text-[#F8FAFC]">
              Your Journey Begins
            </h2>
            <p className="mt-1 text-sm text-[#9CAEC4]">
              Start with the opening four missions or browse the complete 13-part curriculum.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenMissions}
            className="text-sm font-semibold text-[#E6B35A] hover:text-[#EEBF6D] transition-colors whitespace-nowrap shrink-0"
          >
            View all {LESSONS.length} missions →
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {starterLessons.map((lesson) => {
            const isDone = completed.includes(lesson.id);
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => onOpenLesson(lesson.id)}
                className="group flex flex-col justify-between rounded-2xl border border-[#243450] bg-[#111A2B] p-6 text-left transition-colors duration-150 hover:border-[#E6B35A]/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 text-xs">
                    <span className="font-mono font-medium text-[#E6B35A]">
                      Mission {String(lesson.id + 1).padStart(2, '0')} · {lesson.category}
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 font-medium text-[#4DC0B0]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Complete</span>
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-[#F8FAFC] group-hover:text-[#E6B35A] transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-[#9CAEC4]">{lesson.tag}</p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#243450] pt-4 text-xs text-[#9CAEC4]">
                  <span className="truncate">{lesson.reading}</span>
                  <span className="font-mono text-[#CBD5E1] shrink-0 ml-3">
                    {lesson.verses.length} Scriptures
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
