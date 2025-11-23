import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, PlayCircle } from "lucide-react"
import { Lecture } from "@/types"

interface LectureCardProps {
    lecture: Lecture
}

export function LectureCard({ lecture }: LectureCardProps) {
    return (
        <Link href={`/lectures/${lecture.id}`}>
            <Card className="h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50 group">
                <div className="aspect-video w-full bg-muted relative">
                    {/* Placeholder for thumbnail */}
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                        <PlayCircle className="h-12 w-12" />
                    </div>
                </div>
                <CardHeader className="p-4">
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="line-clamp-2 text-lg leading-tight group-hover:text-primary transition-colors">
                            {lecture.title}
                        </CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        {lecture.publishDate ? new Date(lecture.publishDate).toLocaleDateString() : 'Unknown Date'}
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                            {lecture.provider || 'General'}
                        </Badge>
                        <Badge variant={lecture.status === 'completed' ? 'default' : 'outline'} className="text-xs">
                            {lecture.status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
