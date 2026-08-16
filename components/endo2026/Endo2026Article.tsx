"use client"

import Link from "next/link"
import { useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import {
    ArrowLeft,
    BookOpenText,
    Download,
    ExternalLink,
    FileText,
    Images,
    ShieldCheck,
} from "lucide-react"
import { ENDO_2026_OFFICIAL_URL, type EndoArticle } from "@/lib/endo2026"

interface Endo2026ArticleProps {
    article: EndoArticle
    primaryContent: string
    transcriptContent?: string
    slides: string[]
}

type ArticleTab = "note" | "transcript" | "slides"

export function Endo2026ArticleView({
    article,
    primaryContent,
    transcriptContent,
    slides,
}: Endo2026ArticleProps) {
    const [activeTab, setActiveTab] = useState<ArticleTab>("note")

    const tabs: { id: ArticleTab; label: string; count?: number; icon: typeof FileText }[] = [
        { id: "note", label: article.status === "source-review" ? "投影片重點" : "繁中整合筆記", icon: BookOpenText },
    ]

    if (transcriptContent) tabs.push({ id: "transcript", label: "校訂英文逐字稿", icon: FileText })
    if (slides.length > 0) tabs.push({ id: "slides", label: "投影片圖庫", count: slides.length, icon: Images })

    return (
        <div className="min-h-screen bg-[#06131f] text-slate-100">
            <header className="relative isolate overflow-hidden border-b border-white/10">
                <div
                    className="absolute inset-0 -z-20 bg-cover bg-center opacity-30 blur-[1px]"
                    style={{ backgroundImage: `url(${article.coverImage})` }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06131f] via-[#06131f]/95 to-[#06131f]/65" />
                <div className="container max-w-6xl py-12 md:py-20">
                    <Link
                        href="/endo-2026"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" /> 返回 ENDO 2026
                    </Link>

                    <div className="mt-10 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="rounded-full bg-orange-300 px-3 py-1 text-xs font-black tracking-wider text-slate-950">
                                {article.code}
                            </span>
                            <span className="rounded-full border border-teal-200/25 bg-teal-200/10 px-3 py-1 text-xs font-bold text-teal-100">
                                {article.statusLabel}
                            </span>
                            <span className="text-xs font-medium uppercase tracking-widest text-slate-500">ENDO 2026 · Adrenal</span>
                        </div>
                        <h1 className="mt-6 text-3xl font-black leading-tight tracking-[-0.035em] text-white sm:text-5xl">
                            {article.titleZh}
                        </h1>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">{article.title}</p>
                        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-400">
                            <span>Speaker · {article.speaker}</span>
                            {article.publishedAt ? <span>整理日期 · {article.publishedAt}</span> : null}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container max-w-6xl py-10 md:py-14">
                <div className="grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]">
                    <aside className="lg:sticky lg:top-20 lg:self-start">
                        <nav aria-label="文章內容" className="space-y-2">
                            {tabs.map((tab) => {
                                const Icon = tab.icon
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${activeTab === tab.id ? "bg-teal-300 text-slate-950" : "border border-white/10 bg-white/[0.035] text-slate-400 hover:bg-white/[0.07] hover:text-white"}`}
                                    >
                                        <span className="flex items-center gap-2.5">
                                            <Icon className="h-4 w-4" /> {tab.label}
                                        </span>
                                        {tab.count ? <span className="text-xs opacity-70">{tab.count}</span> : null}
                                    </button>
                                )
                            })}
                        </nav>

                        <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-5 text-slate-500">
                            <div className="flex items-start gap-2 text-slate-300">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                                <span>教育性整理，不能取代個別醫療判斷。</span>
                            </div>
                            <a
                                href={ENDO_2026_OFFICIAL_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 font-semibold text-teal-200 hover:text-teal-100"
                            >
                                官方課程頁 <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                            {article.primaryContentPath ? (
                                <a
                                    href={article.primaryContentPath}
                                    download
                                    className="flex items-center gap-1.5 font-semibold text-slate-400 hover:text-white"
                                >
                                    <Download className="h-3.5 w-3.5" /> 下載 Markdown
                                </a>
                            ) : null}
                        </div>
                    </aside>

                    <div className="min-w-0">
                        {article.status === "source-review" ? (
                            <div className="mb-6 rounded-2xl border border-sky-200/15 bg-sky-200/[0.06] p-4 text-sm leading-6 text-sky-50/80">
                                本篇只根據投影片圖像與 OCR 建立，未使用音訊內容；所有臨床數據與圖表均保留來源限制，正式引用前請回查原始研究。
                            </div>
                        ) : null}

                        {activeTab === "note" ? (
                            <article className="rounded-3xl bg-white px-5 py-8 text-slate-900 shadow-2xl shadow-black/20 sm:px-9 md:px-12 md:py-12">
                                <div className="prose prose-slate max-w-none prose-headings:scroll-mt-24 prose-headings:font-black prose-headings:tracking-tight prose-h1:text-3xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:text-2xl prose-h3:text-xl prose-p:leading-8 prose-li:leading-7 prose-a:text-teal-700 prose-table:text-sm prose-th:bg-slate-100 prose-th:p-3 prose-td:p-3">
                                    <ReactMarkdown
                                        rehypePlugins={[rehypeRaw, [rehypeKatex, { strict: false }]]}
                                        remarkPlugins={[remarkGfm, remarkMath]}
                                    >
                                        {primaryContent}
                                    </ReactMarkdown>
                                </div>
                            </article>
                        ) : null}

                        {activeTab === "transcript" && transcriptContent ? (
                            <article className="rounded-3xl bg-white px-5 py-8 text-slate-900 shadow-2xl shadow-black/20 sm:px-9 md:px-12 md:py-12">
                                <div className="mb-8 border-b border-slate-200 pb-6">
                                    <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-700">Corrected English transcript</p>
                                    <h2 className="mt-2 text-2xl font-black tracking-tight">校訂英文逐字稿</h2>
                                </div>
                                <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:leading-8 prose-li:leading-7">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{transcriptContent}</ReactMarkdown>
                                </div>
                            </article>
                        ) : null}

                        {activeTab === "slides" && slides.length > 0 ? (
                            <div className="space-y-5">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-teal-300">Full-frame capture</p>
                                        <h2 className="mt-2 text-2xl font-black text-white">{slides.length} 張去重投影片</h2>
                                    </div>
                                    <span className="text-xs text-slate-500">依影片時間順序排列</span>
                                </div>
                                {slides.map((slide, index) => (
                                    <figure key={slide} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={slide}
                                            alt={`${article.code} slide ${index + 1}`}
                                            className="aspect-video w-full bg-black/20 object-contain"
                                            loading="lazy"
                                        />
                                        <figcaption className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
                                            <span className="font-semibold text-slate-300">Slide {String(index + 1).padStart(2, "0")}</span>
                                            <span className="font-mono">{slide.split("_").slice(2, 3)[0]?.replace("-", ":")}</span>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </main>
        </div>
    )
}
