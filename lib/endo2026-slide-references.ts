export interface EndoSlideReference {
    talk?: number
    slide: number
    endSlide?: number
}

interface HeadingSlideReference extends EndoSlideReference {
    startsWith: string
}

export interface EndoSlideDecorationOptions {
    code: string
    slideNumbers: number[]
    fixedTalk?: number
    presentationLocal?: boolean
}

const HEADING_SLIDE_REFERENCES: Record<string, HeadingSlideReference[]> = {
    MTP37: [
        { startsWith: "1. 開場與學習目標", slide: 1 },
    ],
    MTP26: [
        { startsWith: "1. 導言、學習目標", slide: 3, endSlide: 4 },
        { startsWith: "2. MACS 的臨床定義", slide: 5, endSlide: 6 },
        { startsWith: "現場互動問題一", slide: 8, endSlide: 13 },
        { startsWith: "3. 腎上腺偶發瘤的初診", slide: 14, endSlide: 20 },
        { startsWith: "臨床案例 1（Case 1）", slide: 14, endSlide: 17 },
        { startsWith: "4. 1 mg 地塞米松", slide: 21, endSlide: 23 },
        { startsWith: "年齡對 1mg-DST", slide: 22, endSlide: 23 },
        { startsWith: "5. MACS 與全因死亡率", slide: 24, endSlide: 36 },
        { startsWith: "死亡率數據深入剖析", slide: 25, endSlide: 36 },
        { startsWith: "6. 臨床案例 1 之延伸", slide: 37, endSlide: 49 },
        { startsWith: "病例 1，情境 1", slide: 37, endSlide: 41 },
        { startsWith: "病例 1，情境 2", slide: 42, endSlide: 46 },
        { startsWith: "臨床珠磯與鑑別診斷", slide: 47, endSlide: 49 },
        { startsWith: "7. 臨床案例 2", slide: 50, endSlide: 64 },
        { startsWith: "臨床案例 2（Case 2", slide: 50, endSlide: 54 },
        { startsWith: "手術治療 MACS", slide: 55, endSlide: 64 },
        { startsWith: "8. 手術圍術期管理", slide: 65, endSlide: 70 },
        { startsWith: "手術醫療品質", slide: 65, endSlide: 67 },
        { startsWith: "雙側腎上腺病灶", slide: 68, endSlide: 69 },
        { startsWith: "美國公共衛生", slide: 70 },
        { startsWith: "9. 針對皮質醇本身", slide: 71, endSlide: 75 },
        { startsWith: "10. 結論與臨床實務", slide: 76 },
        { startsWith: "現場問答", slide: 77 },
    ],
    MTP39: [
        { startsWith: "演講開場與主題", slide: 2, endSlide: 4 },
        { startsWith: "第一區塊｜術後腎上腺", slide: 4, endSlide: 17 },
        { startsWith: "發生率（Prevalence）", slide: 5, endSlide: 7 },
        { startsWith: "臨床病例 1 與病例 2", slide: 8, endSlide: 9 },
        { startsWith: "現場互動問題 1", slide: 11, endSlide: 15 },
        { startsWith: "HPA 軸功能恢復時間", slide: 16, endSlide: 17 },
        { startsWith: "第二區塊｜手術治癒", slide: 18, endSlide: 39 },
        { startsWith: "臨床病例 3 與病例 4", slide: 19, endSlide: 30 },
        { startsWith: "現場互動問題 2", slide: 21, endSlide: 24 },
        { startsWith: "現場互動問題 3", slide: 27, endSlide: 30 },
        { startsWith: "鑑別診斷：皮質醇撤退", slide: 31, endSlide: 32 },
        { startsWith: "庫欣氏症候群中的精神障礙", slide: 33, endSlide: 34 },
        { startsWith: "管理 GWS 的 8 大", slide: 35, endSlide: 36 },
        { startsWith: "病例 3 與病例 4 之最終", slide: 37, endSlide: 39 },
        { startsWith: "第三區塊｜手術前無症狀", slide: 40, endSlide: 50 },
        { startsWith: "臨床病例 5", slide: 41 },
        { startsWith: "現場互動問題 4", slide: 42, endSlide: 45 },
        { startsWith: "圍手術期糖皮質素", slide: 46, endSlide: 50 },
        { startsWith: "第四區塊｜終點線", slide: 51, endSlide: 62 },
        { startsWith: "病例 5 隨訪", slide: 52 },
        { startsWith: "現場互動問題 5", slide: 53, endSlide: 56 },
        { startsWith: "陷阱剖析：皮質醇", slide: 58, endSlide: 59 },
        { startsWith: "病例 5 之最終", slide: 57 },
        { startsWith: "術後替代治療減量", slide: 60, endSlide: 61 },
        { startsWith: "現場問答", slide: 63 },
    ],
    ORF05: [
        { talk: 1, startsWith: "國際真實世界研究", slide: 1, endSlide: 5 },
        { talk: 1, startsWith: "1. 研究背景與目的", slide: 3, endSlide: 6 },
        { talk: 1, startsWith: "2. 研究設計與收案", slide: 7, endSlide: 10 },
        { talk: 1, startsWith: "3. 病患基線特徵", slide: 11, endSlide: 15 },
        { talk: 1, startsWith: "4. Osilodrostat 治療", slide: 16, endSlide: 23 },
        { talk: 1, startsWith: "5. 主要療效分析", slide: 24, endSlide: 28 },
        { talk: 1, startsWith: "6. 療效反應預測", slide: 29, endSlide: 35 },
        { talk: 1, startsWith: "7. 心血管與代謝", slide: 36, endSlide: 38 },
        { talk: 1, startsWith: "8. 安全性分析", slide: 39, endSlide: 41 },
        { talk: 1, startsWith: "9. 演講結論", slide: 42, endSlide: 43 },
        { talk: 1, startsWith: "現場問答", slide: 43 },
        { talk: 2, startsWith: "轉移性腎上腺皮質癌", slide: 1, endSlide: 4 },
        { talk: 2, startsWith: "1. 研究背景與目的", slide: 2, endSlide: 4 },
        { talk: 2, startsWith: "2. 研究方法與收案", slide: 5, endSlide: 8 },
        { talk: 2, startsWith: "3. 病患臨床與腫瘤", slide: 9, endSlide: 11 },
        { talk: 2, startsWith: "4. 多模態治療歷程", slide: 12, endSlide: 16 },
        { talk: 2, startsWith: "5. 結論與未來", slide: 17, endSlide: 20 },
        { talk: 2, startsWith: "現場問答", slide: 21 },
    ],
    ORF13: [
        { talk: 1, startsWith: "雙重 TP53 與 MYC", slide: 1, endSlide: 4 },
        { talk: 1, startsWith: "一、 研究背景", slide: 3, endSlide: 4 },
        { talk: 1, startsWith: "二、 研究目的", slide: 5, endSlide: 6 },
        { talk: 1, startsWith: "三、 整體研究對象", slide: 7 },
        { talk: 1, startsWith: "四、 十大傳導通路", slide: 8 },
        { talk: 1, startsWith: "五、 分組分析", slide: 9 },
        { talk: 1, startsWith: "六、 完全手術切除", slide: 10 },
        { talk: 1, startsWith: "七、 五年整體存活", slide: 11 },
        { talk: 1, startsWith: "八、 基因轉錄組", slide: 12, endSlide: 14 },
        { talk: 1, startsWith: "九、 基因集富集", slide: 15, endSlide: 16 },
        { talk: 1, startsWith: "十、 結論與未來", slide: 17 },
        { talk: 1, startsWith: "現場問答", slide: 18, endSlide: 22 },
        { talk: 2, startsWith: "原發性色素沉著結節性", slide: 1 },
        { talk: 3, startsWith: "嗜鉻細胞瘤與副神經節瘤", slide: 1, endSlide: 2 },
        { talk: 3, startsWith: "臨床痛點與研究背景", slide: 1, endSlide: 2 },
        { talk: 3, startsWith: "研究隊列與定量", slide: 3 },
        { talk: 3, startsWith: "NBS 預估分數", slide: 4 },
        { talk: 3, startsWith: "研究結果：臨床特徵", slide: 5, endSlide: 8 },
        { talk: 3, startsWith: "研究結果：NBS", slide: 9, endSlide: 10 },
        { talk: 3, startsWith: "臨床應用價值", slide: 11, endSlide: 12 },
        { talk: 3, startsWith: "現場問答", slide: 13 },
    ],
}

function makeSlideReferenceHref(reference: EndoSlideReference) {
    const talk = reference.talk ? `-t${reference.talk}` : ""
    const end = reference.endSlide ? `-e${reference.endSlide}` : ""
    return `#endo-slide-ref${talk}-s${reference.slide}${end}`
}

function makeSlideReferenceLabel(reference: EndoSlideReference, sectionRange = false) {
    const talk = reference.talk ? `Talk ${reference.talk} · ` : ""
    const slides = reference.endSlide && reference.endSlide !== reference.slide
        ? `Slides ${reference.slide}–${reference.endSlide}`
        : `Slide ${reference.slide}`
    return `對照${sectionRange ? "本章 " : " "}${talk}${slides}`
}

function getHeadingReference(
    code: string,
    talk: number | undefined,
    heading: string,
    slideNumbers: number[],
    presentationLocal: boolean,
) {
    if (slideNumbers.length === 0) return undefined

    const reference = HEADING_SLIDE_REFERENCES[code]?.find((candidate) => {
        const sameTalk = presentationLocal
            || candidate.talk === undefined
            || candidate.talk === talk
        return sameTalk && heading.startsWith(candidate.startsWith)
    })

    if (!reference || reference.slide > slideNumbers.at(-1)!) return undefined

    const start = slideNumbers.find((slide) => slide >= reference.slide)
    if (start === undefined) return undefined
    const requestedEnd = reference.endSlide
    const end = requestedEnd
        ? slideNumbers.filter((slide) => slide >= start && slide <= requestedEnd).at(-1)
        : undefined

    return {
        talk: presentationLocal ? undefined : (reference.talk ?? talk),
        slide: start,
        endSlide: end && end > start ? end : undefined,
    }
}

function sectionTextWeight(lines: string[], start: number, end: number) {
    const text = lines
        .slice(start, end)
        .join(" ")
        .replace(/<[^>]+>/g, " ")
        .replace(/!?\[[^\]]*\]\([^)]*\)/g, " ")
        .replace(/[*_`#>|~-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()

    return Math.max(1, [...text].length)
}

function buildSectionSlideRanges(lines: string[], slideNumbers: number[]) {
    const headings = lines.flatMap((line, lineIndex) => {
        const match = line.match(/^###\s+(.+?)\s*$/)
        return match ? [{ lineIndex, heading: match[1] }] : []
    })
    const ranges = new Map<number, EndoSlideReference>()
    if (slideNumbers.length === 0 || headings.length === 0) return ranges

    const weights = headings.map((heading, index) => {
        const end = headings[index + 1]?.lineIndex ?? lines.length
        return sectionTextWeight(lines, heading.lineIndex + 1, end)
    })
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
    let consumedWeight = 0

    headings.forEach((heading, index) => {
        const startIndex = Math.min(
            slideNumbers.length - 1,
            Math.floor((consumedWeight / totalWeight) * slideNumbers.length),
        )
        consumedWeight += weights[index]
        const endIndex = Math.max(
            startIndex,
            Math.min(
                slideNumbers.length - 1,
                Math.ceil((consumedWeight / totalWeight) * slideNumbers.length) - 1,
            ),
        )
        const start = slideNumbers[startIndex]
        const end = slideNumbers[endIndex]
        ranges.set(heading.lineIndex, {
            slide: start,
            endSlide: end > start ? end : undefined,
        })
    })

    return ranges
}

export function decorateEndoSlideReferences(
    markdown: string,
    {
        code,
        slideNumbers: rawSlideNumbers,
        fixedTalk,
        presentationLocal = false,
    }: EndoSlideDecorationOptions,
) {
    const lines = markdown.split("\n")
    const slideNumbers = [...new Set(rawSlideNumbers)].sort((left, right) => left - right)
    const sectionRanges = buildSectionSlideRanges(lines, slideNumbers)
    let currentTalk: number | undefined = code.startsWith("ORF") && !presentationLocal
        ? (fixedTalk ?? 0)
        : fixedTalk

    return lines
        .flatMap((line, lineIndex) => {
            const headingMatch = line.match(/^(#{2,4})\s+(.+?)\s*$/)

            if (headingMatch) {
                const level = headingMatch[1].length
                const heading = headingMatch[2].replace(/[*_`]/g, "").trim()

                if (
                    code.startsWith("ORF")
                    && !presentationLocal
                    && fixedTalk === undefined
                    && level === 2
                ) {
                    currentTalk = (currentTalk ?? 0) + 1
                }

                const explicitSlide = heading.match(/^Slides?\s+0*(\d+)(?:\s*[–—-]\s*0*(\d+))?/i)
                const explicitReference = explicitSlide
                    ? {
                        talk: presentationLocal ? undefined : currentTalk,
                        slide: Number(explicitSlide[1]),
                        endSlide: explicitSlide[2] ? Number(explicitSlide[2]) : undefined,
                    }
                    : undefined
                const configuredReference = getHeadingReference(
                    code,
                    currentTalk,
                    heading,
                    slideNumbers,
                    presentationLocal,
                )
                const sectionReference = level === 3
                    ? sectionRanges.get(lineIndex)
                    : undefined
                const reference = explicitReference ?? configuredReference ?? sectionReference

                if (reference && slideNumbers.includes(reference.slide)) {
                    const isSectionRange = !explicitReference && !configuredReference
                    const link = `[${makeSlideReferenceLabel(reference, isSectionRange)}](${makeSlideReferenceHref(reference)})`
                    return [line, "", link]
                }
            }

            const bulletSlide = line.match(/^(\s*[-*+]\s+)\*\*(Slides?\s+0*(\d+)(?:\s*[–—-]\s*0*(\d+))?)\*\*(.*)$/i)
            if (bulletSlide) {
                const reference: EndoSlideReference = {
                    talk: presentationLocal ? undefined : currentTalk,
                    slide: Number(bulletSlide[3]),
                    endSlide: bulletSlide[4] ? Number(bulletSlide[4]) : undefined,
                }
                return `${bulletSlide[1]}**[${bulletSlide[2]}](${makeSlideReferenceHref(reference)})**${bulletSlide[5]}`
            }

            return line
        })
        .join("\n")
}

export function parseEndoSlideReference(href?: string): EndoSlideReference | undefined {
    const match = href?.match(/^#endo-slide-ref(?:-t(\d+))?-s(\d+)(?:-e(\d+))?$/)
    if (!match) return undefined

    return {
        talk: match[1] ? Number(match[1]) : undefined,
        slide: Number(match[2]),
        endSlide: match[3] ? Number(match[3]) : undefined,
    }
}

export function getEndoSlideNumber(slide: string, fallbackIndex: number) {
    const match = slide.match(/slide_0*(\d+)/i)
    return match ? Number(match[1]) : fallbackIndex + 1
}

export function findEndoSlideIndex(slides: string[], reference: EndoSlideReference) {
    const talkPattern = reference.talk ? `talk0*${reference.talk}_` : ""
    const pattern = new RegExp(`${talkPattern}slide_0*${reference.slide}(?:_|\\.)`, "i")
    return slides.findIndex((slide) => pattern.test(slide))
}
