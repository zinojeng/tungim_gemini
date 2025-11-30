import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import { Lecture } from "@/types"

interface LectureCardProps {
    lecture: Lecture
}

export function LectureCard({ lecture }: LectureCardProps) {
    const coverImage = lecture.coverImage || null

    return (
        <Link href={`/lectures/${lecture.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 group">
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
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/50">
                            <span className="text-sm">No Cover Image</span>
                        </div>
                    )}

                    {lecture.category && (
                        <div className="absolute top-3 right-3">
                            <Badge className="bg-white/90 text-teal-800 hover:bg-white backdrop-blur-md shadow-sm font-bold">
                                {lecture.category}
                            </Badge>
                        </div>
                    )}
                </div>
                <CardHeader className="p-4 pb-2">
                    <div className="flex justify-between items-start gap-2 mb-2">
                        {lecture.subcategory && (
                            <Badge variant="outline" className="border-teal-200 text-teal-700 bg-teal-50">
                                {lecture.subcategory}
                            </Badge>
                        )}
                        <div className="flex items-center text-xs text-muted-foreground ml-auto">
                            <Calendar className="mr-1 h-3 w-3" />
                            {lecture.publishDate ? new Date(lecture.publishDate).toLocaleDateString('zh-TW', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit'
                            }) : 'Unknown'}
                        </div>
                    </div>
                    <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-teal-600 transition-colors">
                        {lecture.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    {lecture.tags && lecture.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                            {lecture.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs font-normal px-2 py-0 h-5 bg-orange-50 text-orange-700 hover:bg-orange-100">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </Link>
    )
}
