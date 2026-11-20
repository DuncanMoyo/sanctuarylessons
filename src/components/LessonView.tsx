import { useEffect, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Printer,
} from 'lucide-react';
import { LESSONS, Lesson } from '../data/lessons';
import { BookReaderModal } from './BookReaderModal';
import { AtonementSequencer, FeastTimeline } from './FeastTimeline';
import { HighPriestExplorer } from './HighPriestExplorer';
import { PropheticTimeline } from './PropheticTimeline';
import { ResilientImage } from './ResilientImage';

interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  quizBonusEarned: boolean;
  readVerses: string[];
  savedNote: string;
  onToggleVerseRead: (lessonId: number, verseIdx: number) => void;
  onSaveNote: (lessonId: number, note: string) => void;
  onAwardQuizBonus: (lessonId: number) => boolean;
  onCompleteMission: (lessonId: number) => boolean;
  onBackToMissions: () => void;
  onNavigateLesson: (lessonId: number) => void;
}

export function LessonView({
  lesson,
  isCompleted,
  quizBonusEarned,
  readVerses,
  savedNote,
  onToggleVerseRead,
  onSaveNote,
  onAwardQuizBonus,
  onCompleteMission,
  onBackToMissions,
  onNavigateLesson,
}: LessonViewProps) {
  const [expandedVerse, setExpandedVerse] = useState<number | null>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [graded, setGraded] = useState(false);
  const [bonusMessage, setBonusMessage] = useState<string | null>(null);
  const [completionMessage, setCompletionMessage] = useState<string | null>(null);
  const [bookOpen, setBookOpen] = useState(false);

  useEffect(() => {
    setExpandedVerse(0);
    setAnswers({});
    setGraded(false);
    setBonusMessage(null);
    setCompletionMessage(null);
    setBookOpen(false);
  }, [lesson.id]);

  const handleGrade = () => {
    setGraded(true);
    const score = lesson.quiz.reduce((acc, q, idx) => {
      return answers[idx] === q.correct ? acc + 1 : acc;
    }, 0);

    if (score === lesson.quiz.length) {
      const awarded = onAwardQuizBonus(lesson.id);
      if (awarded) {
        setBonusMessage('+10 XP awarded for a perfect knowledge check!');
      } else {
        setBonusMessage('Perfect score verified.');
      }
    } else {
      setBonusMessage(null);
    }
  };

  const handleComplete = () => {
    const awarded = onCompleteMission(lesson.id);
    if (awarded) {
      setCompletionMessage('Mission marked complete. +50 XP added to your study record.');
    }
  };

  const score = lesson.quiz.reduce((acc, q, idx) => {
    return answers[idx] === q.correct ? acc + 1 : acc;
  }, 0);

  const versesReadCount = lesson.verses.filter((_, idx) =>
    readVerses.includes(`${lesson.id}-${idx}`)
  ).length;

  const hasPrev = lesson.id > 0;
  const hasNext = lesson.id < LESSONS.length - 1;

  return (
    <article className="mx-auto max-w-[860px] px-5 py-8 sm:px-8 sm:py-12">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToMissions}
          className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#111A2B] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to missions</span>
        </button>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#111A2B] px-3.5 py-2 text-xs font-medium text-[#CBD5E1] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
        >
          <Printer className="h-3.5 w-3.5 text-[#E6B35A]" />
          <span>Print Study Sheet</span>
        </button>
      </div>

      {/* Main Study Container */}
      <div className="print-surface mt-5 overflow-hidden rounded-2xl border border-[#243450] bg-[#111A2B]">
        {/* Visual Header */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden border-b border-[#243450]">
          <ResilientImage
            src={lesson.image}
            alt={lesson.imageAlt}
            fallbackTitle={lesson.title}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="no-print absolute inset-0 bg-gradient-to-t from-[#111A2B] via-[#111A2B]/45 to-transparent"
          />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:px-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#E6B35A] print-accent">
              <span className="font-mono">
                Mission {String(lesson.id + 1).padStart(2, '0')} of {LESSONS.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{lesson.category}</span>
              {isCompleted && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-[#4DC0B0]">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Completed</span>
                  </span>
                </>
              )}
            </div>
            <h1 className="print-text mt-1.5 font-display text-3xl font-semibold text-[#F8FAFC] sm:text-4xl">
              {lesson.title}
            </h1>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-9">
          {/* Reading Guide */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#243450] pb-5 text-sm text-[#9CAEC4] print-muted">
            <div className="flex items-center gap-2.5">
              <BookOpen className="h-4 w-4 text-[#E6B35A] shrink-0" />
              <span>
                Reading guide:{' '}
                <strong className="print-text font-medium text-[#E2E8F0]">
                  {lesson.reading}
                </strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setBookOpen(true)}
              className="no-print inline-flex items-center gap-2 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-1.5 text-xs font-semibold text-[#CBD5E1] transition-colors hover:border-[#E6B35A]/60 hover:text-[#F8FAFC]"
            >
              <BookOpen className="h-3.5 w-3.5 text-[#E6B35A]" />
              <span>Read Chapter in Book (p. {lesson.pdfPage})</span>
            </button>
          </div>

          {/* Story Briefing */}
          <section>
            <h2 className="print-text font-display text-2xl font-semibold text-[#F8FAFC]">
              Story Briefing
            </h2>
            <div className="print-text mt-3 space-y-4 max-w-[68ch] text-base leading-relaxed text-[#CBD5E1]">
              {lesson.body.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Primary Source Excerpt from S. N. Haskell (1914) */}
          <section className="print-surface rounded-xl border border-[#243450] bg-[#0C1423] p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="print-text font-display text-xl font-semibold text-[#F8FAFC]">
                From S. N. Haskell (1914)
              </h2>
              <span className="print-accent font-mono text-xs text-[#E6B35A]">
                {lesson.haskellExcerpt.citation}
              </span>
            </div>
            <blockquote className="print-text mt-3 font-display text-lg italic leading-relaxed text-[#E2E8F0]">
              “{lesson.haskellExcerpt.quote}”
            </blockquote>
          </section>

          {/* Type & Antitype Comparison */}
          {lesson.typeAntitype.length > 0 && (
            <section>
              <h2 className="print-text font-display text-2xl font-semibold text-[#F8FAFC]">
                Type &amp; Antitype Comparison
              </h2>
              <p className="print-muted mt-1 text-sm text-[#9CAEC4]">
                Parallel shadows from the earthly service and their New Testament fulfillment in Christ.
              </p>
              <div className="mt-4 space-y-3">
                {lesson.typeAntitype.map((row, idx) => (
                  <div
                    key={idx}
                    className="print-surface grid grid-cols-1 divide-y divide-[#243450] overflow-hidden rounded-xl border border-[#243450] bg-[#0C1423] md:grid-cols-2 md:divide-x md:divide-y-0"
                  >
                    <div className="p-4 sm:p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="print-muted text-xs font-semibold text-[#9CAEC4]">
                          Type · Old Testament Shadow
                        </span>
                        <span className="print-accent font-mono text-xs font-semibold text-[#E6B35A]">
                          {row.typeRef}
                        </span>
                      </div>
                      <p className="print-text mt-2 text-sm leading-relaxed text-[#CBD5E1]">
                        {row.typeText}
                      </p>
                    </div>
                    <div className="bg-[#0A101D] print-surface p-4 sm:p-5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="print-muted text-xs font-semibold text-[#4DC0B0]">
                          Antitype · Fulfillment in Christ
                        </span>
                        <span className="font-mono text-xs font-semibold text-[#4DC0B0]">
                          {row.antitypeRef}
                        </span>
                      </div>
                      <p className="print-text mt-2 text-sm leading-relaxed text-[#E2E8F0]">
                        {row.antitypeText}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Interactive Modules Embedded for Mission 8 (High Priest), Mission 10 (Annual Feasts), Mission 11 (Day of Atonement) & Mission 12 (2,300-Day Prophecy) */}
          {lesson.id === 7 && (
            <section className="no-print">
              <h2 className="font-display text-2xl font-semibold text-[#F8FAFC] mb-3">
                Interactive High Priest Garments Explorer
              </h2>
              <HighPriestExplorer />
            </section>
          )}

          {lesson.id === 9 && (
            <section className="no-print">
              <h2 className="font-display text-2xl font-semibold text-[#F8FAFC] mb-3">
                Interactive Feast Timeline
              </h2>
              <FeastTimeline compact />
            </section>
          )}

          {lesson.id === 10 && (
            <section className="no-print">
              <h2 className="font-display text-2xl font-semibold text-[#F8FAFC] mb-3">
                Interactive Day of Atonement Sequencer
              </h2>
              <AtonementSequencer compact />
            </section>
          )}

          {lesson.id === 11 && (
            <section className="no-print">
              <h2 className="font-display text-2xl font-semibold text-[#F8FAFC] mb-3">
                Interactive 2,300-Day Prophetic Timeline
              </h2>
              <PropheticTimeline compact />
            </section>
          )}

          {/* Interactive Scripture Trail with Reading Checkboxes */}
          <section>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="print-text font-display text-2xl font-semibold text-[#F8FAFC]">
                Scripture Trail
              </h2>
              <span className="font-mono text-xs tabular-nums text-[#4DC0B0]">
                {versesReadCount}/{lesson.verses.length} passages read
              </span>
            </div>
            <p className="print-muted mt-1 text-sm text-[#9CAEC4]">
              Expand any passage to read the excerpt and check it off as you study.
            </p>
            <div className="print-surface mt-4 divide-y divide-[#243450] rounded-xl border border-[#243450] bg-[#0C1423]">
              {lesson.verses.map((verse, idx) => {
                const open = expandedVerse === idx;
                const isRead = readVerses.includes(`${lesson.id}-${idx}`);

                return (
                  <div key={verse.ref}>
                    <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={() => onToggleVerseRead(lesson.id, idx)}
                          aria-pressed={isRead}
                          aria-label={`Mark ${verse.ref} as ${isRead ? 'unread' : 'read'}`}
                          className={`no-print flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                            isRead
                              ? 'border-[#4DC0B0] bg-[#4DC0B0] text-[#090F1A]'
                              : 'border-[#3A5075] bg-[#0A111F] text-transparent hover:border-[#E6B35A]'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setExpandedVerse(open ? null : idx)}
                          aria-expanded={open}
                          className="flex flex-1 items-center justify-between gap-3 text-left"
                        >
                          <div className="min-w-0">
                            <span className="print-accent font-mono text-sm font-semibold text-[#E6B35A]">
                              {verse.ref}
                            </span>
                            <span className="print-muted ml-3 text-sm text-[#9CAEC4]">
                              {verse.focus}
                            </span>
                          </div>
                          {open ? (
                            <ChevronUp className="no-print h-4 w-4 text-[#9CAEC4] shrink-0" />
                          ) : (
                            <ChevronDown className="no-print h-4 w-4 text-[#9CAEC4] shrink-0" />
                          )}
                        </button>
                      </div>
                    </div>

                    {open && (
                      <div className="border-t border-[#243450]/70 bg-[#0A101D] print-surface px-5 py-4">
                        <blockquote className="print-text font-display text-lg italic leading-relaxed text-[#E2E8F0]">
                          “{verse.excerpt}”
                        </blockquote>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Mystery Challenge Reflection */}
          <section className="print-surface rounded-xl border border-[#243450] bg-[#162238] p-5 sm:p-6">
            <h2 className="print-text font-display text-2xl font-semibold text-[#F8FAFC]">
              Mystery Challenge
            </h2>
            <p className="print-text mt-2 text-base leading-relaxed text-[#E2E8F0]">
              {lesson.challenge}
            </p>
            <label htmlFor={`reflection-${lesson.id}`} className="sr-only">
              Personal reflection notes for {lesson.title}
            </label>
            <textarea
              id={`reflection-${lesson.id}`}
              value={savedNote}
              onChange={(e) => onSaveNote(lesson.id, e.target.value)}
              placeholder="Write your discoveries and Scripture observations here..."
              rows={4}
              className="mt-4 w-full rounded-xl border border-[#2A3D5E] bg-[#0A111F] p-4 text-sm leading-relaxed text-[#F8FAFC] placeholder:text-[#6B809E] focus:border-[#E6B35A] focus:outline-none"
            />
            <div className="no-print mt-2 flex items-center justify-between text-xs text-[#9CAEC4]">
              <span>Ungraded personal study reflection.</span>
              <span className="font-mono text-[#4DC0B0]">
                {savedNote.trim().length > 0 ? 'Saved automatically' : 'Ready to record'}
              </span>
            </div>
          </section>

          {/* Knowledge Check Quiz */}
          <section>
            <h2 className="print-text font-display text-2xl font-semibold text-[#F8FAFC]">
              Knowledge Check
            </h2>
            <div className="mt-4 space-y-4">
              {lesson.quiz.map((question, qIdx) => {
                const picked = answers[qIdx];
                const isRight = picked === question.correct;

                return (
                  <fieldset
                    key={qIdx}
                    className="print-surface rounded-xl border border-[#243450] bg-[#162238] p-5"
                  >
                    <legend className="print-text text-sm font-semibold text-[#F8FAFC]">
                      {qIdx + 1}. {question.q}
                    </legend>
                    <div className="mt-3 space-y-2">
                      {question.a.map((choice, aIdx) => {
                        const checked = picked === aIdx;
                        return (
                          <label
                            key={aIdx}
                            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3.5 py-2.5 text-sm transition-colors ${
                              checked
                                ? 'border-[#E6B35A] bg-[#E6B35A]/10 text-[#F8FAFC]'
                                : 'border-[#243450] bg-[#0D1627] text-[#CBD5E1] hover:border-[#3A5075]'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`q-${lesson.id}-${qIdx}`}
                              value={aIdx}
                              checked={checked}
                              onChange={() =>
                                setAnswers((prev) => ({ ...prev, [qIdx]: aIdx }))
                              }
                              className="h-4 w-4 accent-[#E6B35A]"
                            />
                            <span className="print-text">{choice}</span>
                          </label>
                        );
                      })}
                    </div>

                    {graded && (
                      <div
                        className={`mt-3 flex items-start gap-2 text-sm font-medium ${
                          isRight ? 'text-[#4DC0B0]' : 'text-[#E6B35A]'
                        }`}
                      >
                        {isRight ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                        ) : (
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        )}
                        <span>
                          {isRight ? 'Correct: ' : 'Review: '}
                          {question.ex}
                        </span>
                      </div>
                    )}
                  </fieldset>
                );
              })}
            </div>

            <div className="no-print mt-5 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleGrade}
                className="rounded-lg bg-[#E6B35A] px-5 py-2.5 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#EEBF6D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
              >
                Check my answers
              </button>

              {graded && (
                <p className="text-sm font-medium text-[#CBD5E1]">
                  Score:{' '}
                  <span className="font-mono text-[#E6B35A]">
                    {score}/{lesson.quiz.length}
                  </span>
                  {score === lesson.quiz.length
                    ? ' — Excellent work.'
                    : ' — Review the explanations above and try again.'}
                </p>
              )}
            </div>

            {bonusMessage && (
              <p className="mt-3 text-sm font-semibold text-[#4DC0B0]">{bonusMessage}</p>
            )}
          </section>

          {/* Mission Readiness Strip & Completion */}
          <section className="no-print border-t border-[#243450] pt-6">
            <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#9CAEC4]">
              <span className="font-medium text-[#CBD5E1]">Study Checkpoints:</span>
              <span>
                Scriptures{' '}
                <strong className="font-mono text-[#E6B35A]">
                  {versesReadCount}/{lesson.verses.length}
                </strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Reflection{' '}
                <strong className="text-[#CBD5E1]">
                  {savedNote.trim().length > 0 ? 'Recorded' : 'Optional'}
                </strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Knowledge Check{' '}
                <strong
                  className={
                    quizBonusEarned ? 'text-[#4DC0B0]' : 'text-[#CBD5E1]'
                  }
                >
                  {quizBonusEarned ? 'Passed (+10 XP)' : 'Pending'}
                </strong>
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={handleComplete}
                disabled={isCompleted}
                className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
                  isCompleted
                    ? 'border border-[#4DC0B0]/40 bg-[#4DC0B0]/15 text-[#4DC0B0] cursor-default'
                    : 'border border-[#E6B35A]/60 bg-[#182640] text-[#F8FAFC] hover:bg-[#E6B35A] hover:text-[#0F172A]'
                }`}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>
                  {isCompleted ? 'Mission completed' : 'Mark mission complete (+50 XP)'}
                </span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={!hasPrev}
                  onClick={() => onNavigateLesson(lesson.id - 1)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2.5 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  disabled={!hasNext}
                  onClick={() => onNavigateLesson(lesson.id + 1)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#243450] bg-[#0D1627] px-3.5 py-2.5 text-xs font-medium text-[#CBD5E1] hover:border-[#E6B35A]/60 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {completionMessage && (
              <p className="mt-3 text-sm font-medium text-[#4DC0B0]">{completionMessage}</p>
            )}
          </section>
        </div>
      </div>
      <BookReaderModal
        isOpen={bookOpen}
        title={lesson.reading}
        page={lesson.pdfPage}
        onClose={() => setBookOpen(false)}
      />
    </article>
  );
}
