# 從單細胞定序洞察人類脂肪組織的生命歷程（Insights from Human Single Cell Sequencing Across the Lifespan）

- **會議／場次：** ENDO 2026／SY09 — The Evolving Adipose Organ: Single-Cell and Multi-Omic Windows into Metabolic Health and Disease
- **短講：** SY09-02 — Insights from Human Single Cell Sequencing Across the Lifespan
- **講者：** Carey Lumeng, MD, PhD（University of Michigan）

## 整理稿

### 從「充滿脂肪細胞的簡單器官」重新理解脂肪組織

Carey Lumeng 表示，本次演講涵蓋三條主軸：以單細胞與單核方法理解人體脂肪組織、尚未發表的人體脂肪組織多組學分析，以及兒童脂肪組織細胞圖譜的初步成果。所有展示資料都來自人體研究。

成熟脂肪細胞（adipocytes）雖占脂肪組織的大部分體積，但依解剖部位不同，只占總細胞核數約 **15%–20%**。其餘約 **75%–80%** 屬於基質血管組分（stromal vascular fraction, SVF），包括幹細胞、脂肪前驅細胞、內皮細胞、神經相關細胞與多種白血球；其中巨噬細胞是最主要的白血球族群。

研究人體脂肪組織時，外科團隊溝通、採樣部位（depot）的精確定義與臨床 metadata 都十分重要。一般流程是取得脂肪組織後，分離 SVF 細胞或細胞核，完成品質控管，再進行單細胞 RNA 定序（scRNA-seq）或單核 RNA 定序（snRNA-seq）。早期圖譜可辨識四大轉錄群：免疫細胞、基質細胞、血管細胞與脂肪細胞。

成熟脂肪細胞體積大且容易破裂，難以通過單細胞定序設備，因此 **snRNA-seq 才能有效納入成熟脂肪細胞**。相較於 SVF 單細胞資料，單核方法也更容易捕捉過去被低估的血管內皮亞群，包括淋巴內皮細胞、內皮前驅細胞與周皮細胞。

### 公共圖譜、資料整合與命名挑戰

2023 年的一個整合版本彙集近 **50 萬個細胞或細胞核**。資料量增加後，新的難題是如何判定真正的細胞亞型，以及不同團隊如何使用一致的命名法。研究者可透過 CZI CELLxGENE、Broad Institute Single Cell Portal、WAT Knowledge Portal、Common Metabolic Diseases Genome Atlas 與 Hormone Cell Atlas 等公共資源查詢資料。

Human Cell Atlas Adipose Biological Network 的目標，是整合現有資料、改善 metadata、統一命名，並處理人體有多個脂肪 depot、採樣方式不一等問題。<u>單細胞圖譜的解析力不只取決於定序量，也取決於採樣部位與臨床 metadata 是否被正確且一致地記錄。</u>

### 配對皮下與內臟脂肪：相同大類，不同細胞比例

研究團隊擴充至約 **15 位**接受 bariatric surgery、具有肥胖且代謝狀況不一的個案，取得淺層腹部皮下脂肪（subcutaneous adipose tissue, SAT）與大網膜內臟脂肪（visceral adipose tissue, VAT）的配對檢體。現階段樣本數尚不足以分析不同代謝疾病狀態。

SAT 與 VAT 擁有大部分相同的細胞大類，但 VAT 出現 SAT 未見的 **mesothelial-like cells**。這類細胞在多個 VAT depot 都曾被辨識，已有證據顯示其可能具有 anti-adipogenic 特徵，也可能參與 SAT 與 VAT 的功能差異。體外培養時，VAT 檢體會出現相當多的 mesothelial-like cells，不能只把它們視為污染。

單細胞資料與獨立 flow cytometry 實驗均顯示，VAT 的內皮細胞比例較高、脂肪前驅細胞比例較低，符合 VAT 血管較豐富的既有觀察，也與兩種 depot 在 adipogenesis assay 的差異相呼應。

### 同一細胞核整合 RNA 與 ATAC-seq

團隊使用 10x Genomics 平台，在同一細胞核同步分析 RNA 與染色質可及性（chromatin accessibility）。ATAC-seq 用來辨識染色質較開放、較可能讓轉錄因子結合的區域；整合 RNA 與 ATAC 訊號，可同時觀察基因表現與候選調控區域。

目前資料經品質控管後約有 **12,000 個細胞核**。在主要細胞類型與狀態中，ATAC 開放訊號與 RNA 表現大致相符。值得注意的是，在 adipocytes 與 fibro-adipogenic progenitors（FAPs）中，少於一半的開放染色質區域位於 promoter；許多候選調控區域位於 intron 或基因外區域。

以基因位點為例，`ADIPOQ` 的特異性開放峰只出現在 adipocytes，與其 RNA 表現相符；`MS4A7` 所在的共調控區域則主要在 macrophages 活化。這些結果提供候選調控區域，但仍不等同於已證實的因果機制。

### 細胞類型與 depot 特異的轉錄因子程序

利用 ATAC peak 的序列進行 transcription-factor motif 富集分析，可看到不同細胞類型具有不同調控輪廓：adipocytes 以 **C/EBP family** 訊號為主；FAPs 富集 **FOS–JUN／AP-1 family**，而該訊號在成熟 adipocytes 中大致關閉；mesothelial cells 富集 GATA 與 TEAD 等與 anti-adipogenic 程序相關的因子；immune cells 共同富集 ETS family，並另有 macrophage、T cell 與 B cell 特異因子。以 transcription start site 為中心的分析也顯示 adipocytes 富集 C/EBPα、FAPs 富集 FOS、pericytes 富集 EBF1。

同一細胞類型在不同 depot 也可能採用不同程序。某些 PPAR factors 在 VAT adipocytes 的活性較高，AP-1 factors 則在 SAT adipocytes 較高；FAPs 也呈現 VAT 偏 PPARγ、SAT 偏 AP-1 的模式。這些資料提出下一個問題：究竟是哪些環境或發育因素造成 depot-specific regulation？

### 脂肪組織巨噬細胞不是單純的連續光譜

脂肪組織巨噬細胞（adipose tissue macrophages, ATMs）可分成 lipid-associated macrophages（LAMs）、CD206／MRC1-positive resident macrophages、TIMD4-positive macrophages 與 dendritic cells 等群體。LAMs 富集多個 AP-1 與 C/EBP factors，呈現與脂質處理相關的程序；MRC1-positive macrophages 顯示 NFI factor 活性；TIMD4-positive macrophages 則呈現發育相關因子與 glucocorticoid receptor motif 活性。團隊也觀察到 glucocorticoids 可塑造多個 macrophage populations，但這不代表本資料已證明某一特定族群的單一路徑。

在 crown-like structure 中，含脂質的 macrophage 與緊鄰、未見脂質的 macrophage 可能具有很不同的調控狀態。講者用「比較像蘋果與香蕉，而非蘋果與柳橙」形容差異，認為這些狀態不宜只視為一條平滑連續的 spectrum。

### 將開放染色質與代謝性狀 GWAS 訊號連結

團隊與 Steve Parker、Arushi Varshney 合作，以 linkage disequilibrium score regression（LDSC）比較單核 ATAC-seq 的開放區域與 UK Biobank 等 GWAS 訊號。作為對照，islet beta cells 的開放染色質富集 type 2 diabetes（T2D）相關訊號，而 bulk adipose tissue 幾乎看不到明顯富集。

提高到細胞類型解析度後，adipocytes 的開放染色質區域富集 **T2D、BMI-adjusted waist-to-hip ratio（WHRadjBMI）、fasting insulin 與 insulin sensitivity** 相關訊號；FAPs 則出現 body composition 與 WHRadjBMI 相關富集。再依 depot 拆分，多數 WHRadjBMI 與 fasting-insulin 訊號集中於 VAT adipocytes 與 VAT FAPs。

<u>這些結果把遺傳風險訊號定位到候選細胞類型與 depot，但屬於富集與定位分析，不能單憑此資料斷定那些細胞已被證實是疾病的因果來源。</u>

### Mesothelial cells 的可能發育關係與成脂能力

團隊與 Josh Welch 合作，利用 RNA 與染色質開放資訊推估 cell trajectory。SAT 顯示由共同 FAP node 朝 adipocytes 發展的清楚關係；VAT 除了類似的 FAP-to-adipocyte 關係外，也出現 mesothelial cells 與 FAPs 之間的可能共同節點。`ITIH5` 等位點從 mesothelial cells、FAPs 到 adipocytes 的開放與 RNA 變化，與共享 lineage 的可能性相容，但仍是推論而非 lineage tracing 的直接證明。

研究者以 FACS 分選人體原代 mesothelial cells 與 FAPs，置於不含 `rosiglitazone` 的最低限度分化條件，兩者均可形成 adipocytes。FAP-derived adipocytes 的脂質累積與 lipolysis 高於 mesothelial-cell-derived adipocytes。這支持不同前驅來源可能參與 adipocyte heterogeneity，但其生理意義仍在研究中。

### 44 份檢體的兒童脂肪組織圖譜草案

脂肪量在嬰兒期達高峰、兒童期下降，青春期後逐漸出現性別差異；然而，過去兒童脂肪組織的單細胞資料很少。團隊與 C.S. Mott Children's Hospital 的外科、心臟外科、內分泌科與小兒科合作，建立目前包含 **44 份檢體**的 pediatric adipose-tissue atlas。檢體包括未罹患肥胖、未接受 bariatric surgery 兒童的配對 SAT 與 omental VAT，以及 noncyanotic congenital heart disease 兒童的 epicardial adipose tissue；成人比較組則來自具有肥胖的 bariatric-surgery cohort。

從 infants、preschool、school-age、adolescents 到 adults，主要細胞大類在各年齡層都已存在，整體組成的快照大致穩定，但仍可看到比例差異：mesothelial cells 在兒童 VAT 的比例較高；成人 SAT 有較多 macrophages 與 T cells，成人 VAT 則有較多 FAPs。講者提醒，不同的 proportion-analysis 方法可能得到不同結果，這部分仍在評估。

macrophage map 中可見 LAMs、`PF4`-positive resident 與 `LYVE1`-positive populations。相對於所有 macrophages，`LYVE1`-positive cells 在成人較多，`PF4`-positive resident population 在兒童可能略多。ATAC 資料顯示兒童較多的 `PF4`-positive macrophages 具有 **MAF activity**；`LYVE1`-positive population 富集 nuclear-factor family motifs 與 TFEB；LAMs 則富集 AP-1 factors。成人 LAMs 較高表現 `LPL`、`CD9`、`PPARG` 等 lipid-metabolism genes，兒童 LAMs 的 `PF4` 與 inflammatory cytokines 表現較高。這些差異的功能意義尚未確定。

### 結論與證據限制

單核 RNA／ATAC 多組學可同時描繪人體脂肪組織的細胞狀態與候選調控區域。Lumeng 團隊的資料將部分 metabolic-risk GWAS signals 定位到 VAT adipocytes 與 FAPs，提出 VAT-specific mesothelial cells 可能參與 adipogenesis，並顯示兒童與成人的 macrophage programs 可能隨生命階段而異。

這些成果仍有清楚限制：SAT–VAT 配對 cohort 約 15 人，尚不足以比較代謝疾病狀態；兒童與成人比較同時混入年齡與肥胖狀態差異；pediatric trajectory 仍需更多細胞與更深的 ATAC-seq；許多結果是 motif、trajectory 或 GWAS enrichment 所提出的候選機制，仍需後續功能驗證。

### 現場問答

#### VAT 如何造成全身性心血管代謝影響？

有聽眾追問 VAT 的 mesothelial cells 是否會產生進入循環、直接導致全身代謝異常的訊號。Lumeng 回答，這些細胞具有明顯纖維化與發炎特徵，也可能包含尚未分解出的亞群；大網膜內不同採樣位置也是長期未標準化的問題。團隊已做 cell-communication analysis，但目前尚未找到具說服力的單一循環訊號。

#### 兒童到成人的 trajectory 是否已完成？

兒童資料的 trajectory analysis 仍在進行。ATAC-seq 非常消耗定序深度，在訊號飽和前仍可持續增加資料，因此團隊正重新定序許多檢體。現階段不能從非肥胖兒童與肥胖成人的比較直接推定發育轉折。

#### 是否分析 histone modification 或 DNA methylation？

團隊尚未直接進行這些分析。其他研究者曾在體外 adipogenesis model 深入研究相關機制；對原代人體組織而言，ATAC-seq 是目前較容易進行的全基因組染色質變化方法，但 histone modification 與 DNA methylation 是重要的後續方向。

#### 兒童與肥胖成人的相似性是否來自脂肪組織都在生長？

團隊已有部分 lean-adult data，正在整合且仍需擴充。Lumeng 強調，單看 cell proportion 可能誤導；深入比較特定細胞類型內的 cell states 與轉錄差異，可能比比例更能看出群組差異。方法學上還必須同時處理 paired samples、sex、五個 age groups、obesity 與其他 metadata，目前仍缺少成熟的多維分析工具。

#### Preadipocytes、fibroblasts 與 FAPs 如何區分？

這些細胞在顯微鏡下都像 fibroblasts，過去也曾稱為 adipose stromal cells（ASCs）；目前學界逐漸採用 fibro-adipogenic progenitors（FAPs），但命名仍未完全統一。許多 FAP categories 會包含傳統所稱的 fibroblasts；mesothelial cells 長期培養後也很像 fibroblasts，過去可能被混在同一群，但單細胞資料顯示它們是不同群體。
