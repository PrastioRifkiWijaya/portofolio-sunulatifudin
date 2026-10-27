
"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, X } from "lucide-react";

const GUIDEBOOK_URL =
  "https://drive.google.com/file/d/18Tatql09r3HJgvIAw6kChByOCopZv8s3/view?usp=drive_link";

const STORAGE_KEY = "ppkn_guidebook_banner_dismissed";
const CHANGE_EVENT = "ppkn-guidebook-change";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => { };

  window.addEventListener(CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
  };
}

function getSnapshot() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot() {
  return false;
}

function updateDismissed(value: boolean) {
  try {
    if (value) {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage may be unavailable.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export default function GuidebookBanner() {
  const pathname = usePathname();

  const dismissed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  if (pathname === "/") return null;

  return (
    <aside
      aria-label="Buku panduan pembelajaran PPKn"
      className="mx-auto w-full max-w-7xl px-5 pt-5 sm:px-8"
    >
      {!dismissed ? (
        <div className="border-y border-slate-200 py-5 dark:border-slate-800">
          <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="flex items-start gap-4">
              <BookOpen
                size={20}
                strokeWidth={1.5}
                className="mt-1 shrink-0 text-slate-500 dark:text-slate-400"
                aria-hidden="true"
              />

              <div className="max-w-2xl">
                <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Sumber Daya Pembelajaran
                </p>

                <h2 className="font-title text-base font-semibold leading-6 text-slate-900 dark:text-slate-100 sm:text-lg">
                  Buku Panduan Media Pembelajaran PPKn
                </h2>

                <p className="mt-1.5 font-desc text-sm leading-6 text-slate-600 dark:text-slate-400">
                  Referensi penggunaan modul, media pembelajaran,
                  dan kuis interaktif.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-slate-200 pt-4 md:justify-end md:border-0 md:pt-0 dark:border-slate-800">
              <a
                href={GUIDEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 flex-1 items-center justify-center gap-2 border-b border-slate-900 py-2 font-desc text-sm font-semibold text-slate-900 transition-colors hover:border-slate-500 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 sm:flex-none dark:border-slate-200 dark:text-slate-100 dark:hover:text-slate-300"
              >
                Buka panduan
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => updateDismissed(true)}
                aria-label="Tutup pemberitahuan"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:hover:bg-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X size={17} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => updateDismissed(false)}
            className="inline-flex items-center gap-2 border-b border-slate-200 py-2 text-xs font-medium text-slate-500 transition-colors hover:border-slate-500 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-300 cursor-pointer"
          >
            <BookOpen size={14} aria-hidden="true" />
            Tampilkan buku panduan
          </button>
        </div>
      )}
    </aside>
  );
}
