import Link from "next/link";

interface FooterSection {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
}

const SECTIONS: FooterSection[] = [
  {
    title: "學科 · Disciplines",
    items: [
      { label: "糖尿病 · Diabetes", href: "/lectures?search=Diabetes" },
      { label: "內分泌 · Endocrinology", href: "/lectures?search=Endocrinology" },
      { label: "一般內科 · Internal Medicine", href: "/lectures?search=Internal+Medicine" },
      { label: "其他主題 · Other", href: "/lectures?search=Other" },
    ],
  },
  {
    title: "會議 · Conferences",
    items: [
      { label: "ADA 2026 Scientific Sessions", href: "/ada-2026" },
      { label: "AOCE 2026", href: "/aoce-2026" },
      { label: "糖尿病 AI 專題", href: "/diabetes-ai" },
    ],
  },
  {
    title: "關於 · About",
    items: [
      { label: "編輯主張", href: "/about" },
      { label: "覆核流程", href: "/about#review" },
      {
        label: "GitHub Repo",
        href: "https://github.com/zinojeng/tungim_gemini",
        external: true,
      },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-hair bg-paper">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-serif text-2xl tracking-tighter2 text-ink">
                MedNote
              </span>
              <span className="kicker text-ink-muted">AI · est. 2025</span>
            </Link>
            <p className="mt-4 max-w-sm text-[13.5px] leading-relaxed text-ink-muted">
              臨床演講的安靜筆記。不做摘要、不挑重點，整場完整寫下來，讓你慢慢讀。
            </p>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title}>
              <p className="kicker text-ink-muted">{section.title}</p>
              <ul className="mt-3 space-y-2">
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13.5px] text-ink transition-colors hover:text-editorial"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-[13.5px] text-ink transition-colors hover:text-editorial"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-hair pt-6 text-[12px] text-ink-muted md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} MedNote AI ·
            <span className="ml-1">
              內容僅供專業醫療人員臨床教育參考，不構成個別病患醫療建議。
            </span>
          </p>
          <p className="kicker">Quiet reading, since 2025.</p>
        </div>
      </div>
    </footer>
  );
}
