import { useEffect, useState } from 'react';
import { BookOpen, Download, X } from 'lucide-react';
import { BOOK_CHAPTER_JUMPS, SOURCE_BOOK_PDF } from '../data/lessons';

interface BookReaderModalProps {
  isOpen: boolean;
  title: string;
  page: number;
  onClose: () => void;
}

export function BookReaderModal({
  isOpen,
  title,
  page,
  onClose,
}: BookReaderModalProps) {
  const [activePage, setActivePage] = useState(page);
  const [activeTitle, setActiveTitle] = useState(title);

  useEffect(() => {
    if (isOpen) {
      setActivePage(page);
      setActiveTitle(title);
    }
  }, [isOpen, page, title]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = `${SOURCE_BOOK_PDF}#page=${activePage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Source book reader: ${activeTitle}`}
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243450] bg-[#0E1626] shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#243450] bg-[#111A2B] px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <BookOpen className="h-4 w-4 text-[#E6B35A] shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#F8FAFC]">
                The Cross and Its Shadow (S. N. Haskell, 1914)
              </p>
              <p className="truncate font-mono text-xs text-[#9CAEC4]">
                {activeTitle} · PDF Page {activePage}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={SOURCE_BOOK_PDF}
              download="The_Cross_and_Its_Shadow_S_N_Haskell_1914.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0B1220] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
            >
              <Download className="h-3.5 w-3.5 text-[#E6B35A]" />
              <span>Download PDF</span>
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
            const isCurrent = activePage === jump.page;
            return (
              <button
                key={jump.page}
                type="button"
                onClick={() => {
                  setActivePage(jump.page);
                  setActiveTitle(jump.label);
                }}
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

        <div className="relative flex-1 bg-[#090F1A]">
          <iframe
            key={activePage}
            src={pdfUrl}
            title={`The Cross and Its Shadow - ${activeTitle}`}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
