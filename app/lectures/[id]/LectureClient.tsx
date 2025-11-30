"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { cn } from "@/lib/utils"

interface LectureClientProps {
    lecture: any
    transcript: any
    summary: any
    slides: any[]
}

export function LectureClient({ lecture, transcript, summary, slides }: LectureClientProps) {
    const [activeTab, setActiveTab] = useState("summary")
    const [activeSlideId, setActiveSlideId] = useState<string | null>(null)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)
    const [hoveredSlide, setHoveredSlide] = useState<{ url: string, top: number } | null>(null)
    const observerRefs = useRef<{ [key: string]: IntersectionObserverEntry }>({})

    // Scroll to specific slide
    const scrollToSlide = (slideId: string) => {
        setActiveTab("slides")
        // Small timeout to allow Tab content to render
        setTimeout(() => {
            const element = document.getElementById(slideId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
                setActiveSlideId(slideId)
            }
        }, 100)
    }

    // Intersection Observer for Scroll Sync
    useEffect(() => {
        if (activeTab !== "slides" || !slides || slides.length === 0) return

        const callback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                observerRefs.current[entry.target.id] = entry
            })

            // Find the most visible slide
            const visibleSlides = Object.values(observerRefs.current).filter(entry => entry.isIntersecting)

            if (visibleSlides.length > 0) {
                // Sort by intersection ratio (most visible first)
                visibleSlides.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
                setActiveSlideId(visibleSlides[0].target.id)
            }
        }

        const observer = new IntersectionObserver(callback, {
            root: null,
            rootMargin: "-20% 0px -20% 0px", // Trigger when element is in the middle 60% of viewport
            threshold: [0, 0.5, 1]
        })

        slides.forEach((_, index) => {
            const element = document.getElementById(`slide-${index}`)
            if (element) observer.observe(element)
        })

        return () => observer.disconnect()
    }, [activeTab, slides])

    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Sidebar / Outline */}
            <aside className="w-80 border-r bg-muted/10 hidden md:flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="font-semibold">Outline</h2>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Content</h3>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-auto whitespace-normal text-left",
                                    activeTab === "summary" && "bg-accent"
                                )}
                                onClick={() => setActiveTab("summary")}
                            >
                                Summary
                            </Button>
                            {transcript && (
                                <Button
                                    variant="ghost"
                                    className={cn(
                                        "w-full justify-start h-auto whitespace-normal text-left",
                                        activeTab === "transcript" && "bg-accent"
                                    )}
                                    onClick={() => setActiveTab("transcript")}
                                >
                                    Transcript
                                </Button>
                            )}
                            {slides && slides.length > 0 && (
                                <>
                                    <Button
                                        variant="ghost"
                                        className={cn(
                                            "w-full justify-start h-auto whitespace-normal text-left",
                                            activeTab === "slides" && !activeSlideId && "bg-accent"
                                        )}
                                        onClick={() => {
                                            setActiveTab("slides")
                                            setActiveSlideId(null)
                                        }}
                                    >
                                        Slides
                                    </Button>

                                    {/* Sub-list for individual slides */}
                                    <div className="pl-4 mt-2 border-l ml-2 flex flex-col gap-2">
                                        {slides.map((slide, index) => (
                                            <div
                                                key={slide.id}
                                                className={cn(
                                                    "w-full text-left cursor-pointer rounded-md border transition-all hover:bg-accent hover:text-accent-foreground overflow-hidden group",
                                                    activeSlideId === `slide-${index}` && activeTab === "slides" ? "bg-accent text-accent-foreground ring-1 ring-primary/20" : "bg-card text-muted-foreground border-transparent hover:border-border"
                                                )}
                                                onClick={() => scrollToSlide(`slide-${index}`)}
                                                onMouseEnter={(e) => slide.imageUrl && setHoveredSlide({ url: slide.imageUrl, top: e.currentTarget.getBoundingClientRect().top })}
                                                onMouseLeave={() => setHoveredSlide(null)}
                                            >
                                                <div className="w-full relative">
                                                    {slide.imageUrl ? (
                                                        // eslint-disable-next-line @next/next/no-img-element
                                                        <img
                                                            src={slide.imageUrl}
                                                            alt={`Slide ${index + 1}`}
                                                            className="w-full h-auto object-contain block"
                                                            onError={(e) => {
                                                                e.currentTarget.style.display = 'none'
                                                                const parent = e.currentTarget.parentElement
                                                                if (parent) {
                                                                    parent.classList.add('h-20', 'bg-muted', 'flex', 'items-center', 'justify-center')
                                                                    const span = document.createElement('span')
                                                                    span.className = 'text-xs text-muted-foreground'
                                                                    span.innerText = 'No Image'
                                                                    parent.appendChild(span)
                                                                }
                                                            }}
                                                        />
                                                    ) : (
                                                        <div className="w-full h-20 bg-muted flex items-center justify-center">
                                                            <span className="text-xs text-muted-foreground">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-2 flex justify-between items-center text-xs border-t bg-muted/20">
                                                    <span className="font-medium truncate">Slide {index + 1}</span>
                                                    {slide.timestampSeconds !== null && slide.timestampSeconds > 0 && (
                                                        <span className="text-[10px] opacity-70 font-mono">
                                                            {new Date(slide.timestampSeconds * 1000).toISOString().substr(14, 5)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto p-6 pb-24" id="main-scroll-area">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            {lecture.coverImage && (
                                <div className="mb-6 rounded-lg overflow-hidden shadow-md aspect-video relative">
                                    <img
                                        src={lecture.coverImage}
                                        alt={lecture.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            {lecture.category && (
                                <Badge className="mb-2">{lecture.category}</Badge>
                            )}
                            <h1 className="text-3xl font-bold mb-2">{lecture.title}</h1>
                            <p className="text-muted-foreground">
                                {lecture.provider || 'Unknown'} • {lecture.publishDate ? new Date(lecture.publishDate).toISOString().split('T')[0] : 'Unknown Date'}
                            </p>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="summary">Summary</TabsTrigger>
                                {transcript && <TabsTrigger value="transcript">Transcript</TabsTrigger>}
                                {slides && slides.length > 0 && <TabsTrigger value="slides">Slides</TabsTrigger>}
                            </TabsList>

                            <TabsContent value="summary" className="mt-6">
                                {summary ? (
                                    <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-p:text-base prose-p:leading-7 prose-li:text-base prose-ul:my-4 prose-ol:my-4 prose-li:my-1">
                                        {summary.keyTakeaways && Array.isArray(summary.keyTakeaways) && summary.keyTakeaways.length > 0 ? (
                                            <div>
                                                <h2>Key Takeaways</h2>
                                                <ul>
                                                    {summary.keyTakeaways.map((item: any, idx: number) => (
                                                        <li key={idx}>{String(item)}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ) : null}

                                        {summary.fullMarkdownContent && (
                                            <div>
                                                <div>
                                                    <ReactMarkdown
                                                        rehypePlugins={[rehypeRaw, rehypeKatex]}
                                                        remarkPlugins={[remarkGfm, remarkMath]}
                                                    >
                                                        {summary.fullMarkdownContent}
                                                    </ReactMarkdown>
                                                </div>
                                            </div>
                                        )}
                                    </article>
                                ) : (
                                    <div className="text-center py-12 text-muted-foreground">
                                        <p>No summary available for this lecture.</p>
                                    </div>
                                )}
                            </TabsContent>

                            {transcript && (
                                <TabsContent value="transcript" className="mt-6">
                                    <article className="prose prose-slate dark:prose-invert max-w-none">
                                        <div className="whitespace-pre-wrap leading-relaxed text-base">
                                            {transcript.content || 'No transcript available.'}
                                        </div>
                                    </article>
                                </TabsContent>
                            )}

                            {slides && slides.length > 0 && (
                                <TabsContent value="slides" className="mt-6">
                                    <div className="grid grid-cols-1 gap-4">
                                        {slides.map((slide, index) => (
                                            <div
                                                key={slide.id}
                                                id={`slide-${index}`}
                                                className="border rounded-lg overflow-hidden bg-card scroll-mt-24 group cursor-pointer transition-all hover:ring-2 hover:ring-primary/50"
                                                onClick={() => slide.imageUrl && setSelectedImage(slide.imageUrl)}
                                            >
                                                <div className="aspect-video relative bg-black/5">
                                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                                    <img
                                                        src={slide.imageUrl || ''}
                                                        alt={`Slide ${index + 1}`}
                                                        className="object-contain w-full h-full"
                                                        loading="lazy"
                                                    />
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                                                        <span className="opacity-0 group-hover:opacity-100 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium transition-opacity">
                                                            View Full Size
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-3 flex justify-between items-center border-t bg-muted/5">
                                                    <span className="font-medium text-sm">Slide {index + 1}</span>
                                                    {slide.timestampSeconds !== null && (
                                                        <span className="text-sm text-muted-foreground font-mono">
                                                            {new Date(slide.timestampSeconds * 1000).toISOString().substr(11, 8)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TabsContent>
                            )}
                        </Tabs>
                    </div>
                </div>
            </main>

            {/* Hover Zoom Overlay */}
            {hoveredSlide && (
                <div
                    className="fixed left-80 z-50 bg-background border shadow-xl rounded-lg overflow-hidden pointer-events-none"
                    style={{
                        top: Math.max(10, Math.min(hoveredSlide.top - 100, window.innerHeight - 500)),
                        maxWidth: '600px',
                        width: 'auto'
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={hoveredSlide.url}
                        alt="Slide Preview"
                        className="w-auto h-auto max-w-[600px] max-h-[60vh] object-contain"
                    />
                </div>
            )}

            {/* Lightbox Dialog */}
            <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
                <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-transparent border-none shadow-none">
                    <DialogTitle className="sr-only">Slide View</DialogTitle>
                    <div className="relative w-full h-[80vh] flex items-center justify-center" onClick={() => setSelectedImage(null)}>
                        {selectedImage && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={selectedImage}
                                alt="Full size slide"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
