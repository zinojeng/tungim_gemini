import Link from "next/link";
import type { Lecture } from "@/types";

interface EditorialHeroProps {
  /** Optional DB-driven title override. Falls back to the editorial default. */
  title?: string | null;
  /** Optional DB-driven subtitle. */
  subtitle?: string | null;
  /** Up to 3 most recent lectures, shown as a compact list on the right. */
  recentLectures?: Lecture[];
}

function formatIssueDate(d?: string | Date | null): string {
  if (!d) return "—";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "—";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y} · ${m} · ${day}`;
}

export function EditorialHero({
  title,
  subtitle,
  recentLectures,
}: EditorialHeroProps) {
  const headline = title || "臨床演講的\n安靜筆記。";
  const sub =
    subtitle ||
    "一場演講是短的，留下的思考是長的。這份筆記，寫給那個日後想慢慢讀回去的你 — 現場，只需要安靜地聽。";

  const list = (recentLectures ?? []).slice(0, 3);

  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr] md:gap-16">
          <div>
            <h1 className="max-w-[18ch] whitespace-pre-line font-serif text-[40px] leading-[1.06] tracking-tighter2 text-ink md:text-[64px]">
              {headline}
            </h1>
            <p className="mt-6 max-w-[56ch] text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
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

          {list.length > 0 ? <RecentLecturesList lectures={list} /> : null}
        </div>
      </div>
    </section>
  );
}

function RecentLecturesList({ lectures }: { lectures: Lecture[] }) {
  return (
    <aside className="md:border-l md:border-hair md:pl-8">
      <p className="kicker text-ink-muted">最新筆記</p>
      <ul className="mt-4 divide-y divide-hair border-y border-hair">
        {lectures.map((l) => (
          <li key={l.id}>
            <Link
              href={`/lectures/${l.id}`}
              className="group flex flex-col gap-1 py-3 transition-colors"
            >
              <span className="flex items-center gap-3 text-[11px] text-ink-muted">
                <span className="font-mono tracking-tight">
                  {formatIssueDate(l.publishDate)}
                </span>
                {l.category ? (
                  <span className="kicker">{l.category}</span>
                ) : null}
              </span>
              <span className="font-serif text-[15px] leading-snug tracking-tighter2 text-ink transition-colors group-hover:text-editorial">
                {l.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
