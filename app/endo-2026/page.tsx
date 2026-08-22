import type { Metadata } from "next"
import { Endo2026Hub } from "@/components/endo2026/Endo2026Hub"
import type { EndoSession } from "@/lib/endo2026"
import sessionCatalog from "@/public/endo2026/session-catalog.json"

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://mednote.zeabur.app"
const OG_IMAGE_URL = new URL("/endo2026/og.png", SITE_URL).toString()

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: "ENDO 2026 Session Recordings｜MedNote AI",
    description: "ENDO 2026 全 12 主題、138 場 session 的繁中臨床閱讀站，收錄逐字稿、投影片解析與重點整理。",
    openGraph: {
        title: "ENDO 2026 Session Recordings｜MedNote AI",
        description: "12 個主題章節、138 場完整索引，逐場整理為可快速閱讀的繁中臨床筆記。",
        type: "website",
        url: "/endo-2026",
        images: [{ url: OG_IMAGE_URL, alt: "ENDO 2026 Session Recordings — 12 specialties, 138 sessions" }],
    },
    twitter: {
        card: "summary_large_image",
        title: "ENDO 2026 Session Recordings｜MedNote AI",
        description: "12 個主題章節、138 場完整索引，逐場整理為可快速閱讀的繁中臨床筆記。",
        images: [OG_IMAGE_URL],
    },
}

export default function Endo2026Page() {
    return <Endo2026Hub sessions={sessionCatalog.sessions as EndoSession[]} />
}
