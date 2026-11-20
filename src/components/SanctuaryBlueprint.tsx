import { useState } from 'react';
import { ArrowRight, BookOpen, Compass, Layers } from 'lucide-react';
import { LESSONS, SANCTUARY_STATIONS, SanctuaryStation } from '../data/lessons';
import { AtonementSequencer, FeastTimeline } from './FeastTimeline';

interface SanctuaryBlueprintProps {
  completedMissions: number[];
  onOpenMission: (missionId: number) => void;
}

type PerspectiveMode = 'earthly' | 'christ';
type ExplorerMode = 'floorplan' | 'feasts' | 'atonement';

export function SanctuaryBlueprint({
  completedMissions,
  onOpenMission,
}: SanctuaryBlueprintProps) {
  const [explorerMode, setExplorerMode] = useState<ExplorerMode>('floorplan');
  const [selectedId, setSelectedId] = useState<string>('altar');
  const [perspective, setPerspective] = useState<PerspectiveMode>('earthly');

  const selectedStation: SanctuaryStation =
    SANCTUARY_STATIONS.find((s) => s.id === selectedId) ?? SANCTUARY_STATIONS[1];
  const linkedLesson = LESSONS[selectedStation.missionIndex];
  const isMissionComplete = completedMissions.includes(selectedStation.missionIndex);

  return (
    <section className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-[#E6B35A]">
            Interactive Architectural & Prophetic Study
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-5xl text-balance">
            Sanctuary Visual Explorer
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#9CAEC4]">
            Examine the wilderness tabernacle layout, trace the seven annual feasts of Leviticus 23, and step through the Day of Atonement ritual.
          </p>
        </div>

        {/* Explorer Mode Tabs */}
        <div
          role="group"
          aria-label="Sanctuary explorer mode"
          className="inline-flex flex-wrap self-start rounded-xl border border-[#243450] bg-[#111A2B] p-1 gap-1"
        >
          <button
            type="button"
            onClick={() => setExplorerMode('floorplan')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              explorerMode === 'floorplan'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            Tabernacle Floorplan
          </button>
          <button
            type="button"
            onClick={() => setExplorerMode('feasts')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              explorerMode === 'feasts'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            Annual Feasts
          </button>
          <button
            type="button"
            onClick={() => setExplorerMode('atonement')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              explorerMode === 'atonement'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            Day of Atonement
          </button>
        </div>
      </div>

      {explorerMode === 'feasts' && (
        <FeastTimeline onOpenMission={onOpenMission} />
      )}

      {explorerMode === 'atonement' && (
        <AtonementSequencer onOpenMission={onOpenMission} />
      )}

      {explorerMode === 'floorplan' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left Zone: Architectural Blueprint Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#243450] bg-[#111A2B] p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9CAEC4]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#CBD5E1]">
                <Compass className="h-4 w-4 text-[#E6B35A]" />
                <span>Scale Reference: 100 × 50 Cubits (East to West)</span>
              </span>

              <div
                role="group"
                aria-label="Study perspective"
                className="inline-flex rounded-lg border border-[#243450] bg-[#0B1220] p-0.5"
              >
                <button
                  type="button"
                  onClick={() => setPerspective('earthly')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    perspective === 'earthly'
                      ? 'bg-[#E6B35A] text-[#0F172A]'
                      : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                  }`}
                >
                  Earthly Pattern
                </button>
                <button
                  type="button"
                  onClick={() => setPerspective('christ')}
                  className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    perspective === 'christ'
                      ? 'bg-[#E6B35A] text-[#0F172A]'
                      : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                  }`}
                >
                  In Christ
                </button>
              </div>
            </div>

            <div className="relative w-full overflow-x-auto rounded-xl border border-[#243450] bg-[#0A111F] p-3">
              <svg
                viewBox="0 0 840 360"
                className="w-full min-w-[580px] h-auto select-none"
                role="img"
                aria-label="Interactive architectural floorplan of the wilderness sanctuary"
              >
                <defs>
                  <pattern
                    id="blueprint-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="#192842"
                      strokeWidth="0.75"
                    />
                  </pattern>
                  <radialGradient id="shekinah-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#E6B35A" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#E6B35A" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="840" height="360" fill="url(#blueprint-grid)" />

                <rect
                  x="70"
                  y="40"
                  width="720"
                  height="280"
                  rx="4"
                  fill="#0F192B"
                  fillOpacity="0.65"
                  stroke="#3A5075"
                  strokeWidth="2"
                  strokeDasharray="8 5"
                />

                <text
                  x="110"
                  y="68"
                  fill="#9CAEC4"
                  fontSize="12"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  OUTER COURT (100 × 50 CUBITS)
                </text>

                <rect
                  x="415"
                  y="75"
                  width="350"
                  height="210"
                  rx="3"
                  fill="#14223A"
                  stroke="#E6B35A"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                />

                <line
                  x1="650"
                  y1="75"
                  x2="650"
                  y2="285"
                  stroke="#E6B35A"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                <line
                  x1="415"
                  y1="140"
                  x2="415"
                  y2="220"
                  stroke="#4DC0B0"
                  strokeWidth="3"
                />

                <circle cx="725" cy="180" r="56" fill="url(#shekinah-glow)" />

                <text
                  x="435"
                  y="98"
                  fill="#CBD5E1"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  HOLY PLACE (20 × 10)
                </text>
                <text
                  x="662"
                  y="98"
                  fill="#E6B35A"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  MOST HOLY (10 × 10)
                </text>

                <path
                  d="M 84 180 L 585 180 L 725 180"
                  fill="none"
                  stroke="#4DC0B0"
                  strokeOpacity="0.32"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                />

                <text
                  x="28"
                  y="184"
                  fill="#9CAEC4"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  EAST
                </text>
                <text
                  x="798"
                  y="184"
                  fill="#9CAEC4"
                  fontSize="11"
                  fontFamily="IBM Plex Mono, monospace"
                >
                  WEST
                </text>

                {SANCTUARY_STATIONS.map((station) => {
                  const isSelected = station.id === selectedStation.id;
                  const done = completedMissions.includes(station.missionIndex);

                  return (
                    <g
                      key={station.id}
                      transform={`translate(${station.svgPos.x}, ${station.svgPos.y})`}
                      onClick={() => setSelectedId(station.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(station.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`${station.name} (${station.zone})`}
                      aria-pressed={isSelected}
                      className="cursor-pointer focus:outline-none"
                    >
                      {isSelected && (
                        <circle
                          r="26"
                          fill="#E6B35A"
                          fillOpacity="0.18"
                          stroke="#E6B35A"
                          strokeWidth="1.5"
                        />
                      )}
                      <circle
                        r="18"
                        fill={isSelected ? '#E6B35A' : done ? '#163537' : '#192741'}
                        stroke={isSelected ? '#FFF4D6' : done ? '#4DC0B0' : '#4C648F'}
                        strokeWidth="2"
                      />
                      <text
                        y="4"
                        textAnchor="middle"
                        fill={isSelected ? '#0F172A' : '#F8FAFC'}
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="IBM Plex Mono, monospace"
                      >
                        {station.number}
                      </text>
                      <text
                        y="34"
                        textAnchor="middle"
                        fill={isSelected ? '#E6B35A' : '#CBD5E1'}
                        fontSize="11"
                        fontWeight={isSelected ? '600' : '500'}
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {station.name.replace('Altar of ', '')}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {SANCTUARY_STATIONS.map((station) => {
                const isSelected = station.id === selectedStation.id;
                return (
                  <button
                    key={station.id}
                    type="button"
                    onClick={() => setSelectedId(station.id)}
                    className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-colors ${
                      isSelected
                        ? 'border-[#E6B35A] bg-[#E6B35A]/15 text-[#F8FAFC]'
                        : 'border-[#243450] bg-[#0D1524] text-[#9CAEC4] hover:border-[#3A5075] hover:text-[#F1F5F9]'
                    }`}
                  >
                    <span className="block font-mono text-[11px] text-[#E6B35A]">
                      {station.number}
                    </span>
                    <span className="block truncate font-medium">
                      {station.name.replace('Altar of ', '')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Zone: Control & Concept Inspector Deck */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-7">
            <div>
              <div className="flex items-center justify-between gap-3 text-xs text-[#9CAEC4]">
                <span className="font-mono text-[#E6B35A]">
                  Station {selectedStation.number} · {selectedStation.zone}
                </span>
                {isMissionComplete && (
                  <span className="font-medium text-[#4DC0B0]">✓ Studied</span>
                )}
              </div>

              <h2 className="mt-2 font-display text-3xl font-semibold text-[#F8FAFC]">
                {selectedStation.name}
              </h2>

              <div className="mt-4 space-y-2 border-y border-[#243450] py-4 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CAEC4]">Dimensions</span>
                  <span className="text-right font-medium text-[#E2E8F0]">
                    {selectedStation.dimensions}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CAEC4]">Materials</span>
                  <span className="text-right font-medium text-[#E2E8F0]">
                    {selectedStation.material}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CAEC4]">Scriptures</span>
                  <span className="text-right font-mono text-xs text-[#E6B35A]">
                    {selectedStation.scripture}
                  </span>
                </div>
              </div>

              <div className="mt-5 space-y-4">
                {perspective === 'earthly' ? (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#CBD5E1]">
                      <Layers className="h-4 w-4 text-[#E6B35A]" />
                      <span>Earthly Sanctuary Role</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                      {selectedStation.earthlyRole}
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#4DC0B0]">
                      <BookOpen className="h-4 w-4 text-[#4DC0B0]" />
                      <span>Fulfillment in Christ</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#E2E8F0]">
                      {selectedStation.christFulfillment}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 border-t border-[#243450] pt-5">
              <p className="text-xs text-[#9CAEC4]">
                Related Study Mission · Mission {String(linkedLesson.id + 1).padStart(2, '0')}
              </p>
              <p className="mt-1 font-medium text-[#F8FAFC]">{linkedLesson.title}</p>
              <button
                type="button"
                onClick={() => onOpenMission(linkedLesson.id)}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#EEBF6D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
              >
                <span>Open Mission {String(linkedLesson.id + 1).padStart(2, '0')}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
