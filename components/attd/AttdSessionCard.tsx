import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Lecture } from '@/types'
import { AttdSession, AttdTrack, getDayKey } from '@/lib/attd2026-agenda'
import { Clock, MapPin, FileText } from 'lucide-react'

interface Props {
    session: AttdSession
    track: AttdTrack
    lectures: Lecture[]
}

const TYPE_LABEL: Record<AttdSession['type'], string> = {
    plenary: 'Plenary',
    'parallel-scientific': 'Parallel Scientific',
    oral: 'Oral',
    industry: 'Industry',
    symposium: 'Symposium',
    opening: 'Opening',
    closing: 'Closing',
    networking: 'Networking',
    course: 'Course',
    startup: 'Start-Up',
}

export function AttdSessionCard({ session, track, lectures }: Props) {
    const dayKey = getDayKey(session.date)
    const hasContent = lectures.length > 0

    return (
        <article
            id={`session-${session.id}`}
            className={`relative rounded-xl border overflow-hidden transition-all hover:shadow-md scroll-mt-24
                ${hasContent
                    ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-800/40 hover:border-emerald-400'
                    : 'bg-card hover:border-foreground/20'
                }`}
        >
            <div
                className={`absolute left-0 top-0 bottom-0 w-1 ${hasContent ? 'bg-emerald-500' : track.accent.dot
                    }`}
            />
            <div className="p-4 md:p-5 pl-5 md:pl-6">
                <div className="flex flex-wrap items-start gap-x-3 gap-y-2 mb-2">
                    {hasContent && (
                        <span
                            className="relative flex h-2.5 w-2.5 items-center self-center"
                            aria-label="Has uploaded content"
                            title="Has uploaded content"
                        >
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        </span>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-foreground/60">
                        {session.id}
                    </span>
                    <Badge variant="outline" className={`${track.accent.chip} border-0 font-medium text-[11px]`}>
                        {TYPE_LABEL[session.type]}
                    </Badge>
                    {hasContent && (
                        <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 border-0 text-[11px] font-semibold shadow-sm">
                            <FileText className="h-3 w-3 mr-1" />
                            {lectures.length} note{lectures.length === 1 ? '' : 's'}
                        </Badge>
                    )}
                </div>

                <h3 className="text-base md:text-lg font-semibold leading-snug text-foreground">
                    {session.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/60">
                    <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium">{dayKey}</span>
                        <span>·</span>
                        <span>
                            {session.startTime} – {session.endTime}
                        </span>
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {session.room}
                    </span>
                </div>

                {session.description && (
                    <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                        {session.description}
                    </p>
                )}

                {lectures.length > 0 ? (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {lectures.map((l) => (
                            <li key={l.id}>
                                <Link
                                    href={`/lectures/${l.id}`}
                                    className="group flex items-start gap-3 rounded-lg border bg-background px-3 py-2.5 hover:border-foreground/30 hover:bg-muted/50 transition"
                                >
                                    {l.coverImage ? (
                                        <img
                                            src={l.coverImage}
                                            alt=""
                                            className="h-10 w-10 rounded object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className={`h-10 w-10 rounded ${track.accent.dot} opacity-30 flex-shrink-0`} />
                                    )}
                                    <div className="min-w-0 flex-1">
                                        <div className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-foreground">
                                            {l.title}
                                        </div>
                                        {l.tags && l.tags.length > 1 && (
                                            <div className="mt-1 flex flex-wrap gap-1">
                                                {l.tags.slice(1, 4).map((t, i) => (
                                                    <span key={i} className="text-[10px] text-foreground/50">
                                                        #{t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className="mt-3 text-xs text-foreground/40 italic">
                        Awaiting transcript / slide notes
                    </div>
                )}
            </div>
        </article>
    )
}
