import { useState } from 'react';
import { Shield } from 'lucide-react';
import { HIGH_PRIEST_GARMENTS, HighPriestGarment } from '../data/lessons';

export function HighPriestExplorer() {
  const [selectedId, setSelectedId] = useState<string>(
    HIGH_PRIEST_GARMENTS[3].id
  );

  const selected: HighPriestGarment =
    HIGH_PRIEST_GARMENTS.find((g) => g.id === selectedId) ??
    HIGH_PRIEST_GARMENTS[0];

  return (
    <div className="rounded-2xl border border-[#243450] bg-[#0C1423] p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#243450] pb-3.5">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-[#CBD5E1]">
          <Shield className="h-4 w-4 text-[#E6B35A]" />
          <span>Garments of the High Priest (Chapter 12 · Exodus 28)</span>
        </span>
        <span className="font-mono text-xs text-[#9CAEC4]">
          5 Sacred Vestments
        </span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {HIGH_PRIEST_GARMENTS.map((item) => {
          const active = item.id === selected.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(item.id)}
              className={`rounded-lg border px-3 py-2 text-xs font-semibold transition-colors ${
                active
                  ? 'border-[#E6B35A] bg-[#E6B35A] text-[#0F172A]'
                  : 'border-[#243450] bg-[#111A2B] text-[#CBD5E1] hover:border-[#3A5075]'
              }`}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="font-mono text-xs text-[#E6B35A]">{selected.scripture}</p>
          <h3 className="mt-1 font-display text-2xl font-semibold text-[#F8FAFC]">
            {selected.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">
            {selected.description}
          </p>
        </div>
        <div className="md:col-span-6 rounded-xl border border-[#243450] bg-[#111A2B] p-4">
          <p className="text-xs font-semibold text-[#4DC0B0]">
            Typology in Christ (S. N. Haskell)
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-[#E2E8F0]">
            {selected.christMeaning}
          </p>
        </div>
      </div>
    </div>
  );
}
