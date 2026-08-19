# 垂體神經內分泌腫瘤侵襲性的分子生物標記：從早期偵測到標靶治療（Molecular Biomarkers of Aggressiveness in Pituitary Neuroendocrine Tumors: From Early Detection to Targeted Therapy）

- **會議／場次：** ENDO 2026／SY01
- **場次主題：** When Benign Isn't Harmless: Revisiting Aggressiveness and Extrasellar Spread in Pituitary Adenomas
- **短講：** SY01-03
- **講者：** Qilin Zhang, MD, PhD, MMSc

## 整理稿

### 從少數難治性 PitNET 尋找早期風險訊號

主持人介紹最後一位講者 Qilin Zhang。講者是來自中國的神經外科醫師，也曾在 Mass General Brigham 接受神經內分泌研究訓練；前兩位講者分別談手術與 genomic perspectives，本講則聚焦 **RNA、protein-level biomarkers**，以及這些訊號如何通往標靶治療。

目前 pituitary neuroendocrine tumor（PitNET）的治療包括手術、放射治療與藥物，但講者指出，約 **1% 或更少** 的腫瘤會在多種治療後反覆復發或持續進展。這些 aggressive、treatment-resistant tumors 雖少，卻是最棘手的臨床族群，因此核心問題是：能否在病程早期，從一般腫瘤中辨識出未來可能變得 aggressive 的個案？

<u>Slides 延伸補充：current pipeline-v2 child handoff 僅保留講者 disclosure 與正式 title card，確認 Qilin Zhang 無需揭露的財務關係，隸屬 Huashan Hospital Neurosurgery 與 Mass General Brigham Neuroendocrine Unit。科學內容投影片未出現在此 time-bounded child handoff，因此本篇所有研究數字與機制敘述均以 terminology-QA transcript 為依據，不把未擷取到的圖表細節補寫成 slide evidence。</u>

### AI 病理風險模型：從 H&E 找到高風險區域

研究團隊先做 retrospective cohort analysis。單一中心累積超過 **2,000** 例 pituitary tumors，其中找出超過 **100** 例具有 aggressive behavior、追蹤資料與 H&E specimen 的腫瘤。研究者掃描 whole-slide images，先排除非腫瘤與干擾區域，再讓 AI 分析 tumor morphology，辨認 aggressive、treatment-resistant 或 poor-prognosis tumors 共有的圖像模式。

模型把腫瘤內部標示為 high-risk 與 low-risk regions；high-risk regions 比例愈高，recurrence risk 也愈高。這個關係除了 training cohort，在另一院的 prospective validation cohort 與其他中國醫院的 external validation cohort 也維持一致。即使校正 age、previous surgery 與 extent of resection 等可取得的 clinical risk factors，AI score 仍可顯著區分 recurrence risk。這項工作仍在投稿與軟體化階段，尚不是已完成臨床驗證的常規工具。

High-risk regions 同時富含 immune cells、stromal cells 與其他 tumor-microenvironment components，提示 aggressive morphology 與 microenvironment activation 相關。不過這仍留下另一個問題：訊號究竟來自 tumor cells 本身，還是只是免疫與間質成分增加？

### Multiomics 與 EMT^PRO：相關性不能直接等同因果

團隊在另一個 cohort 對 **200 個 tumors 與 7 個 normal anterior pituitary glands** 進行 multiomics。Unsupervised clustering 得到七群：四群屬 PIT1 lineage、兩群屬 TPIT lineage，另有一群結合 SF1-lineage 與以三種 lineage transcription factors 皆陰性定義的 null-cell tumors。

其中一個跨 lineage、侵襲性較高的 subgroup 被命名為 **EMT^PRO**；該群有 **37.9%** 達 Knosp grade 4，**69%** 有 surgical invasion，immune score 與 stroma score 也較高，並由 IHC staining 支持。多個 epithelial–mesenchymal transition（EMT）相關 transcription factors 呈強陽性。EMT 在其他 cancers 與 invasion、aggressiveness、metastasis、stemness 及 microenvironment remodeling 有關，但此處資料支持的是 association，不能直接下結論說 EMT 或 microenvironment 已被證明是 PitNET aggressiveness 的單一原因。

Bulk multiomics 無法分辨高 EMT signal 是 tumor-cell intrinsic，或反映較多 microenvironment infiltration；因此團隊轉向 single-cell RNA sequencing（scRNA-seq），嘗試直接定位 tumor-cell differentiation state。

### 以正常與胎兒垂體建立 differentiation reference

在肺與 gastrointestinal neuroendocrine tumors，differentiation status 與 prognosis 密切相關；講者提出，PitNET 也可能存在 well-differentiated 到 progenitor-like／poorly differentiated 的軸線。研究團隊先分析 **3 個正常成人 anterior pituitary glands**，找到表達 PIT1、卻不表達 hormone genes 的細胞群。Pseudotime 與 differentiation analysis 顯示其可能進一步分化成三種 PIT1-lineage hormone-producing cells，因此被視為 PIT1-lineage progenitor population。

接著將成人資料與北京團隊的人類 fetal anterior pituitary datasets 整合，建立發育參照，再把 **21 個不同 lineages 的 PitNETs** 對齊這個 framework。Lactotroph tumors 對齊 prolactin-secreting cells，somatotroph tumors 對齊 GH-secreting cells；另有跨 lineage tumors 更接近 progenitor region。團隊由此提出 well-differentiated 與 poorly differentiated classification，並以 **7 個 markers** 建立辨識 panel。在獨立 **750 例 PitNET cohort** 中，這個 differentiation-based classification 能預測 long-term recurrence risk，表現優於 Ki-67；但講者沒有把它描述成已可取代現行病理評估的單一 cut-off。

### iPSC differentiation 補上 TPIT／SF1 progenitor trajectories

成人參照中只清楚看到 PIT1 progenitors，但 aggressive tumors 有相當比例來自 TPIT lineage。團隊因此重現人類 stem-cell-to-pituitary 的 in-vitro differentiation system，在預期培養條件下產生 pituitary-lineage cells，並偵測到多種 pituitary hormones secretion，支持 functional endocrine differentiation。

研究者在 differentiation onset 前後做兩次 single-cell analysis，排除 neuron-like 與 microenvironment cells，聚焦 pituitary endocrine development。資料顯示發育並非單一路徑，而有兩條 trajectories；沿途出現以 **GATA3-positive／GATA2-negative** 與 **CITED1** 為特徵的 progenitor-like populations。GATA3 也可能出現在 SF1 cells 或部分 TSH-secreting cells，因此必須與 GATA2 negativity 等資訊合併判讀，不能只用單一 marker 定義細胞身分。

### Corticotroph tumors 的異質性與待驗證 signatures

以新的 reference 整合 **35 個 corticotroph tumors**，其中 **20 例 Cushing disease、15 例 silent corticotroph tumors（SCA）**。多數 SCA 與 Cushing disease 分成不同 clusters，但少數 Cushing disease tumors 與 SCA overlap。講者聯想到臨床上少數由 SCA 轉為 Cushing disease 的案例，不過這只是可能的生物學對應，不能由 transcriptomic overlap 直接證明轉化路徑。

Cushing disease 至少呈現三個 subtypes，包括 USP8-mutant 與不只一種 USP8-wild-type subgroup。其中一個 USP8-wild-type subgroup outcome 最差；講者認為最 aggressive 的 corticotroph tumors 可能源自此群。由於 single-cell cohort follow-up 仍短，現階段不能直接評估 long-term prognosis。團隊正以更大的 **200 例 Cushing disease cohort** 驗證 CITED1、GATA3-positive／GATA2-negative 等 signatures 是否能在早期辨識高風險腫瘤。

### Biomarker continuum：機率分層而非絕對界線

講者以 TPIT lineage 為例，提出 aggressive behavior 應視為 biological continuum，而不是只靠 Cushing disease 與 SCA 的二元分類。Continuum 一端是 hormone-secreting、較小且較不 aggressive 的 tumors；另一端則較大、功能較低、invasive 且 treatment resistant。

在 genomic level，aggressive end 可能較常出現 **ATRX、DAXX、TP53 alterations**，以及較多 copy-number variation、loss of heterozygosity 或 chromosomal instability；在 transcriptomic／protein level，則與 microenvironment activation、EMT activation，以及 GATA3、CITED1 等 less-differentiated／progenitor-like features 相關。<u>這些 markers 沒有一條可對所有個案畫出絕對 cut-off；它們目前較適合作為提高或降低 aggressive-behavior probability 的研究性風險訊號。</u>

### Patient-derived organoids 與 surufatinib

為把 biomarkers 轉化為治療，團隊依不同 tumor subtypes 的 pathway activity 優化 culture conditions，建立 patient-derived PitNET organoids。Organoids 可存活至少 **3 個月**，維持 hormone secretion，以及原始 tumor 的 Ki-67、hormone 與 lineage transcription-factor patterns。這段存活時間很關鍵，因 sequencing 往往需等待數週到一、兩個月，三個月提供了先理解 molecular characteristics、再做 drug screening 的實際窗口。

團隊在這個平台篩選 **1,344 種 drugs**。Cabergoline 與 somatostatin analogues 效果不強，但講者特別提醒 selection bias：能提供手術 specimen 的患者，本來就常是對這些藥物反應差或 resistant 的個案。Everolimus 等 mTOR inhibitors 與 temozolomide 的 activity 也低於預期，不能因此推論這些藥物對一般臨床族群無效。

較有希望的 single agents 之一是 **surufatinib**，targets 包括 **VEGFR1–3、FGFR1、CSF-1R**，與 proliferation、angiogenesis 及 tumor microenvironment pathways 有關。講者分享一位 pituitary carcinoma patient：經三次手術與五次 radiotherapies，且曾接受 brainstem metastasis surgery，疾病仍反覆。Surufatinib 治療六個月後 tumor 有部分縮小，但因 proteinuria 與 hypertension 停藥；停藥六個月後疾病再次明顯 progression，出現 spinal dissemination，患者於演講前一個月死亡。這是單一 case 的 temporal response，不能稱為已證實 efficacy，也不能把「部分縮小」自動等同依正式 criteria 判定的 partial response。

基於 organoid 與 case observation，團隊已啟動 surufatinib 治療 aggressive PitNET 的 **single-center、single-arm exploratory trial**，並優先考慮 non-functioning tumors。原因是部分 reports 指出 prolactin 或其他 functioning tumors 對 temozolomide 可能較有反應，而 non-functioning refractory tumors 缺乏選項；真正 efficacy 與 safety 仍必須等待 trial results。

### 現場問答

#### 是否應測試 TKI combinations？

聽眾分享 pheochromocytoma／paraganglioma organoid 經驗：單一 TKI 常不理想，即使 sunitinib 的 clinical PFS 也可能只有六至九個月；兩或三種 drugs 合併時，體外可能出現 additive 或 synergistic effects。Qilin Zhang 回答，團隊也測試過 blood-brain-barrier–penetrant TKIs，整體訊號不強；目前 surufatinib 與幾種 agents 的 single-drug response 較明顯。

團隊尚未採用 combinations，主要考量 targeted drugs 本身已有 substantial toxicity，其他 neuroendocrine-tumor trials 也見 severe adverse events，直接合併可能增加風險。不過講者同意，先在 organoid platform 做 combination screening 是值得嘗試的下一步；這不是已開始的 clinical combination strategy。

#### iPSC model 如何處理 hypothalamic cells？

講者區分兩種模型。Patient-derived tumor organoids 直接來自 surgical pituitary specimens，不含 hypothalamic tissue；iPSC-induced differentiation system 則完全在體外，培養過程可能同時產生 hypothalamic／neuron-like cells。團隊沒有在 culture stage 物理移除這些細胞，而是在 single-cell sequencing analysis 時依 expression clusters 排除，讓後續 trajectories 聚焦 pituitary endocrine cells。
