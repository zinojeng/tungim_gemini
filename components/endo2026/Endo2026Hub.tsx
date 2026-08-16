"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import { useMemo, useState } from "react"
import {
    ArrowRight,
    ArrowUpRight,
    BookOpenCheck,
    CheckCircle2,
    Clock3,
    ExternalLink,
    LibraryBig,
    Search,
    Sparkles,
} from "lucide-react"
import {
    ENDO_2026_ARTICLES,
    ENDO_2026_CHAPTERS,
    ENDO_2026_OFFICIAL_URL,
    type EndoSession,
} from "@/lib/endo2026"

interface Endo2026HubProps {
    sessions: EndoSession[]
}

const statusStyles = {
    published: "border-emerald-300/30 bg-emerald-300/10 text-emerald-100",
    "source-review": "border-sky-300/30 bg-sky-300/10 text-sky-100",
    "in-production": "border-amber-300/30 bg-amber-300/10 text-amber-100",
}

export function Endo2026Hub({ sessions }: Endo2026HubProps) {
    const [query, setQuery] = useState("")
    const [selectedChapter, setSelectedChapter] = useState("all")

    const sessionsByCode = useMemo(
        () => new Map(sessions.map((session) => [session.code, session])),
        [sessions],
    )

    const visibleChapters = useMemo(() => {
        const normalizedQuery = query.trim().toLocaleLowerCase()

        return ENDO_2026_CHAPTERS.map((chapter) => {
            const chapterMatches = [chapter.title, chapter.titleZh, chapter.description]
                .join(" ")
                .toLocaleLowerCase()
                .includes(normalizedQuery)
            const chapterSessions = chapter.sessionCodes
                .map((code) => sessionsByCode.get(code))
                .filter((session): session is EndoSession => Boolean(session))
                .filter((session) => {
                    if (!normalizedQuery || chapterMatches) return true
                    return `${session.code} ${session.title}`
                        .toLocaleLowerCase()
                        .includes(normalizedQuery)
                })

            return { chapter, sessions: chapterSessions }
        }).filter(({ chapter, sessions: chapterSessions }) => {
            const selected = selectedChapter === "all" || selectedChapter === chapter.slug
            return selected && chapterSessions.length > 0
        })
    }, [query, selectedChapter, sessionsByCode])

    const processedCount = sessions.filter((session) => session.status === "processed_qa_complete").length
    const totalCredits = ENDO_2026_CHAPTERS.reduce((sum, chapter) => sum + chapter.credits, 0)

    const focusChapter = (slug: string) => {
        setSelectedChapter(slug)
        window.setTimeout(() => {
            document.getElementById("session-index")?.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 0)
    }

    return (
        <div className="min-h-screen overflow-hidden bg-[#06131f] text-slate-100">
            <section className="relative isolate border-b border-white/10">
                <div
                    className="absolute inset-0 -z-20"
                    style={{
                        background:
                            "radial-gradient(circle at 78% 18%, rgba(46,186,164,.2), transparent 30%), radial-gradient(circle at 16% 76%, rgba(239,125,82,.16), transparent 30%), linear-gradient(145deg, #081b2c 0%, #06131f 55%, #0b2430 100%)",
                    }}
                />
                <div
                    className="absolute inset-0 -z-10 opacity-[0.12]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
                        backgroundSize: "72px 72px",
                        maskImage: "linear-gradient(to bottom, black, transparent 88%)",
                    }}
                />

                <div className="container max-w-7xl py-16 md:py-24">
                    <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_.8fr]">
                        <div>
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal-100">
                                <Sparkles className="h-3.5 w-3.5" />
                                MedNote Conference Library
                            </div>
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-orange-300">
                                ENDO 2026 · Chicago
                            </p>
                            <h1 className="max-w-4xl text-4xl font-black leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                                Session Recordings
                                <span className="mt-2 block bg-gradient-to-r from-teal-200 via-sky-200 to-orange-200 bg-clip-text text-transparent">
                                    系統化臨床閱讀站
                                </span>
                            </h1>
                            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                                依官方 12 個主題章節重建 138 場完整索引，並逐場加入繁中重點、校訂逐字稿與投影片解析。第一批內容從腎上腺章節開始。
                            </p>
                            <div className="mt-9 flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById("chapters")?.scrollIntoView({ behavior: "smooth" })}
                                    className="inline-flex items-center gap-2 rounded-full bg-teal-300 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-teal-200"
                                >
                                    瀏覽 12 個章節 <ArrowRight className="h-4 w-4" />
                                </button>
                                <a
                                    href={ENDO_2026_OFFICIAL_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    官方課程頁 <ExternalLink className="h-4 w-4" />
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
                            {[
                                ["12", "主題章節"],
                                [String(sessions.length), "正式場次"],
                                [totalCredits.toFixed(2), "CME 時數"],
                                [String(processedCount), "已完成擷取"],
                            ].map(([value, label]) => (
                                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
                                    <div className="text-3xl font-black tracking-tight text-white">{value}</div>
                                    <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">{label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <main className="container max-w-7xl space-y-24 py-16 md:py-24">
                <section id="chapters" className="scroll-mt-24">
                    <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-300">Official structure</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">12 個主題章節</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-slate-400">
                            章節名稱與學分已依 Endocrine Society 登入後頁面逐一核對；點選任一章節可查看其完整 session 清單。
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {ENDO_2026_CHAPTERS.map((chapter, index) => {
                            const chapterSessions = chapter.sessionCodes
                                .map((code) => sessionsByCode.get(code))
                                .filter((session): session is EndoSession => Boolean(session))
                            const completeCount = chapterSessions.filter(
                                (session) => session.status === "processed_qa_complete",
                            ).length

                            return (
                                <button
                                    key={chapter.slug}
                                    type="button"
                                    onClick={() => focusChapter(chapter.slug)}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.075]"
                                    style={{ "--chapter-accent": chapter.accent } as CSSProperties}
                                >
                                    <div className="absolute inset-x-0 top-0 h-px bg-[var(--chapter-accent)] opacity-80" />
                                    <div className="flex items-start justify-between gap-5">
                                        <div
                                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black text-slate-950"
                                            style={{ backgroundColor: chapter.accent }}
                                        >
                                            {chapter.shortLabel}
                                        </div>
                                        <span className="rounded-full border border-white/10 bg-black/15 px-3 py-1 text-xs font-semibold text-slate-300">
                                            {chapter.credits} credits
                                        </span>
                                    </div>
                                    <h3 className="mt-6 text-lg font-bold leading-snug text-white">{chapter.titleZh}</h3>
                                    <p className="mt-1 text-xs font-medium text-slate-500">{chapter.title}</p>
                                    <p className="mt-4 min-h-12 text-sm leading-6 text-slate-400">{chapter.description}</p>
                                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold">
                                        <span className="text-slate-300">{chapterSessions.length} sessions</span>
                                        <span className={completeCount > 0 ? "text-teal-200" : "text-slate-500"}>
                                            {completeCount > 0 ? `${completeCount} 已完成` : "索引已建立"}
                                        </span>
                                    </div>
                                    <ArrowUpRight className="absolute bottom-5 right-5 h-4 w-4 text-slate-600 transition group-hover:text-white" />
                                    <span className="sr-only">第 {index + 1} 章</span>
                                </button>
                            )
                        })}
                    </div>
                </section>

                <section>
                    <div className="mb-8 flex items-end justify-between gap-4">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">Published first</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">腎上腺章｜已整理內容</h2>
                        </div>
                        <div className="hidden items-center gap-2 text-sm text-slate-400 md:flex">
                            <BookOpenCheck className="h-4 w-4 text-teal-300" />
                            5 個完整 session · 8 段錄影筆記
                        </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-3">
                        {ENDO_2026_ARTICLES.map((article) => {
                            const isReady = article.status !== "in-production"
                            const card = (
                                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1d2b] transition duration-300 hover:-translate-y-1 hover:border-white/25">
                                    <div className="relative aspect-video overflow-hidden bg-slate-900">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={article.coverImage}
                                            alt={`${article.code} ${article.title}`}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1d2b] via-transparent to-transparent" />
                                        <div className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-[11px] font-bold ${statusStyles[article.status]}`}>
                                            {article.statusLabel}
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="text-xs font-black tracking-[0.2em] text-orange-300">{article.code}</div>
                                        <h3 className="mt-3 text-xl font-bold leading-snug text-white">{article.titleZh}</h3>
                                        <p className="mt-2 text-xs font-medium leading-5 text-slate-500">{article.title}</p>
                                        <p className="mt-4 text-sm leading-6 text-slate-300">{article.summary}</p>
                                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-5 text-xs">
                                            <span className="text-slate-400">{article.speaker}</span>
                                            {isReady ? (
                                                <span className="inline-flex items-center gap-1 font-bold text-teal-200">
                                                    開始閱讀 <ArrowRight className="h-3.5 w-3.5" />
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 font-semibold text-amber-200">
                                                    <Clock3 className="h-3.5 w-3.5" /> 校對中
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            )

                            return isReady ? (
                                <Link key={article.slug} href={`/endo-2026/${article.slug}`} className="block h-full">
                                    {card}
                                </Link>
                            ) : (
                                <div key={article.slug}>{card}</div>
                            )
                        })}
                    </div>
                </section>

                <section id="session-index" className="scroll-mt-24">
                    <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 md:p-8">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
                                    <LibraryBig className="h-4 w-4" /> Complete index
                                </div>
                                <h2 className="mt-3 text-3xl font-black tracking-tight text-white">138 場完整 Session 索引</h2>
                            </div>
                            <label className="relative block w-full lg:max-w-md">
                                <span className="sr-only">搜尋場次</span>
                                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                                <input
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder="搜尋代碼、標題或主題…"
                                    className="h-12 w-full rounded-2xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-teal-300/50 focus:ring-2 focus:ring-teal-300/10"
                                />
                            </label>
                        </div>

                        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
                            <button
                                type="button"
                                onClick={() => setSelectedChapter("all")}
                                className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${selectedChapter === "all" ? "bg-white text-slate-950" : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"}`}
                            >
                                全部章節
                            </button>
                            {ENDO_2026_CHAPTERS.map((chapter) => (
                                <button
                                    key={chapter.slug}
                                    type="button"
                                    onClick={() => setSelectedChapter(chapter.slug)}
                                    className={`shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${selectedChapter === chapter.slug ? "bg-teal-300 text-slate-950" : "border border-white/10 bg-white/5 text-slate-400 hover:text-white"}`}
                                >
                                    {chapter.shortLabel} · {chapter.titleZh}
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 space-y-5">
                            {visibleChapters.map(({ chapter, sessions: chapterSessions }) => (
                                <details
                                    key={chapter.slug}
                                    open={selectedChapter !== "all" || Boolean(query)}
                                    className="group overflow-hidden rounded-2xl border border-white/10 bg-black/15"
                                >
                                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 marker:content-none">
                                        <div className="flex min-w-0 items-center gap-4">
                                            <span
                                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-black text-slate-950"
                                                style={{ backgroundColor: chapter.accent }}
                                            >
                                                {chapter.shortLabel}
                                            </span>
                                            <div className="min-w-0">
                                                <h3 className="truncate font-bold text-white">{chapter.titleZh}</h3>
                                                <p className="truncate text-xs text-slate-500">{chapter.title}</p>
                                            </div>
                                        </div>
                                        <span className="shrink-0 text-xs font-semibold text-slate-400">{chapterSessions.length} sessions</span>
                                    </summary>
                                    <div className="border-t border-white/10">
                                        {chapterSessions.map((session) => {
                                            const readyArticle = ENDO_2026_ARTICLES.find(
                                                (article) => article.code === session.code && article.status !== "in-production",
                                            )
                                            const content = (
                                                <div className="grid gap-3 border-b border-white/[0.07] px-5 py-4 last:border-0 md:grid-cols-[84px_1fr_auto] md:items-center">
                                                    <div className="font-mono text-xs font-black tracking-wider text-orange-300">{session.code}</div>
                                                    <p className="text-sm leading-6 text-slate-300">{session.title.replace(new RegExp(`\\s*\\(${session.code}\\)$`), "")}</p>
                                                    <div className="flex items-center gap-2 text-xs">
                                                        {session.status === "processed_qa_complete" ? (
                                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-300/10 px-3 py-1.5 font-bold text-teal-200">
                                                                <CheckCircle2 className="h-3.5 w-3.5" /> 已擷取
                                                            </span>
                                                        ) : (
                                                            <span className="rounded-full bg-white/5 px-3 py-1.5 font-medium text-slate-500">待整理</span>
                                                        )}
                                                        {readyArticle ? <ArrowUpRight className="h-4 w-4 text-teal-200" /> : null}
                                                    </div>
                                                </div>
                                            )

                                            return readyArticle ? (
                                                <Link key={session.code} href={`/endo-2026/${readyArticle.slug}`} className="block transition hover:bg-white/[0.035]">
                                                    {content}
                                                </Link>
                                            ) : (
                                                <div key={session.code}>{content}</div>
                                            )
                                        })}
                                    </div>
                                </details>
                            ))}

                            {visibleChapters.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-white/15 py-14 text-center text-sm text-slate-500">
                                    找不到符合「{query}」的 ENDO 2026 場次。
                                </div>
                            ) : null}
                        </div>
                    </div>
                </section>

                <section className="rounded-3xl border border-amber-200/15 bg-amber-100/[0.055] p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
                    <div>
                        <p className="text-sm font-bold text-amber-100">關於 CME credit</p>
                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                            本站是獨立研讀整理，不提供、代領或登錄 CME credit。請在 Endocrine Society 官方課程平台完成各章內容與 evaluation 後，再依官方流程申請學分。
                        </p>
                    </div>
                    <a
                        href={ENDO_2026_OFFICIAL_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-200/20 px-5 py-3 text-sm font-bold text-amber-100 transition hover:bg-amber-100/10 md:mt-0"
                    >
                        前往官方平台 <ExternalLink className="h-4 w-4" />
                    </a>
                </section>
            </main>
        </div>
    )
}
