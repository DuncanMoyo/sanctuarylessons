import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, CheckCircle2, Search, X } from 'lucide-react';
import {
  LESSONS,
  MissionCategory,
  getScriptureIndex,
} from '../data/lessons';

interface MissionsViewProps {
  completed: number[];
  onOpenLesson: (id: number) => void;
}

type FilterOption = 'All' | MissionCategory | 'Remaining';
type ViewTab = 'missions' | 'scriptures';

const FILTER_OPTIONS: FilterOption[] = [
  'All',
  'Foundations',
  'Courtyard',
  'Holy Place',
  'Most Holy',
  'Ministry & Prophecy',
  'Remaining',
];

export function MissionsView({ completed, onOpenLesson }: MissionsViewProps) {
  const [filter, setFilter] = useState<FilterOption>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<ViewTab>('missions');

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredLessons = useMemo(() => {
    return LESSONS.filter((lesson) => {
      const matchesFilter =
        filter === 'All'
          ? true
          : filter === 'Remaining'
            ? !completed.includes(lesson.id)
            : lesson.category === filter;

      if (!matchesFilter) return false;
      if (!normalizedQuery) return true;

      const haystack = [
        lesson.title,
        lesson.tag,
        lesson.reading,
        lesson.category,
        lesson.haskellExcerpt.quote,
        lesson.haskellExcerpt.citation,
        ...lesson.typeAntitype.map(
          (row) => `${row.typeRef} ${row.typeText} ${row.antitypeRef} ${row.antitypeText}`
        ),
        ...lesson.body,
        ...lesson.verses.map((v) => `${v.ref} ${v.focus} ${v.excerpt}`),
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [completed, filter, normalizedQuery]);

  const scriptureIndex = useMemo(() => {
    const all = getScriptureIndex();
    if (!normalizedQuery) return all;
    return all.filter(
      (entry) =>
        entry.ref.toLowerCase().includes(normalizedQuery) ||
        entry.focus.toLowerCase().includes(normalizedQuery) ||
        entry.missionTitle.toLowerCase().includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  return (
    <section className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8 sm:py-12">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#E6B35A]">
            Quest Curriculum
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Choose Your Mission
          </h1>
          <p className="mt-3 text-base text-[#9CAEC4]">
            Explore missions in order, search by Bible symbol or passage, or browse the complete Scripture Index.
          </p>
        </div>

        {/* Missions vs Scripture Index View Toggle */}
        <div
          role="group"
          aria-label="Curriculum view"
          className="inline-flex self-start rounded-xl border border-[#243450] bg-[#111A2B] p-1 gap-1"
        >
          <button
            type="button"
            onClick={() => setActiveTab('missions')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'missions'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            All Missions ({LESSONS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scriptures')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'scriptures'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            Scripture Index
          </button>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CAEC4]" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passages, symbols, or titles..."
            aria-label="Search missions and Bible references"
            className="w-full rounded-xl border border-[#243450] bg-[#111A2B] py-2.5 pl-10 pr-9 text-sm text-[#F8FAFC] placeholder:text-[#6B809E] focus:border-[#E6B35A] focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#9CAEC4] hover:text-[#F8FAFC]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {activeTab === 'missions' && (
          <div
            role="group"
            aria-label="Filter missions by sanctuary area"
            className="flex flex-wrap items-center gap-1 rounded-xl border border-[#243450] bg-[#111A2B] p-1 w-fit"
          >
            {FILTER_OPTIONS.map((option) => {
              const active = filter === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setFilter(option)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#E6B35A] text-[#0F172A]'
                      : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {activeTab === 'scriptures' ? (
        <div className="mt-7 overflow-hidden rounded-2xl border border-[#243450] bg-[#111A2B]">
          {scriptureIndex.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-sm text-[#9CAEC4]">
                No Scripture references matched "{searchQuery}".
              </p>
            </div>
          ) : (
            <div className="divide-y divide-[#243450]">
              {scriptureIndex.map((entry, idx) => (
                <button
                  key={`${entry.missionId}-${entry.ref}-${idx}`}
                  type="button"
                  onClick={() => onOpenLesson(entry.missionId)}
                  className="flex w-full flex-col gap-2 px-6 py-4 text-left transition-colors hover:bg-[#162238] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                    <span className="font-mono text-sm font-semibold text-[#E6B35A] min-w-[140px]">
                      {entry.ref}
                    </span>
                    <span className="text-sm text-[#E2E8F0]">{entry.focus}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9CAEC4] shrink-0">
                    <BookOpen className="h-3.5 w-3.5 text-[#E6B35A]" />
                    <span>
                      Mission {String(entry.missionId + 1).padStart(2, '0')}:{' '}
                      {entry.missionTitle}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : filteredLessons.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#243450] bg-[#111A2B] p-10 text-center">
          <h2 className="font-display text-2xl font-semibold text-[#F8FAFC]">
            No Matching Missions
          </h2>
          <p className="mt-2 text-sm text-[#9CAEC4]">
            Try clearing your search or switching back to All missions.
          </p>
          <button
            type="button"
            onClick={() => {
              setFilter('All');
              setSearchQuery('');
            }}
            className="mt-5 rounded-lg bg-[#E6B35A] px-4 py-2 text-sm font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredLessons.map((lesson) => {
            const isDone = completed.includes(lesson.id);
            const matchingVerse = normalizedQuery
              ? lesson.verses.find((v) =>
                  `${v.ref} ${v.focus}`.toLowerCase().includes(normalizedQuery)
                )
              : undefined;

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
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 font-medium text-[#4DC0B0]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Complete</span>
                      </span>
                    ) : (
                      <span className="text-[#9CAEC4]">Not started</span>
                    )}
                  </div>

                  <h2 className="mt-2.5 font-display text-2xl font-semibold text-[#F8FAFC] group-hover:text-[#E6B35A] transition-colors">
                    {lesson.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-[#9CAEC4]">{lesson.tag}</p>
                  {matchingVerse && (
                    <p className="mt-2 font-mono text-xs text-[#4DC0B0]">
                      Matches {matchingVerse.ref}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#243450] pt-4 text-xs text-[#9CAEC4]">
                  <span className="truncate">{lesson.reading}</span>
                  <span className="ml-3 inline-flex items-center gap-1 font-medium text-[#CBD5E1] group-hover:text-[#E6B35A] shrink-0">
                    <span>Study</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}
