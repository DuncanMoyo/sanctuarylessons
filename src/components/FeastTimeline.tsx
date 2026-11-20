import { useState } from 'react';
import { ArrowLeft, ArrowRight, Calendar, Layers } from 'lucide-react';
import {
  ANNUAL_FEASTS,
  ATONEMENT_STEPS,
  AnnualFeast,
} from '../data/lessons';

interface FeastTimelineProps {
  onOpenMission?: (missionId: number) => void;
  compact?: boolean;
}

export function FeastTimeline({
  onOpenMission,
  compact = false,
}: FeastTimelineProps) {
  const [selectedId, setSelectedId] = useState<string>(ANNUAL_FEASTS[0].id);
  const selectedFeast: AnnualFeast =
    ANNUAL_FEASTS.find((f) => f.id === selectedId) ?? ANNUAL_FEASTS[0];

  const springFeasts = ANNUAL_FEASTS.filter((f) => f.season === 'Spring Feasts');
  const autumnFeasts = ANNUAL_FEASTS.filter((f) => f.season === 'Autumn Feasts');

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
      {/* Left Zone: Seasonal Prophetic Timeline */}
      <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#243450] bg-[#111A2B] p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#9CAEC4]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#CBD5E1]">
            <Calendar className="h-4 w-4 text-[#E6B35A]" />
            <span>Leviticus 23 Prophetic Calendar</span>
          </span>
          <span className="font-mono tabular-nums">7 Appointed Feasts</span>
        </div>

        <div className="mt-5 space-y-6">
          <div>
            <p className="font-mono text-xs font-medium text-[#4DC0B0]">
              Spring Feasts · First Advent & Cross
            </p>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {springFeasts.map((feast) => {
                const active = feast.id === selectedFeast.id;
                return (
                  <button
                    key={feast.id}
                    type="button"
                    onClick={() => setSelectedId(feast.id)}
                    className={`rounded-xl border p-3.5 text-left transition-colors ${
                      active
                        ? 'border-[#E6B35A] bg-[#E6B35A]/12 text-[#F8FAFC]'
                        : 'border-[#243450] bg-[#0C1423] text-[#CBD5E1] hover:border-[#3A5075]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#E6B35A]">{feast.number}</span>
                      <span className="text-[#9CAEC4]">{feast.calendarDate}</span>
                    </div>
                    <p className="mt-1.5 font-semibold text-sm text-[#F8FAFC]">
                      {feast.name}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-mono text-xs font-medium text-[#E6B35A]">
              Autumn Feasts · Judgment & Final Restoration
            </p>
            <div className="mt-2.5 grid grid-cols-1 gap-2.5 sm:grid-cols-3">
              {autumnFeasts.map((feast) => {
                const active = feast.id === selectedFeast.id;
                return (
                  <button
                    key={feast.id}
                    type="button"
                    onClick={() => setSelectedId(feast.id)}
                    className={`rounded-xl border p-3.5 text-left transition-colors ${
                      active
                        ? 'border-[#E6B35A] bg-[#E6B35A]/12 text-[#F8FAFC]'
                        : 'border-[#243450] bg-[#0C1423] text-[#CBD5E1] hover:border-[#3A5075]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[#E6B35A]">{feast.number}</span>
                    </div>
                    <p className="mt-1.5 font-semibold text-sm text-[#F8FAFC]">
                      {feast.name}
                    </p>
                    <p className="mt-1 text-xs text-[#9CAEC4]">{feast.calendarDate}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right Zone: Feast Typology Detail */}
      <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#243450] bg-[#111A2B] p-6">
        <div>
          <p className="font-mono text-xs text-[#E6B35A]">
            Feast {selectedFeast.number} · {selectedFeast.season}
          </p>
          <h3 className="mt-2 font-display text-3xl font-semibold text-[#F8FAFC]">
            {selectedFeast.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-[#9CAEC4]">
            {selectedFeast.calendarDate} · {selectedFeast.scripture}
          </p>

          <div className="mt-5 space-y-4 border-t border-[#243450] pt-5">
            <div>
              <p className="text-xs font-semibold text-[#CBD5E1]">
                Israelite Observance
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#CBD5E1]">
                {selectedFeast.historicalMeaning}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#4DC0B0]">
                Prophetic Fulfillment in Christ
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[#E2E8F0]">
                {selectedFeast.propheticFulfillment}
              </p>
            </div>
          </div>
        </div>

        {!compact && onOpenMission && (
          <div className="mt-6 border-t border-[#243450] pt-4">
            <button
              type="button"
              onClick={() => onOpenMission(selectedFeast.missionIndex)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
            >
              <span>Study Related Mission</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

interface AtonementSequencerProps {
  onOpenMission?: (missionId: number) => void;
  compact?: boolean;
}

export function AtonementSequencer({
  onOpenMission,
  compact = false,
}: AtonementSequencerProps) {
  const [stepIdx, setStepIdx] = useState(0);
  const current = ATONEMENT_STEPS[stepIdx];

  return (
    <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#243450] pb-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[#CBD5E1]">
          <Layers className="h-4 w-4 text-[#E6B35A]" />
          <span>Leviticus 16 Step-by-Step Ritual Sequence</span>
        </div>
        <span className="font-mono text-xs tabular-nums text-[#E6B35A]">
          {stepIdx + 1} / {ATONEMENT_STEPS.length}
        </span>
      </div>

      {/* Step Selector Strip */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {ATONEMENT_STEPS.map((item, idx) => {
          const active = idx === stepIdx;
          return (
            <button
              key={item.step}
              type="button"
              onClick={() => setStepIdx(idx)}
              className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-colors ${
                active
                  ? 'border-[#E6B35A] bg-[#E6B35A]/15 text-[#F8FAFC]'
                  : 'border-[#243450] bg-[#0C1423] text-[#9CAEC4] hover:border-[#3A5075]'
              }`}
            >
              <span className="block font-mono text-[11px] text-[#E6B35A]">
                {item.step}
              </span>
              <span className="block truncate font-medium">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active Step Inspector */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="font-mono text-xs text-[#E6B35A]">
            {current.step} · {current.reference}
          </p>
          <h3 className="mt-1.5 font-display text-3xl font-semibold text-[#F8FAFC]">
            {current.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-[#CBD5E1]">
            {current.summary}
          </p>
        </div>
        <div className="lg:col-span-5 rounded-xl border border-[#243450] bg-[#0C1423] p-5">
          <p className="text-xs font-semibold text-[#4DC0B0]">
            Gospel & Heavenly Ministry Meaning
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]">
            {current.typology}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#243450] pt-4">
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={stepIdx === 0}
            onClick={() => setStepIdx((i) => Math.max(0, i - 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous step</span>
          </button>
          <button
            type="button"
            disabled={stepIdx === ATONEMENT_STEPS.length - 1}
            onClick={() =>
              setStepIdx((i) => Math.min(ATONEMENT_STEPS.length - 1, i + 1))
            }
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Next step</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {!compact && onOpenMission && (
          <button
            type="button"
            onClick={() => onOpenMission(10)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
          >
            <span>Open Mission 11: The Day of Atonement</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
