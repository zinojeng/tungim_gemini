import { AttdSession, AttdTrack } from '@/lib/attd2026-agenda'
import { Lecture } from '@/types'
import { AttdSessionCard } from './AttdSessionCard'

interface Props {
    track: AttdTrack
    sessions: AttdSession[]
    lecturesBySessionId: Record<string, Lecture[]>
    looseLectures: Lecture[]
}

export function AttdTrackSection({ track, sessions, lecturesBySessionId, looseLectures }: Props) {
    const totalLectures =
        Object.values(lecturesBySessionId).reduce((s, arr) => s + arr.length, 0) +
        looseLectures.length

    return (
        <section
            id={`track-${track.id}`}
            className="scroll-mt-32 border-l-4 pl-4 md:pl-6 py-2"
            style={{ borderColor: 'currentColor' }}
        >
            <div className={track.accent.text}>
                <header className="mb-5">
                    <div className="flex flex-wrap items-baseline gap-3">
                        <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${track.accent.text}`}>
                            {track.name}
                        </h2>
                        <span className="text-xs text-foreground/50 font-mono">
                            {sessions.length} session{sessions.length === 1 ? '' : 's'} · {totalLectures} note{totalLectures === 1 ? '' : 's'}
                        </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/70 max-w-3xl">{track.description}</p>
                </header>
            </div>

            <div className="space-y-3">
                {sessions.map((s) => (
                    <AttdSessionCard
                        key={s.id}
                        session={s}
                        track={track}
                        lectures={lecturesBySessionId[s.id] ?? []}
                    />
                ))}
            </div>

            {looseLectures.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-sm font-semibold text-foreground/70 mb-3">
                        Other notes in this track
                    </h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                        {looseLectures.map((l) => (
                            <li key={l.id}>
                                <a
                                    href={`/lectures/${l.id}`}
                                    className="block rounded-lg border bg-background px-3 py-2.5 hover:border-foreground/30 hover:bg-muted/50 transition text-sm"
                                >
                                    {l.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    )
}
