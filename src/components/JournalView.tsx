import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Download,
  NotebookPen,
  Printer,
} from 'lucide-react';
import { LESSONS } from '../data/lessons';

interface JournalViewProps {
  notes: Record<number, string>;
  onOpenLesson: (id: number) => void;
}

export function JournalView({ notes, onOpenLesson }: JournalViewProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const recordedEntries = LESSONS.filter(
    (l) => (notes[l.id] || '').trim().length > 0
  );

  const handleCopy = async (lessonId: number, title: string, text: string) => {
    try {
      await navigator.clipboard.writeText(`${title}\n\n${text}`);
      setCopiedId(lessonId);
      window.setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore clipboard permission errors
    }
  };

  const handleExport = () => {
    const lines = [
      'SANCTUARY QUEST — STUDY JOURNAL',
      'Inspired by The Cross and Its Shadow by S. N. Haskell',
      '======================================================',
      '',
    ];

    LESSONS.forEach((lesson) => {
      const note = (notes[lesson.id] || '').trim();
      if (note) {
        lines.push(`Mission ${String(lesson.id + 1).padStart(2, '0')}: ${lesson.title}`);
        lines.push(`Challenge: ${lesson.challenge}`);
        lines.push(`Notes:\n${note}`);
        lines.push('');
        lines.push('------------------------------------------------------');
        lines.push('');
      }
    });

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sanctuary-quest-journal.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section className="mx-auto max-w-[920px] px-5 py-10 sm:px-8 sm:py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="print-accent text-xs font-semibold tracking-wider text-[#E6B35A]">
            Personal Reflections
          </p>
          <h1 className="print-text mt-2 font-display text-4xl font-semibold text-[#F8FAFC] sm:text-5xl">
            Study Journal
          </h1>
          <p className="print-muted mt-2 text-base text-[#9CAEC4]">
            Your Mystery Challenge notes across all 13 missions.
          </p>
        </div>

        {recordedEntries.length > 0 && (
          <div className="no-print flex flex-wrap items-center gap-2 self-start">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#111A2B] px-4 py-2.5 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
            >
              <Printer className="h-4 w-4 text-[#E6B35A]" />
              <span>Print</span>
            </button>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#111A2B] px-4 py-2.5 text-sm font-medium text-[#E2E8F0] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC] whitespace-nowrap shrink-0"
            >
              <Download className="h-4 w-4 text-[#E6B35A]" />
              <span>Export Notes</span>
            </button>
          </div>
        )}
      </div>

      {recordedEntries.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-[#243450] bg-[#111A2B] p-10 text-center">
          <NotebookPen className="mx-auto h-9 w-9 text-[#E6B35A]/80" strokeWidth={1.5} />
          <h2 className="mt-4 font-display text-2xl font-semibold text-[#F8FAFC]">
            No Reflections Recorded Yet
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#9CAEC4]">
            Open any mission and respond to its Mystery Challenge prompt. Your thoughts will automatically appear here for review.
          </p>
          <button
            type="button"
            onClick={() => onOpenLesson(0)}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-5 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
          >
            <span>Open Mission 01</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {recordedEntries.map((lesson) => {
            const isCopied = copiedId === lesson.id;
            return (
              <div
                key={lesson.id}
                className="print-surface rounded-2xl border border-[#243450] bg-[#111A2B] p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="print-accent font-mono text-xs font-medium text-[#E6B35A]">
                    Mission {String(lesson.id + 1).padStart(2, '0')} · {lesson.category}
                  </span>
                  <div className="no-print flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleCopy(
                          lesson.id,
                          `Mission ${lesson.id + 1}: ${lesson.title}`,
                          notes[lesson.id]
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#9CAEC4] hover:text-[#F8FAFC]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-[#4DC0B0]" />
                          <span className="text-[#4DC0B0]">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenLesson(lesson.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#CBD5E1] hover:text-[#E6B35A]"
                    >
                      <span>Edit in mission</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <h2 className="print-text mt-2 font-display text-2xl font-semibold text-[#F8FAFC]">
                  {lesson.title}
                </h2>
                <p className="print-muted mt-1 text-sm text-[#9CAEC4]">
                  {lesson.challenge}
                </p>
                <div className="print-surface print-text mt-4 rounded-xl border border-[#243450] bg-[#0B1220] p-4 text-sm leading-relaxed text-[#E2E8F0] whitespace-pre-wrap">
                  {notes[lesson.id]}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
