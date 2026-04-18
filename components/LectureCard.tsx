import Link from "next/link";
import { Lecture } from "@/types";

interface LectureCardProps {
  lecture: Lecture;
  /**
   * Deterministic index; used for poster gradient when there is no cover image
   * so two adjacent cards never get the same look. Home/collection lists pass
   * the array index.
   */
  index?: number;
}

// Paper→editorial gradient family. No RGB random — we want the grid to feel
// composed, not generative.
const POSTER_GRADIENTS = [
  "from-chip via-paper to-editorial/12",
  "from-paper via-chip to-editorial/20",
  "from-editorial/10 via-paper to-chip",
  "from-paper via-editorial/8 to-chip",
];

function formatIssueDate(d?: string | Date | null): string {
  if (!d) return "未署日期";
  const date = new Date(d);
  if (Number.isNaN(date.getTime())) return "未署日期";
  // 2026 · 04 · 19 — Journal-style. The mono font in tailwind takes it from here.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${y} · ${m} · ${day}`;
}

export function LectureCard({ lecture, index = 0 }: LectureCardProps) {
  const coverImage = lecture.coverImage || null;
  const gradient = POSTER_GRADIENTS[index % POSTER_GRADIENTS.length];

  return (
    <Link
      href={`/lectures/${lecture.id}`}
      className="group block focus:outline-none"
      aria-label={lecture.title}
    >
      <article className="flex h-full flex-col">
        {/* Poster — 4:5 editorial ratio, hairline frame, no drop shadow. */}
        <div
          className={
            "relative aspect-[4/5] w-full overflow-hidden border border-hair " +
            "bg-gradient-to-br " +
            gradient
          }
        >
          {coverImage ? (
            <img
              src={coverImage}
              alt=""
              className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-90"
              loading="lazy"
            />
          ) : (
            // Typographic poster — keeps the grid quiet when covers are missing.
            <div className="absolute inset-0 flex flex-col justify-between p-5">
              <span className="kicker text-ink-muted">
                {lecture.category || "MedNote"}
              </span>
              <span className="font-serif text-[40px] leading-none tracking-tighter2 text-ink/90">
                {(lecture.title || "—").slice(0, 2)}
              </span>
            </div>
          )}
        </div>

        {/* Metadata strip — above the title, like a journal article. */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-ink-muted">
          <span className="kicker">
            {lecture.category || "未分類"}
            {lecture.subcategory ? ` · ${lecture.subcategory}` : ""}
          </span>
          <span className="font-mono tracking-tight">
            {formatIssueDate(lecture.publishDate)}
          </span>
        </div>

        {/* Title — serif, tight tracking. Underline-on-hover (no card lift). */}
        <h3 className="mt-2 font-serif text-[22px] leading-[1.22] tracking-tighter2 text-ink transition-colors group-hover:text-editorial">
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:0_100%] bg-no-repeat transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
            {lecture.title}
          </span>
        </h3>

        {/* Tags — mono, sparse, no pill background. */}
        {lecture.tags && lecture.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-mono text-ink-muted">
            {lecture.tags.slice(0, 4).map((tag, i) => (
              <li key={i} className="before:mr-2 before:text-hair first:before:content-[''] before:content-['·']">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </article>
    </Link>
  );
}
