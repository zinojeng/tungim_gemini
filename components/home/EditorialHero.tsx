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
    "一場演講是短的，留下的思考是長的。這份筆記，寫給那個日後想慢慢讀回去的你 — 現場，只需要安靜地聽。";

  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-24">
        <h1 className="max-w-[18ch] whitespace-pre-line font-serif text-[40px] leading-[1.06] tracking-tighter2 text-ink md:text-[72px]">
          {headline}
        </h1>
        <p className="mt-8 max-w-[56ch] font-serif text-[18px] italic leading-[1.55] text-ink-muted md:text-[22px]">
          {sub}
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
          <Link
            href="/lectures"
            className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-editorial"
          >
            <span className="border-b border-editorial pb-0.5">
              瀏覽全部演講
            </span>
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5"
            >
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
