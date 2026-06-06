import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, PlayCircle } from 'lucide-react'
import { Lecture } from '@/types'
import { getTheme } from '@/lib/ada2026-themes'

interface Props {
    lecture: Lecture
}

export function Ada2026LectureCard({ lecture }: Props) {
    const theme = getTheme(lecture.subcategory)
    const coverImage = lecture.coverImage || null
    const hasArchive = Boolean(lecture.sourceUrl)

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

                    {hasArchive && (
                        <div className="absolute bottom-3 left-3">
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-600/90 text-white px-2.5 py-1 text-[10px] font-semibold backdrop-blur-md shadow-sm">
                                <PlayCircle className="h-3 w-3" />
                                Archive
                            </span>
                        </div>
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
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    {lecture.tags && lecture.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {lecture.tags.slice(0, 4).map((tag, i) => (
                                <Badge
                                    key={i}
                                    variant="secondary"
                                    className="text-[10px] font-normal px-2 py-0 h-5 bg-amber-50 text-amber-800 hover:bg-amber-100"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Link>

            {hasArchive && (
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
