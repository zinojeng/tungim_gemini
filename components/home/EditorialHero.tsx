import Link from "next/link";

interface EditorialHeroProps {
  /** Optional DB-driven title override. Falls back to the editorial default. */
  title?: string | null;
  /** Optional DB-driven subtitle. */
  subtitle?: string | null;
}

export function EditorialHero({ title, subtitle }: EditorialHeroProps) {
  const headline = title || "臨床演講的\n安靜筆記。";
  const sub =
    subtitle ||
    "不做摘要、不做 highlight。把整場演講完整寫下來，讓你在任何時候都能慢慢讀回去。";

  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <h1 className="max-w-[18ch] whitespace-pre-line font-serif text-[40px] leading-[1.06] tracking-tighter2 text-ink md:text-[64px]">
          {headline}
        </h1>
        <p className="mt-6 max-w-[60ch] text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
          {sub}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
          <Link
            href="/lectures"
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-editorial"
          >
            <span className="border-b border-editorial pb-0.5">瀏覽全部演講</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/ada-2026"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            ADA 2026 精選
          </Link>
          <Link
            href="/about"
            className="text-ink-muted transition-colors hover:text-ink"
          >
            關於 MedNote
          </Link>
        </div>
      </div>
    </section>
  );
}
