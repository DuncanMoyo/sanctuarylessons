import { useState } from 'react';
import { ArrowRight, BookOpen, Compass, Layers } from 'lucide-react';
import { LESSONS, SANCTUARY_STATIONS, SanctuaryStation } from '../data/lessons';
import { BookReaderModal } from './BookReaderModal';
import { AtonementSequencer, FeastTimeline } from './FeastTimeline';
import { PropheticTimeline } from './PropheticTimeline';
import { TypologyDrill } from './TypologyDrill';

interface SanctuaryBlueprintProps {
  completedMissions: number[];
  onOpenMission: (missionId: number) => void;
  onOpenBook?: (page?: number) => void;
}

type PerspectiveMode = 'earthly' | 'christ';
type ExplorerMode = 'floorplan' | 'feasts' | 'atonement' | 'prophecy' | 'typology';
type ServiceTraceMode = 'stations' | 'daily' | 'atonement';

export function SanctuaryBlueprint({
  completedMissions,
  onOpenMission,
  onOpenBook,
}: SanctuaryBlueprintProps) {
  const [explorerMode, setExplorerMode] = useState<ExplorerMode>('floorplan');
  const [selectedId, setSelectedId] = useState<string>('altar');
  const [perspective, setPerspective] = useState<PerspectiveMode>('earthly');
  const [serviceTrace, setServiceTrace] = useState<ServiceTraceMode>('stations');
  const [bookOpen, setBookOpen] = useState(false);

  const selectedStation: SanctuaryStation =
    SANCTUARY_STATIONS.find((s) => s.id === selectedId) ?? SANCTUARY_STATIONS[1];
  const linkedLesson = LESSONS[selectedStation.missionIndex];
  const isMissionComplete = completedMissions.includes(selectedStation.missionIndex);

  return (
    <section className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-col gap-5">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-wider text-[#E6B35A]">
            Interactive Architectural &amp; Prophetic Study
          </p>
          <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-5xl text-balance">
            Sanctuary Visual Explorer
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#9CAEC4]">
            Examine the wilderness tabernacle layout, trace daily vs. yearly priestly ministry, study the seven feasts, follow the 2,300-day prophecy, and review Type &amp; Antitype pairs.
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
          <button
            type="button"
            onClick={() => setExplorerMode('prophecy')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              explorerMode === 'prophecy'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            2,300-Day Prophecy
          </button>
          <button
            type="button"
            onClick={() => setExplorerMode('typology')}
            className={`rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
              explorerMode === 'typology'
                ? 'bg-[#E6B35A] text-[#0F172A]'
                : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
            }`}
          >
            Typology Review
          </button>
        </div>
      </div>

      {explorerMode === 'feasts' && (
        <FeastTimeline onOpenMission={onOpenMission} />
      )}

      {explorerMode === 'atonement' && (
        <AtonementSequencer onOpenMission={onOpenMission} />
      )}

      {explorerMode === 'prophecy' && (
        <PropheticTimeline onOpenMission={onOpenMission} />
      )}

      {explorerMode === 'typology' && (
        <TypologyDrill onOpenMission={onOpenMission} />
      )}

      {explorerMode === 'floorplan' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-stretch">
          {/* Left Zone: Architectural Blueprint Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#243450] bg-[#111A2B] p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs text-[#9CAEC4]">
              <span className="inline-flex items-center gap-1.5 font-medium text-[#CBD5E1]">
                <Compass className="h-4 w-4 text-[#E6B35A]" />
                <span>Scale: 100 × 50 Cubits (East to West)</span>
              </span>

              <div className="flex flex-wrap items-center gap-2">
                {/* Service Trace Toggle */}
                <div
                  role="group"
                  aria-label="Ministry trace overlay"
                  className="inline-flex rounded-lg border border-[#243450] bg-[#0B1220] p-0.5"
                >
                  <button
                    type="button"
                    onClick={() => setServiceTrace('stations')}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      serviceTrace === 'stations'
                        ? 'bg-[#E6B35A] text-[#0F172A]'
                        : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Stations
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceTrace('daily')}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      serviceTrace === 'daily'
                        ? 'bg-[#4DC0B0] text-[#090F1A]'
                        : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Daily Trace
                  </button>
                  <button
                    type="button"
                    onClick={() => setServiceTrace('atonement')}
                    className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors whitespace-nowrap shrink-0 ${
                      serviceTrace === 'atonement'
                        ? 'bg-[#E6B35A] text-[#0F172A]'
                        : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                    }`}
                  >
                    Yearly Trace
                  </button>
                </div>

                {/* Earthly vs In Christ Toggle */}
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
                  <marker
                    id="arrow-teal"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#4DC0B0" />
                  </marker>
                  <marker
                    id="arrow-gold"
                    viewBox="0 0 10 10"
                    refX="6"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 8 5 L 0 9 z" fill="#E6B35A" />
                  </marker>
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

                {/* Base East-West Axis */}
                <path
                  d="M 84 180 L 585 180 L 725 180"
                  fill="none"
                  stroke="#4DC0B0"
                  strokeOpacity="0.24"
                  strokeWidth="2"
                  strokeDasharray="4 6"
                />

                {/* Daily Service Overlay */}
                {serviceTrace === 'daily' && (
                  <g>
                    <path
                      d="M 84 180 L 205 180 L 325 180 L 560 180"
                      fill="none"
                      stroke="#4DC0B0"
                      strokeWidth="3"
                      markerEnd="url(#arrow-teal)"
                    />
                    <text
                      x="335"
                      y="306"
                      textAnchor="middle"
                      fill="#4DC0B0"
                      fontSize="11"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      DAILY: SIN TRANSFERRED IN TYPE → GATE → ALTAR → LAVER → HOLY PLACE ALTAR OF INCENSE
                    </text>
                  </g>
                )}

                {/* Yearly Day of Atonement Overlay */}
                {serviceTrace === 'atonement' && (
                  <g>
                    <path
                      d="M 205 180 L 702 180"
                      fill="none"
                      stroke="#E6B35A"
                      strokeWidth="3"
                      markerEnd="url(#arrow-gold)"
                    />
                    <path
                      d="M 725 204 L 725 268 L 120 268 L 56 306"
                      fill="none"
                      stroke="#E6B35A"
                      strokeWidth="2.5"
                      strokeDasharray="6 4"
                      markerEnd="url(#arrow-gold)"
                    />
                    <text
                      x="390"
                      y="306"
                      textAnchor="middle"
                      fill="#E6B35A"
                      fontSize="11"
                      fontFamily="IBM Plex Mono, monospace"
                    >
                      YEARLY: LORD’S GOAT BLOOD TO ARK → CLEANSED OUTWARD → SCAPEGOAT OUTSIDE CAMP
                    </text>
                  </g>
                )}

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

            {serviceTrace !== 'stations' && (
              <div className="mt-3 rounded-xl border border-[#243450] bg-[#0C1423] px-4 py-3 text-xs leading-relaxed text-[#CBD5E1]">
                {serviceTrace === 'daily' ? (
                  <p>
                    <strong className="text-[#4DC0B0]">Daily Service (Forgiveness &amp; Record):</strong>{' '}
                    The repentant sinner confessed over the offering at the bronze altar; the priest bore the blood before the veil or onto the horns of the golden altar of incense—transferring pardoned sin in figure into the sanctuary.
                  </p>
                ) : (
                  <p>
                    <strong className="text-[#E6B35A]">Yearly Service (Day of Atonement Cleansing):</strong>{' '}
                    With the blood of the Lord’s goat inside the second veil, the high priest cleansed the mercy seat, Holy Place, and altar—then placed all removed transgressions upon Azazel (the scapegoat) to be banished outside the camp.
                  </p>
                )}
              </div>
            )}

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
              <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => onOpenMission(linkedLesson.id)}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#EEBF6D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
                >
                  <span>Open Mission {String(linkedLesson.id + 1).padStart(2, '0')}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setBookOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2.5 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
                >
                  <BookOpen className="h-3.5 w-3.5 text-[#E6B35A]" />
                  <span>Read in Book (p. {selectedStation.pdfPage})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <BookReaderModal
        isOpen={bookOpen}
        title={`${selectedStation.name} · ${linkedLesson.reading}`}
        page={selectedStation.pdfPage}
        onClose={() => setBookOpen(false)}
        onOpenFullBook={onOpenBook}
      />
    </section>
  );
}
