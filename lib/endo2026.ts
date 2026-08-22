import generatedEndoArticles from "@/public/endo2026/generated-articles.json"

export type EndoSessionStatus = "pending_discovery" | "processing" | "processed_qa_complete"

export interface EndoSession {
    code: string
    title: string
    status: EndoSessionStatus
}

export interface EndoChapter {
    slug: string
    shortLabel: string
    title: string
    titleZh: string
    description: string
    credits: number
    sessionCodes: string[]
    accent: string
}

export type EndoArticleStatus = "published" | "source-review" | "in-production"

export interface EndoArticle {
    slug: string
    code: string
    presentationId?: string
    title: string
    titleZh: string
    speaker: string
    summary: string
    coverImage: string
    status: EndoArticleStatus
    statusLabel: string
    primaryContentPath?: string
    transcriptPath?: string
    slidesDirectory?: string
    slideTalk?: number
    publishedAt?: string
}

export const ENDO_2026_OFFICIAL_URL =
    "https://education.endocrine.org/Public/Catalog/Details.aspx?id=0pADczWeEKm0W1m3JPdoTA%3d%3d"

export function resolveEndoAssetUrl(publicPath: string): string {
    if (/^https?:\/\//i.test(publicPath)) return publicPath
    const assetBaseUrl = process.env.NEXT_PUBLIC_ASSET_URL?.replace(/\/$/, "")
    if (!assetBaseUrl) return publicPath
    return `${assetBaseUrl}/${publicPath.replace(/^\//, "")}`
}

export const ENDO_2026_CHAPTERS: EndoChapter[] = [
    {
        slug: "adipose-obesity",
        shortLabel: "AO",
        title: "Adipose Tissue Appetite and Obesity",
        titleZh: "脂肪組織、食慾與肥胖",
        description: "脂肪生物學、肥胖藥物、營養策略與 GLP-1 治療後的長期照護。",
        credits: 12.93,
        accent: "#ef7d52",
        sessionCodes: [
            "MTP05", "MTP08", "MTP23", "MTP27", "ORF07", "ORF15", "ORF27",
            "ORF50", "ORF51", "PL05", "PL06", "SY09", "SY18", "SY57",
        ],
    },
    {
        slug: "adrenal",
        shortLabel: "AD",
        title: "Adrenal (Excluding Mineralocorticoids)",
        titleZh: "腎上腺（不含礦物皮質素）",
        description: "腎上腺功能不全、偶發瘤、腎上腺腫瘤、CAH 與術後類固醇管理。",
        credits: 10.84,
        accent: "#3bb8a5",
        sessionCodes: [
            "MTP26", "MTP37", "MTP39", "ORF05", "ORF13", "ORF25",
            "ORF32", "ORF37", "SY07", "SY37", "SY56", "SY64",
        ],
    },
    {
        slug: "bone-mineral",
        shortLabel: "BM",
        title: "Bone and Mineral Metabolism",
        titleZh: "骨骼與礦物質代謝",
        description: "骨質疏鬆、副甲狀腺疾病、低磷酸酶症與骨骼訊號傳遞。",
        credits: 14.27,
        accent: "#6f9be8",
        sessionCodes: [
            "MTP06", "MTP09", "MTP24", "MTP29", "MTP32", "ORF08", "ORF16",
            "ORF34", "ORF43", "SY10", "SY29", "SY39", "SY49", "SY66", "YI02",
        ],
    },
    {
        slug: "cardiovascular",
        shortLabel: "CV",
        title: "Cardiovascular Endocrinology",
        titleZh: "心血管內分泌學",
        description: "原發性醛固酮增多症、礦物皮質素受體、血脂與心血管風險。",
        credits: 5.93,
        accent: "#e46673",
        sessionCodes: ["MTP12", "MTP36", "ORF23", "ORF30", "ORF31", "SY24", "SY62"],
    },
    {
        slug: "diabetes-vascular",
        shortLabel: "DV",
        title: "Diabetes and Vascular Disease",
        titleZh: "糖尿病與血管疾病",
        description: "糖尿病併發症、住院血糖管理、精準監測與心腎代謝風險。",
        credits: 13.94,
        accent: "#58a9d6",
        sessionCodes: [
            "MTP15", "MTP17", "MTP20", "MTP31", "MTP40", "ORF06", "ORF14",
            "ORF26", "ORF33", "ORF42", "SY08", "SY17", "SY27", "SY38", "SY70",
        ],
    },
    {
        slug: "general-endocrinology",
        shortLabel: "GE",
        title: "General Endocrinology",
        titleZh: "一般內分泌學",
        description: "臨床病例、AI 應用、醫學教育、研究方法與內分泌學史。",
        credits: 6.5,
        accent: "#c495e8",
        sessionCodes: [
            "ELP01", "L01", "MTS03", "MTS04", "MTS05", "ORF18",
            "PD12", "PL01", "PL02", "RS01", "SY11", "SY31",
        ],
    },
    {
        slug: "neuro-pituitary",
        shortLabel: "NP",
        title: "Neuroendocrinology and Pituitary",
        titleZh: "神經內分泌與腦下垂體",
        description: "腦下垂體腫瘤、庫欣氏病、肢端肥大症與低張性多尿。",
        credits: 11.27,
        accent: "#7d8de1",
        sessionCodes: [
            "CPG02", "MC01", "MTP04", "MTP07", "MTP10", "MTP13",
            "MTP34", "MTP38", "ORF28", "ORF35", "ORF45", "SY01",
        ],
    },
    {
        slug: "pediatric-adolescent",
        shortLabel: "PA",
        title: "Pediatric and Adolescent Endocrinology",
        titleZh: "兒童與青少年內分泌學",
        description: "生長、青春期、兒童糖尿病、CAH、DSD 與轉銜照護。",
        credits: 14.43,
        accent: "#e89b55",
        sessionCodes: [
            "CPG01", "MTP11", "MTP16", "MTP19", "MTP25", "ORF03",
            "ORF10", "ORF47", "SY03", "SY14", "SY42", "SY52",
        ],
    },
    {
        slug: "receptor-signaling",
        shortLabel: "RS",
        title: "Receptor Biology and Signal Transduction",
        titleZh: "受體生物學與訊號傳遞",
        description: "核受體、類固醇受體、GPCR、免疫與環境內分泌干擾物。",
        credits: 10.75,
        accent: "#58b7a7",
        sessionCodes: [
            "ORF19", "ORF21", "ORF29", "ORF39", "ORF48",
            "SY04", "SY23", "SY43", "SY61", "YI03",
        ],
    },
    {
        slug: "reproductive",
        shortLabel: "RE",
        title: "Reproductive Endocrinology",
        titleZh: "生殖內分泌學",
        description: "PCOS、生育力、性腺功能低下、性別多元健康與生殖組織模型。",
        credits: 9.76,
        accent: "#dc7aa8",
        sessionCodes: [
            "MTP01", "MTP14", "MTP35", "MTS01", "ORF02", "ORF17", "ORF20",
            "ORF36", "ORF38", "ORF46", "SY02", "SY60", "SY67",
        ],
    },
    {
        slug: "thyroid",
        shortLabel: "TH",
        title: "Thyroid Biology and Disease",
        titleZh: "甲狀腺生物學與疾病",
        description: "甲狀腺癌、結節、TED、妊娠甲狀腺疾病與放射碘治療。",
        credits: 12.93,
        accent: "#4bb7c7",
        sessionCodes: [
            "MTP03", "MTP18", "MTP30", "MTP33", "ORF12", "ORF40",
            "ORF49", "SY06", "SY25", "SY55", "SY69", "YI01",
        ],
    },
    {
        slug: "tumor-biology",
        shortLabel: "TB",
        title: "Tumor Biology",
        titleZh: "腫瘤生物學",
        description: "腫瘤微環境、轉移、荷爾蒙依賴型癌症與神經內分泌腫瘤。",
        credits: 4,
        accent: "#a287d4",
        sessionCodes: ["MTP02", "ORF11", "ORF24", "SY54"],
    },
]

// Only the source-gated generated registry may publish ENDO articles. An empty
// registry intentionally renders no articles instead of reviving stale legacy
// session aggregates or pre-QA manuscripts.
export const ENDO_2026_ARTICLES: EndoArticle[] =
    (generatedEndoArticles as EndoArticle[]).map((article) => ({
        ...article,
        coverImage: resolveEndoAssetUrl(article.coverImage),
    }))

export function getEndoArticle(slug: string) {
    return ENDO_2026_ARTICLES.find((article) => article.slug === slug)
}
