# ORF13｜Adrenal: Back to the Basics

> 本頁收錄 ORF13 目前具備完整官方英文逐字稿與完成投影片解析的 3 段錄影。每段短講均先獨立由 Gemini API `gemini-3.6-flash` 完成 transcript＋slides 合併與 source QA，再依官方 session 結構彙整；不同研究的資料與結論不互相混用。

## 雙重 TP53 與 MYC 通路變異標定出具臨床侵襲性之腎上腺皮質癌分子亞型

- **會議／場次：** ENDO 2026／ORF13
- **短講：** Dual TP53 and MYC Pathway Alterations Identify a Clinically Aggressive Molecular Subtype of Adrenocortical Carcinoma
- **講者：** Hala Al Asadi（Weill Cornell Medicine / NewYork-Presbyterian Hospital）

> 整理說明：本稿以本段錄影的完整官方英文逐字稿為敘事主軸，結合 22 張去重投影片的 OCR 證據，由 Gemini API `gemini-3.6-flash` 產生 transcript＋slides 二合一繁中講稿，再依原始逐字稿與投影片完成 source QA。投影片額外提供、但講者未完整口述的內容以底線標示。

### 第一部分｜演講者主軸的 transcript＋slides 二合一整理稿

#### 一、 研究背景與臨床痛點（Background & Clinical Rationale）

腎上腺皮質癌（adrenocortical carcinoma, ACC）是一種極為罕見且具備高侵襲性的惡性腫瘤。雖然發病率低，但患者的整體預後非常差，中位整體存活期（median overall survival）僅約 **3 至 4 年**。對於出現遠端轉移（distant metastasis）或屬於第四期（stage IV）的患者，其 **5 年存活率（5-year survival rate）低至 15%**。

在分子發病機制方面，過去研究已報導某些基因突變或變異（例如 *TP53*、*IGF2*）與 ACC 發展相關。特別是 **$\beta$-catenin**（Wnt/$\beta$-catenin）傳導通路，是文獻中研究最為廣泛、並曾被報導與 ACC 發生相關的途徑。

然而，除了 $\beta$-catenin 之外，其他關鍵訊號傳導途徑——包括 **HIPPO、細胞週期（Cell Cycle）、TP53、MYC** 等途徑——在 ACC 中仍有很大程度未被深入探索，臨床上對於這些途徑之變異如何影響患者的整體存活率與臨床預後，所知相當有限。

<u>Slides 延伸補充：根據 Slide 3 與 Slide 4 之背景資料，ACC 的年發生率約為每百萬人 1–2 例（1-2 per million）。即使在早期診斷並接受手術切除後，ACC 仍具有極高的轉移風險。參考文獻包含 Libè et al. 對於局限性與晚期 ACC 診斷及預後分型的探討。</u>

---

#### 二、 研究目的與資料庫來源（Aims & Methodology）

本研究的主要目的為：
1. 評估各類關鍵訊號傳導通路變異（signaling pathways alterations）與 ACC 患者存活預後之間的關聯。
2. 針對同時帶有 **TP53** 與 **MYC** 通路變異（dual alterations）的患者次族群（subpopulation），深入分析其基因轉錄特徵（transcriptional profiles），並評估此雙重變異對臨床特徵與存活預後的具體影響。

為達成上述目標，研究團隊自**癌症基因體圖譜（The Cancer Genome Atlas, TCGA）**資料庫中擷取 ACC 患者數據。研究納入條件為具備完整基因體資料、復發狀況、轉移狀態及存活隨訪數據之患者。

分析方法包括：
* **Kaplan-Meier 存活曲線**：評估患者之 5 年存活預後（5-year survival outcomes）。
* **基因集富集分析（Gene Set Enrichment Analysis, GSEA）**：一種統計學分析方法，用以評估特定基因群組（gene set）的變異如何集體影響細胞的生物學功能與細胞生理機制。

---

#### 三、 整體研究對象之臨床與病理特徵（Overall Cohort Characteristics）

本研究共納入 **92 位** 因 ACC 接受腎上腺切除術（adrenalectomy）的患者。整體佇列（overall cohort）之基本臨床與病理特徵如下：

* **年齡**：接受手術時的中位年齡約為 **50 歲**（中位數 48 歲，四分位距 IQR 34–60 歲）。
* **性別與族裔**：大多數為女性（65.2%），族裔以非西班牙裔白人（non-Hispanic White, 84.7%）為主。
* **手術切除狀態**：多數患者接受了 **R0 切除**（R0 resection，代表手術後肉眼與顯微鏡下均無殘留腫瘤）。
* **疾病期別**：約 **20%** 的患者在診斷時已具備遠端轉移（M1）或屬於第四期（stage IV）疾病。

| 臨床/病理變數 | 全體佇列數據 ($n = 92$) |
| :--- | :--- |
| **中位年齡（歲, IQR）** | 48 (34–60) |
| **女性比例 (%)** | 60 (65.2%) |
| **白人 (White, %)** | 78 (84.7%) |
| **非西班牙裔 (Not Hispanic/Latino, %)** | 84 (91.3%) |
| **包膜侵犯 (Capsular invasion, %)** | 83 (90.2%) |
| **靜脈侵犯 (Venous invasion, %)** | 36 (39.1%) |
| **切除狀態 (R status, %)** | **R0**: 64 (69.5%)<br>**R1**: 7 (7.6%)<br>**R2**: 12 (13.0%) |
| **輔助放射治療 (Adjuvant Radiation, %)** | 17 (18.4%) |
| **遠端轉移 (M1, %)** | 18 (19.5%) |
| **AJCC 病理分期 (%)** | **Stage I**: 9 (9.7%)<br>**Stage II**: 44 (47.8%)<br>**Stage III**: 19 (20.6%)<br>**Stage IV**: 18 (19.5%) |

---

#### 四、 十大傳導通路與 5 年存活率之單變數 Cox 回歸分析（Univariable Cox Regression Analysis）

研究團隊首先對資料庫中可取得的 **10 大癌症相關訊號傳導途徑** 進行單變數 Cox 回歸分析（Univariable Cox regression model），評估各途徑變異與不良 5 年存活率之間的關聯。

分析結果顯示，在所有評估的傳導途徑中，**僅有 MYC 通路變異與 TP53 通路變異** 與顯著較差的 5 年存活預後存在統計學上的顯著相關：
* **MYC 通路變異**：$\text{勝算比 (OR)} = 2.1$ ($95\%\text{ CI: } 1.02\text{--}4.3$, $p = 0.04$)
* **TP53 通路變異**：$\text{勝算比 (OR)} = 2.9$ ($95\%\text{ CI: } 1.3\text{--}7.1$, $p = 0.008$)

其餘傳導途徑（如 WNT、HIPPO、PI3K、Cell Cycle、TGF-$\beta$、RTK、NRF2、NOTCH 等）在單變數分析中均未達統計顯著差異。

<u>Slides 延伸補充：Slide 8（Table 2）完整列出 10 大通路的勝算比與 $p$ 值：</u>
* *WNT*: OR 2.3 (95% CI: 0.9–8.04), $p = 0.10$
* *HIPPO*: OR 1.6 (95% CI: 0.5–3.1), $p = 0.73$
* *PI3K*: OR 1.1 (95% CI: 0.4–3.8), $p = 0.81$
* *CELL CYCLE*: OR 1.1 (95% CI: 0.4–3.8), $p = 0.80$
* *MYC*: OR 2.1 (95% CI: 1.02–4.3), $p = 0.04$
* *TP53*: OR 2.9 (95% CI: 1.3–7.1), $p = 0.008$
* *TGF-$\beta$*: OR 1.1 (95% CI: 0.4–3.09), $p = 0.76$
* *RTK*: OR 0.89 (95% CI: 0.4–1.85), $p = 0.77$
* *NRF-2*: OR 0.9 (95% CI: 0.3–2.07), $p = 0.82$
* *NOTCH*: OR 4.6 (95% CI: 0.99–83), $p = 0.13$

> 數字 QA：投影片標題寫作「Univariable Cox regression」，但欄位標示為「Odd ratio」。本稿忠實保留投影片的 OR 標示；若要正式引用，應回查研究摘要或原始統計輸出，確認應為 OR 或 hazard ratio。

---

#### 五、 分組分析：雙重變異 (Dual TP53/MYC) vs 單一變異 vs 對照組

為了釐清上述觀察結果背後的生物學與臨床原因，研究團隊將 92 例患者依據 *TP53* 與 *MYC* 的變異狀態細分為 **四個次族群（subpopulations）**：
1. **雙重變異組 (Dual Altered TP53 and MYC)**：$n = 20$
2. **單純 TP53 變異組 (Altered TP53 only)**：$n = 27$
3. **單純 MYC 變異組 (Altered MYC only)**：$n = 14$
4. **對照組 (Control, 兩者皆無變異)**：$n = 30$

##### 1. 人口學與基線特徵比較
各組在基線人口學特徵（年齡、性別、種族、族裔）上**無顯著統計差異**（例如：性別 $p = 0.76$、種族 $p = 0.73$、年齡 $p = 0.06$）。

##### 2. 臨床侵襲性與復發/轉移率（重要發現）
研究重點發現，同時帶有 **TP53 與 MYC 雙重變異（Dual altered）** 的患者，展現出極高的腫瘤侵襲性：
* **復發率（Recurrence）**：雙重變異組高達 **75%** ($15/20$)，顯著高於單純 TP53 組 (48.1%)、單純 MYC 組 (42.8%) 及對照組 (30%)（$p = 0.003$）。
* **遠端轉移率（Distant Metastasis, M1）**：雙重變異組達 **45%** ($9/20$)，顯著高於單純 TP53 組 (14.8%)、單純 MYC 組 (7.1%) 及對照組 (10%)（$p = 0.01$）。
* 事後檢定（Post hoc analysis）顯示，整體佇列中觀察到的復發與轉移差異，主要集中於 **雙重變異（Dual TP53/MYC）這群患者**。

##### 3. 切除狀態差異
雖然多數患者接受了 R0 切除，但雙重變異組的 R0 切除比例顯著較低（50% vs 單純 TP53 組 77.7% vs 單純 MYC 組 78.5% vs 對照組 73.3%），且 R2 切除（顯微或肉眼殘留）比例較高（30% vs 7.4% vs 0% vs 10%, $p = 0.05$）。

<u>Slides 延伸補充：根據 Slide 9（Table 3），第四期（Stage IV）患者在雙重變異組占 45%（9/20），顯著高於單純 TP53 組的 14.8%（4/27）、單純 MYC 組的 7.1%（1/14）與對照組的 10%（3/30）（$p = 0.01$）。輔助藥物治療（Adjuvant pharmacotherapy）率在四組間無顯著差異（65% vs 66.6% vs 57.1% vs 53.3%, $p = 0.85$）。</u>

---

#### 六、 完全手術切除（R0 Resection）次族群分析

為了排除「手術殘留腫瘤（R1/R2 切除）」對復發與存活率造成的干擾，研究團隊進一步針對**僅接受完全手術切除（R0 Resection, 無邊緣殘留）**的患者進行獨立分析。

結果顯示：即使在實現了完全切除、邊緣陰性的 R0 患者中，**雙重變異（Dual TP53/MYC）組的腫瘤復發率依然顯著高於其他所有組別**：
* **R0 患者復發率**：雙重變異組高達 **80%** ($8/10$)，而單純 TP53 組為 36.3% ($4/11$)、單純 MYC 組為 40% ($4/10$)、對照組為 42.8% ($9/21$)（$p = 0.01$）。

這項結果顯示，雙重 TP53/MYC 通路變異與不良預後的關聯在 R0 次族群中仍存在，較不容易只用手術邊緣狀態解釋；但回溯性資料仍可能存在期別、年齡與其他未測量混淆，不能據此證明因果。

<u>Slides 延伸補充：根據 Slide 10（Table 4），在 R0 切除次族群中，各組的中位年齡存在顯著差異（雙重變異組 40 歲 vs 單純 TP53 組 54 歲 vs 單純 MYC 組 60 歲 vs 對照組 36 歲, $p = 0.03$）。然而，包膜侵犯（$p = 0.92$）、靜脈侵犯（$p = 0.20$）、竇狀隙侵犯（$p = 0.95$）、輔助放射治療（$p = 0.81$）與輔助藥物治療（$p = 0.47$）均無統計顯著差異。</u>

---

#### 七、 五年整體存活率分析（Kaplan-Meier Survival Analysis）

Kaplan-Meier 存活曲線分析進一步驗證了上述臨床發現：

1. **整體佇列（Overall Cohort）**：
   雙重變異（Dual altered TP53 + MYC）患者的 5 年整體存活率顯著低於單一變異組及對照組（$p = 0.0004$）。
2. **R0 切除佇列（R0 Resection Cohort）**：
   即使在成功接受 R0 完全切除的患者中，雙重變異患者的 5 年存活率依然極差，曲線顯著低於其他組別（$p = 0.03$）。

**小結**：帶有雙重 TP53 與 MYC 通路變異的 ACC 腫瘤，具備極度侵襲性的生物學特徵，無論是否達到完全手術切除，其復發率均極高，且 5 年存活預後顯著偏劣。

---

#### 八、 基因轉錄組與火山圖分析（Volcano Plot & Gene Expression Profiling）

為瞭解雙重變異導致不良預後的分子機制，研究團隊針對腫瘤樣本進行了基因表達轉錄組分析（transcriptomic profiling），並繪製**火山圖（Volcano Plot）**進行差異基因篩選。

##### 1. 火山圖判讀邏輯
* **X 軸（$\log_2$ Fold Change）**：代表基因表達量變化的幅度。
  * **右側紅色點**：代表雙重變異組相較於比較組**表現上調（Up-regulation）**的基因。
  * **左側藍色點**：代表雙重變異組相較於比較組**表現下調（Down-regulation）**的基因。
* **Y 軸（$-\log_{10} p\text{-value}$）**：代表統計顯著性，位置越高代表統計顯著性越強。

##### 2. 分組對比顯著發現
* **雙重變異組 vs 非雙重變異組（Dual-Altered vs Non-Dual）**：
  * **顯著上調基因**：主要參與**細胞增殖（cellular proliferation）**、**免疫逃逸（evasion from immune response）**及**促發炎反應（inflammation）**（例如 *RTKN2*、*BIRC5*、*RAB17* 等）。
  * **顯著下調基因**：主要參與**線粒體代謝（mitochondrial metabolism）**、**氧化磷酸化（oxidative phosphorylation）**、蛋白質折疊及維持細胞結構（例如 *COX1*、*COX7C*、*MYLK3* 等）。
* **雙重變異組 vs 單純 TP53 變異組（Dual-Altered vs TP53 only）**：
  呈現相同的轉錄調控趨勢。與細胞增殖顯著相關的基因（如 *GAP25T4* 等）表現上調；而維護線粒體功能與氧化磷酸化的基因則顯著下調。
* **雙重變異組 vs 單純 MYC 變異組（Dual-Altered vs MYC only）**：
  同樣觀察到一致的分子特徵——促進腫瘤增殖相關基因上調，而線粒體功能相關基因下調（線粒體功能障礙 mitochondrial dysfunction）。

---

#### 九、 基因集富集分析（Gene Set Enrichment Analysis, GSEA）

為了從單一基因變化提升至整體細胞功能層面，研究團隊進行了 GSEA 分析，評估共有相同生物學功能之基因集在細胞中的富集情形（enrichment）。

在評估的 20 條核心 Hallmark 傳導通路上，雙重變異組呈現出極為鮮明的「上調 vs 下調」雙相特徵（Top 12 顯著通路）：

##### 1. 顯著上調（Up-regulated）的分子通路：
* **E2F Targets**（調控細胞週期進程）
* **G2M Checkpoint**（調控細胞由 G2 期進入 M 期之有絲分裂檢查點）
* **Epithelial-Mesenchymal Transition (EMT)**（上皮-腸腺/間質轉化，與侵襲轉移相關）
* **Inflammatory Response**（發炎反應）
* **TNFA Signaling via NFKB**（TNF-$\alpha$ 經由 NF-$\kappa$B 傳導之發炎/存活途徑）
* **IL6 JAK STAT3 Signaling**（IL-6/JAK/STAT3 發炎與腫瘤微環境途徑）

##### 2. 顯著下調（Down-regulated）的分子通路：
* **Oxidative Phosphorylation**（氧化磷酸化，影響線粒體有氧代謝與 ATP 產生能力）
* **Peroxisome**（過氧化物體代謝）
* **Cholesterol Homeostasis**（膽固醇穩態）
* **Adipogenesis**（脂肪生成）
* **Androgen Response**（雄性素反應）
* **Spermatogenesis**（精子生成相關基因集）

---

#### 十、 結論與未來研究展望（Conclusions & Future Directions）

1. **分子機制摘要**：帶有 *TP53* 與 *MYC* 雙重途徑變異的 ACC 腫瘤，展現出高度異常的基因調控 pattern——其**細胞增殖相關通路顯著過度激活**，同時伴隨**線粒體功能障礙（mitochondrial dysfunction）與蛋白質折疊/代謝異常**。
2. **臨床意義**：此種獨特的轉錄組特徵，為雙重變異 ACC 患者較高的復發率、遠端轉移率及較短存活提供一項可能的生物學解釋（rationale）。
3. **未來治療方向**：本研究標定出了一個具備高度侵襲性的 ACC 分子亞型。未來有必要針對雙重變異 ACC 患者的「增殖失調」與「線粒體代謝弱點（metabolic vulnerabilities）」，探索新型的標靶治療策略與臨床試驗。

本研究使用 92 例 TCGA 資料，且通路變異在資料庫中採二元編碼；講者在問答中也承認無法由目前層級區分特定突變位點與功能。結果適合視為分子分層假說與外部驗證方向，尚不能直接用於個別患者的治療選擇。

---

#### 現場問答

##### 問題一：TCGA 資料庫中 TP53 與 MYC 變異的精確定義與功能分類
**提問者：Gary Hammer 教授（University of Michigan）**
* **臨床情境與問題**：Gary Hammer 教授對 TCGA 佇列的分析表示讚賞，但指出在簡報中並未明確看到研究如何定義 *TP53* 或 *MYC* 的變異類型。提問者關心：這些變異是確切的 *TP53* 功能喪失突變（loss-of-function mutations），還是泛指 Cluster 3 型態的突變？特別是在過去文獻中，多數帶有 *TP53* 突變的 ACC 屬於預後極差的 Cluster 3，因此 Hammer 教授對於本研究中「單純 TP53 突變組（TP53 alone）」的 5 年存活率居然相對良好（pretty well）感到相當好奇，認為明確定義變異類型對解釋數據至關重要。

* **演講者（Hala Al Asadi 醫師）回答**：
  * **資料庫限制與編碼方式**：演講者解釋，使用 TCGA 資料庫時存在一定的格式限制。資料庫中的原始註記僅以二元編碼（binary coding，即「有變異 altered」或「無變異 not altered」）呈現，無法在目前層級直接區分具體的突變功能類型（如功能喪失或特定胺基酸改變）。
  * **罕見疾病的樣本數限制**：演講者強調，ACC 屬於極度罕見的疾病，本研究雖集結了多中心佇列，整體樣本數仍僅有 92 例。在樣本數有限的情況下，進行極度細化的突變亞型分層會面臨統計力度的挑戰。
  * **未來深入方向**：演講者同意 Hammer 教授的觀點，認為進一步深入分析具體的突變位點與功能影響非常具備研究價值，是團隊下一步可以繼續探索的方向。

---

### 第二部分｜投影片內容紀錄

以下為本場演講實際呈現之 22 張投影片內容逐一紀錄：

#### Slide 01｜標題頁 (Title Slide)
* **標題**：Dual TP53 and MYC Pathway Alterations Identify a Clinically Aggressive Molecular Subtype of Adrenocortical Carcinoma.
* **作者群**：Hala Al Asadi, Rasa Zarnegar, Thomas J Fahey III, Brendan M. Finnerty.
* **所屬機構**：Department of Surgery, Weill Cornell Medicine / NewYork-Presbyterian Hospital, New York, NY.
* **會議名稱**：ENDS2026.

#### Slide 02｜利益衝突聲明 (Disclosure)
* **內容**：
  * No disclosure to report.
  * The views expressed in this educational program are those of the faculty and do not necessarily represent the views of the Endocrine Society.

#### Slide 03｜背景一 (Background - Incidence & Survival)
* **內容點**：
  * Adrenocortical carcinoma (ACC) is a rare malignancy with an incidence of 1-2 per million.
  * ACC is an aggressive malignancy with high risk of metastasis even after early diagnosis and surgery with 5-year survival rates of 15% among patients with metastatic disease.
  * Genetic alterations have been reported in the pathogenesis of ACC.
* **參考文獻**：Libè et al. Adrenocortical carcinoma: Diagnosis, prognostic classification and treatment of localized and advanced disease.

#### Slide 04｜背景二 (Background - Signaling Pathways)
* **內容點**：
  * The Wnt/$\beta$-catenin signaling pathway has been reported in literature to be associated with the pathogenesis of adrenocortical carcinoma.
  * Other signaling pathways remain unexplored, with limited data on their impact on patient survival.

#### Slide 05｜研究目的 (Aim)
* **內容點**：
  * To evaluate the association between signaling pathways and survival outcomes in patients with ACC.
  * To characterize the transcriptional alterations and clinical outcomes in patients with ACC harboring co-alterations in MYC and TP53 genomic pathways.

#### Slide 06｜研究方法 (Method)
* **內容點**：
  * ACC patients from The Cancer Genome Atlas (TCGA) with available genomic, recurrence, metastasis, and survival data were included.
  * Survival outcomes were assessed using Kaplan-Meier Analysis.
  * Gene Set Enrichment Analysis (GSEA) was performed to identify enrichment of gene sets linked to MYC and TP53 pathway alterations.

#### Slide 07｜表一：全體患者與腫瘤特徵 (Table 1. Patients and Tumor Characteristics)
* **呈現內容**：呈現全體 $n = 92$ 患者之臨床人口學、包膜/靜脈侵犯、切除狀態（R0/R1/R2）、期別（Stage I–IV）與轉移（M1）數據表（數值已於第一部分表列整合）。

#### Slide 08｜表二：傳導途徑之單變數 Cox 回歸 (Table 2. Univariable Cox regression model for pathways)
* **呈現內容**：列出 WNT, HIPPO, PI3K, CELL CYCLE, MYC, TP53, TGF-$\beta$, RTK, NRF-2, NOTCH 共 10 條途徑之勝算比（Odds Ratio）、95% 信心區間與 $p$ 值。MYC ($p=0.04$) 與 TP53 ($p=0.008$) 顯著。

#### Slide 09｜表三：分組患者與腫瘤特徵 (Table 3. Patients and tumors characteristics)
* **呈現內容**：依據 Altered TP53 and MYC ($n=20$)、Altered TP53 only ($n=27$)、Altered MYC only ($n=14$)、Control ($n=30$) 四組比較人口學與病理特徵。Recurrence ($p=0.003$) 與 M1 ($p=0.01$) 達顯著差異。

#### Slide 10｜表四：R0 切除患者之臨床特徵 (Table 4. Patient and Tumor characteristics by R0 resection)
* **呈現內容**：僅納入 R0 切除患者進行四組比較（$n=11, 22, 10, 21$）。Recurrence 在雙重變異組仍顯著高達 80% ($p=0.01$)。

#### Slide 11｜結果：五年存活率曲線 (Results: 5-year survival outcomes)
* **圖表內容**：展示兩張 Kaplan-Meier 曲線圖：
  1. Overall Cohort 5-year Survival ($p = 0.0004$)。
  2. R0 Resection Cohort 5-year Survival ($p = 0.03$)。
  兩圖均顯示雙重變異組曲線顯著低於其他三組。

#### Slide 12｜結果：基因表達火山圖—雙重變異 vs 非雙重變異 (Volcano Plot: Dual-Altered vs Non-Dual)
* **圖表內容**：火山圖標示上調基因（紅色）與下調基因（藍色）。包含 *COX1*, *COX7C*, *MYLK3*, *RTKN2*, *RAB17*, *ERMP1*, *ITLN1* 等基因。

#### Slide 13｜結果：基因表達火山圖—雙重變異 vs 單純 TP53 變異 (Volcano Plot: Dual-Altered vs TP53)
* **圖表內容**：火山圖標示雙重變異相較於單純 TP53 變異之差異基因，包括 *ZCCHC3*, *COQ9*, *MRPL22*, *TICAM1*, *ABAT*, *HHIPL1*, *MYL4*, *SAMD9L* 等。

#### Slide 14｜結果：基因表達火山圖—雙重變異 vs 單純 MYC 變異 (Volcano Plot: Dual-Altered vs MYC)
* **圖表內容**：火山圖標示雙重變異相較於單純 MYC 變異之差異基因，包括 *DCP1B*, *LRRC29*, *BDH2*, *ZNF423*, *GPR88*, *MYBL2*, *BIRC5*, *CALN1*, *GPC5*, *ZIC5* 等。

#### Slide 15｜結果：雙重變異通路富集分析 (Pathway Enrichment in Dual-altered TP53&MYC)
* **圖表內容**：展現 20 條 Hallmark 通路在 Dual vs MYC、Dual vs Ctrl、Dual vs TP53 之富集程度熱圖（Heatmap），呈現上調（紅色）與下調（藍色）之趨勢。

#### Slide 16｜結果：Top 12 顯著富集通路 (Pathway Enrichment - Top 12 significant pathways)
* **圖表內容**：條狀圖列出最顯著的 12 條 Hallmark 通路，包括：
  * 上調：EMT, Inflammatory Response, TNFA Signaling via NFKB, IL6 JAK STAT3 Signaling, E2F Targets, G2M Checkpoint.
  * 下調：Oxidative Phosphorylation, Spermatogenesis, Peroxisome, Cholesterol Homeostasis, Adipogenesis, Androgen Response.

#### Slide 17｜結論 (Conclusion)
* **內容點**：
  * ACC tumors harboring concurrent TP53 and MYC alterations showed dysregulation of genes involved in cellular proliferation and mitochondrial protein synthesis.
  * These molecular alterations could provide a rationale for the markedly increased recurrence, metastatic spread, and shortened survival observed in this population.
  * These findings support the need for future investigation of therapeutic strategies targeting proliferative and metabolic vulnerabilities in dual-altered ACC.

#### Slide 18｜問答期間重現 Slide 09 (Table 3)
* **說明**：答詢期間投影片切回 Slide 09（Table 3 分組臨床特徵表）。

#### Slide 19｜問答期間重現 Slide 07 (Table 1)
* **說明**：答詢期間投影片切回 Slide 07（Table 1 全體特徵表）。

#### Slide 20｜問答期間重現 Slide 08 (Table 2)
* **說明**：答詢期間投影片切回 Slide 08（Table 2 Cox 回歸分析表）。

#### Slide 21｜問答期間重現 Slide 09 (Table 3)
* **說明**：答詢期間投影片再次切回 Slide 09（Table 3 分組特徵表）。

#### Slide 22｜問答期間重現 Slide 11 (5-year survival outcomes)
* **說明**：答詢結束時投影片切回 Slide 11（Kaplan-Meier 存活曲線圖）。

## 原發性色素沉著結節性腎上腺皮質疾病（PPNAD）之臨床、基因與病理圖譜擴展：巴西轉介中心佇列之臨床洞見

- **會議／場次：** ENDO 2026／ORF13
- **短講：** Expanding the Clinical, Genetic, and Histopathological Spectrum of Primary Pigmented Nodular Adrenocortical Disease: Insights from a Brazilian Referral Cohort
- **講者：** Marina Buchpiguel（Brazilian referral cohort）

> 整理說明：本稿以本段錄影的完整官方英文逐字稿為敘事主軸，結合錄影中唯一固定顯示的標題投影片，由 Gemini API `gemini-3.6-flash` 產生 transcript＋slides 二合一繁中講稿，再依原始逐字稿與投影片完成 source QA。本段沒有內容投影片，研究數據均以講者口述為準。

### 第一部分｜演講者主軸的 transcript＋slides 二合一整理稿

#### 研究背景與目的

原發性色素沉著結節性腎上腺皮質疾病（Primary Pigmented Nodular Adrenocortical Disease, PPNAD）是一種罕見的非促腎上腺皮質素依賴性庫欣氏症候群（ACTH-independent Cushing syndrome）病因，臨床上常與卡尼綜合徵（Carney complex, CNC）密切相關。

目前全球對於 PPNAD 結合臨床、病理與分子遺傳學的整合性研究資料相當有限。因此，本研究旨在深入探討伴隨或不伴隨 Carney complex 的 PPNAD 患者，其在臨床表現、病理組織學以及分子遺傳學上的異質性（heterogeneity）。

<u>Slides 延伸補充：本研究發表於 ENDO 2026，研究團隊來自巴西聖保羅大學等三級轉介中心，並與國際專家（如法國 INSERM / Institut Cochin 的 Jérôme Bertherat 教授）合作，主要作者包含 Aliny W. Kuhn 醫師、Marina Buchpiguel 醫師、Madson Q. Almeida 醫師與 Maria Candida Barisson Villares Fragoso 醫師等。</u>

---

#### 研究設計與佇列建立（Cohort Design）

本研究收集了巴西單一三級醫療轉介中心（tertiary referral center）的追蹤資料，包含回顧性（retrospective）與前瞻性（prospective）個案：

1. **先證者（Index cases）**：共納入 **18 位** PPNAD 先證者。
2. **家族級聯檢測（Cascade genetic testing）**：透過針對先證者家族進行級聯基因篩檢，成功擴大了受影響或高風險個體的研究範圍。
3. **最終研究佇列（Final cohort）**：最終共納入 **38 位個體**，這使研究團隊不僅能評估具有典型臨床症狀的患者，亦能完整分析輕微表現型（milder phenotypes）以及無症狀的基因帶原者（asymptomatic carriers）。

所有 38 位個體均接受了嚴謹的臨床症狀評估、內分泌激素測定、影像學檢查以及分子遺傳學分析。分子分析方法包含：
* 下一代基因定序（Next-Generation Sequencing, NGS）
* 全外顯子定序（Whole Exome Sequencing, WES）
* 拷貝數變異分析（Copy Number Variant, CNV）
* 體細胞變異分析（Somatic analysis，針對取得腎上腺手術組織之患者）

---

#### 先證者臨床特徵與治療決策

在 **18 位先證者** 中，研究觀察到以下臨床與治療特徵：

* **性別與發病年齡**：女性占 **88%**，診斷時的平均年齡為 **24 歲**。
* **基線腎上腺功能狀態（Baseline adrenal status）**：
  * 大多數表現為顯性庫欣氏症候群（overt Cushing syndrome）。
  * **17%** 的患者呈現週期性庫欣氏症候群（cyclic Cushing syndrome）。
  * 在先證者中**未發現**輕度自主性皮質醇分泌（mild autonomous cortisol secretion, MACS；官方字幕轉錄為 MEX/MAX）；此較輕表現僅在家族級聯篩檢發現的基因變異陽性親屬中被辨識。
* **外科手術管理（Surgical management）**：
  * **72%** 的患者接受了**雙側腎上腺切除術**（bilateral adrenalectomy）。
  * **11%** 的患者接受了**分期單側腎上腺切除術**（staged unilateral adrenalectomy）。
  * **17%** 的患者維持**臨床安全監測與追蹤**（clinical surveillance）。

| 臨床特徵 / 處置項目 | 先證者比例 (N = 18) |
| :--- | :--- |
| **女性比例** | 88% |
| **平均診斷年齡** | 24 歲 |
| **週期性庫欣氏症候群** | 17% |
| **雙側腎上腺切除術** | 72% |
| **分期單側腎上腺切除術** | 11% |
| **臨床密切監測** | 17% |

---

#### 卡尼綜合徵（Carney Complex, CNC）之腎上腺外表現

在伴隨 Carney complex 的先證者中，腎上腺外的臨床表現相當常見，最頻繁出現的器官病變包括：

1. **內分泌系統**：高乳素血症（hyperprolactinemia）、肢端肥大症（acromegaly）。
2. **皮膚與軟組織**：皮膚雀斑樣痣（skin lentigines）、乳房結節（breast nodules）及陰莖結節（penile nodules）。
3. **腫瘤與心臟病變**：乳腺癌（breast carcinomas）以及典型的**心臟黏液瘤**（cardiac myxomas）。

---

#### 分子遺傳學分析結果（Molecular Findings）

研究團隊在分子遺傳學層面取得重要發現：

* ***PRKAR1A* 生殖系變異**：在 **66%** 的先證者中鑑測出 *PRKAR1A* 生殖系致病變異（germline variants），其中包含 **4 個可能是首次報導的新變異（likely novel variants）**。
* ***PRKACA* 基因複製**：鑑定出 **2 例** 生殖系 *PRKACA* 重複變異（germline duplications），進一步支持 **cAMP-PKA 訊息傳遞路徑失調（cAMP-PKA pathway dysregulation）** 在 PPNAD 發病機制中的核心地位。
* **基因型與表現型不一致**：即使帶有完全相同的基因變異，不同個體間仍呈現出顯著差異的臨床表現型（broad phenotypic variability）。
* **基因檢測陰性個體**：有 **16%** 的先證者未檢測出已知基因變異（gene negative），提示可能存在非編碼區變異（non-coding variants）、體細胞嵌合現象（mosaicism）或表觀遺傳學（epigenetic）機制。

---

#### 體細胞二次打擊與組織病理學分析

* **體細胞分析（Somatic analysis）**：對 **13 位** 接受腎上腺切除術且有組織樣本的患者進行體細胞變異分析。結果顯示，僅有 **23%（3/13）** 的患者可觀察到二次打擊改變（second-hit alterations），且**未發現任何重複出現的體細胞驅動變異（no recurrent somatic driver）**。此結果暗示傳統的「二次打擊假說」（classic two-hit model）可能無法完全解釋 PPNAD 的疾病發生與臨床表達。
* **病理組織學表現（Histology）**：
  * **典型 PPNAD 病理**：大多數患者展現經典的 PPNAD 組織學特徵，包括微結節（micronodules）、顯著的脂褐素沉積（prominent lipofuscin accumulation），以及明確的結節間皮質萎縮（distinct internodular cortical atrophy）。
  * **非典型病理**：有 **3 位患者** 呈現非典型病理表現，包含「微結節與大結節混合型（mixed micro- and macronodular）」或「彌漫性皮質增生（diffuse cortical hyperplasia）」。

---

#### 演講者總結與臨床啟示

1. **動態的臨床分子圖譜**：PPNAD 與 Carney complex 應被視為一個具備動態演變的臨床分子光譜（dynamic clinical molecular spectrum），而非單一固定的遺傳疾病。
2. **致病機制與外顯率**：cAMP-PKA 路徑失調是主要致病機制。由於同基因變異者間存在廣泛的臨床異質性，臨床上**基因型對表現型（genotype-phenotype）的預測力相當有限**。
3. **單倍體不足假說（Haploinsufficiency）**：組織中體細胞二次打擊的發現率不一，顯示在某些病例中，單純的單倍體不足即足以致病，而體細胞二次打擊事件可能僅扮演表現型調節劑（phenotype modulators）的角色。
4. **病理 overlap 與早期診斷**：微結節與大結節在組織學上存在重疊；且較輕度的自主性皮質醇分泌僅在家族篩檢中發現，顯示亞臨床（subclinical）及早期階段的 PPNAD 可能在臨床上未被辨識。
5. **多學科照護**：研究結果強調，針對所有 PPNAD 與 CNC 患者，實施**多學科團隊追蹤（multidisciplinary follow-up）** 以及 **系統性家族級聯基因篩檢（systematic family screening）** 具有高度重要性。

---

#### 現場問答

*本場次演講結束後無問答環節 transcript 紀錄。*

---

### 第二部分｜投影片內容紀錄

本場次在錄影全程中，簡報螢幕均固定顯示主標題頁面（Static Title Card），未切換其他內容頁面。實際呈現之投影片內容如下：

#### Slide 001：主標題頁（Title Slide）

* **投影片標題**：EXPANDING THE CLINICAL, GENETIC, AND HISTOPATHOLOGICAL SPECTRUM OF PRIMARY PIGMENTED NODULAR ADRENOCORTICAL DISEASE: INSIGHTS FROM A BRAZILIAN REFERRAL COHORT
* **作者團隊**：Aliny W. Kuhn, M.D., Marina Buchpiguel, M.D., Antonio Marcondes Lerario, M.D., Ph.D., Helaine Laiz Charchar, M.D., Ph.D., Beatriz Marinho de Paula Mariani, M.D., Ph.D., Patricia Yaduva, M.D., Mirian Yumie Nishi, M.D., Ph.D., Felipe Lourenço Ledesma, M.D., Victor Srougi, M.D., Ph.D., José Luis Chambo, M.D., Ph.D., Berenice B. Mendonça, M.D., Ph.D., Ana Claudia Latronico, M.D., Ph.D., Jérôme Bertherat, M.D., Ph.D., Madson Q. Almeida, M.D., Ph.D., Maria Candida Barisson Villares Fragoso*, M.D., Ph.D.
* **會議資訊與免責聲明**：ENDO 2026 Educational Program（內文標註投影片表達之觀點為講者個人觀點，不必然代表學會立場）。

## 嗜鉻細胞瘤與副神經節瘤之定量 Metadrenaline 負荷及腫瘤特徵預測預後：一項為期 12 年的單中心隊列研究

- **會議／場次：** ENDO 2026／ORF13
- **短講：** Quantitative Metadrenaline Burden and Tumour Characteristics Predict Prognosis in Phaeochromocytoma and Paraganglioma: A 12-Year Single Centre Cohort Study
- **講者：** Prethivan Gopalakrishnan（Royal Liverpool University Hospital）

> 整理說明：本稿以本段錄影的完整官方英文逐字稿為敘事主軸，結合 13 張去重投影片的 OCR 證據，由 Gemini API `gemini-3.6-flash` 產生 transcript＋slides 二合一繁中講稿，再依原始逐字稿與投影片完成 source QA。投影片額外提供、但講者未完整口述的內容以底線標示。

### 第一部分｜演講者主軸的 transcript＋slides 二合一整理稿

#### 臨床痛點與研究背景

在嗜鉻細胞瘤與副神經節瘤（pheochromocytoma and paraganglioma, PPGL）患者中，精準進行風險分層（risk stratification）臨床上仍極具挑戰性。雖然目前已有許多預後評分系統，例如 PASS、GAP、SS、SGAP 以及 COPS 評分系統，但這些工具的預測準確度僅達中等程度（moderate accuracy）。

基因檢測（genetic testing）在 PPGL 患者的評估中極為重要，且已被納入許多預後模型中；然而在臨床實際運作中，並非所有患者都能接受基因檢測，且即使進行，檢測結果也常面臨時間上的延誤。

另一方面，血漿甲氧基兒茶酚胺代謝物（metadrenalines；亦稱 metanephrines）對於分泌型 PPGL 的診斷不可或缺，但在現有的風險分層工具中，生化負荷（biochemical burden）並未以獨立的定量指標形式被納入考量。即使某些模型納入該指標，也僅是以「二元化」（binary fashion，即升高與否）的方式處理，而非考量其升高程度。

因此，本研究旨在評估：結合定量生化負荷（biochemical burden，簡稱 BioMax）與常規臨床/病理特徵，是否能有效預測 PPGL 患者的遠端轉移（metastasis）與全因死亡率（all-cause mortality）。

<u>Slides 延伸補充：Slide 1 & Slide 2 顯示，本研究發表者為來自英國皇家利物浦大學醫院（Royal Liverpool University Hospital）的 Prethivan Gopalakrishnan 醫師及其研究團隊（Ian Dorrington, Robin Augustine, Steven Habib, Amy James, Susannah Shore, Pallavi Hegde, Andrew Davison）。</u>

---

#### 研究隊列與定量生化指標分析

本研究連續收集了 2012 年至 2023 年間共 100 例 PPGL 患者。在套用排除條件後，最終納入 80 例患者進行分析：
*   **70 例**為嗜鉻細胞瘤（pheochromocytoma, PCC）
*   **10 例**為副神經節瘤（paraganglioma, PGL）

##### 生化指標分析與 BioMax 定義
血漿甲氧基兒茶酚胺代謝物濃度（包含正甲氧基腎上腺素 Normetadrenaline [NMA]、甲氧基腎上腺素 Metadrenaline [MA]，以及 3-甲氧基酪胺 3-Methoxytyramine [3-MT]）均採用液相層析串聯質譜儀（liquid chromatography-tandem mass spectrometry, LC-MS/MS）進行測量。

為了消除不同檢測平台間的差異，所有數值均經由該檢測的參考上限（upper limit of normal, ULN）進行標準化（normalized to ULN）。這提供了一個獨立於檢測平台（assay-independent）的指標，用以衡量患者體內占主導地位的腫瘤分泌活性。研究團隊將各代謝物升高的最大倍數（maximum fold ULN）定義為 **BioMax**。

##### 統計學分析與臨界值篩選
研究團隊採用了以下統計方法：
1.  罰式邏輯迴歸（penalized logistic regression）
2.  搭配 1,000 次自舉法驗證（1,000-bootstrap validation）的接收者操作特徵曲線（receiver operating characteristic, ROC）分析
3.  約登指數分析（Youden index analysis），以確定預測遠端轉移的最佳 BioMax 比值與腫瘤大小臨界值（cut-off）。

<u>Slides 延伸補充：Slide 3 顯示所有統計分析均使用 R 語言軟體（版本 4.5.2）執行。</u>

---

#### NBS 預估分數（NBS Score）之建立

研究團隊評估了多個常規臨床與病理變數對遠端轉移的預測能力，包括：
*   定量生化負荷（BioMax）
*   組織病理學上的中央壞死（central necrosis）
*   腫瘤最大徑大小（tumor size）
*   Ki-67 增殖指數（Ki-67 index）
*   診斷年齡（age）
*   性別（gender）

在中位數追蹤 4 年（IQR 2–7 年）的隊列中，多變數分析顯示 **Ki-67 增殖指數、診斷年齡與性別均無顯著統計學意義**。最終僅有中央壞死、BioMax 與腫瘤大小達到顯著差異：
1.  **BioMax 臨界值**：由約登指數分析得出 **≥ 6 倍 ULN**，具極高預測轉移的潛力。
2.  **中央壞死（Central Necrosis）**：病理檢查呈現中央壞死（Present vs. Absent）。
3.  **腫瘤大小臨界值**：由約登指數分析得出 **≥ 7 cm**（即 70 mm）。

研究團隊將這三個顯著變數整合為一個簡便的臨床評分工具——**NBS 評分（NBS Score）**：
*   **N** (Necrosis)：中央壞死（有 = 1 分，無 = 0 分）
*   **B** (BioMax)：定量生化負荷 ≥ 6× ULN（是 = 1 分，否 = 0 分）
*   **S** (Size)：腫瘤大小 ≥ 7 cm（是 = 1 分，否 = 0 分）

NBS 總分介於 **0 至 3 分**，用以預測 PPGL 患者的遠端轉移風險與全因死亡率。

---

#### 研究結果：臨床特徵、病理與單一生化指標表現

##### 隊列基本特徵
*   **診斷時中位年齡**：59 歲（IQR 51–71 歲）
*   **性別比例**：男性占 54%
*   **整體轉移率**：13%（10/80），且嗜鉻細胞瘤（13%）與副神經節瘤（10%）之間的轉移率無顯著差異。

##### 侵襲性腫瘤表型（Aggressive Tumor Phenotype）分析
研究結果顯示，發生遠端轉移的侵襲性腫瘤具備「腫瘤較大、壞死比例較高、生化負荷較高」的特徵：
*   **腫瘤大小**：轉移組中位數為 **84 mm**，顯著大於非轉移組的 **34.5 mm**（$p < 0.001$）。
*   **中央壞死**：轉移組高達 **80%** 存在壞死，非轉移組僅 **7%**（$p < 0.001$）。
*   **BioMax 生化負荷**：轉移組中位數達 **20.2× ULN**，非轉移組僅 **2.2× ULN**（$p < 0.001$）。

##### 單一血漿代謝物的診斷效能比較
若單獨審視各個甲氧基兒茶酚胺代謝物對轉移的預測能力：
*   **正甲氧基腎上腺素（Normetadrenaline, NMA）**：敏感度（sensitivity）達 **100%**，但特異度（specificity）極低（僅 **19%**）。
*   **3-甲氧基酪胺（3-Methoxytyramine, 3-MT）**：特異度較高（**86%**），敏感度為 **75%**。
*   **甲氧基腎上腺素（Metadrenaline, MA）**：敏感度（**20%**）與特異度（**49%**）皆不理想。

---

#### 研究結果：NBS 分數之預測效能與全因死亡率

##### 遠端轉移預測效能
NBS 評分在預測 PPGL 遠端轉移上展現出卓越的辨識能力（excellent discrimination）：
*   **ROC 曲線下面積（AUC）**：達 **0.96**（95% CI 0.90–0.99，經 1,000 次自舉法驗證）。
*   **最佳截斷點（Threshold ≥ 2 分）之診斷效能**：
    *   敏感度（Sensitivity）：**90%**
    *   特異度（Specificity）：**90%**
    *   整體準確度（Accuracy）：**90%**
    *   陰性預測值（NPV）：**98%**
    *   陽性預測值（PPV）：**56%**

隨著 NBS 分數增加，患者發生遠端轉移的風險呈急遽上升趨勢：
*   **0 分**：轉移風險 **0%**
*   **1 分**：轉移風險 **5%**
*   **2 分**：轉移風險 **33%**
*   **3 分**：轉移風險 **100%**

##### 全因死亡率（All-Cause Mortality）分析
全隊列整體全因死亡率為 **18.8%**（約 19%）。死亡率與轉移狀態及高 NBS 分數密切相關：
*   **轉移狀態與死亡率**：轉移性患者死亡率達 **60%**（6/10），遠高於非轉移性患者的 **13%**（9/70）（勝算比 $OR = 10$, $p < 0.001$）。
*   **NBS 分數與死亡率**：NBS 評分 ≥ 2 分者的死亡率達 **40%**（6/16），顯著高於 NBS < 2 分者的 **14%**（9/64）（勝算比 $OR = 4$, $p = 0.03$）。

---

#### 臨床應用價值、局限性與結論

1.  **術前評估價值**：BioMax 可由基線血漿代謝物的 ULN 倍數計算；在本單中心衍生隊列中，BioMax ≥ 6× ULN 與較高轉移風險相關，但此門檻尚待外部驗證。
2.  **指導功能性影像檢查**：高 BioMax 反映出具侵襲性的 PPGL 表型，可促使臨床及早安排高階功能性分子影像，例如 **鎵-68 DOTATATE（68Ga-DOTATATE）PET/CT** 或 **DOPA PET/CT**。特別是在許多尚未將 DOTATATE 納入常規診斷流程、仍僅依賴傳統 MIBG 掃描的醫療中心，BioMax 能提供關鍵的決策依據。
3.  **精準分期與個體化追蹤**：早期識別轉移性疾病有助於準確分期、進行預後風險分層、即時評估核醫放射性核素治療（radionuclide therapy）可行性，並制定個體化的術後長期追蹤計畫。
4.  **互補而非替代**：NBS 評分並非用於取代基因檢測，而是在基因檢測尚未完成或無法取得時，提供一個簡單、極具實用性且強大的補充性預後工具。
5.  **未來研究方向**：本研究為單中心隊列，結果仍需要在更大規模的多中心隊列（multi-center cohorts）中進行外部驗證（external validation）；研究團隊目前正致力於進行跨中心的驗證工作。

NBS 的 AUC 與 0–3 分風險比例都來自同一個 80 人衍生隊列，其中僅 10 人發生轉移；即使採 1,000 次 bootstrap 內部驗證，仍可能有過度配適與估計不穩定，正式臨床採用前必須完成獨立多中心驗證。

---

#### 現場問答

（本場次演講錄音與講稿中未包含現場提問與問答環節。）

---

### 第二部分｜投影片內容紀錄

#### Slide 001：標題頁 (Title Slide)
*   **標題**：Quantitative Metadrenaline Burden and Tumor Characteristics Predict Prognosis in Phaeochromocytoma and Paraganglioma: A 12-Year Single Centre Cohort Study
*   **作者與機構**：Prethivan Gopalakrishnan, Ian Dorrington, Robin Augustine, Steven Habib, Amy James, Susannah Shore, Pallavi Hegde, Andrew Davison（Royal Liverpool University Hospital）
*   **會議標示**：ENDO 2026

---

#### Slide 002：背景與研究方法——臨床需求 (Background & Methodology - The Clinical Need)
*   **目的**：評估生化負荷（BioMax）及常規臨床特徵是否能預測 PPGL 患者的遠端轉移與全因死亡率。
*   **臨床需求重點**：
    *   PPGL 的風險分層仍具挑戰性。
    *   現有風險模型準確度僅達中等。
    *   基因檢測可能無法取得或面臨延誤。
    *   需要利用日常可取得的資料建立簡單且可靠的預測工具。

---

#### Slide 003：隊列、生化評估與統計分析 (Our Cohort, Biochemical Assessment & Analytical Approach)
*   **研究隊列**：初始 100 例 PPGL 患者，排除後最終分析 80 例（70 例 PCC，10 例 PGL）。
*   **生化評估**：
    *   利用 LC-MS/MS 測量血漿 Normetadrenaline、Metadrenaline 與 3-Methoxytyramine，並經 ULN 標準化。
    *   取最大升高的 ULN 倍數作為 **BioMax**，代表獨立於檢測方法的顯性分泌活性。
*   **統計分析**：R 軟體 v4.5.2，包含罰式邏輯迴歸、 Youden 指數最佳臨界值選擇、1000 次自舉法驗證之 ROC 分析。

---

#### Slide 004：NBS 評分系統開發 (NBS Score Development)
*   **分析候選變數**：BioMax、壞死、腫瘤大小、Ki67 指數、年齡、性別。
*   **選入 NBS 評分的變數與臨界值**：
    *   **BioMax**：≥ 6× ULN
    *   **Necrosis**：壞死存在（Present vs. Absent）
    *   **Size**：≥ 7 cm
*   **NBS 評分範圍**：0–3 分，用以預測遠端轉移與全因死亡率。

---

#### Slide 005：結果——基本人口統計與隊列特徵 (Results - Demographics & Cohort Summary)
*   **追蹤時間**：中位數 4 年（IQR 2–7 年）。
*   **診斷年齡**：中位數 59 歲（IQR 51–71 歲），男性占 54%。
*   **轉移率**：整體 13%（PCC 13%，PGL 10%）。
*   **無顯著變數**：Ki67 指數、年齡與性別未達顯著差異。

---

#### Slide 006：結果——腫瘤大小與轉移狀態盒狀圖 (Tumour Size by Metastasis Status)
*   **圖表展示**：非轉移組與轉移組之腫瘤大小（mm）分佈盒狀圖。
*   **數據**：非轉移組中位數 34.5 mm vs. 轉移組中位數 84 mm（$p < 0.001$）。

---

#### Slide 007：結果——中央壞死與轉移狀態長條圖 (Necrosis by Metastasis Status)
*   **圖表展示**：非轉移組與轉移組之中央壞死比例比較。
*   **數據**：非轉移組壞死率 7% vs. 轉移組壞死率 80%（$p < 0.001$）。

---

#### Slide 008：結果——BioMax 盒狀圖與單一代謝物診斷效能 (BioMax & Individual Biomarker Performance)
*   **BioMax 比較**：非轉移組中位數 2.2× ULN vs. 轉移組中位數 20.2× ULN（$p < 0.001$）。
*   **單一代謝物效能表格**：
    *   NMA：敏感度 100%，特異度 19%
    *   3-MT：敏感度 75%，特異度 86%
    *   MA：敏感度 20%，特異度 49%

---

#### Slide 009：結果——NBS 評分預測轉移效能 (NBS Score vs Metastasis)
*   **ROC 曲線圖**：AUC 0.96（95% CI 0.90–0.99，1,000 次自舉法驗證）。
*   **閾值 ≥ 2 分之效能指標**：敏感度 90%、特異度 90%、準確度 90%、NPV 98%、PPV 56%。
*   **各分數轉移風險長條圖**：0 分（0%）、1 分（5%）、2 分（33%）、3 分（100%）。

---

#### Slide 010：結果——NBS 評分與全因死亡率 (All-Cause Mortality Analysis)
*   **整體死亡率**：18.8%。
*   **轉移狀態與死亡率圖表**：轉移組 60%（6/10） vs. 非轉移組 13%（9/70）（$OR = 10, p < 0.001$）。
*   **NBS 分組與死亡率圖表**：NBS ≥ 2 分組 40%（6/16） vs. NBS < 2 分組 14%（9/64）（$OR = 4, p = 0.03$）。

---

#### Slide 011：結論要點（一） (Conclusion - Part 1)
*   BioMax 可反映侵襲性 PPGL 表型，提示應更早使用 68Ga-DOTATATE PET/CT 檢查。
*   早期發現轉移有助於精準分期、預後分層、放射性核素治療決策與個體化追蹤。
*   與現有模型相比，NBS 提供了一個簡單且強大的預後工具。

---

#### Slide 012：結論要點（二） (Conclusion - Part 2)
*   保留 Slide 011 之全部內容。
*   **新增文字點**：需在更大型的多中心隊列中進行外部驗證（External validation in larger multicentre cohorts is required）。

---

#### Slide 013：會議議程標題頁 (Session Schedule Slide)
*   **場次標題**：Adrenal: Back to the Basics（Room W183A）
*   **內容**：列出該場次各演講者的發表時間表與摘要編號，本篇發表時間為 1:50 PM - 1:55 PM。
