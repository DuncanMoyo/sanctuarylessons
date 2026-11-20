import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Download,
  FileText,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import {
  TOTAL_BOOK_PAGES,
  getBookPage,
  getChapterForPage,
} from '../data/book';
import { BOOK_CHAPTER_JUMPS, SOURCE_BOOK_PDF } from '../data/lessons';
import { PdfPageCanvas } from './PdfPageCanvas';

interface BookReaderModalProps {
  isOpen: boolean;
  title: string;
  page: number;
  onClose: () => void;
  onOpenFullBook?: (page: number) => void;
}

type ReaderMode = 'text' | 'pdf';

export function BookReaderModal({
  isOpen,
  title,
  page,
  onClose,
  onOpenFullBook,
}: BookReaderModalProps) {
  const [activePage, setActivePage] = useState(page);
  const [mode, setMode] = useState<ReaderMode>('text');
  const [zoom, setZoom] = useState(1.2);

  useEffect(() => {
    if (isOpen) {
      setActivePage(Math.max(1, Math.min(TOTAL_BOOK_PAGES, page)));
    }
  }, [isOpen, page]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pageData = getBookPage(activePage);
  const chapter = getChapterForPage(activePage);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Source book reader: ${title}`}
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-5 backdrop-blur-sm"
    >
      <div className="flex h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243450] bg-[#0E1626] shadow-2xl">
        {/* Top Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#243450] bg-[#111A2B] px-4 py-3 sm:px-5 sm:py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <BookOpen className="h-4 w-4 text-[#E6B35A] shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#F8FAFC]">
                The Cross and Its Shadow (S. N. Haskell, 1914)
              </p>
              <p className="truncate font-mono text-xs text-[#9CAEC4]">
                {chapter.title} · Page {activePage} of {TOTAL_BOOK_PAGES}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div
              role="group"
              aria-label="Book display mode"
              className="inline-flex rounded-lg border border-[#243450] bg-[#0B1220] p-0.5"
            >
              <button
                type="button"
                onClick={() => setMode('text')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'text'
                    ? 'bg-[#E6B35A] text-[#0F172A]'
                    : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>Readable Text</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('pdf')}
                className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'pdf'
                    ? 'bg-[#E6B35A] text-[#0F172A]'
                    : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>1914 PDF Page</span>
              </button>
            </div>

            {onOpenFullBook && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenFullBook(activePage);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0B1220] px-3 py-1.5 text-xs font-semibold text-[#4DC0B0] hover:border-[#4DC0B0]/60 whitespace-nowrap shrink-0"
              >
                <span>Open Full Book</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            <a
              href={SOURCE_BOOK_PDF}
              download="The_Cross_and_Its_Shadow_S_N_Haskell_1914.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0B1220] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-[#E6B35A]" />
              <span className="hidden sm:inline">Download PDF</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close book reader"
              className="inline-flex items-center justify-center rounded-lg border border-[#243450] bg-[#0B1220] p-1.5 text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Quick Chapter Jump Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[#243450] bg-[#0B1220] px-4 py-2">
          <span className="mr-1 font-mono text-[11px] text-[#9CAEC4] whitespace-nowrap shrink-0">
            Jump to:
          </span>
          {BOOK_CHAPTER_JUMPS.map((jump) => {
            const isCurrent =
              activePage >= jump.page &&
              activePage <= getChapterForPage(jump.page).endPage;
            return (
              <button
                key={jump.page}
                type="button"
                onClick={() => setActivePage(jump.page)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isCurrent
                    ? 'bg-[#E6B35A] text-[#0F172A] font-semibold'
                    : 'border border-[#243450] bg-[#111A2B] text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]'
                }`}
              >
                {jump.label}
              </button>
            );
          })}
        </div>

        {/* Main Content Stage */}
        <div className="flex-1 overflow-y-auto bg-[#090F1A] p-4 sm:p-7">
          {mode === 'text' ? (
            <div className="mx-auto max-w-[68ch] rounded-2xl border border-[#243450] bg-[#111A2B] p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#243450] pb-4 text-xs">
                <span className="font-mono text-[#E6B35A]">{chapter.section}</span>
                <span className="font-mono tabular-nums text-[#9CAEC4]">
                  Page {activePage} / {TOTAL_BOOK_PAGES}
                </span>
              </div>

              <div className="mt-5 space-y-4 text-base leading-[1.75] text-[#E2E8F0]">
                {pageData.paragraphs.length === 0 ? (
                  <div className="py-6 text-center">
                    <p className="text-sm text-[#9CAEC4]">
                      This page contains an illustration or diagram in the 1914 edition.
                    </p>
                    <button
                      type="button"
                      onClick={() => setMode('pdf')}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2 text-xs font-semibold text-[#0F172A]"
                    >
                      View Original 1914 Page
                    </button>
                  </div>
                ) : (
                  pageData.paragraphs.map((para, idx) => {
                    const isHeading =
                      /^(AUTHOR’S PREFACE|INTRODUCTION|SECTION\s+[0-9IVX]+|Chapter\s+\d+|CHAPTER\s+\d+|Exhibit\s+\d+)/i.test(
                        para
                      );
                    if (isHeading) {
                      return (
                        <h3
                          key={idx}
                          className="pt-2 font-display text-2xl font-semibold text-[#F8FAFC]"
                        >
                          {para}
                        </h3>
                      );
                    }
                    return <p key={idx}>{para}</p>;
                  })
                )}
              </div>

              {pageData.footnotes.length > 0 && (
                <div className="mt-7 border-t border-[#243450] pt-4">
                  <p className="font-mono text-xs font-semibold text-[#4DC0B0]">
                    Scripture &amp; Margin References
                  </p>
                  <div className="mt-2 grid grid-cols-1 gap-1 sm:grid-cols-2">
                    {pageData.footnotes.map((fn, idx) => (
                      <p key={idx} className="font-mono text-xs text-[#9CAEC4]">
                        {fn}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#9CAEC4]">
                <span className="font-mono">
                  Original Typeset Scan · Page {activePage}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))}
                    aria-label="Zoom out"
                    className="rounded-lg border border-[#243450] bg-[#111A2B] p-1.5 text-[#CBD5E1] hover:border-[#E6B35A]/60"
                  >
                    <ZoomOut className="h-3.5 w-3.5" />
                  </button>
                  <span className="font-mono tabular-nums px-2 text-[#CBD5E1]">
                    {Math.round((zoom / 1.2) * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={() => setZoom((z) => Math.min(2.1, +(z + 0.15).toFixed(2)))}
                    aria-label="Zoom in"
                    className="rounded-lg border border-[#243450] bg-[#111A2B] p-1.5 text-[#CBD5E1] hover:border-[#E6B35A]/60"
                  >
                    <ZoomIn className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <PdfPageCanvas page={activePage} scale={zoom} />
            </div>
          )}
        </div>

        {/* Bottom Page Stepper */}
        <div className="flex items-center justify-between gap-3 border-t border-[#243450] bg-[#111A2B] px-4 py-3 sm:px-5">
          <button
            type="button"
            disabled={activePage <= 1}
            onClick={() => setActivePage((p) => Math.max(1, p - 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0B1220] px-3.5 py-2 text-xs font-semibold text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous Page</span>
          </button>

          <span className="font-mono text-xs tabular-nums text-[#9CAEC4]">
            Page {activePage} of {TOTAL_BOOK_PAGES}
          </span>

          <button
            type="button"
            disabled={activePage >= TOTAL_BOOK_PAGES}
            onClick={() => setActivePage((p) => Math.min(TOTAL_BOOK_PAGES, p + 1))}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0B1220] px-3.5 py-2 text-xs font-semibold text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap shrink-0"
          >
            <span>Next Page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
