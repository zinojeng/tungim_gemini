"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import {
    ArrowLeft,
    BookOpenText,
    ChevronLeft,
    ChevronRight,
    Download,
    ExternalLink,
    FileText,
    Images,
    Maximize2,
    ShieldCheck,
    X,
} from "lucide-react"
import { ENDO_2026_OFFICIAL_URL, type EndoArticle } from "@/lib/endo2026"

interface Endo2026ArticleProps {
    article: EndoArticle
    primaryContent: string
    transcriptContent?: string
    slides: string[]
}

type ArticleTab = "note" | "transcript" | "slides"

function getSlideTimestamp(slide: string) {
    const match = slide.match(/_(\d{2}-\d{2})_h\d+/)
    return match?.[1].replace("-", ":") ?? ""
}

function getSlideIdentity(slide: string, fallbackIndex: number) {
    const grouped = slide.match(/talk(\d+)_slide_(\d+)/i)
    if (grouped) {
        return {
            label: `Talk ${Number(grouped[1])} · Slide ${grouped[2]}`,
            shortLabel: `${Number(grouped[1])}·${Number(grouped[2])}`,
        }
    }

    const numbered = slide.match(/slide_(\d+)/i)
    const number = numbered?.[1] ?? String(fallbackIndex + 1).padStart(2, "0")
    return { label: `Slide ${number}`, shortLabel: String(Number(number)) }
}

interface SlideNavigatorProps {
    article: EndoArticle
    slides: string[]
    selectedIndex: number
    onSelect: (index: number) => void
    onOpen: () => void
    layout: "inline" | "sidebar"
}

function SlideNavigator({
    article,
    slides,
    selectedIndex,
    onSelect,
    onOpen,
    layout,
}: SlideNavigatorProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const currentSlide = slides[selectedIndex]
    const currentIdentity = getSlideIdentity(currentSlide, selectedIndex)
    const previewIndex = hoveredIndex ?? selectedIndex
    const previewSlide = slides[previewIndex]
    const previewIdentity = getSlideIdentity(previewSlide, previewIndex)
    const previous = () => onSelect((selectedIndex - 1 + slides.length) % slides.length)
    const next = () => onSelect((selectedIndex + 1) % slides.length)

    return (
        <section
            aria-label="投影片對照"
            className={`relative rounded-3xl border border-white/10 bg-[#0b1e2d] shadow-2xl shadow-black/20 ${
                layout === "sidebar" ? "overflow-visible" : "overflow-hidden"
            }`}
        >
            <div className="flex items-center justify-between rounded-t-3xl border-b border-white/10 px-4 py-3">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-300">Slide companion</p>
                    <h2 className="mt-1 text-sm font-black text-white">投影片同步對照</h2>
                    {layout === "sidebar" ? (
                        <p className="mt-1 text-[10px] text-slate-500">滑過放大 · 點擊全螢幕</p>
                    ) : null}
                </div>
                <span className="rounded-full bg-white/[0.07] px-2.5 py-1 text-xs font-semibold text-slate-300">
                    {selectedIndex + 1} / {slides.length}
                </span>
            </div>

            <button
                type="button"
                onClick={onOpen}
                onMouseEnter={() => layout === "sidebar" && setHoveredIndex(selectedIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                onFocus={() => layout === "sidebar" && setHoveredIndex(selectedIndex)}
                onBlur={() => setHoveredIndex(null)}
                className="group relative block w-full bg-black/25"
                aria-label={`放大檢視第 ${selectedIndex + 1} 張投影片`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={currentSlide}
                    alt={`${article.code} slide ${selectedIndex + 1}`}
                    className="aspect-video w-full object-contain"
                />
                <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/75 px-2.5 py-1.5 text-[11px] font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" /> 放大
                </span>
            </button>

            <div className="flex items-center justify-between border-y border-white/10 px-3 py-2.5">
                <button
                    type="button"
                    onClick={previous}
                    className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    aria-label="上一張投影片"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="text-center">
                    <p className="text-xs font-bold text-slate-200">{currentIdentity.label}</p>
                    {getSlideTimestamp(currentSlide) ? (
                        <p className="mt-0.5 font-mono text-[10px] text-slate-500">{getSlideTimestamp(currentSlide)}</p>
                    ) : null}
                </div>
                <button
                    type="button"
                    onClick={next}
                    className="rounded-full border border-white/10 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                    aria-label="下一張投影片"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            <div
                className={
                    layout === "sidebar"
                        ? "grid max-h-[44vh] grid-cols-1 gap-2 overflow-y-auto rounded-b-3xl p-2.5"
                        : "flex snap-x gap-2 overflow-x-auto p-3"
                }
                aria-label="投影片縮圖"
            >
                {slides.map((slide, index) => (
                    <button
                        key={slide}
                        type="button"
                        onClick={() => onSelect(index)}
                        onMouseEnter={() => layout === "sidebar" && setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onFocus={() => layout === "sidebar" && setHoveredIndex(index)}
                        onBlur={() => setHoveredIndex(null)}
                        className={`relative shrink-0 overflow-hidden rounded-lg border-2 transition ${
                            layout === "inline" ? "w-28 snap-start" : "w-full"
                        } ${
                            selectedIndex === index
                                ? "border-teal-300 ring-2 ring-teal-300/20"
                                : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                        aria-label={`檢視第 ${index + 1} 張投影片`}
                        aria-current={selectedIndex === index ? "true" : undefined}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={slide}
                            alt=""
                            className="aspect-video w-full bg-black/20 object-cover"
                            loading="lazy"
                        />
                        <span className="absolute bottom-1 left-1 rounded bg-slate-950/75 px-1.5 py-0.5 text-[9px] font-bold text-white">
                            {getSlideIdentity(slide, index).shortLabel}
                        </span>
                    </button>
                ))}
            </div>

            {layout === "sidebar" ? (
                <figure
                    aria-hidden={hoveredIndex === null}
                    className={`pointer-events-none absolute right-full top-0 z-50 mr-4 w-[min(58vw,760px)] origin-right overflow-hidden rounded-2xl border border-white/15 bg-[#071724] shadow-2xl shadow-black/60 transition duration-200 ${
                        hoveredIndex === null
                            ? "translate-x-3 scale-95 opacity-0"
                            : "translate-x-0 scale-100 opacity-100"
                    }`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewSlide}
                        alt=""
                        className="aspect-video w-full bg-black/30 object-contain"
                    />
                    <figcaption className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-xs">
                        <span className="font-bold text-white">{previewIdentity.label}</span>
                        <span className="font-mono text-slate-400">
                            {getSlideTimestamp(previewSlide) || `第 ${previewIndex + 1} 張`}
                        </span>
                    </figcaption>
                </figure>
            ) : null}
        </section>
    )
}

export function Endo2026ArticleView({
    article,
    primaryContent,
    transcriptContent,
    slides,
}: Endo2026ArticleProps) {
    const [activeTab, setActiveTab] = useState<ArticleTab>("note")
    const [selectedSlide, setSelectedSlide] = useState(0)
    const [lightboxOpen, setLightboxOpen] = useState(false)

    useEffect(() => {
        if (!lightboxOpen) return

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setLightboxOpen(false)
            if (event.key === "ArrowLeft") {
                setSelectedSlide((current) => (current - 1 + slides.length) % slides.length)
            }
            if (event.key === "ArrowRight") {
                setSelectedSlide((current) => (current + 1) % slides.length)
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = "hidden"
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [lightboxOpen, slides.length])

    const tabs: { id: ArticleTab; label: string; count?: number; icon: typeof FileText }[] = [
        { id: "note", label: article.status === "source-review" ? "投影片重點" : "繁中整合筆記", icon: BookOpenText },
    ]

    if (transcriptContent) tabs.push({ id: "transcript", label: "校訂英文逐字稿", icon: FileText })
    if (slides.length > 0) tabs.push({ id: "slides", label: "全部投影片", count: slides.length, icon: Images })

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

            <main className="container max-w-[1520px] py-10 md:py-14">
                <div
                    className={
                        slides.length > 0 && activeTab !== "slides"
                            ? "grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)] xl:grid-cols-[200px_minmax(0,1fr)_260px] xl:gap-6"
                            : "grid gap-8 lg:grid-cols-[230px_minmax(0,1fr)]"
                    }
                >
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
                        {slides.length > 0 && activeTab !== "slides" ? (
                            <div className="mb-6 xl:hidden">
                                <SlideNavigator
                                    article={article}
                                    slides={slides}
                                    selectedIndex={selectedSlide}
                                    onSelect={setSelectedSlide}
                                    onOpen={() => setLightboxOpen(true)}
                                    layout="inline"
                                />
                            </div>
                        ) : null}

                        {slides.length > 0 && activeTab !== "slides" ? (
                            <button
                                type="button"
                                onClick={() => setActiveTab("slides")}
                                className="mb-4 hidden w-full items-center justify-between rounded-2xl border border-teal-200/15 bg-teal-200/[0.06] px-4 py-3 text-left text-xs font-semibold text-teal-50/80 transition hover:border-teal-200/30 hover:bg-teal-200/[0.1] xl:flex"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Images className="h-4 w-4 text-teal-300" /> 右側投影片可滑過放大，點擊可全螢幕檢視
                                </span>
                                <span className="text-teal-200">查看全部 {slides.length} 張 →</span>
                            </button>
                        ) : null}

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
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedSlide(index)
                                                setLightboxOpen(true)
                                            }}
                                            className="group relative block w-full"
                                            aria-label={`放大檢視第 ${index + 1} 張投影片`}
                                        >
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={slide}
                                                alt={`${article.code} slide ${index + 1}`}
                                                className="aspect-video w-full bg-black/20 object-contain"
                                                loading="lazy"
                                            />
                                            <span className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-slate-950/75 px-3 py-2 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
                                                <Maximize2 className="h-4 w-4" /> 放大檢視
                                            </span>
                                        </button>
                                        <figcaption className="flex items-center justify-between px-4 py-3 text-xs text-slate-500">
                                            <span className="font-semibold text-slate-300">{getSlideIdentity(slide, index).label}</span>
                                            <span className="font-mono">{getSlideTimestamp(slide)}</span>
                                        </figcaption>
                                    </figure>
                                ))}
                            </div>
                        ) : null}
                    </div>

                    {slides.length > 0 && activeTab !== "slides" ? (
                        <aside className="hidden xl:block xl:sticky xl:top-20 xl:self-start">
                            <SlideNavigator
                                article={article}
                                slides={slides}
                                selectedIndex={selectedSlide}
                                onSelect={setSelectedSlide}
                                onOpen={() => setLightboxOpen(true)}
                                layout="sidebar"
                            />
                        </aside>
                    ) : null}
                </div>
            </main>

            {lightboxOpen && slides[selectedSlide] ? (
                <div
                    role="dialog"
                    aria-modal="true"
                    aria-label="投影片放大檢視"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm md:p-10"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(false)}
                        className="absolute right-4 top-4 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-8 md:top-8"
                        aria-label="關閉投影片放大檢視"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            setSelectedSlide((current) => (current - 1 + slides.length) % slides.length)
                        }}
                        className="absolute left-3 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/20 md:left-8"
                        aria-label="上一張投影片"
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </button>
                    <figure className="max-h-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={slides[selectedSlide]}
                            alt={`${article.code} slide ${selectedSlide + 1}`}
                            className="max-h-[82vh] max-w-full rounded-xl object-contain shadow-2xl shadow-black/60"
                        />
                        <figcaption className="mt-4 text-center text-sm font-semibold text-slate-300">
                            {getSlideIdentity(slides[selectedSlide], selectedSlide).label} · {selectedSlide + 1} / {slides.length}
                            {getSlideTimestamp(slides[selectedSlide]) ? ` · ${getSlideTimestamp(slides[selectedSlide])}` : ""}
                        </figcaption>
                    </figure>
                    <button
                        type="button"
                        onClick={(event) => {
                            event.stopPropagation()
                            setSelectedSlide((current) => (current + 1) % slides.length)
                        }}
                        className="absolute right-3 rounded-full border border-white/15 bg-white/10 p-3 text-white transition hover:bg-white/20 md:right-8"
                        aria-label="下一張投影片"
                    >
                        <ChevronRight className="h-6 w-6" />
                    </button>
                </div>
            ) : null}
        </div>
    )
}
