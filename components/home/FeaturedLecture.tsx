import Link from "next/link";
import { Lecture } from "@/types";

interface FeaturedLectureProps {
  lecture?: Lecture | null;
}

function formatIssueDate(d?: string | Date | null): string {
  if (!d) return "尚未署日期";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "尚未署日期";
  return (
    date.getFullYear() +
    " · " +
    String(date.getMonth() + 1).padStart(2, "0") +
    " · " +
    String(date.getDate()).padStart(2, "0")
  );
}

/**
 * FeaturedLecture — "the Banting Lecture slot".
 *
 * Big left asymmetric headline, right-side meta. Renders a quiet placeholder
 * if the DB has no published lectures yet — important because the real repo
 * is a fresh tree and the hero must not look broken on first boot.
 */
export function FeaturedLecture({ lecture }: FeaturedLectureProps) {
  if (!lecture) {
    return (
      <section className="border-b border-hair">
        <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
          <p className="kicker text-ink-muted">§ III · 封面專題</p>
          <p className="mt-6 max-w-[58ch] font-serif text-[26px] leading-snug tracking-tighter2 text-ink md:text-[32px]">
            本期封面專題尚未刊登。新增一則已發布演講即會自動推上此版位。
          </p>
          <Link
            href="/admin"
            className="mt-6 inline-flex items-center gap-2 text-[13px] text-ink-muted hover:text-ink"
          >
            前往後台 → <span className="font-mono">/admin</span>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr] md:gap-16">
          {/* Left — headline */}
          <Link
            href={`/lectures/${lecture.id}`}
            className="group block focus:outline-none"
          >
            <p className="kicker text-ink-muted">
              § III · 封面專題 · Featured
            </p>
            <h2 className="mt-5 font-serif text-[36px] leading-[1.1] tracking-tighter2 text-ink transition-colors group-hover:text-editorial md:text-[56px]">
              {lecture.title}
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]">
              <span className="kicker text-ink-muted">
                {lecture.category || "Featured"}
                {lecture.subcategory ? ` · ${lecture.subcategory}` : ""}
              </span>
              <span className="font-mono text-[13px] text-ink">
                {formatIssueDate(lecture.publishDate)}
              </span>
              {lecture.provider && (
                <span className="text-[12px] text-ink-muted">
                  Source · {lecture.provider}
                </span>
              )}
            </div>

            <p className="mt-8 inline-flex items-center gap-2 border-b border-editorial pb-0.5 text-[13.5px] text-ink">
              閱讀全文
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </p>
          </Link>

          {/* Right — poster fallback */}
          <aside className="relative aspect-[4/5] w-full overflow-hidden border border-hair bg-gradient-to-br from-chip via-paper to-editorial/20">
            {lecture.coverImage ? (
              <img
                src={lecture.coverImage}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <span className="kicker text-ink-muted">
                  MedNote · Featured
                </span>
                <span className="font-serif text-[68px] leading-none tracking-tighter2 text-ink/90">
                  {(lecture.title || "—").slice(0, 2)}
                </span>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
