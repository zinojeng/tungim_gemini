import { Lecture } from '@/types'
import { Ada2026LectureCard } from './Ada2026LectureCard'
import { Layers, PlayCircle } from 'lucide-react'

interface Props {
    /** Stable group id (the value after `archiveGroup:` in lecture tags). */
    groupId: string
    /** Human-readable group label (from `archiveTitle:<text>` tag, when present). */
    title: string | null
    /** Recording URL — used by the group-level "Watch full recording" CTA. */
    sourceUrl: string | null
    /** Parts, already sorted by `part:NN` tag (falling back to publishDate desc). */
    parts: Lecture[]
}

/**
 * Renders multiple lectures that share the same archiveGroup tag as one
 * visually-bound container. Each part is still its own lecture row in the DB
 * — this is a pure frontend grouping over the existing tag conventions.
 *
 * The per-card "Watch on ADA portal" CTA is suppressed for parts inside a
 * group; the group header carries one "Watch full recording" link instead,
 * avoiding 8 identical buttons for an 8-part recording.
 */
export function Ada2026ArchiveGroup({ groupId, title, sourceUrl, parts }: Props) {
    const labelId = `archive-group-${groupId}`
    const displayTitle = title ?? 'Archive recording'
    return (
        <section
            aria-labelledby={labelId}
            className="rounded-2xl border-2 border-rose-200/80 bg-gradient-to-br from-rose-50/50 via-amber-50/30 to-orange-50/30 p-4 md:p-5"
        >
            <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 min-w-0">
                    <Layers className="h-4 w-4 text-rose-600 flex-shrink-0" aria-hidden="true" />
                    <h3 id={labelId} className="text-base font-semibold text-rose-900 truncate">
                        {displayTitle}
                    </h3>
                    <span className="text-xs text-foreground/60 tabular-nums flex-shrink-0">
                        · {parts.length} parts
                    </span>
                </div>
                {sourceUrl && (
                    <a
                        href={sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Watch full recording: ${displayTitle}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 text-white px-3 py-1.5 text-[11px] font-medium hover:bg-rose-700 transition shadow-sm"
                    >
                        <PlayCircle className="h-3 w-3" aria-hidden="true" />
                        Watch full recording
                    </a>
                )}
            </header>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {parts.map((part, i) => (
                    <Ada2026LectureCard
                        key={part.id}
                        lecture={part}
                        groupChild={{ partIndex: i + 1, partTotal: parts.length }}
                    />
                ))}
            </div>
        </section>
    )
}
