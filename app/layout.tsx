import type { Metadata } from "next";
import {
  Inter,
  Fraunces,
  JetBrains_Mono,
  Noto_Serif_TC,
  Noto_Sans_TC,
} from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

// Latin sans — UI body text.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Display serif — editorial headlines, issue numbers, pull-quotes.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  // Slight optical adjustments for medical headline feel.
  axes: ["opsz", "SOFT"],
});

// Mono — kickers, timecodes, category tags.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Chinese sans fallback — kicks in for 繁體中文 glyphs when Inter lacks them.
const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-tc",
  display: "swap",
});

// Chinese serif fallback — matches Fraunces for editorial headlines in 中文.
const notoSerifTC = Noto_Serif_TC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedNote AI — 安靜的醫學筆記",
  description:
    "AI 起稿、醫師覆核的臨床演講筆記：糖尿病、心腎代謝、內分泌。像《新英格蘭醫學雜誌》的數位版，但更安靜。",
};

// Inline bootstrap: apply `dark` class BEFORE paint, so we never flash white
// into a dark-mode user. Pure DOM mutation — no React state, SSR-safe.
const themeBootstrapScript = `
(function(){
  try {
    var saved = localStorage.getItem('mednote-theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var dark = saved ? saved === 'dark' : prefersDark;
    if (dark) document.documentElement.classList.add('dark');
  } catch(e){}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <head>
        <script
          // Runs before React hydration, so class is set before first paint.
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-paper text-ink font-sans antialiased",
          inter.variable,
          fraunces.variable,
          jetbrainsMono.variable,
          notoSansTC.variable,
          notoSerifTC.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
