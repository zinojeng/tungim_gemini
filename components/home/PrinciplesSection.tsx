interface Principle {
  num: string;
  title: string;
  body: string;
}

const PRINCIPLES: Principle[] = [
  {
    num: "I",
    title: "逐字呈現，不做摘要。",
    body: "演講現場的完整內容：口述、投影片、問答。AI 只整理結構，文字仍是講者的原話。",
  },
  {
    num: "II",
    title: "一個強調色，勝過四個。",
    body: "整站只用一種深臨床青與一個暖色輔助。分類靠文字和邊框，不靠色彩記憶。",
  },
  {
    num: "III",
    title: "口述 + 投影片，一次讀完。",
    body: "不只有逐字稿。講者的投影片也會一併整理進筆記，一份文本就讀到全部現場資訊。",
  },
  {
    num: "IV",
    title: "安靜地讀。",
    body: "沒有強制推播、沒有行銷彈跳。開啟頁面的第一秒就能讀到內容。",
  },
];

export function PrinciplesSection() {
  return (
    <section className="border-b border-hair">
      <div className="mx-auto max-w-[1240px] px-6 py-14 md:px-10 md:py-20">
        <header className="mb-10 grid gap-6 md:grid-cols-[1fr_2fr]">
          <p className="kicker text-ink-muted">§ V · 主張 · Principles</p>
          <p className="max-w-[62ch] font-serif text-[22px] italic leading-[1.3] tracking-tightish text-ink md:text-[26px]">
            我們希望 MedNote
            讀起來像一份被編輯過的出版品 — 每一個區塊、每一條分隔線、每一個字級都是決定，不是裝飾。
          </p>
        </header>

        <ol className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <li
              key={p.num}
              className="flex gap-6 border-t border-hair pt-6"
            >
              <span className="font-serif text-[32px] leading-none tracking-tighter2 text-editorial md:text-[40px]">
                {p.num}
              </span>
              <div>
                <h3 className="font-serif text-[20px] leading-tight tracking-tighter2 text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                  {p.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
