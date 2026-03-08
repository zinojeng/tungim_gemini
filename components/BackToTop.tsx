"use client"

import { useState, useEffect, useCallback } from "react"
import { ArrowUp } from "lucide-react"
import { cn } from "@/lib/utils"

export function BackToTop() {
    const [visible, setVisible] = useState(false)

    const getScrollTarget = useCallback(() => {
        return document.getElementById("main-scroll-area") || null
    }, [])

    useEffect(() => {
        const onScroll = () => {
            const el = getScrollTarget()
            const scrollY = el ? el.scrollTop : window.scrollY
            setVisible(scrollY > 300)
        }

        const el = getScrollTarget()
        const target = el || window
        target.addEventListener("scroll", onScroll, { passive: true })
        return () => target.removeEventListener("scroll", onScroll)
    }, [getScrollTarget])

    const scrollToTop = () => {
        const el = getScrollTarget()
        if (el) {
            el.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={cn(
                "fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center",
                "rounded-full bg-primary text-primary-foreground shadow-lg",
                "transition-all duration-300 active:scale-90",
                "hover:bg-primary/90",
                visible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 pointer-events-none"
            )}
        >
            <ArrowUp className="h-5 w-5" />
        </button>
    )
}
