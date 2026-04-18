"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface NavItem {
  href: string;
  label: string;
}

// Mirror of the prototype's editorial menu — Disciplines / Collections / About,
// but with the existing app routes wired in so deep links keep working.
const NAV_ITEMS: NavItem[] = [
  { href: "/lectures", label: "演講" },
  { href: "/ada-2026", label: "ADA 2026" },
  { href: "/diabetes-ai", label: "糖尿病 AI" },
  { href: "/aoce-2026", label: "AOCE 2026" },
  { href: "/about", label: "關於" },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [shortcutLabel, setShortcutLabel] = useState("⌘K");

  // Show ⌘K on mac, Ctrl K elsewhere. Done in effect to avoid SSR mismatch.
  useEffect(() => {
    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPhone|iPad/.test(navigator.platform);
    // One-shot platform detection on mount — intentionally syncs UI
    // state with a browser-only API. Not a cascading-render case.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShortcutLabel(isMac ? "⌘K" : "Ctrl K");
  }, []);

  // ⌘K opens the global command palette (registered by CommandPaletteProvider
  // in a later commit). Falls back to /lectures if no listener is mounted.
  const openCommandPalette = () => {
    const evt = new CustomEvent("mednote:open-command-palette");
    const dispatched = window.dispatchEvent(evt);
    if (!dispatched) router.push("/lectures");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-hair bg-paper/85 backdrop-blur supports-[backdrop-filter]:bg-paper/70">
      {/* Top utility strip — kicker, matches the editorial prototype. */}
      <div className="border-b border-hair">
        <div className="mx-auto flex h-7 max-w-[1240px] items-center justify-between px-6 md:px-10">
          <span className="kicker text-ink-muted">
            MedNote · Vol. 02 · 2026
          </span>
          <span className="kicker hidden text-ink-muted sm:inline">
            AI 起稿 · 醫師覆核
          </span>
        </div>
      </div>

      {/* Main row — brand left, nav center, utility right. */}
      <div className="mx-auto flex h-14 max-w-[1240px] items-center justify-between gap-6 px-6 md:px-10">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-xl tracking-tighter2 text-ink">
            MedNote
          </span>
          <span className="kicker text-ink-muted group-hover:text-editorial">
            AI · est. 2025
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "text-[13px] tracking-tightish transition-colors " +
                  (active
                    ? "text-ink underline underline-offset-[6px] decoration-editorial decoration-2"
                    : "text-ink-muted hover:text-ink")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="開啟搜尋與命令面板"
            className="hidden h-8 items-center gap-2 rounded-sm border border-hair px-2.5 text-[12px] text-ink-muted transition-colors hover:border-ink/30 hover:text-ink sm:inline-flex"
          >
            <Search className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>搜尋</span>
            <span className="ml-2 rounded-sm border border-hair px-1.5 py-0.5 font-mono text-[10px] tracking-wider text-ink-muted">
              {shortcutLabel}
            </span>
          </button>

          {/* Mobile: search-only icon button */}
          <button
            type="button"
            onClick={openCommandPalette}
            aria-label="開啟搜尋"
            className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-hair text-ink-muted transition-colors hover:text-ink hover:border-ink/30 sm:hidden"
          >
            <Search className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
