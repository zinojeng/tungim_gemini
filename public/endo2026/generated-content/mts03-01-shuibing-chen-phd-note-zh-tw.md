# 人類多能幹細胞、類器官、人工智慧與轉譯醫學（Human Pluripotent Stem Cells, Organoids, AI and Translational Medicine）

- **會議／場次：** ENDO 2026／Algorithms and Organoids: Transforming Diabetes Therapeutic Discovery（MTS03）
- **短講：** MTS03-01／官方 agenda presentation ID `3437614-2907552`
- **講者：** Shuibing Chen, PhD

## 整理稿

### 從 new approach methodologies 到人類疾病模型

主持人 Rohit N. Kulkarni 先說明，本場聚焦於以演算法與類器官推動糖尿病治療探索，並呼應 NIH 對 **new approach methodologies（NAMs）**的重視：以人類細胞、組織與計算模型補充動物研究，逐步提高研究的人類相關性。開場介紹、會場規則與第一位講者的引介均屬本短講邊界；本篇只涵蓋 Shuibing Chen 的正式 presentation，於下一位講者的題名卡與介紹前結束。

Chen 的實驗室以兩個問題為核心：如何建立具功能的人類細胞或類器官，以及建立後如何用於 disease modeling 與 drug screening。主要材料是人類多能幹細胞（human pluripotent stem cells, hPSCs），包括取自 inner cell mass 的 human embryonic stem cells（hESCs），以及以四個 transcription factors 將體細胞重編程而成的 induced pluripotent stem cells（iPSCs）。在 Cornell 的 IRB protocol 下，捐贈 **5 mL blood** 可同時進行 whole-genome sequencing 與 iPSC 建立。

CRISPR gene editing、base／prime editing 可用來 knockout 基因或調控區，也可 knock in 單一 nucleotide variant，建立遺傳背景相同的 isogenic controls，再分化成疾病相關細胞。經過約二十年的 protocol 開發與整合，團隊目前可由 hPSCs 生成約 **15 種細胞或類器官**，涵蓋神經、心肌、內皮、免疫、胰臟與腸肝肺等不同 lineage。

<u>Slides 延伸補充：投影片將 NAMs 的資料生態系呈現為 in silico、in chemico 與 in vitro 等互補方法；這是一個研究平台方向，不等於本短講已證明所有動物模型都可被取代。</u>

### VMI organoid：把血管與 resident macrophage 納入胰島模型

為使 organoid 更接近真實生理與病理環境，團隊將 endothelial cells 與 macrophages 加入 stem-cell-derived islet cells，建立 **vascularized macrophage-islet organoid（VMI organoid）**。Alpha、beta、delta cells 與 ETV2-overexpression-derived endothelial cells、同一細胞株衍生的 macrophages 經重新組裝後，約 **48 小時**形成大小接近人類胰島的 organoid；其中 insulin-positive beta cells、CD68-positive macrophages 與 CD31-positive endothelial cells 可被分別辨識。

相同 beta-cell 數量下，VMI organoid 對 high glucose 與 KCl 的 insulin secretion 高於非共培養條件。Single-cell multi-omics 顯示 beta-cell cluster 的 AFP、GCG 等 off-target markers 降低，而 INS、PDX1、PAX6 等 beta-cell-associated markers 上升，支持共培養環境與較成熟的 transcriptional state 相關，但這仍是模型內的比較結果。

人類胰島 endothelial cells 具有 fenestrae，使 insulin 等 macromolecules 能較迅速跨越薄膜。Electron microscopy 顯示，單獨培養的 hESC-derived endothelial cells 表面較平滑，VMI organoid 中則出現類似 human-islet endothelium 的 fenestrae。<u>圖中的 **500 nm** 是 electron micrograph 的比例尺，不是每個 fenestra 的量測直徑。</u>

團隊也以 **Coxsackievirus B4（CVB4）**感染模型測試 resident macrophage 功能。Beta cells 受感染與死亡後，CD68-positive macrophages 變大並吞噬 GFP-positive cellular remnants，顯示 organoid 可同時呈現病毒造成的 beta-cell injury 與 macrophage phagocytosis。

### Center for Genomic Health 與傳統 screening pipeline

Cornell 的 **Center for Genomic Health（CGH）**以「Organoid Village」為中心，納入不同性別、族裔與疾病背景的 iPSC lines，並透過數個協作方向連結 single-cell／spatial short- and long-read analysis、GWAS candidate validation、chemical tools 與 drug screening。傳統 screening 從 primary screen、hit confirmation、dose-response、in vitro structure–activity relationship（SAR）到 in vivo mechanism 與 IP protection逐步推進。

在 96- 或 384-well plates 中，研究者可依問題選擇 luciferase-based beta-cell function assay、Ki-67 proliferation assay 或 cleaved caspase-3 apoptosis assay。這類方法有效，但每個 readout 通常只回答有限問題，且大規模執行成本高，因此團隊轉向以單細胞 transcriptome 同時讀取多維反應。

### ChemPerturb-seq：把 chemical exposure 與單細胞轉錄體連結

J. Jeya Vandana 提出的 **Chemical Perturb-seq（ChemPerturb-seq）**先為細胞建立可追蹤 barcode，再於 96-well plates 中分別給予化合物；處理數天後將細胞合併進行 single-cell RNA-seq，最後依 barcode 回推每個細胞的 exposure。Phase I 收錄 **46 種 hormones／growth factors**，Phase II 約有 **360 種 FDA-approved drugs**，形成可供後續查詢與模型訓練的高維資料集。

公開的 **ChemPerturbDB** 將此資料庫與 diabetes-focused language-model interface 結合。現場 demo 先查詢 PDX1，再由後端資料產生不同 hormone exposure 下的 expression violin plot；查詢 beta-cell proliferation 或 HIPPO pathway 時，系統則以預先定義 gene sets 執行 gene set enrichment analysis（GSEA）。講者的 demo 中，glucagon 被模型選為可能下調 beta-cell HIPPO pathway 的 hormone；這是資料庫中的預測性 enrichment signal，並非本短講提供的獨立功能驗證。

Advanced enrichment analysis 允許研究者輸入約 **5–200 genes** 的自訂 gene set，運算約需 **4–5 分鐘**，再排序可能上調或下調該 gene set 的 hormones 或 chemicals。<u>Slides 延伸補充：資料庫另列出 screening concentration，例如 ACTH 10 nM、Aldosterone 0.1 µM、CRH 0.01 µM、Dopamine 10 µM、GLP-1 0.01 µM 與 Glucagon 0.01 µM；這些是實驗條件，不應直接解讀為臨床劑量。</u>

### 由 biological readout 與 transcriptome 建立 beta-cell phenotype model

團隊與 UCLA Wei Wang laboratory 合作，將可量測的 **aging、cell size、Ca²⁺ response 與 electrophysiology** 與單細胞 transcriptome 配對，訓練 ML／AI mapping model，再把學到的 transcriptomic matrix 套用到 chemical-perturbation data，用來預測 beta-cell phenotype、aging trajectory、drug response 與可能的 mechanistic biomarkers。

在 Jiahang Sha 與 Sally Lee 主導的 preliminary aging project 中，模型提出可能使 beta cells rejuvenate 或加速 aging 的 compounds；**Metformin** 是排名較前的 anti-aging hit 之一。講者把這個結果視為增加對預測方向的信心，但並未在本短講中提出足以證明 beta-cell rejuvenation 的獨立臨床或功能性驗證。

<u>Slides 延伸補充：模型圖表達的是 biological readout 與 transcriptomic data matrix 之間的學習映射；不宜把它簡化為已確定的單向因果關係。</u>

### dkNET-AI 與 CloudBioMapper：把分析流程搬到可操作的雲端介面

Chen 也參與 NIDDK-funded dkNET、PanKbase 等 data-resource projects。新推出的 **dkNET-AI** 讓使用者先在網頁建立 computational unit，自選 RAM、CPU／GPU 與 machine type，再啟動預先配置的 workflow。現場建立 virtual computer 約需 **10 秒**；CloudBioMapper 可下載 FASTQ、選擇 reference genome 與運算環境，執行 alignment、filtering、normalization、integration 與 UMAP 等 single-cell analysis。

講者同時展示 literature-connected AI agent，以「T2D drugs and their targeting cells」為例產生藥物、target cells 與 mechanisms 的表格，並可要求對應 PubMed references。<u>這段是即時軟體 demonstration；模型列出的藥理敘述與文獻連結仍需研究者逐項核對，不能把介面輸出本身視為 source-validated evidence。</u>

以四個 human-islet samples 為例，講者表示預設的 cloud workflow 約 **7 分鐘**可完成示範運算。目前平台仍與 alpha users 優化，後續將招募 beta users；現階段部分 cloud resources 免費，但未來使用者增加後可能建立收費機制。這項平台的實際價值在於降低 bioinformatics workflow 的操作門檻，同時保留資料、parameters 與 reference sources 供追溯。

### 結語：把模型當成可驗證的協作基礎

本短講把 human stem-cell models、VMI organoids、ChemPerturb-seq 與 cloud AI tools 串成一條 translational pipeline：先建立更接近人類組織的模型，再取得可追蹤的 perturbation data，最後以 ML／AI 協助提出候選 compounds、phenotypes 與 analysis paths。講者反覆強調這些都是開放協作平台，期待研究者實際使用並回饋。

**核心價值不是讓 AI 取代生物學驗證，而是把 human-relevant model、high-dimensional data 與可重現分析放在同一個迭代系統中。** <u>任何由 enrichment、prediction 或 AI agent 產生的候選答案，仍必須回到實驗設計、原始資料與文獻證據完成驗證。</u>
