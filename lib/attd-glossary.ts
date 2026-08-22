// Bilingual glossary for ATTD 2026 search.
//
// Each row is a set of equivalent terms (Chinese, English, abbreviations).
// When the user types one term, matchQuery treats the whole row as one bucket.
// Add rows freely; keep all terms lowercase for English / abbreviations.

export const ATTD_GLOSSARY: string[][] = [
    // Diabetes types
    ['type 1 diabetes', 't1d', 'type 1', '第一型糖尿病', '1 型糖尿病', '一型糖尿病'],
    ['type 2 diabetes', 't2d', 'type 2', '第二型糖尿病', '2 型糖尿病', '二型糖尿病'],
    ['gestational diabetes', 'gdm', '妊娠糖尿病', '妊娠期糖尿病'],
    ['mody', 'monogenic diabetes', '單基因糖尿病'],
    ['lada', '成人隱匿性自體免疫糖尿病'],
    ['prediabetes', 'pre-diabetes', '糖尿病前期'],

    // Pregnancy
    ['pregnancy', 'pregnant', 'gestational', '妊娠', '懷孕', '孕婦', '孕期'],

    // Monitoring
    ['cgm', 'continuous glucose monitoring', 'continuous glucose monitor', '連續血糖監測', '連續血糖', '即時血糖'],
    ['flash glucose', 'isCGM', 'libre', '掃描式血糖'],
    ['smbg', 'self-monitoring blood glucose', '血糖機', '自我血糖監測'],
    ['hba1c', 'a1c', '糖化血色素'],
    ['time in range', 'tir', '範圍內時間', '達標時間'],
    ['time below range', 'tbr', '低於範圍時間'],
    ['time above range', 'tar', '高於範圍時間'],
    ['gmi', 'glucose management indicator', '血糖管理指標'],

    // Glycemic events
    ['hypoglycemia', 'hypoglycaemia', 'hypo', 'low glucose', '低血糖'],
    ['hyperglycemia', 'hyperglycaemia', 'hyper', 'high glucose', '高血糖'],
    ['ketoacidosis', 'dka', '酮酸中毒', '糖尿病酮酸血症'],
    ['hypo unawareness', 'impaired awareness of hypoglycemia', '低血糖無感'],

    // Insulin delivery
    ['insulin pump', 'pump', '胰島素幫浦', '幫浦'],
    ['multiple daily injections', 'mdi', '多次注射', '基礎追加療法'],
    ['aid', 'automated insulin delivery', 'closed loop', 'hybrid closed loop', 'hcl', 'artificial pancreas', '自動胰島素輸注', '閉迴路', '人工胰臟', '混合閉迴路'],
    ['smart pen', 'connected pen', '智慧筆', '連網筆'],
    ['basal insulin', 'long-acting insulin', '基礎胰島素', '長效胰島素'],
    ['bolus', 'rapid-acting insulin', '餐前胰島素', '速效胰島素'],

    // Drugs — incretin / GLP-1
    ['glp-1', 'glp1', 'glp-1 ra', 'glp-1 receptor agonist', '腸泌素', 'glp-1 受體促效劑'],
    ['semaglutide', 'ozempic', 'wegovy', 'rybelsus', '司美格魯肽'],
    ['tirzepatide', 'mounjaro', 'zepbound', '替爾泊肽'],
    ['liraglutide', 'victoza', 'saxenda', '利拉魯肽'],
    ['dulaglutide', 'trulicity', '度拉糖肽'],

    // Drugs — SGLT2
    ['sglt2', 'sglt-2', 'sglt2 inhibitor', 'sglt-2 抑制劑', 'sglt2 抑制劑'],
    ['dapagliflozin', 'forxiga', 'farxiga', '達格列淨'],
    ['empagliflozin', 'jardiance', '恩格列淨'],

    // Other drugs
    ['metformin', '二甲雙胍', 'glucophage'],
    ['dpp-4', 'dpp4', 'dpp-4 inhibitor', '雙基胜肽酶抑制劑'],
    ['sulfonylurea', 'su', '磺醯尿素類'],

    // Complications
    ['retinopathy', 'diabetic retinopathy', 'dr', '視網膜病變', '糖尿病視網膜病變'],
    ['nephropathy', 'diabetic kidney disease', 'dkd', 'ckd', '腎病變', '糖尿病腎病', '慢性腎病'],
    ['neuropathy', 'diabetic neuropathy', '神經病變', '糖尿病神經病變'],
    ['cardiovascular', 'cv', 'cvd', 'cardiovascular disease', '心血管', '心血管疾病'],
    ['heart failure', 'hf', '心衰竭', '心臟衰竭'],
    ['stroke', '中風', '腦中風'],
    ['diabetic foot', '糖尿病足'],
    ['nash', 'mash', 'masld', 'nafld', 'fatty liver', '脂肪肝', '代謝相關脂肪肝病'],

    // Weight / metabolism
    ['obesity', 'overweight', '肥胖', '體重過重'],
    ['weight loss', 'weight management', '減重', '體重控制'],
    ['bariatric surgery', 'metabolic surgery', '減重手術', '代謝手術'],

    // Beta cell / regeneration
    ['beta cell', 'β-cell', 'b-cell', '胰島 β 細胞', 'β 細胞', '貝他細胞'],
    ['stem cell', 'stem-cell', '幹細胞'],
    ['islet transplant', 'islet transplantation', 'islet cell transplant', '胰島移植', '胰島細胞移植'],
    ['pancreas transplant', '胰臟移植'],

    // Immunology
    ['teplizumab', 'tzield', '替沙珠單抗'],
    ['immunotherapy', 'disease modification', '免疫療法', '疾病修飾'],
    ['autoantibody', 'islet autoantibody', '自體抗體', '胰島自體抗體'],

    // Tech
    ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', '人工智慧', '機器學習', '深度學習'],
    ['digital health', 'mhealth', 'ehealth', '數位健康', '行動健康'],
    ['telemedicine', 'telehealth', '遠距醫療', '遠端醫療'],
    ['wearable', 'wearables', '穿戴裝置', '穿戴式裝置'],
    ['decision support', 'cdss', '決策支援', '臨床決策支援'],

    // Populations
    ['pediatric', 'paediatric', 'children', 'pediatrics', '兒童', '小兒', '兒科'],
    ['adolescent', 'teen', 'teenager', '青少年'],
    ['elderly', 'older adults', 'geriatric', '老年', '長者', '高齡'],
    ['adult', '成人'],

    // Behavior / education
    ['self-management', 'self management', '自我管理'],
    ['diabetes education', 'patient education', '糖尿病衛教', '病人教育'],
    ['quality of life', 'qol', '生活品質'],
    ['mental health', 'depression', '心理健康', '憂鬱'],
    ['burnout', 'diabetes distress', '糖尿病困擾', '倦怠'],

    // Nutrition / exercise
    ['nutrition', 'diet', 'dietary', '營養', '飲食'],
    ['carbohydrate counting', 'carb counting', '碳水計算', '醣類計算'],
    ['exercise', 'physical activity', '運動', '身體活動'],
    ['low carb', 'low-carb', 'ketogenic', 'keto', '低碳水', '生酮'],

    // Trials / evidence
    ['randomized controlled trial', 'rct', '隨機對照試驗'],
    ['real-world evidence', 'rwe', '真實世界證據'],
    ['meta-analysis', 'systematic review', '統合分析', '系統性回顧'],
]

function expandToken(token: string): string[] {
    const t = token.toLowerCase()
    if (!t) return []
    const out = new Set<string>([t])
    // Substring expansion is too aggressive for short ASCII tokens (`a`, `in`, `1`, `su`),
    // which would otherwise leak into broad glossary buckets. Require exact-match only for
    // short ASCII tokens; allow substring expansion for CJK (single chars are meaningful)
    // and for ASCII tokens of length >= 4.
    const hasNonAscii = /[^\x00-\x7f]/.test(t)
    const allowSubstring = hasNonAscii || t.length >= 4
    for (const group of ATTD_GLOSSARY) {
        let hit = false
        for (const member of group) {
            const m = member.toLowerCase()
            if (m === t) { hit = true; break }
            if (allowSubstring && (m.includes(t) || t.includes(m))) { hit = true; break }
        }
        if (hit) for (const member of group) out.add(member.toLowerCase())
    }
    return [...out]
}

/**
 * Match a free-text query against a haystack blob.
 * - Whitespace splits the query into tokens; every token must match (AND).
 * - Each token is expanded through the bilingual glossary before matching.
 * - Matching is case-insensitive substring on the blob.
 */
export function matchQuery(blob: string, query: string): boolean {
    const q = query.trim()
    if (!q) return true
    const hay = blob.toLowerCase()
    const tokens = q.split(/\s+/).filter(Boolean)
    if (tokens.length === 0) return true
    return tokens.every((tok) => {
        const expansions = expandToken(tok)
        return expansions.some((e) => hay.includes(e))
    })
}
