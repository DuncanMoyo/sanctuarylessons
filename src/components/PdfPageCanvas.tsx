import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { Download, Loader2 } from 'lucide-react';
import { SOURCE_BOOK_PDF } from '../data/lessons';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

let cachedPdfPromise: Promise<pdfjsLib.PDFDocumentProxy> | null = null;

function getPdfDocument(): Promise<pdfjsLib.PDFDocumentProxy> {
  if (!cachedPdfPromise) {
    cachedPdfPromise = pdfjsLib.getDocument({ url: SOURCE_BOOK_PDF }).promise;
  }
  return cachedPdfPromise;
}

interface PdfPageCanvasProps {
  page: number;
  scale?: number;
}

export function PdfPageCanvas({ page, scale = 1.25 }: PdfPageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let renderTask: pdfjsLib.RenderTask | null = null;

    async function renderPage() {
      setLoading(true);
      setError(null);
      try {
        const doc = await getPdfDocument();
        if (cancelled) return;
        const safePage = Math.max(1, Math.min(doc.numPages, page));
        const pdfPage = await doc.getPage(safePage);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const viewport = pdfPage.getViewport({ scale });
        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        renderTask = pdfPage.render({
          canvasContext: ctx,
          viewport,
          canvas,
        });
        await renderTask.promise;
        if (!cancelled) {
          setLoading(false);
        }
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof Error && err.name === 'RenderingCancelledException'
            ? null
            : 'Unable to render the PDF page on this device.';
        if (message) {
          setError(message);
          setLoading(false);
        }
      }
    }

    void renderPage();

    return () => {
      cancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [page, scale]);

  return (
    <div className="relative flex min-h-[480px] w-full flex-col items-center justify-start overflow-auto rounded-xl border border-[#243450] bg-[#080D17] p-4 sm:p-6">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#080D17]/80">
          <div className="flex items-center gap-2 text-xs font-medium text-[#CBD5E1]">
            <Loader2 className="h-4 w-4 animate-spin text-[#E6B35A]" />
            <span>Rendering original 1914 page {page}...</span>
          </div>
        </div>
      )}

      {error ? (
        <div className="my-auto max-w-md text-center">
          <p className="text-sm text-[#CBD5E1]">{error}</p>
          <a
            href={SOURCE_BOOK_PDF}
            download="The_Cross_and_Its_Shadow_S_N_Haskell_1914.pdf"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#E6B35A] px-4 py-2 text-xs font-semibold text-[#0F172A] hover:bg-[#EEBF6D]"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download 1914 PDF</span>
          </a>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          aria-label={`Original 1914 book page ${page}`}
          className="rounded shadow-xl bg-white max-w-full h-auto"
        />
      )}
    </div>
  );
}
