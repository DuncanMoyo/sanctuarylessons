import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Clock } from 'lucide-react';
import { PROPHETIC_TIMELINE } from '../data/lessons';
import { BookReaderModal } from './BookReaderModal';

interface PropheticTimelineProps {
  onOpenMission?: (missionId: number) => void;
  compact?: boolean;
}

export function PropheticTimeline({
  onOpenMission,
  compact = false,
}: PropheticTimelineProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const [bookOpen, setBookOpen] = useState(false);

  const current = PROPHETIC_TIMELINE[stepIdx];

  return (
    <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#243450] pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#CBD5E1]">
          <Clock className="h-4 w-4 text-[#E6B35A]" />
          <span>Daniel 8:14 &amp; 9:24–27 Prophetic Scale (1 Day = 1 Year · Num. 14:34)</span>
        </div>
        <span className="font-mono text-xs tabular-nums text-[#E6B35A]">
          Milestone {stepIdx + 1} / {PROPHETIC_TIMELINE.length}
        </span>
      </div>

      {/* Visual Span Bar: 70 Weeks (490 yrs) Cut Off + 1,810 Remaining Years = 2,300 Years */}
      <div className="mt-5 rounded-xl border border-[#243450] bg-[#0C1423] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#9CAEC4]">
          <span>457 B.C. · Artaxerxes’ Decree</span>
          <span className="text-[#4DC0B0]">70 Weeks / 490 Yrs (Cut Off)</span>
          <span className="text-[#E6B35A]">1,810 Yrs → 1844 (2,300 Yrs Total)</span>
        </div>
        <div className="mt-2.5 flex h-2.5 w-full overflow-hidden rounded-full bg-[#19263E]">
          <div
            className="h-full bg-[#4DC0B0]"
            style={{ width: '21.3%' }}
            title="70 Weeks (490 Years): 457 BC to AD 34"
          />
          <div
            className="h-full bg-[#E6B35A]"
            style={{ width: '78.7%' }}
            title="Remaining 1,810 Years: AD 34 to 1844"
          />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {PROPHETIC_TIMELINE.map((milestone, idx) => {
            const active = idx === stepIdx;
            return (
              <button
                key={milestone.id}
                type="button"
                onClick={() => setStepIdx(idx)}
                className={`rounded-lg border px-3 py-2.5 text-left transition-colors ${
                  active
                    ? 'border-[#E6B35A] bg-[#E6B35A]/15 text-[#F8FAFC]'
                    : 'border-[#243450] bg-[#0A111F] text-[#9CAEC4] hover:border-[#3A5075] hover:text-[#CBD5E1]'
                }`}
              >
                <span className="block font-mono text-xs font-semibold tabular-nums text-[#E6B35A]">
                  {milestone.year}
                </span>
                <span className="mt-0.5 block truncate text-xs font-medium">
                  {milestone.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Milestone Detail */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#E6B35A]">
            <span className="font-semibold tabular-nums">{current.year}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#4DC0B0]">{current.propheticSpan}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#9CAEC4]">{current.scripture}</span>
          </div>
          <h3 className="mt-2 font-display text-3xl font-semibold text-[#F8FAFC]">
            {current.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
            {current.historicalEvent}
          </p>
        </div>

        <div className="lg:col-span-5 rounded-xl border border-[#243450] bg-[#0C1423] p-5">
          <p className="text-xs font-semibold text-[#4DC0B0]">
            Sanctuary &amp; Prophetic Significance
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]">
            {current.sanctuaryMeaning}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#243450] pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={stepIdx === 0}
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>
          <button
            type="button"
            disabled={stepIdx === PROPHETIC_TIMELINE.length - 1}
            onClick={() =>
              setStepIdx((i) => Math.min(PROPHETIC_TIMELINE.length - 1, i + 1))
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <span>Next</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!compact && (
            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-semibold text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#E6B35A]" />
              <span>Read Chapter 27 (p. 82)</span>
            </button>
          )}
          {!compact && onOpenMission && (
            <button
              type="button"
              onClick={() => onOpenMission(11)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#EEBF6D] whitespace-nowrap shrink-0"
            >
              <span>Open Mission 12: The Heavenly Sanctuary</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {!compact && (
        <BookReaderModal
          isOpen={bookOpen}
          title="Chapter 27 — A Wonderful Prophecy (pp. 82–85)"
          page={82}
          onClose={() => setBookOpen(false)}
        />
      )}
    </div>
  );
}
