import Link from "next/link";
import type { Lecture } from "@/types";

interface EditorialHeroProps {
  /** Optional DB-driven title override. Falls back to the editorial default. */
  title?: string | null;
  /** Optional DB-driven subtitle. */
  subtitle?: string | null;
  /** Most recently published lecture — shown as a compact CTA thumbnail. */
  latestLecture?: Lecture | null;
}

export function EditorialHero({
  title,
  subtitle,
  latestLecture,
}: EditorialHeroProps) {
  const headline = title || "臨床演講的\n安靜筆記。";
  const sub =
    subtitle ||
    "一場演講是短的，留下的思考是長的。這份筆記，寫給那個日後想慢慢讀回去的你 — 現場，只需要安靜地聽。";

  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr] md:gap-16">
          <div>
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

          {latestLecture ? (
            <LatestLectureThumb lecture={latestLecture} />
          ) : null}
        </div>
      </div>
    </section>
  );
}

function LatestLectureThumb({ lecture }: { lecture: Lecture }) {
  const cover = lecture.coverImage || null;
  const category = lecture.category || "MedNote";
  const titleSeed = (lecture.title || "—").slice(0, 2);

  return (
    <aside className="flex flex-col md:items-end">
      <Link
        href={`/lectures/${lecture.id}`}
        className="group block w-full max-w-[280px] md:w-[260px]"
        aria-label={`最新筆記：${lecture.title}`}
      >
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-hair bg-gradient-to-br from-chip via-paper to-editorial/12">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt=""
              className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-90"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="kicker text-ink-muted">{category}</span>
              <span className="font-serif text-[40px] leading-none tracking-tighter2 text-ink/90">
                {titleSeed}
              </span>
            </div>
          )}
        </div>
        <p className="kicker mt-4 text-ink-muted group-hover:text-editorial">
          最新筆記
        </p>
        <h2 className="mt-2 font-serif text-[18px] leading-[1.3] tracking-tighter2 text-ink transition-colors group-hover:text-editorial">
          {lecture.title}
        </h2>
      </Link>
    </aside>
  );
}
