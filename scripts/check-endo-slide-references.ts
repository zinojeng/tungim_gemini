import assert from "node:assert/strict"
import generatedArticles from "../public/endo2026/generated-articles.json"
import staticEndoContent from "../lib/generated/endo2026-static-content.json"
import {
    decorateEndoSlideReferences,
    findEndoSlideIndex,
    getEndoSlideNumber,
    parseEndoSlideReference,
} from "../lib/endo2026-slide-references"

let headingCount = 0
let referenceCount = 0

for (const article of generatedArticles) {
    assert.ok(article.slidesDirectory, `${article.slug}: missing slide directory`)
    const content = staticEndoContent.articles[
        article.slug as keyof typeof staticEndoContent.articles
    ]
    assert.ok(content, `${article.slug}: missing generated static content`)
    const slides = content.slides
    const markdown = content.primaryContent
    const headings = [...markdown.matchAll(/^###\s+(.+)$/gm)]
    const decorated = decorateEndoSlideReferences(markdown, {
        code: article.code,
        presentationLocal: true,
        slideNumbers: slides.map(getEndoSlideNumber),
    })
    const references = [...decorated.matchAll(/\]\((#endo-slide-ref[^)]+)\)/g)]
        .map((match) => parseEndoSlideReference(match[1]))
        .filter((reference) => reference !== undefined)

    assert.ok(slides.length > 0, `${article.slug}: no slides`)
    assert.ok(headings.length > 0, `${article.slug}: no level-three sections`)
    assert.ok(
        references.length >= headings.length,
        `${article.slug}: ${references.length}/${headings.length} sections have references`,
    )
    for (const reference of references) {
        assert.ok(
            findEndoSlideIndex(slides, reference) >= 0,
            `${article.slug}: unresolved slide reference ${JSON.stringify(reference)}`,
        )
    }

    headingCount += headings.length
    referenceCount += references.length
}

console.log(
    `ENDO slide-reference check passed: ${generatedArticles.length} articles, `
    + `${headingCount} main sections, ${referenceCount} references`,
)
