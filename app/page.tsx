import Link from "next/link";
import { db } from "@/lib/db";
import { siteSettings, lectures } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Lecture } from "@/types";

import { LectureCard } from "@/components/LectureCard";
import { EditorialHero } from "@/components/home/EditorialHero";
import { DisciplineGrid } from "@/components/home/DisciplineGrid";
import { FeaturedLecture } from "@/components/home/FeaturedLecture";
import { CollectionsSection } from "@/components/home/CollectionsSection";
import { PrinciplesSection } from "@/components/home/PrinciplesSection";
import {
  CommandPaletteLectureRegistrar,
  type CommandItem,
} from "@/components/CommandPalette";

// Force dynamic rendering — same as before the redesign. Lectures come from DB,
// not build time.
export const dynamic = "force-dynamic";
export const revalidate = 0;

async function getData() {
  try {
    const allLectures = await db
      .select()
      .from(lectures)
      .where(eq(lectures.isPublished, true))
      .orderBy(desc(lectures.publishDate));

    const settings = await db.select().from(siteSettings);

    const settingsMap = settings.reduce(
      (acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      },
      {} as Record<string, string | null>
    );

    return {
      lectures: allLectures as Lecture[],
      settings: settingsMap,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { lectures: [] as Lecture[], settings: {} as Record<string, string | null> };
  }
}

export default async function Home() {
  const { lectures: lectureList, settings } = await getData();

  // The first lecture takes the Featured slot; the next 9 fill the grid.
  const featured = lectureList[0] ?? null;
  const gridLectures = lectureList.slice(featured ? 1 : 0, featured ? 10 : 9);

  // Feed the top ~20 published lectures into the ⌘K palette. Dynamic
  // registration happens in a tiny client component below; the server
  // just shapes the data.
  const lectureCommands: CommandItem[] = lectureList.slice(0, 20).map((l) => ({
    id: `lecture:${l.id}`,
    title: l.title,
    subtitle:
      [l.category, l.subcategory].filter(Boolean).join(" · ") || undefined,
    section: "演講",
    kind: "navigate" as const,
    href: `/lectures/${l.id}`,
    keywords: l.tags ?? undefined,
  }));

  // DB overrides still respected — /admin edits propagate.
  const heroTitle = settings["hero_title"] || null;
  const heroSubtitle = settings["hero_description"] || null;

  return (
    <>
      <CommandPaletteLectureRegistrar items={lectureCommands} />
      <EditorialHero
        title={heroTitle}
        subtitle={heroSubtitle}
        latestLecture={featured}
      />

      <DisciplineGrid />

      <FeaturedLecture lecture={featured} />

      {/* Journal grid — 3-col on desktop, 2-col on tablet, 1-col on mobile. */}
      <section className="border-b border-hair">
        <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-16">
          <header className="mb-10 flex items-baseline justify-between">
            <div>
              <p className="kicker text-ink-muted">
                § IV · 本期篇目 · This Issue
              </p>
              <h2 className="mt-3 font-serif text-[28px] leading-tight tracking-tighter2 text-ink md:text-[34px]">
                最新刊登的演講筆記
              </h2>
            </div>
            <Link
              href="/lectures"
              className="text-[13px] text-ink-muted transition-colors hover:text-ink"
            >
              看全部 →
            </Link>
          </header>

          {gridLectures.length === 0 ? (
            <div className="border border-dashed border-hair p-10 text-center">
              <p className="font-serif text-[20px] text-ink">
                尚未刊登任何演講。
              </p>
              <p className="mt-2 text-[13.5px] text-ink-muted">
                從後台新增第一則後，這裡會自動排版成期刊篇目。
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {gridLectures.map((lecture, idx) => (
                <li key={lecture.id}>
                  <LectureCard lecture={lecture} index={idx} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CollectionsSection />

      <PrinciplesSection />
    </>
  );
}
