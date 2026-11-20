import { useMemo, useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, Layers, RotateCcw } from 'lucide-react';
import { TYPOLOGY_DRILL_PAIRS, TypologyDrillPair } from '../data/lessons';

interface TypologyDrillProps {
  onOpenMission?: (missionId: number) => void;
}

const ROUNDS: { id: 1 | 2 | 3; label: string }[] = [
  { id: 1, label: 'Round 1 · Courtyard' },
  { id: 2, label: 'Round 2 · Holy Place & Priest' },
  { id: 3, label: 'Round 3 · Feasts & Restoration' },
];

// Deterministic non-sequential order for fulfillment column per round
const ROUND_ORDER: Record<1 | 2 | 3, string[]> = {
  1: ['laver', 'trespass-restitution', 'gate', 'altar'],
  2: ['incense', 'showbread', 'breastplate', 'lampstand'],
  3: ['jubilee', 'passover', 'scapegoat', 'firstfruits'],
};

export function TypologyDrill({ onOpenMission }: TypologyDrillProps) {
  const [round, setRound] = useState<1 | 2 | 3>(1);
  const [selectedShadowId, setSelectedShadowId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchMessage, setMismatchMessage] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const roundPairs = useMemo(
    () => TYPOLOGY_DRILL_PAIRS.filter((pair) => pair.round === round),
    [round]
  );

  const orderedFulfillments = useMemo(() => {
    const order = ROUND_ORDER[round];
    return [...roundPairs].sort(
      (a, b) => order.indexOf(a.id) - order.indexOf(b.id)
    );
  }, [round, roundPairs]);

  const handleSelectRound = (nextRound: 1 | 2 | 3) => {
    setRound(nextRound);
    setSelectedShadowId(null);
    setMismatchMessage(null);
  };

  const handleResetRound = () => {
    const roundIds = new Set(roundPairs.map((p) => p.id));
    setMatchedIds((prev) => prev.filter((id) => !roundIds.has(id)));
    setSelectedShadowId(null);
    setMismatchMessage(null);
  };

  const handlePickFulfillment = (targetPair: TypologyDrillPair) => {
    if (!selectedShadowId) {
      setMismatchMessage('Select an Old Testament Type on the left first.');
      return;
    }

    setAttempts((c) => c + 1);

    if (selectedShadowId === targetPair.id) {
      setMatchedIds((prev) =>
        prev.includes(targetPair.id) ? prev : [...prev, targetPair.id]
      );
      setSelectedShadowId(null);
      setMismatchMessage(null);
    } else {
      const pickedShadow = roundPairs.find((p) => p.id === selectedShadowId);
      setMismatchMessage(
        `"${pickedShadow?.shadowLabel ?? 'Selected shadow'}" pairs with another fulfillment — check the Scripture reference.`
      );
    }
  };

  const roundMatchedCount = roundPairs.filter((p) =>
    matchedIds.includes(p.id)
  ).length;
  const allRoundMatched = roundMatchedCount === roundPairs.length;

  return (
    <div className="rounded-2xl border border-[#243450] bg-[#111A2B] p-5 sm:p-6">
      <div className="flex flex-col gap-4 border-b border-[#243450] pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[#CBD5E1]">
            <Layers className="h-4 w-4 text-[#E6B35A]" />
            <span>Interactive Type &amp; Antitype Matching Review</span>
          </div>
          <p className="mt-1 text-sm text-[#9CAEC4]">
            Select an Old Testament shadow on the left, then click its New Testament fulfillment in Christ on the right.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-xs tabular-nums text-[#4DC0B0]">
            {matchedIds.length}/{TYPOLOGY_DRILL_PAIRS.length} matched
          </span>
          {attempts > 0 && (
            <span className="font-mono text-xs tabular-nums text-[#9CAEC4]">
              {attempts} checks
            </span>
          )}
        </div>
      </div>

      {/* Round Tabs */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div
          role="group"
          aria-label="Typology review rounds"
          className="inline-flex flex-wrap rounded-xl border border-[#243450] bg-[#0B1220] p-1 gap-1"
        >
          {ROUNDS.map((r) => {
            const active = r.id === round;
            const rPairs = TYPOLOGY_DRILL_PAIRS.filter((p) => p.round === r.id);
            const rDone = rPairs.every((p) => matchedIds.includes(p.id));
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRound(r.id)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#E6B35A] text-[#0F172A]'
                    : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                }`}
              >
                <span>{r.label}</span>
                {rDone && (
                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${active ? 'text-[#0F172A]' : 'text-[#4DC0B0]'}`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleResetRound}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Round</span>
        </button>
      </div>

      {/* Matching Columns */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2.5">
          <p className="font-mono text-xs font-semibold text-[#E6B35A]">
            Type · Old Testament Shadow
          </p>
          {roundPairs.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            const isSelected = selectedShadowId === pair.id;
            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => {
                  setSelectedShadowId(isSelected ? null : pair.id);
                  setMismatchMessage(null);
                }}
                className={`flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-left transition-colors ${
                  isMatched
                    ? 'border-[#4DC0B0]/50 bg-[#4DC0B0]/10 text-[#E2E8F0] cursor-default'
                    : isSelected
                      ? 'border-[#E6B35A] bg-[#E6B35A]/12 text-[#F8FAFC]'
                      : 'border-[#243450] bg-[#0C1423] text-[#CBD5E1] hover:border-[#3A5075]'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{pair.shadowLabel}</p>
                  <p className="mt-1 font-mono text-xs text-[#9CAEC4]">
                    {pair.shadowRef}
                  </p>
                </div>
                {isMatched && (
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#4DC0B0]" />
                )}
              </button>
            );
          })}
        </div>

        <div className="space-y-2.5">
          <p className="font-mono text-xs font-semibold text-[#4DC0B0]">
            Antitype · Fulfillment in Christ
          </p>
          {orderedFulfillments.map((pair) => {
            const isMatched = matchedIds.includes(pair.id);
            return (
              <button
                key={pair.id}
                type="button"
                disabled={isMatched}
                onClick={() => handlePickFulfillment(pair)}
                className={`flex w-full items-start justify-between gap-3 rounded-xl border p-4 text-left transition-colors ${
                  isMatched
                    ? 'border-[#4DC0B0]/50 bg-[#4DC0B0]/10 text-[#E2E8F0] cursor-default'
                    : selectedShadowId
                      ? 'border-[#2E4266] bg-[#0C1423] text-[#E2E8F0] hover:border-[#E6B35A]/70'
                      : 'border-[#243450] bg-[#0C1423] text-[#CBD5E1] hover:border-[#3A5075]'
                }`}
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium">{pair.fulfillmentLabel}</p>
                  <p className="mt-1 font-mono text-xs text-[#4DC0B0]">
                    {pair.fulfillmentRef}
                  </p>
                </div>
                {isMatched && onOpenMission && (
                  <span
                    role="link"
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenMission(pair.missionIndex);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        e.stopPropagation();
                        onOpenMission(pair.missionIndex);
                      }
                    }}
                    className="inline-flex items-center gap-1 rounded border border-[#4DC0B0]/40 px-2 py-1 text-[11px] font-semibold text-[#4DC0B0] hover:bg-[#4DC0B0]/15 shrink-0 cursor-pointer"
                  >
                    <span>Mission {String(pair.missionIndex + 1).padStart(2, '0')}</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feedback Strip */}
      {mismatchMessage && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-[#E6B35A]/50 bg-[#E6B35A]/10 px-4 py-3 text-xs font-medium text-[#E6B35A]">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{mismatchMessage}</span>
        </div>
      )}

      {allRoundMatched && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#4DC0B0]/50 bg-[#4DC0B0]/10 px-4 py-3 text-xs font-medium text-[#4DC0B0]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>
              Round {round} complete — all {roundPairs.length} Type &amp; Antitype pairs matched.
            </span>
          </div>
          {round < 3 && (
            <button
              type="button"
              onClick={() => handleSelectRound((round + 1) as 2 | 3)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#4DC0B0] px-3 py-1.5 text-xs font-semibold text-[#090F1A] hover:opacity-90 whitespace-nowrap shrink-0"
            >
              <span>Next Round</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
