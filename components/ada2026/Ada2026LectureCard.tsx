import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Mic, PlayCircle } from 'lucide-react'
import { Lecture } from '@/types'
import { getTheme } from '@/lib/ada2026-themes'

interface Props {
    lecture: Lecture
    /**
     * When set, this card is rendered inside an Ada2026ArchiveGroup container.
     * The per-card "Watch on ADA portal" CTA is suppressed (the group header
     * carries the recording link) and a "Part N/M" badge replaces the
     * standalone "Archive" badge.
     */
    groupChild?: { partIndex: number; partTotal: number }
}

/**
 * Tag prefixes that exist for routing/idempotency/grouping but should
 * never reach the card UI. They're either rendered elsewhere (e.g.
 * `track:` is the theme badge, `part:` is the part badge) or purely
 * infrastructure (`clientRef:`, `archiveGroup:`, `archiveTitle:`).
 */
const HIDDEN_TAG_PREFIXES = [
    'clientRef:',
    'archiveGroup:',
    'archiveTitle:',
    'track:',
    'part:',
    'speaker:',
    'day:',
] as const

function findTag(tags: string[] | null | undefined, prefix: string): string | null {
    if (!tags) return null
    const t = tags.find((x) => x.startsWith(prefix))
    return t ? t.slice(prefix.length) : null
}

/**
 * Drop infrastructure tags, then promote `topic:foo` → `foo`. Plain
 * (unprefixed) tags pass through unchanged. The result is what the user
 * actually wants to see as topic chips on the card.
 */
function displayChips(tags: string[] | null | undefined): string[] {
    if (!tags) return []
    const out: string[] = []
    for (const t of tags) {
        if (HIDDEN_TAG_PREFIXES.some((p) => t.startsWith(p))) continue
        if (t.startsWith('topic:')) {
            out.push(t.slice('topic:'.length))
        } else if (!t.includes(':')) {
            out.push(t)
        }
        // Any other unknown `prefix:value` tag is also dropped — better
        // to omit than to leak unknown infra. Add a `topic:` prefix if
        // you want it visible.
    }
    return out
}

export function Ada2026LectureCard({ lecture, groupChild }: Props) {
    const theme = getTheme(lecture.subcategory)
    const coverImage = lecture.coverImage || null
    const hasArchive = Boolean(lecture.sourceUrl)
    const inGroup = Boolean(groupChild)
    const speaker = findTag(lecture.tags, 'speaker:')
    const chips = displayChips(lecture.tags)

    return (
        <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-rose-300 group">
            <Link href={`/lectures/${lecture.id}`} className="block">
                <div className="aspect-video w-full relative bg-muted">
                    {coverImage ? (
                        <>
                            <img
                                src={coverImage}
                                alt={lecture.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/50 bg-gradient-to-br from-rose-50 to-amber-50">
                            <span className="text-sm">ADA 2026 · Archive</span>
                        </div>
                    )}

                    {theme && (
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-white/90 backdrop-blur-md shadow-sm font-bold hover:bg-white border-0">
                                <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${theme.accent.dot}`} />
                                <span className={theme.accent.text}>{theme.shortName}</span>
                            </Badge>
                        </div>
                    )}

                    {inGroup ? (
                        <div className="absolute bottom-3 left-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-600/90 text-white px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md shadow-sm tabular-nums">
                                Part {groupChild!.partIndex} / {groupChild!.partTotal}
                            </span>
                        </div>
                    ) : (
                        hasArchive && (
                            <div className="absolute bottom-3 left-3">
                                <span className="inline-flex items-center gap-1 rounded-full bg-rose-600/90 text-white px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md shadow-sm">
                                    <PlayCircle className="h-3 w-3" />
                                    Archive
                                </span>
                            </div>
                        )
                    )}
                </div>
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2 mb-2">
                        <span className="text-xs text-muted-foreground inline-flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {lecture.publishDate
                                ? new Date(lecture.publishDate).toLocaleDateString('zh-TW', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                  })
                                : 'Unknown'}
                        </span>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-rose-700 transition-colors">
                        {lecture.title}
                    </CardTitle>
                    {speaker && (
                        <p className="mt-1.5 text-xs text-foreground/70 inline-flex items-center gap-1">
                            <Mic className="h-3 w-3 text-rose-500/80" aria-hidden="true" />
                            <span className="font-medium">{speaker}</span>
                        </p>
                    )}
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    {chips.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {chips.slice(0, 5).map((chip, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="text-[10px] font-normal px-2 py-0 h-5 bg-amber-50 text-amber-800 hover:bg-amber-100"
                                >
                                    {chip}
                                </Badge>
                            ))}
                            {chips.length > 5 && (
                                <span className="text-[10px] text-foreground/40 px-1 self-center tabular-nums">
                                    +{chips.length - 5}
                                </span>
                            )}
                        </div>
                    )}
                </CardContent>
            </Link>

            {hasArchive && !inGroup && (
                <div className="px-4 pb-4 -mt-1">
                    <a
                        href={lecture.sourceUrl ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition"
                    >
                        <PlayCircle className="h-3.5 w-3.5" />
                        Watch on ADA portal
                    </a>
                </div>
            )}
        </Card>
    )
}
