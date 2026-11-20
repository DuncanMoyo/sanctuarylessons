import { useEffect } from 'react';
import { BookOpen, Download, X } from 'lucide-react';
import { SOURCE_BOOK_PDF } from '../data/lessons';

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
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = `${SOURCE_BOOK_PDF}#page=${page}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Source book reader: ${title}`}
      className="no-print fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
    >
      <div className="flex h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#243450] bg-[#0E1626] shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#243450] bg-[#111A2B] px-5 py-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <BookOpen className="h-4 w-4 text-[#E6B35A] shrink-0" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#F8FAFC]">
                The Cross and Its Shadow (S. N. Haskell, 1914)
              </p>
              <p className="truncate font-mono text-xs text-[#9CAEC4]">
                {title} · Starting at PDF Page {page}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={SOURCE_BOOK_PDF}
              download="The_Cross_and_Its_Shadow_S_N_Haskell_1914.pdf"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0B1220] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
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

        <div className="relative flex-1 bg-[#090F1A]">
          <iframe
            src={pdfUrl}
            title={`The Cross and Its Shadow - ${title}`}
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </div>
  );
}
