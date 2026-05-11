import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function AuthShell({
    title,
    description,
    children,
    footer,
}: {
    title: string
    description?: string
    children: React.ReactNode
    footer?: React.ReactNode
}) {
    return (
        <div className="container flex min-h-[70vh] items-center justify-center py-10">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <Link href="/" className="mx-auto mb-2 text-lg font-bold text-primary">
                        MedNote AI
                    </Link>
                    <CardTitle>{title}</CardTitle>
                    {description ? <CardDescription>{description}</CardDescription> : null}
                </CardHeader>
                <CardContent className="space-y-4">{children}</CardContent>
                {footer ? <div className="px-6 pb-6 text-center text-sm text-muted-foreground">{footer}</div> : null}
            </Card>
        </div>
    )
}
