import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  Search,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  BOOK_CHAPTERS,
  BOOK_PAGES,
  BookChapterEntry,
  TOTAL_BOOK_PAGES,
  getChapterForPage,
  searchBookPages,
} from '../data/book';
import { LESSONS, SOURCE_BOOK_PDF } from '../data/lessons';
import { PdfPageCanvas } from './PdfPageCanvas';

interface BookViewProps {
  initialPage?: number;
  onOpenMission: (missionId: number) => void;
}

type BookDisplayMode = 'text' | 'pdf';

export function BookView({ initialPage = 2, onOpenMission }: BookViewProps) {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    () => getChapterForPage(initialPage).id
  );
  const [pdfPage, setPdfPage] = useState<number>(initialPage);
  const [displayMode, setDisplayMode] = useState<BookDisplayMode>('text');
  const [zoom, setZoom] = useState<number>(1.25);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const ch = getChapterForPage(initialPage);
    setSelectedChapterId(ch.id);
    setPdfPage(initialPage);
  }, [initialPage]);

  const activeChapterIdx = Math.max(
    0,
    BOOK_CHAPTERS.findIndex((c) => c.id === selectedChapterId)
  );
  const activeChapter = BOOK_CHAPTERS[activeChapterIdx] ?? BOOK_CHAPTERS[1];

  const chapterPages = useMemo(
    () =>
      BOOK_PAGES.filter(
        (p) => p.page >= activeChapter.startPage && p.page <= activeChapter.endPage
      ),
    [activeChapter]
  );

  const groupedSections = useMemo(() => {
    const map = new Map<string, BookChapterEntry[]>();
    BOOK_CHAPTERS.forEach((entry) => {
      const list = map.get(entry.section) ?? [];
      list.push(entry);
      map.set(entry.section, list);
    });
    return Array.from(map.entries());
  }, []);

  const searchMatches = useMemo(() => {
    if (searchQuery.trim().length < 2) return [];
    return searchBookPages(searchQuery, 35);
  }, [searchQuery]);

  const selectChapter = (chapter: BookChapterEntry, targetPage?: number) => {
    setSelectedChapterId(chapter.id);
    setPdfPage(targetPage ?? chapter.startPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const relatedMission =
    typeof activeChapter.relatedMissionId === 'number'
      ? LESSONS[activeChapter.relatedMissionId]
      : undefined;

  return (
    <section className="mx-auto max-w-[1160px] px-5 py-10 sm:px-8 sm:py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#E6B35A]">
            Complete 1914 Source Volume · 50 Chapters · 166 Pages
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl text-balance">
            The Cross and Its Shadow
          </h1>
          <p className="mt-3 text-base text-[#9CAEC4]">
            Read S. N. Haskell’s full 1914 volume directly inside Sanctuary Quest, search any Scripture or topic, or view original 1914 typeset pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 self-start">
          <div
            role="group"
            aria-label="Book display mode"
            className="inline-flex rounded-xl border border-[#243450] bg-[#111A2B] p-1 gap-1"
          >
            <button
              type="button"
              onClick={() => setDisplayMode('text')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                displayMode === 'text'
                  ? 'bg-[#E6B35A] text-[#0F172A]'
                  : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Readable Text</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDisplayMode('pdf');
                setPdfPage((p) =>
                  p >= activeChapter.startPage && p <= activeChapter.endPage
                    ? p
                    : activeChapter.startPage
                );
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                displayMode === 'pdf'
                  ? 'bg-[#E6B35A] text-[#0F172A]'
                  : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Original 1914 Pages</span>
            </button>
          </div>

          <a
            href={SOURCE_BOOK_PDF}
            download="The_Cross_and_Its_Shadow_S_N_Haskell_1914.pdf"
            className="inline-flex items-center gap-2 rounded-xl border border-[#243450] bg-[#111A2B] px-4 py-2.5 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
          >
            <Download className="h-3.5 w-3.5 text-[#E6B35A]" />
            <span>Download PDF</span>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start">
        {/* Left Sidebar: Search & Complete 50-Chapter Table of Contents */}
        <aside className="lg:col-span-4 rounded-2xl border border-[#243450] bg-[#111A2B] p-4 sm:p-5 lg:sticky lg:top-24">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CAEC4]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 166 pages..."
              aria-label="Search full book text"
              className="w-full rounded-xl border border-[#243450] bg-[#0B1220] py-2.5 pl-9 pr-8 text-sm text-[#F8FAFC] placeholder:text-[#6B809E] focus:border-[#E6B35A] focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear book search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-[#9CAEC4] hover:text-[#F8FAFC]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {searchQuery.trim().length >= 2 ? (
            <div className="mt-4 max-h-[60vh] space-y-2 overflow-y-auto pr-1">
              <p className="font-mono text-xs text-[#9CAEC4]">
                {searchMatches.length === 0
                  ? 'No matches found.'
                  : `${searchMatches.length}${searchMatches.length === 35 ? '+' : ''} matching pages`}
              </p>
              {searchMatches.map((match) => (
                <button
                  key={`${match.page}-${match.chapter.id}`}
                  type="button"
                  onClick={() => selectChapter(match.chapter, match.page)}
                  className="block w-full rounded-xl border border-[#243450] bg-[#0C1423] p-3 text-left transition-colors hover:border-[#E6B35A]/60"
                >
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#E6B35A]">
                    <span className="truncate">{match.chapter.title}</span>
                    <span className="shrink-0 tabular-nums">p. {match.page}</span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#CBD5E1]">
                    {match.snippet}
                  </p>
                </button>
              ))}
            </div>
          ) : (
            <div className="mt-4 max-h-[64vh] space-y-5 overflow-y-auto pr-1">
              {groupedSections.map(([sectionName, entries]) => (
                <div key={sectionName}>
                  <p className="px-1 font-mono text-[11px] font-semibold text-[#E6B35A]">
                    {sectionName}
                  </p>
                  <div className="mt-1.5 space-y-1">
                    {entries.map((entry) => {
                      const active = entry.id === activeChapter.id;
                      const pageSpan =
                        entry.startPage === entry.endPage
                          ? `p. ${entry.startPage}`
                          : `pp. ${entry.startPage}–${entry.endPage}`;
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          onClick={() => selectChapter(entry)}
                          className={`flex w-full items-baseline justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-xs transition-colors ${
                            active
                              ? 'bg-[#E6B35A]/15 font-semibold text-[#F8FAFC] border border-[#E6B35A]/50'
                              : 'text-[#CBD5E1] hover:bg-[#162238] hover:text-[#F8FAFC] border border-transparent'
                          }`}
                        >
                          <span className="truncate">{entry.title}</span>
                          <span className="font-mono text-[11px] tabular-nums text-[#9CAEC4] shrink-0">
                            {pageSpan}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* Right Reading Canvas */}
        <article className="lg:col-span-8 rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#243450] pb-5">
            <div>
              <p className="font-mono text-xs text-[#E6B35A]">
                {activeChapter.section} ·{' '}
                {activeChapter.startPage === activeChapter.endPage
                  ? `Page ${activeChapter.startPage}`
                  : `Pages ${activeChapter.startPage}–${activeChapter.endPage}`}
              </p>
              <h2 className="mt-1.5 font-display text-3xl font-semibold text-[#F8FAFC]">
                {activeChapter.title}
              </h2>
            </div>

            {relatedMission && (
              <button
                type="button"
                onClick={() => onOpenMission(relatedMission.id)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#4DC0B0]/50 bg-[#0D1627] px-3.5 py-2 text-xs font-semibold text-[#4DC0B0] transition-colors hover:bg-[#4DC0B0]/10 whitespace-nowrap shrink-0"
              >
                <span>
                  Study Mission {String(relatedMission.id + 1).padStart(2, '0')}
                </span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {displayMode === 'text' ? (
            <div className="mt-6 space-y-8">
              {chapterPages.map((pageData) => (
                <div
                  key={pageData.page}
                  className="space-y-4 border-b border-[#243450]/70 pb-8 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#9CAEC4]">
                    <span>Page {pageData.page}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPdfPage(pageData.page);
                        setDisplayMode('pdf');
                      }}
                      className="text-[#E6B35A] hover:underline"
                    >
                      View original scan →
                    </button>
                  </div>

                  {pageData.paragraphs.length === 0 ? (
                    <div className="rounded-xl border border-[#243450] bg-[#0C1423] p-6 text-center">
                      <p className="text-sm text-[#9CAEC4]">
                        This page contains an architectural illustration in the 1914 volume.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setPdfPage(pageData.page);
                          setDisplayMode('pdf');
                        }}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2 text-xs font-semibold text-[#0F172A]"
                      >
                        Open Original Page {pageData.page}
                      </button>
                    </div>
                  ) : (
                    <div className="max-w-[68ch] space-y-4 text-base leading-[1.75] text-[#E2E8F0]">
                      {pageData.paragraphs.map((para, idx) => {
                        const isHeading =
                          /^(AUTHOR’S PREFACE|INTRODUCTION|SECTION\s+[0-9IVX]+|Chapter\s+\d+|CHAPTER\s+\d+|Exhibit\s+\d+)/i.test(
                            para
                          );
                        if (isHeading) {
                          return (
                            <h3
                              key={idx}
                              className="pt-1 font-display text-2xl font-semibold text-[#F8FAFC]"
                            >
                              {para}
                            </h3>
                          );
                        }
                        return <p key={idx}>{para}</p>;
                      })}
                    </div>
                  )}

                  {pageData.footnotes.length > 0 && (
                    <div className="rounded-xl border border-[#243450] bg-[#0C1423] px-4 py-3">
                      <p className="font-mono text-[11px] font-semibold text-[#4DC0B0]">
                        Page {pageData.page} References
                      </p>
                      <div className="mt-1.5 grid grid-cols-1 gap-1 sm:grid-cols-2">
                        {pageData.footnotes.map((fn, idx) => (
                          <p key={idx} className="font-mono text-xs text-[#9CAEC4]">
                            {fn}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={pdfPage <= 1}
                    onClick={() => {
                      const next = Math.max(1, pdfPage - 1);
                      setPdfPage(next);
                      setSelectedChapterId(getChapterForPage(next).id);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#243450] bg-[#0C1423] px-3 py-1.5 font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Prev</span>
                  </button>
                  <span className="font-mono tabular-nums text-[#CBD5E1]">
                    Page {pdfPage} / {TOTAL_BOOK_PAGES}
                  </span>
                  <button
                    type="button"
                    disabled={pdfPage >= TOTAL_BOOK_PAGES}
                    onClick={() => {
                      const next = Math.min(TOTAL_BOOK_PAGES, pdfPage + 1);
                      setPdfPage(next);
                      setSelectedChapterId(getChapterForPage(next).id);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#243450] bg-[#0C1423] px-3 py-1.5 font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))}
                    aria-label="Zoom out"
                    className="rounded-lg border border-[#243450] bg-[#0C1423] p-1.5 text-[#CBD5E1] hover:border-[#E6B35A]/60"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono tabular-nums px-1.5 text-[#CBD5E1]">
                    {Math.round((zoom / 1.25) * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(2.2, +(z + 0.15).toFixed(2)))}
                    aria-label="Zoom in"
                    className="rounded-lg border border-[#243450] bg-[#0C1423] p-1.5 text-[#CBD5E1] hover:border-[#E6B35A]/60"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <PdfPageCanvas page={pdfPage} scale={zoom} />
            </div>
          )}

          {/* Previous / Next Chapter Navigation */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-[#243450] pt-5">
            <button
              type="button"
              disabled={activeChapterIdx <= 0}
              onClick={() => selectChapter(BOOK_CHAPTERS[activeChapterIdx - 1])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Previous Section</span>
            </button>

            <button
              type="button"
              disabled={activeChapterIdx >= BOOK_CHAPTERS.length - 1}
              onClick={() => selectChapter(BOOK_CHAPTERS[activeChapterIdx + 1])}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next Section</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
