"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Search, ArrowRight, CornerDownLeft } from "lucide-react";

/**
 * ⌘K Command Palette
 * ------------------
 * A single overlay registered at the root so every page can trigger it via:
 *
 *   1. Keyboard: ⌘K / Ctrl K
 *   2. Custom event: window.dispatchEvent(new Event('mednote:open-command-palette'))
 *      (Navbar uses this so the search button doesn't need to prop-drill)
 *   3. useCommandPalette().open() from any client component
 *
 * Intentionally kept dependency-free (no cmdk / kbar) — the editorial design
 * is minimal enough that ~200 lines of plain React covers it.
 */

type CommandKind = "navigate" | "external";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  /** kicker — left-column label, always mono uppercase. */
  section: string;
  kind: CommandKind;
  href: string;
  /** Extra keywords (English synonyms, drug names) for fuzzy matching. */
  keywords?: string[];
}

// Static baseline index. Page-level code can extend this via the
// CommandPaletteProvider's `registerDynamicItems()` API (used by the home page
// and lecture pages to feed real DB rows into the palette).
const STATIC_COMMANDS: CommandItem[] = [
  {
    id: "nav:home",
    title: "首頁",
    subtitle: "本期封面、學科索引、最新篇目",
    section: "導覽",
    kind: "navigate",
    href: "/",
    keywords: ["home", "cover", "issue"],
  },
  {
    id: "nav:lectures",
    title: "所有演講",
    subtitle: "完整演講索引與分類篩選",
    section: "導覽",
    kind: "navigate",
    href: "/lectures",
    keywords: ["lectures", "all"],
  },
  {
    id: "nav:ada-2026",
    title: "ADA 2026 特刊",
    subtitle: "Scientific Sessions · New Orleans · June 5–8",
    section: "專題",
    kind: "navigate",
    href: "/ada-2026",
    keywords: ["ada", "2026", "scientific", "sessions"],
  },
  {
    id: "nav:diabetes-ai",
    title: "糖尿病 AI",
    subtitle: "臨床決策支援 · CGM · 影像判讀",
    section: "專題",
    kind: "navigate",
    href: "/diabetes-ai",
    keywords: ["diabetes", "ai", "cgm"],
  },
  {
    id: "nav:aoce-2026",
    title: "AOCE 2026",
    subtitle: "Asia-Oceania Congress of Endocrinology",
    section: "專題",
    kind: "navigate",
    href: "/aoce-2026",
    keywords: ["aoce", "2026", "endocrine"],
  },
  {
    id: "nav:about",
    title: "關於 MedNote",
    subtitle: "編輯主張 · 覆核流程",
    section: "導覽",
    kind: "navigate",
    href: "/about",
    keywords: ["about"],
  },
  {
    id: "cat:diabetes",
    title: "糖尿病 · Diabetes",
    section: "學科",
    kind: "navigate",
    href: "/lectures?category=diabetes",
  },
  {
    id: "cat:ckm",
    title: "心腎代謝 · CKM",
    section: "學科",
    kind: "navigate",
    href: "/lectures?category=ckm",
    keywords: ["cardio", "renal", "metabolic", "hfpef", "ckd"],
  },
  {
    id: "cat:endocrine",
    title: "內分泌 · Endocrine",
    section: "學科",
    kind: "navigate",
    href: "/lectures?category=endocrine",
  },
  {
    id: "cat:obesity",
    title: "肥胖醫學 · Obesity",
    section: "學科",
    kind: "navigate",
    href: "/lectures?category=obesity",
    keywords: ["tirzepatide", "retatrutide", "glp-1"],
  },
];

interface CommandPaletteContextValue {
  open: () => void;
  close: () => void;
  toggle: () => void;
  /** Page-level code can push DB rows into the palette index. */
  registerDynamicItems: (items: CommandItem[]) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(
  null
);

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  return (
    ctx || {
      open: () => {},
      close: () => {},
      toggle: () => {},
      registerDynamicItems: () => {},
    }
  );
}

// --- fuzzy match: substring-first, then char-in-order fallback -----------
function matchesQuery(q: string, item: CommandItem): boolean {
  if (!q) return true;
  const needle = q.toLowerCase().trim();
  const haystack = [
    item.title,
    item.subtitle || "",
    item.section,
    ...(item.keywords || []),
  ]
    .join(" ")
    .toLowerCase();

  if (haystack.includes(needle)) return true;

  // char-in-order fallback
  let i = 0;
  for (const ch of haystack) {
    if (ch === needle[i]) i++;
    if (i === needle.length) return true;
  }
  return false;
}

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [dynamicItems, setDynamicItems] = useState<CommandItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);
  const registerDynamicItems = useCallback(
    (items: CommandItem[]) => setDynamicItems(items),
    []
  );

  // ⌘K / Ctrl K global shortcut
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isCmdK =
        (e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K");
      if (isCmdK) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  // Custom event bridge — Navbar's search button dispatches this so it
  // doesn't need to import the context directly (avoids coupling).
  useEffect(() => {
    const onCustom = () => open();
    window.addEventListener("mednote:open-command-palette", onCustom);
    return () =>
      window.removeEventListener("mednote:open-command-palette", onCustom);
  }, [open]);

  // Body scroll lock + focus input on open
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [isOpen]);

  // Reset query & cursor when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setCursor(0);
    }
  }, [isOpen]);

  const allCommands = useMemo(
    () => [...dynamicItems, ...STATIC_COMMANDS],
    [dynamicItems]
  );

  const filtered = useMemo(
    () => allCommands.filter((c) => matchesQuery(query, c)),
    [allCommands, query]
  );

  // Group by section — preserves order of first appearance.
  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    filtered.forEach((item) => {
      const bucket = map.get(item.section) ?? [];
      bucket.push(item);
      map.set(item.section, bucket);
    });
    return Array.from(map.entries());
  }, [filtered]);

  // Clamp cursor when filter changes
  useEffect(() => {
    if (cursor >= filtered.length) setCursor(Math.max(0, filtered.length - 1));
  }, [filtered.length, cursor]);

  const runItem = useCallback(
    (item: CommandItem) => {
      close();
      if (item.kind === "external") {
        window.open(item.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.href);
      }
    },
    [close, router]
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[cursor];
      if (item) runItem(item);
    }
  };

  const value = useMemo(
    () => ({ open, close, toggle, registerDynamicItems }),
    [open, close, toggle, registerDynamicItems]
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[10vh]"
          role="dialog"
          aria-modal="true"
          aria-label="搜尋與命令面板"
          onKeyDown={onKeyDown}
        >
          {/* Backdrop */}
          <button
            type="button"
            onClick={close}
            aria-label="關閉搜尋"
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
          />

          {/* Panel */}
          <div
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-sm border border-hair bg-paper shadow-[0_24px_64px_-24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-hair px-4 py-3">
              <Search className="h-4 w-4 text-ink-muted" strokeWidth={1.5} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                placeholder="搜尋演講、學科、專題… (⌘K)"
                className="flex-1 bg-transparent text-[14px] text-ink placeholder:text-ink-muted focus:outline-none"
              />
              <kbd className="rounded-sm border border-hair px-1.5 py-0.5 font-mono text-[10px] text-ink-muted">
                Esc
              </kbd>
            </div>

            <div className="max-h-[55vh] overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="px-4 py-10 text-center text-[13px] text-ink-muted">
                  <p className="font-serif text-[18px] tracking-tighter2 text-ink">
                    沒有匹配的結果。
                  </p>
                  <p className="mt-2">試試看「ADA」、「糖尿病」、「GLP-1」。</p>
                </div>
              ) : (
                grouped.map(([section, items]) => (
                  <div key={section} className="px-1 py-2">
                    <p className="kicker px-4 py-2 text-ink-muted">
                      {section}
                    </p>
                    <ul>
                      {items.map((item) => {
                        const active =
                          filtered.indexOf(item) === cursor;
                        const content = (
                          <div
                            className={
                              "flex items-center justify-between gap-3 px-4 py-2.5 transition-colors " +
                              (active
                                ? "bg-chip text-ink"
                                : "text-ink hover:bg-chip")
                            }
                            onMouseEnter={() =>
                              setCursor(filtered.indexOf(item))
                            }
                          >
                            <div className="min-w-0">
                              <p className="truncate text-[13.5px]">
                                {item.title}
                              </p>
                              {item.subtitle && (
                                <p className="truncate text-[11.5px] text-ink-muted">
                                  {item.subtitle}
                                </p>
                              )}
                            </div>
                            <span className="flex shrink-0 items-center gap-1 text-ink-muted">
                              {active ? (
                                <>
                                  <span className="font-mono text-[10px]">
                                    Enter
                                  </span>
                                  <CornerDownLeft
                                    className="h-3.5 w-3.5"
                                    strokeWidth={1.5}
                                  />
                                </>
                              ) : (
                                <ArrowRight
                                  className="h-3.5 w-3.5"
                                  strokeWidth={1.5}
                                />
                              )}
                            </span>
                          </div>
                        );

                        return (
                          <li key={item.id}>
                            {item.kind === "external" ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => close()}
                                className="block focus:outline-none"
                              >
                                {content}
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() => close()}
                                className="block focus:outline-none"
                              >
                                {content}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-hair bg-chip px-4 py-2 text-[11px] text-ink-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded-sm border border-hair px-1.5 py-0.5 font-mono text-[10px]">
                    ↑
                  </kbd>
                  <kbd className="rounded-sm border border-hair px-1.5 py-0.5 font-mono text-[10px]">
                    ↓
                  </kbd>
                  選擇
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded-sm border border-hair px-1.5 py-0.5 font-mono text-[10px]">
                    Enter
                  </kbd>
                  開啟
                </span>
              </div>
              <span className="kicker">MedNote · ⌘K</span>
            </div>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}

/**
 * Client helper used by server-page wrappers to feed published lectures
 * into the palette without the server component needing to import React state.
 */
export function CommandPaletteLectureRegistrar({
  items,
}: {
  items: CommandItem[];
}) {
  const { registerDynamicItems } = useCommandPalette();
  useEffect(() => {
    registerDynamicItems(items);
  }, [items, registerDynamicItems]);
  return null;
}

// Named export of the CommandItem type so callers can build their own lists.
export type { CommandItem };
