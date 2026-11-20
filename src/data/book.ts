import rawBookPages from './bookContent.json';

export interface BookPageData {
  page: number;
  paragraphs: string[];
  footnotes: string[];
}

export interface BookChapterEntry {
  id: string;
  section: string;
  title: string;
  startPage: number;
  endPage: number;
  relatedMissionId?: number;
}

export const BOOK_PAGES: BookPageData[] = rawBookPages as BookPageData[];
export const TOTAL_BOOK_PAGES = BOOK_PAGES.length;

export const BOOK_CHAPTERS: BookChapterEntry[] = [
  { id: 'cover', section: 'Front Matter', title: 'Title Page', startPage: 1, endPage: 1 },
  { id: 'preface', section: 'Front Matter', title: 'Author’s Preface', startPage: 2, endPage: 2, relatedMissionId: 0 },
  { id: 'intro', section: 'Front Matter', title: 'Introduction', startPage: 3, endPage: 4, relatedMissionId: 0 },

  { id: 'sec-1', section: 'Section 1 · The Sanctuary', title: 'Section 1 Poem — The Heavenly Sanctuary', startPage: 5, endPage: 5, relatedMissionId: 0 },
  { id: 'ch-1', section: 'Section 1 · The Sanctuary', title: 'Chapter 1 — Light in the Darkness', startPage: 6, endPage: 9, relatedMissionId: 0 },
  { id: 'ch-2', section: 'Section 1 · The Sanctuary', title: 'Chapter 2 — The Tabernacle', startPage: 10, endPage: 11, relatedMissionId: 1 },
  { id: 'ch-3', section: 'Section 1 · The Sanctuary', title: 'Chapter 3 — History of the Sanctuary', startPage: 12, endPage: 15, relatedMissionId: 1 },

  { id: 'sec-2', section: 'Section 2 · Furniture of the Sanctuary', title: 'Section 2 Poem — The Cross and the Crown', startPage: 16, endPage: 16, relatedMissionId: 6 },
  { id: 'ch-4', section: 'Section 2 · Furniture of the Sanctuary', title: 'Chapter 4 — The Ark', startPage: 17, endPage: 19, relatedMissionId: 6 },
  { id: 'ch-5', section: 'Section 2 · Furniture of the Sanctuary', title: 'Chapter 5 — The Golden Candlestick', startPage: 20, endPage: 22, relatedMissionId: 5 },
  { id: 'ch-6', section: 'Section 2 · Furniture of the Sanctuary', title: 'Chapter 6 — The Table of Showbread', startPage: 23, endPage: 24, relatedMissionId: 5 },
  { id: 'ch-7', section: 'Section 2 · Furniture of the Sanctuary', title: 'Chapter 7 — Altar of Incense and Its Service', startPage: 25, endPage: 27, relatedMissionId: 5 },

  { id: 'sec-3', section: 'Section 3 · The Priesthood', title: 'Section 3 Opening — The Priesthood', startPage: 28, endPage: 28, relatedMissionId: 7 },
  { id: 'ch-8', section: 'Section 3 · The Priesthood', title: 'Chapter 8 — Christ Our High Priest', startPage: 29, endPage: 30, relatedMissionId: 7 },
  { id: 'ch-9', section: 'Section 3 · The Priesthood', title: 'Chapter 9 — Office and Work of the High Priest', startPage: 31, endPage: 32, relatedMissionId: 7 },
  { id: 'ch-10', section: 'Section 3 · The Priesthood', title: 'Chapter 10 — The Priests', startPage: 33, endPage: 34, relatedMissionId: 7 },
  { id: 'ch-11', section: 'Section 3 · The Priesthood', title: 'Chapter 11 — The Levites', startPage: 35, endPage: 36, relatedMissionId: 7 },
  { id: 'ch-12', section: 'Section 3 · The Priesthood', title: 'Chapter 12 — Garments of the Priests', startPage: 37, endPage: 38, relatedMissionId: 7 },

  { id: 'sec-4', section: 'Section 4 · Springtime Annual Feasts', title: 'Section 4 Opening — Springtime Feasts', startPage: 39, endPage: 39, relatedMissionId: 9 },
  { id: 'ch-13', section: 'Section 4 · Springtime Annual Feasts', title: 'Chapter 13 — The Passover', startPage: 40, endPage: 43, relatedMissionId: 9 },
  { id: 'ch-14', section: 'Section 4 · Springtime Annual Feasts', title: 'Chapter 14 — The Feast of Unleavened Bread', startPage: 44, endPage: 45, relatedMissionId: 9 },
  { id: 'ch-15', section: 'Section 4 · Springtime Annual Feasts', title: 'Chapter 15 — The Offering of the First-Fruits', startPage: 46, endPage: 48, relatedMissionId: 9 },
  { id: 'ch-16', section: 'Section 4 · Springtime Annual Feasts', title: 'Chapter 16 — Pentecost', startPage: 49, endPage: 51, relatedMissionId: 9 },

  { id: 'sec-5', section: 'Section 5 · Various Offerings', title: 'Section 5 Opening — Various Offerings', startPage: 52, endPage: 52, relatedMissionId: 3 },
  { id: 'ch-17', section: 'Section 5 · Various Offerings', title: 'Chapter 17 — The Sin-Offering', startPage: 53, endPage: 56, relatedMissionId: 3 },
  { id: 'ch-18', section: 'Section 5 · Various Offerings', title: 'Chapter 18 — The Burnt-Offering', startPage: 57, endPage: 58, relatedMissionId: 3 },
  { id: 'ch-19', section: 'Section 5 · Various Offerings', title: 'Chapter 19 — The Drink-Offering', startPage: 59, endPage: 60, relatedMissionId: 3 },
  { id: 'ch-20', section: 'Section 5 · Various Offerings', title: 'Chapter 20 — The Meat-Offering', startPage: 61, endPage: 62, relatedMissionId: 3 },
  { id: 'ch-21', section: 'Section 5 · Various Offerings', title: 'Chapter 21 — The Trespass-Offering', startPage: 63, endPage: 64, relatedMissionId: 3 },
  { id: 'ch-22', section: 'Section 5 · Various Offerings', title: 'Chapter 22 — The Offering of the Red Heifer', startPage: 65, endPage: 67, relatedMissionId: 3 },
  { id: 'ch-23', section: 'Section 5 · Various Offerings', title: 'Chapter 23 — The Peace-Offering', startPage: 68, endPage: 71, relatedMissionId: 3 },
  { id: 'ch-24', section: 'Section 5 · Various Offerings', title: 'Chapter 24 — The Cleansing of the Leper', startPage: 72, endPage: 75, relatedMissionId: 4 },

  { id: 'sec-6', section: 'Section 6 · Services of the Sanctuary', title: 'Section 6 Poem — Before the Throne', startPage: 76, endPage: 76, relatedMissionId: 8 },
  { id: 'ch-25', section: 'Section 6 · Services of the Sanctuary', title: 'Chapter 25 — The Court and Its Services', startPage: 77, endPage: 79, relatedMissionId: 2 },
  { id: 'ch-26', section: 'Section 6 · Services of the Sanctuary', title: 'Chapter 26 — Work in the First Apartment', startPage: 80, endPage: 81, relatedMissionId: 8 },
  { id: 'ch-27', section: 'Section 6 · Services of the Sanctuary', title: 'Chapter 27 — A Wonderful Prophecy', startPage: 82, endPage: 85, relatedMissionId: 11 },

  { id: 'sec-7', section: 'Section 7 · Autumnal Annual Feasts', title: 'Section 7 Opening — Autumnal Feasts', startPage: 86, endPage: 86, relatedMissionId: 9 },
  { id: 'ch-28', section: 'Section 7 · Autumnal Annual Feasts', title: 'Chapter 28 — The Feast of Trumpets', startPage: 87, endPage: 89, relatedMissionId: 9 },
  { id: 'ch-29', section: 'Section 7 · Autumnal Annual Feasts', title: 'Chapter 29 — The Day of Atonement', startPage: 90, endPage: 94, relatedMissionId: 10 },
  { id: 'ch-30', section: 'Section 7 · Autumnal Annual Feasts', title: 'Chapter 30 — Duty of the Congregation', startPage: 95, endPage: 98, relatedMissionId: 10 },
  { id: 'ch-31', section: 'Section 7 · Autumnal Annual Feasts', title: 'Chapter 31 — The Nature of the Judgment', startPage: 99, endPage: 102, relatedMissionId: 12 },
  { id: 'ch-32', section: 'Section 7 · Autumnal Annual Feasts', title: 'Chapter 32 — The Feast of Tabernacles', startPage: 103, endPage: 105, relatedMissionId: 12 },

  { id: 'sec-8', section: 'Section 8 · Levitical Laws & Ceremonies', title: 'Section 8 Opening — Levitical Laws', startPage: 106, endPage: 106, relatedMissionId: 12 },
  { id: 'ch-33', section: 'Section 8 · Levitical Laws & Ceremonies', title: 'Chapter 33 — The Jubilee', startPage: 107, endPage: 111, relatedMissionId: 12 },
  { id: 'ch-34', section: 'Section 8 · Levitical Laws & Ceremonies', title: 'Chapter 34 — Cities of Refuge', startPage: 112, endPage: 114, relatedMissionId: 12 },
  { id: 'ch-35', section: 'Section 8 · Levitical Laws & Ceremonies', title: 'Chapter 35 — The Rock', startPage: 115, endPage: 117 },
  { id: 'ch-36', section: 'Section 8 · Levitical Laws & Ceremonies', title: 'Chapter 36 — Various Levitical Laws & Ceremonies', startPage: 118, endPage: 121 },

  { id: 'sec-9', section: 'Section 9 · The Tribes of Israel', title: 'Section 9 Opening — The Tribes of Israel', startPage: 122, endPage: 122 },
  { id: 'ch-37', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 37 — Reuben', startPage: 123, endPage: 125 },
  { id: 'ch-38', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 38 — Simeon', startPage: 126, endPage: 128 },
  { id: 'ch-39', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 39 — Levi', startPage: 129, endPage: 131 },
  { id: 'ch-40', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 40 — Judah', startPage: 132, endPage: 134 },
  { id: 'ch-41', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 41 — Naphtali', startPage: 135, endPage: 136 },
  { id: 'ch-42', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 42 — Gad', startPage: 137, endPage: 139 },
  { id: 'ch-43', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 43 — Asher', startPage: 140, endPage: 142 },
  { id: 'ch-44', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 44 — Issachar', startPage: 143, endPage: 144 },
  { id: 'ch-45', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 45 — Zebulun', startPage: 145, endPage: 146 },
  { id: 'ch-46', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 46 — Joseph', startPage: 147, endPage: 149 },
  { id: 'ch-47', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 47 — Benjamin', startPage: 150, endPage: 152 },
  { id: 'ch-48', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 48 — Manasseh', startPage: 153, endPage: 154 },
  { id: 'ch-49', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 49 — The One Hundred & Forty-Four Thousand', startPage: 155, endPage: 159 },
  { id: 'ch-50', section: 'Section 9 · The Tribes of Israel', title: 'Chapter 50 — The Lost Tribes', startPage: 160, endPage: 163 },

  { id: 'exhibits', section: 'Diagrams & Exhibits', title: 'Sanctuary & Encampment Diagrams', startPage: 164, endPage: 166 },
];

export function getChapterForPage(page: number): BookChapterEntry {
  const safePage = Math.max(1, Math.min(TOTAL_BOOK_PAGES, page));
  return (
    BOOK_CHAPTERS.find((ch) => safePage >= ch.startPage && safePage <= ch.endPage) ??
    BOOK_CHAPTERS[0]
  );
}

export function getBookPage(page: number): BookPageData {
  const safePage = Math.max(1, Math.min(TOTAL_BOOK_PAGES, page));
  return BOOK_PAGES[safePage - 1] ?? BOOK_PAGES[0];
}

export interface BookSearchMatch {
  page: number;
  chapter: BookChapterEntry;
  snippet: string;
}

export function searchBookPages(query: string, limit = 30): BookSearchMatch[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matches: BookSearchMatch[] = [];
  for (const pageData of BOOK_PAGES) {
    const joined = pageData.paragraphs.join(' ');
    const idx = joined.toLowerCase().indexOf(q);
    if (idx !== -1) {
      const start = Math.max(0, idx - 55);
      const end = Math.min(joined.length, idx + q.length + 95);
      const prefix = start > 0 ? '…' : '';
      const suffix = end < joined.length ? '…' : '';
      matches.push({
        page: pageData.page,
        chapter: getChapterForPage(pageData.page),
        snippet: `${prefix}${joined.slice(start, end)}${suffix}`,
      });
      if (matches.length >= limit) break;
    }
  }
  return matches;
}
