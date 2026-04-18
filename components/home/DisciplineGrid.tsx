import Link from "next/link";

interface Discipline {
  href: string;
  label: string;
  labelEn: string;
  blurb: string;
  /** Rendered as serif number kicker. */
  num: string;
}

// Hard-coded for now — these mirror the four editorial sections the journal
// actually covers. Once the DB categories stabilise we can derive counts
// dynamically; order stays fixed so the grid reads like a masthead.
// Labels mirror the admin CATEGORIES list. URLs use ?search= because that is
// what the /lectures page currently honours (ILIKE against title/category/
// subcategory). Adjust both together if the listing page gains a real
// ?category= filter.
const DISCIPLINES: Discipline[] = [
  {
    href: "/lectures?search=Diabetes",
    label: "糖尿病",
    labelEn: "Diabetes",
    blurb:
      "Type 1 / Type 2 / GDM；GLP-1、SGLT2i、雙激動劑的臨床取捨與長期資料。",
    num: "01",
  },
  {
    href: "/lectures?search=Endocrinology",
    label: "內分泌",
    labelEn: "Endocrinology",
    blurb:
      "甲狀腺、腎上腺、腦下垂體、骨鈣代謝；內分泌疾病的鑑別診斷與用藥實務。",
    num: "02",
  },
  {
    href: "/lectures?search=Internal+Medicine",
    label: "一般內科",
    labelEn: "Internal Medicine",
    blurb:
      "心血管、腎、消化、風濕免疫、感染；跨次專科的一般內科臨床教學。",
    num: "03",
  },
  {
    href: "/lectures?search=Other",
    label: "其他主題",
    labelEn: "Other Topics",
    blurb: "跨科、工作坊、AI 臨床應用，以及尚未歸類的講題。",
    num: "04",
  },
];

export function DisciplineGrid() {
  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-16">
        <header className="mb-8 flex items-baseline justify-between">
          <p className="kicker text-ink-muted">§ II · 學科 · Disciplines</p>
          <Link
            href="/lectures"
            className="text-[13px] text-ink-muted transition-colors hover:text-ink"
          >
            看全部 →
          </Link>
        </header>

        <ul className="grid grid-cols-1 border-t border-hair sm:grid-cols-2 lg:grid-cols-4">
          {DISCIPLINES.map((d) => (
            <li key={d.href} className="border-b border-hair lg:border-b-0">
              <Link
                href={d.href}
                className="group flex h-full flex-col justify-between gap-8 border-r-0 p-6 transition-colors hover:bg-chip sm:border-r sm:border-hair sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0"
              >
                <div>
                  <p className="font-mono text-[11px] tracking-wider text-ink-muted">
                    {d.num}
                  </p>
                  <h3 className="mt-4 font-serif text-[28px] leading-tight tracking-tighter2 text-ink transition-colors group-hover:text-editorial">
                    {d.label}
                  </h3>
                  <p className="mt-1 kicker text-ink-muted">{d.labelEn}</p>
                </div>
                <p className="text-[13.5px] leading-relaxed text-ink-muted">
                  {d.blurb}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
