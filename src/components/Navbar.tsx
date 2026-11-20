import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type AppView = 'home' | 'missions' | 'blueprint' | 'book' | 'journal' | 'about' | 'lesson';

interface NavbarProps {
  activeView: AppView;
  onNavigate: (view: AppView) => void;
  onContinueStudy: () => void;
  hasStarted: boolean;
}

const NAV_ITEMS: { id: Exclude<AppView, 'lesson'>; label: string }[] = [
  { id: 'home', label: 'Home' },
  { id: 'missions', label: 'Missions' },
  { id: 'blueprint', label: 'Blueprint' },
  { id: 'book', label: 'Book' },
  { id: 'journal', label: 'Journal' },
  { id: 'about', label: 'About' },
];

export function Navbar({
  activeView,
  onNavigate,
  onContinueStudy,
  hasStarted,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (view: Exclude<AppView, 'lesson'>) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <header className="no-print sticky top-0 z-30 border-b border-[#243450] bg-[#090F1A]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-8 px-5 py-4 sm:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="font-display text-2xl font-semibold tracking-tight text-[#E6B35A] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6B35A] rounded"
        >
          Sanctuary Quest
        </button>

        {/* Zone 2: 5 concise single-line text links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive =
              activeView === item.id ||
              (item.id === 'missions' && activeView === 'lesson');
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative py-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E6B35A] rounded ${
                  isActive
                    ? 'text-[#F8FAFC]'
                    : 'text-[#9CAEC4] hover:text-[#F8FAFC]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[17px] h-[2px] bg-[#E6B35A]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onContinueStudy();
            }}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#E6B35A] px-4 py-2 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-[#EEBF6D] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E6B35A]"
          >
            {hasStarted ? 'Continue Study' : 'Start Journey'}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-lg border border-[#243450] bg-[#111A2B] p-2.5 text-[#F1F5F9] hover:border-[#E6B35A]/60"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Compact Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[#243450] bg-[#0E1626] px-5 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeView === item.id ||
                (item.id === 'missions' && activeView === 'lesson');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-[#17233A] text-[#E6B35A]'
                      : 'text-[#CBD5E1] hover:bg-[#141F33] hover:text-[#F8FAFC]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-mono">Active</span>}
                </button>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onContinueStudy();
              }}
              className="mt-2 w-full rounded-lg bg-[#E6B35A] px-4 py-2.5 text-sm font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
            >
              {hasStarted ? 'Continue Study' : 'Start Journey'}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
