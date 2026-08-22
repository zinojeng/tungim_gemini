import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve, sep } from 'node:path'
import generatedArticles from '../public/endo2026/generated-articles.json'

type GeneratedArticle = (typeof generatedArticles)[number] & { slideTalk?: number }

const publicRoot = resolve(process.cwd(), 'public')
const outputPath = resolve(process.cwd(), 'lib/generated/endo2026-static-content.json')
const slideManifestPath = resolve(publicRoot, 'endo2026/slide-manifest.json')

type SlideManifest = {
    version: number
    articles: Record<string, string[]>
}

function resolvePublicPath(publicPath: string): string {
    const path = resolve(publicRoot, publicPath.replace(/^\/+/, ''))
    if (path !== publicRoot && !path.startsWith(`${publicRoot}${sep}`)) {
        throw new Error(`Public path escapes the public directory: ${publicPath}`)
    }
    return path
}

async function readOptionalPublicText(publicPath: string | undefined) {
    return publicPath ? readFile(resolvePublicPath(publicPath), 'utf8') : undefined
}

async function readExistingSlideManifest(): Promise<SlideManifest | undefined> {
    try {
        return JSON.parse(await readFile(slideManifestPath, 'utf8')) as SlideManifest
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined
        throw error
    }
}

async function slideUrls(
    article: GeneratedArticle,
    existingSlides: Record<string, string[]>,
): Promise<string[]> {
    if (!article.slidesDirectory) return []
    const directory = resolvePublicPath(`/endo2026/media/${article.slidesDirectory}`)
    let files: string[]
    try {
        files = await readdir(directory)
    } catch (error: unknown) {
        if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
        const existing = existingSlides[article.slug]
        if (!existing) {
            throw new Error(
                `${article.slug}: slide directory is absent and no committed slide manifest entry exists`,
            )
        }
        return existing
    }

    return files
        .filter((file) => {
            if (!file.endsWith('.jpg')) return false
            if (!article.slideTalk) return true
            return file.startsWith(`talk${String(article.slideTalk).padStart(2, '0')}_`)
        })
        .sort()
        .map((file) => `/endo2026/media/${article.slidesDirectory}/${file}`)
}

async function main() {
    const existingManifest = await readExistingSlideManifest()
    const existingSlides = existingManifest?.articles || {}
    const articles: Record<
        string,
        { primaryContent: string; transcriptContent?: string; slides: string[] }
    > = {}

    for (const article of generatedArticles) {
        if (!article.primaryContentPath) continue
        const slides = await slideUrls(article, existingSlides)
        if (slides.length === 0) {
            throw new Error(`${article.slug}: generated article has no slides`)
        }
        articles[article.slug] = {
            primaryContent: await readFile(
                resolvePublicPath(article.primaryContentPath),
                'utf8',
            ),
            transcriptContent: await readOptionalPublicText(article.transcriptPath),
            slides,
        }
    }

    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(
        slideManifestPath,
        `${JSON.stringify({
            version: 1,
            articles: Object.fromEntries(
                Object.entries(articles).map(([slug, article]) => [slug, article.slides]),
            ),
        })}\n`,
        'utf8',
    )
    await writeFile(
        outputPath,
        `${JSON.stringify({ version: 1, articles })}\n`,
        'utf8',
    )
    console.log(
        `Generated ENDO static content: ${Object.keys(articles).length} articles; slide manifest -> ${slideManifestPath}`,
    )
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
})
