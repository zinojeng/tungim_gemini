import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"
import { Endo2026ArticleView } from "@/components/endo2026/Endo2026Article"
import { ENDO_2026_ARTICLES, getEndoArticle } from "@/lib/endo2026"

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mednote.zeabur.app"

type PageProps = {
    params: Promise<{ slug: string }>
}

function readPublicText(publicPath: string) {
    return readFileSync(join(process.cwd(), "public", publicPath.replace(/^\//, "")), "utf8")
}

export function generateStaticParams() {
    return ENDO_2026_ARTICLES
        .filter((article) => Boolean(article.primaryContentPath))
        .map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params
    const article = getEndoArticle(slug)

    if (!article?.primaryContentPath) return {}

    const title = `${article.titleZh}（${article.code}）｜ENDO 2026 MedNote`
    const description = article.summary
    const image = new URL(article.coverImage, SITE_URL).toString()

    return {
        metadataBase: new URL(SITE_URL),
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            url: `/endo-2026/${article.slug}`,
            images: [{ url: image, alt: `${article.code} ${article.title}` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
    }
}

export default async function Endo2026ArticlePage({ params }: PageProps) {
    const { slug } = await params
    const article = getEndoArticle(slug)

    if (!article?.primaryContentPath) notFound()

    const primaryContent = readPublicText(article.primaryContentPath)
    const transcriptContent = article.transcriptPath
        ? readPublicText(article.transcriptPath)
        : undefined

    const slides = article.slidesDirectory
        ? readdirSync(join(process.cwd(), "public", "endo2026", "media", article.slidesDirectory))
            .filter((file) => file.endsWith(".jpg"))
            .sort()
            .map((file) => `/endo2026/media/${article.slidesDirectory}/${file}`)
        : []

    return (
        <Endo2026ArticleView
            article={article}
            primaryContent={primaryContent}
            transcriptContent={transcriptContent}
            slides={slides}
        />
    )
}
