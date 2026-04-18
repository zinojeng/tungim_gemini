import Link from "next/link";

interface EditorialHeroProps {
  /** Issue number — e.g. "Vol. 02 · Iss. 04". Defaults to the 2026 issue. */
  issueLabel?: string;
  /** Optional DB-driven title override. Falls back to the editorial default. */
  title?: string | null;
  /** Optional DB-driven subtitle. */
  subtitle?: string | null;
  /** Total number of published lectures, shown in the meta strip. */
  lectureCount?: number;
}

/**
 * EditorialHero — first impression. Replaces the Nanobanana mascot.
 *
 * Layout: left column carries the issue number + serif headline + byline;
 * right column is a quiet meta-strip with today's date, the current issue,
 * and the design thesis. Hairline at the bottom, no CTA gradients.
 */
export function EditorialHero({
  issueLabel = "Vol. 02 · Iss. 04 · 2026 Spring",
  title,
  subtitle,
  lectureCount,
}: EditorialHeroProps) {
  // Single source of headline truth. We accept DB overrides but default to the
  // editorial thesis so /admin doesn't need to seed anything for a fresh clone.
  const headline = title || "臨床演講的\n安靜筆記。";
  const sub =
    subtitle ||
    "不做摘要、不做 highlight。把整場演講完整寫下來，讓你在任何時候都能慢慢讀回去。";

  const today = new Date();
  const issueDate =
    today.getFullYear() +
    " · " +
    String(today.getMonth() + 1).padStart(2, "0") +
    " · " +
    String(today.getDate()).padStart(2, "0");

  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.35fr_1fr] md:gap-16">
          {/* Left — headline */}
          <div>
            <p className="kicker text-ink-muted">§ I · {issueLabel}</p>
            <h1 className="mt-5 whitespace-pre-line font-serif text-[40px] leading-[1.06] tracking-tighter2 text-ink md:text-[64px]">
              {headline}
            </h1>
            <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-ink-muted md:text-[16px]">
              {sub}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px]">
              <Link
                href="/lectures"
                className="group inline-flex items-center gap-2 text-ink transition-colors hover:text-editorial"
              >
                <span className="border-b border-editorial pb-0.5">
                  瀏覽全部演講
                </span>
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/ada-2026"
                className="text-ink-muted transition-colors hover:text-ink"
              >
                ADA 2026 特刊
              </Link>
              <Link
                href="/about"
                className="text-ink-muted transition-colors hover:text-ink"
              >
                關於本刊
              </Link>
            </div>
          </div>

          {/* Right — meta strip */}
          <aside className="flex flex-col justify-between gap-6 border-l border-hair md:pl-10">
            <div>
              <p className="kicker text-ink-muted">本期主張 · Thesis</p>
              <p className="mt-3 font-serif text-[20px] italic leading-[1.35] tracking-tightish text-ink md:text-[22px]">
                「像《新英格蘭醫學雜誌》的數位版，但更安靜。」
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hair pt-6 text-[12px]">
              <div>
                <dt className="kicker text-ink-muted">出版日期</dt>
                <dd className="mt-1 font-mono text-[13px] text-ink">
                  {issueDate}
                </dd>
              </div>
              <div>
                <dt className="kicker text-ink-muted">本期篇數</dt>
                <dd className="mt-1 font-mono text-[13px] text-ink">
                  {typeof lectureCount === "number"
                    ? String(lectureCount).padStart(3, "0") + " 篇"
                    : "— 篇"}
                </dd>
              </div>
              <div>
                <dt className="kicker text-ink-muted">覆核者</dt>
                <dd className="mt-1 text-[13px] text-ink">鄭兆銘 醫師</dd>
              </div>
              <div>
                <dt className="kicker text-ink-muted">出版頻率</dt>
                <dd className="mt-1 text-[13px] text-ink">週刊 · 平日早報</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}
