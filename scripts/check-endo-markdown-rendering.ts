import assert from "node:assert/strict"
import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { createElement } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { normalizeEndoMarkdown } from "../lib/endo2026-markdown"

function renderMarkdown(markdown: string) {
    return renderToStaticMarkup(createElement(
        ReactMarkdown,
        {
            rehypePlugins: [rehypeRaw, [rehypeKatex, { strict: false }]],
            remarkPlugins: [remarkGfm, remarkMath],
        },
        normalizeEndoMarkdown(markdown),
    ))
}

const examples = [
    ["其中 **17%**具有週期性", "其中 <strong>17%</strong>具有週期性"],
    ["治療方面，**72%**接受手術", "治療方面，<strong>72%</strong>接受手術"],
    ["**GnRH agonist（GnRHa）**即為第一線治療", "<strong>GnRH agonist（GnRHa）</strong>即為第一線治療"],
    ["主題是**「Molecular Mechanisms」**。", "主題是<strong>「Molecular Mechanisms」</strong>。"],
] as const

for (const [markdown, expected] of examples) {
    const html = renderMarkdown(markdown)
    assert.ok(html.includes(expected), `failed to repair: ${markdown}\n${html}`)
    assert.ok(!html.includes("**"), `literal bold marker remains: ${markdown}\n${html}`)
}

const contentDirectory = join(process.cwd(), "public", "endo2026", "generated-content")
const noteFiles = readdirSync(contentDirectory)
    .filter((file) => file.endsWith("-note-zh-tw.md"))
    .sort()

const failures: string[] = []
for (const file of noteFiles) {
    const markdown = readFileSync(join(contentDirectory, file), "utf8")
    const html = renderMarkdown(markdown)
    if (html.includes("**")) failures.push(file)
}

assert.deepEqual(failures, [], `literal bold markers remain in: ${failures.join(", ")}`)
console.log(`ENDO Markdown rendering check passed: ${noteFiles.length} notes`)
