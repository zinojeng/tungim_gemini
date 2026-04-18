import Link from "next/link";

interface Collection {
  href: string;
  title: string;
  subtitle: string;
  kicker: string;
  count: string; // display string, not a number — allows "12 篇" or "進行中"
}

const COLLECTIONS: Collection[] = [
  {
    href: "/ada-2026",
    kicker: "Special Issue",
    title: "ADA 2026 Scientific Sessions",
    subtitle:
      "June 5–8 · New Orleans。Banting Lecture、Kelly West、Norbert Freinkel、Pecoraro、Albert Renold 五大獎項現場筆記。",
    count: "特刊",
  },
  {
    href: "/lectures?category=standards-of-care",
    kicker: "Reference",
    title: "Standards of Care 2026",
    subtitle:
      "15 章糖尿病照護準則摘要：糖尿病前期、心腎代謝症候群、GLP-1 類藥物位置、CKM staging。",
    count: "15 章",
  },
  {
    href: "/diabetes-ai",
    kicker: "Topic",
    title: "糖尿病 AI · 決策支援",
    subtitle:
      "CGM 辨識、影像判讀、臨床決策支援。臨床 AI 工具在糖尿病照護中的落地案例。",
    count: "進行中",
  },
];

export function CollectionsSection() {
  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-16">
        <header className="mb-8 flex items-baseline justify-between">
          <p className="kicker text-ink-muted">§ IV · 專題 · Collections</p>
          <Link
            href="/lectures"
            className="text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            看全部 →
          </Link>
        </header>

        <ul className="grid grid-cols-1 gap-px bg-hair md:grid-cols-3">
          {COLLECTIONS.map((c) => (
            <li key={c.href} className="bg-paper">
              <Link
                href={c.href}
                className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-chip md:p-8"
              >
                <div className="flex items-start justify-between">
                  <p className="kicker text-ink-muted">{c.kicker}</p>
                  <span className="font-mono text-[11px] tracking-wider text-ink-muted">
                    {c.count}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-[24px] leading-tight tracking-tighter2 text-ink transition-colors group-hover:text-editorial">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-muted">
                    {c.subtitle}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
