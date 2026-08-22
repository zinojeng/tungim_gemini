# 同一受體的雙重面貌：黃體素受體異構物如何塑造乳癌中的基因網路與細胞命運（Two Sides of the Same Receptor: How Progesterone Receptor Isoforms Shape Gene Networks and Cell Fate in Breast Cancer）

- **會議／場次：** ENDO 2026／SY04 — The PR Puzzle: Context-Dependent Actions Reveal Therapeutic Potential
- **短講：** SY04-02
- **講者：** Noelle Gillis, PhD

## 整理稿

### PR 不只是 ER 活性的替代標記

乳癌病理慣用 **ER、PR 與 HER2** 染色；其中 progesterone receptor（PR）常被當成 estrogen receptor（ER）訊號是否活躍的替代讀出，臨床上也多以陽性或陰性的二元方式呈現。講者主張，PR 不只是 ER 的回報器，而是一條尚未被充分開發的生物學軸線；若要發展精準治療，必須進一步理解不同 PR 異構物如何改寫細胞命運。

單一 *PGR* 基因透過兩個 promoter 產生較長的 **PR-B** 與較短的 **PR-A**。兩者近 90% 相同，都能結合 progesterone 與 progesterone response element（PRE），主要結構差異是 PR-B N 端多出的 **169 個胺基酸 B-upstream segment（BUS）**。這個看似不大的差異會改變 coregulator 招募，造成截然不同的轉錄輸出。正常乳腺組織中的 PR-A 與 PR-B 大致等量；乳癌早期則常見偏高的 PR-A:PR-B 比例，但其因果角色與臨床分布仍未完全釐清。

<u>Slides 延伸補充：結構圖顯示兩種異構物共享 DNA-binding domain、ligand-binding domain、AF1/AF2 與多個可受激酶調節的磷酸化位點；PR-B 的 BUS 區段另含 AF3。這些位點提供理解 isoform-specific coregulator recruitment 的結構背景，但投影片本身不等於已證實每一位點在本研究中的功能。</u>

### 建立只表現單一異構物的 T47D 模型

研究使用內源性 PR-null 的 **T47D-Y** clone，以 lentiviral vector 建立只表現 PR-A 的 T47D-A、只表現 PR-B 的 T47D-B，以及同時表現兩種異構物的 T47D-CO。Western blot 用來確認各株的蛋白表現。後續以較具 PR 選擇性的 synthetic progestin **R5020** 刺激，並從 2D proliferation、3D mammosphere、mouse mammary intraductal（MIND）model、RNA-seq 與 CUT&RUN 等層次比較兩種異構物。

### PR-B 偏向增殖，PR-A 偏向球體形成與播散表型

2D 培養中，PR-A 細胞對 R5020 的增殖反應不明顯；PR-B 細胞則明顯加速，T47D-CO 介於兩者之間。轉到 3D mammosphere culture，方向反而不同：所有細胞都能形成球體，但 **PR-A 細胞在 R5020 下的 sphere count 增幅最突出**，PR-B 的反應較弱。

<u>Slides 延伸補充：2D 曲線追蹤至 72 小時，圖上顯示 PR-B 的 ligand-dependent proliferation 較強；3D 圖則顯示 PR-A sphere count 的增加達顯著差異。星號代表圖中比較的統計結果，但講者未逐一口述每個時間點或完整統計模型，因此不額外推定逐時間點 p 值。</u>

MIND model 同樣揭示功能分流：PR-B tumor 生長較快，終點 **Ki-67** 陽性比例也較高；PR-A tumor-bearing mice 的 circulating tumor cells（CTCs）較多，投影片亦顯示較多遠端器官病灶。這些結果支持「快速原位增殖」與「播散／stem-like phenotype」可能由不同 isoform 偏向驅動，但仍屬細胞株與小鼠模型，不應直接外推成人類治療效果。

### 2D 與 3D 中的 transcriptome 分歧

RNA-seq 顯示 PR-A 與 PR-B 的 ligand response 強烈依賴培養情境。PR-A 在 3D mammosphere 中出現較廣泛的 differentially expressed genes；PR-B 則在 2D culture 中較具轉錄反應。團隊由 R5020 後最顯著上升的基因建立 isoform signatures，放入 **METABRIC ER-positive breast cancer** cohort 後，高 PR-A signature 與較差 overall survival 相關（投影片：**p = 5.21 × 10^-5**），高 PR-B signature 未達顯著（**p = 0.07323**）。這是 gene-signature prognostic association，不能單憑此分析證明 PR-A 是不良預後的直接原因。

### PR-A 偏向遠端 cis-regulatory elements 與 super-enhancers

CUT&RUN 顯示 R5020 後 PR-A 與 PR-B cistrome 的重疊有限，且 PR-A peaks 更多。相對而言，PR-B peaks 較靠近 transcription start site（TSS），PR-A peaks 較常位於遠端、intron 或 intergenic region；與 ENCODE cis-regulatory elements 對照後，PR-A 也較常落在 candidate enhancers、CTCF-bound sites 與其他調控區。這是分布傾向，不代表每一個 PR-A site 都大於 10 kb、或每一個 PR-B site 都小於 1 kb。

ROSE analysis 將 PR-A binding signal 排序後辨識出一群 **super-enhancers**。鄰近基因的 Gene Ontology 涵蓋 cell-cycle checkpoint、mitotic checkpoint、TGF-β receptor、Wnt receptor、cell motility 與 growth-factor response 等路徑，與 sphere growth 及 cancer-stem-cell-like behavior 的假說一致；這些 enrichment 提供機制線索，並不等同逐一驗證每條路徑。

### PR-A 在無外加 estrogen 下招募 ER、CTCF 與 H3K27ac

在未外加 estrogen、只給 R5020 的實驗中，PR-A binding sites 附近可見 **ER 與 CTCF 招募**，並伴隨 active enhancer mark **H3K27ac** 增加。*CDKN1B*（p27）上游位點是講者展示的實例：遠端 PR-A peak 在 hormone treatment 後同時出現 ER、CTCF 與 H3K27ac 訊號，也保留 proximal promoter binding。這支持 PR-A 可能透過 enhancer–promoter architecture 改變細胞週期相關基因，但尚不能由單一 locus 推論所有 PR-A target 都採同一機制。

### CRISPRi 功能性阻斷 super-enhancers

團隊建立 dCas9-KRAB CRISPR interference（CRISPRi）系統，依 PR-A signal 與可設計高分 gRNA 的條件，選取五個候選 enhancer 個別阻斷。結果顯示，多個 target 會降低 T47D PR-A 細胞在 R5020 下的 mammosphere formation，為 enhancer activity 與 stem-like expansion 之間提供功能性證據。投影片與講者用語皆是「抑制」而非證明完全消除；不同 enhancer 的效應也不完全相同。

### 臨床轉譯：患者分層不能只看 PR 陽性

講者以三組研究說明 antiprogestin translation：術前 onapristone-XR 的 **SOLTI-1802 ONAWA**、onapristone 加 fulvestrant 用於 ER+/HER2- metastatic breast cancer 的 phase II trial，以及依 PR isoform ratio 選人的 **MIPRA trial**（mifepristone）。現有結果並不一致，多數研究也沒有先依 PR-A:PR-B ratio 分層。MIPRA 提供 isoform-guided selection 可能有用的臨床概念證據，但不能據此認定所有高 PR-A 患者都會受益，仍需要更多檢測標準化與前瞻性驗證。

<u>臨床上僅以「PR-positive」分類可能掩蓋 PR-A 與 PR-B 的生物學差異；但 isoform ratio 目前也尚未成為可直接套用的常規 predictive biomarker。</u>

### 現場問答：比例異質性、cofactors 與 ER dependence

目前臨床 PR antibody 無法區分 PR-A 與 PR-B；Western blot 又需較多 tumor tissue，因此人類腫瘤的 isoform ratio 分布仍難精確估計。講者認為其高度異質，但沒有足夠資料提供百分比。對於腫瘤為何切換比例，mouse tumor cell lines 在導入 PR 後仍會形成不同 A:B ratio，提示 transcriptional regulation 很複雜，機制尚待研究。

Motif analysis 中，PR binding site 經常不是 canonical PRE；這批 mammosphere CUT&RUN 富集 SOX、STAT 等與 stem-like state 相關的 motifs，而且 PR-A 與 PR-B 的 partner-site patterns 不同。五個 CRISPRi target 中，展示的 enhancer 連到 *CDKN1B*；其餘候選包括一個 metabolism-related gene 與數個 cell-cycle-related genes。這符合 dormant／reactivation model，但講者明確稱其為 hypothesis。

BUS 區段可能影響 corepressor binding。初步資料顯示 PR-A 較緊密保留某些 corepressors；在 nuclear-receptor biology 中，這些蛋白也可能作為移動或交互作用的載體，而非只執行 repression。FOXA1 並非兩種 isoform 差異的主要結果：兩者都可結合，但沒有觀察到明顯 differential binding。

使用 **tamoxifen** 或 **fulvestrant** 阻斷 ER，只能部分降低 PR-A-driven sphere formation，無法完全消除 PR response。至於其他 steroid receptors 的 transcriptional signatures，團隊雖有資料但尚未分析，講者拒絕先行推測。

最後，PR-A 在 vehicle state 已有較多 baseline genomic binding；加 ligand 後 cistrome 又大幅重排，可能反映 coactivator／corepressor exchange。初步 proliferation experiment 中，有無外加 estrogen 對 PR-A 細胞生長差異不大，因此講者審慎形容它「可能較 estrogen-agnostic」。這不等於完全 ER-independent，因為同一研究也顯示 PR-A 會招募 ER，而 ER antagonism 可部分抑制 sphere formation。
