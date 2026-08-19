# 培養皿中的糖尿病：以三維人類模型解析免疫細胞與 β 細胞互動（Diabetes In A Dish）

- **會議／場次：** ENDO 2026／Algorithms and Organoids: Transforming Diabetes Therapeutic Discovery（MTS03）
- **短講：** MTS03-02／官方 agenda presentation ID `3437615-2907553`
- **講者：** Cherie Stabler, PhD

## 整理稿

### 從 1 型糖尿病的未解問題出發

主持人 Rohit N. Kulkarni 在 Shuibing Chen 結束後介紹第二位講者、University of Florida 生物工程學家 Cherie Stabler。她希望展示團隊正在建立的組織工程工具，讓其他實驗室思考可用於哪些問題與合作，而不是宣稱單一模型能回答所有 1 型糖尿病（type 1 diabetes, T1D）問題。

T1D 已知涉及 genetic predisposition、environmental triggers、選擇性的 β 細胞破壞與 adaptive immune response。胰島周圍可見 **CD8+ cytotoxic T cells**，也有 endothelial-cell／T-cell trafficking markers、chemokines、相關 TCR，以及 effector／regulatory T-cell balance 改變等訊號；但哪些免疫細胞真正啟動並延續疾病，仍未完全釐清。從 T1D 捐贈者胰島分離並擴增的 T-cell clones 中，也可見不少表面上與 T1D 無關的細胞：它們究竟只是被發炎吸引而來，還是參與病程，仍是問題。

β 細胞也未必只是被動受害者。受壓力時，它們可能上調 **HLA class I**、分泌 chemokines，進而影響 T-cell recruitment；但這些變化是攻擊後的反應，還是較早參與了疾病啟動，尚無定論。Stabler 因而把問題轉成：若不了解人類 T1D pathogenesis，如何設計更好的 cell therapy、therapeutics 與 screening platform？她也明確表示，這類 human-based in vitro models 現階段是補充，而非完全取代 animal studies。

<u>Slides 延伸補充：正式 title card 顯示講題為 Diabetes In A Dish，Stabler 為 University of Florida Pruitt Family Department of Biomedical Engineering 教授兼系主任；disclosure slide 記載無需揭露的財務關係。</u>

### Top-down 與 bottom-up 模型各自回答不同問題

**Top-down in vitro platforms** 包括 cadaveric human islets 與 cadaveric human pancreatic slices。它們保留 in situ native composition、disease relevance 與 spatial features，pancreatic slices 也可在體外維持數天，對疾病組織觀察很有價值；但來源不可預測、取得有限、只呈現某一時間點，culture duration 短且 heterogeneity 高，也很難拆解單一細胞程序。Stabler 以走進兩個孩子或兩隻貓正在打架的現場比喻：看到的是複雜結果，卻未必知道誰先開始。

**Bottom-up platforms** 則從 beta-cell lines 發展到 stem-cell-derived beta cells（SC-beta cells）。研究者可控制細胞組成與 disease state，運用 gene editing 建立 isogenic human repertoire，並以 cryopreservation 將不同細胞在需要時一起解凍實驗。但經典 round-bottom 2D well 把單細胞放進「forced intimacy」，缺乏 physiological gradients 與 spatial control。<u>模型沒有絕對好壞；應先界定問題，再選擇能回答該問題且限制可接受的工具。</u>

### 去細胞豬胰 ECM 建立可觀察的 3D niche

團隊以豬胰臟製成 **decellularized pancreatic extracellular matrix（ECM）**，用來包埋 human islets 或 β cells。Human islets 在此 matrix 培養 **8 天**後仍保有 viability，glucose-stimulated insulin-release assay 也顯示 phenotype 與功能可維持。免疫細胞可在 matrix 中以三維方式移動、增殖與互動；講者指出並非所有 matrices 都出現相同行為，因此這是需要比較與驗證的 matrix-dependent phenomenon，而不是所有其他材料都做不到。

為了量化這個時間與空間窗口，團隊先以 Fiji／TrackMate 做 global migration statistics，再建立並公開一組 **MATLAB tools**，分析 trajectory、temporal migration、regions of interest 與 movement classification。在沒有 chemoattractant 時，T cells 沒有明顯 directional bias；unstimulated CD8+ T cells 多停留在局部，activated T cells 則更積極探索三維空間。

### 從 subdiffusion 到 Lévy-type walk

T-cell movement 不能只用「快或慢」描述。未受刺激、或找到 cognate target 而停留的細胞，可呈現 subdiffusive／diffusive behavior；活化並尋找目標時，則可能呈現 **Lévy-type walk**：快速移往一個區域、局部探索，再快速轉往下一區域。穩定的 3D ECM 與長時間 imaging 讓研究者能觀察同一細胞受刺激後如何改變 movement class。

加入 islets／β cells 後，約 **2 小時**可見綠色標記的 cytotoxic T cells 在 islet 表面 docking、探索與 infiltrating；講者把後續約 **4–6 小時**出現的 T-cell clustering 描述為協同行為。小鼠模型中，non-antigen-specific T cells 維持較多 searching behavior；antigen-specific T cells 接觸 cognate target 後，則由 Lévy-type walk 轉成較局部的 docking behavior。這些影像可進一步量化接觸前後軌跡與不同 regions of interest 的 accumulation。

加入 apoptosis／necrosis markers 後，講者指出最初 **24 小時**細胞死亡不多，約 **30 小時**後死亡訊號快速上升。這提供的是特定共培養條件下的時間尺度與比較指標，不能直接外推成人體 T1D 的自然病程。

### 人類 SC-beta 與 PPI-specific CD8+ T-cell 系統

團隊正把平台轉為 human-based system：將 CD8+ T cells 工程化，使其辨識 **preproinsulin（PPI）**等 β-cell antigens，再與 human SC-beta cells 共培養。Human SC-beta cells 接觸 **interferon-γ** 後可上調 HLA class I 並分泌 CXCL10，因此研究者可測試 beta-cell inflammation 如何影響 T-cell recruitment 與 killing。

在 control β-cell condition，PPI-specific CD8+ T cells 接近 cluster 後會由 searching 型 Lévy walk 轉成較慢的 diffusive／subdiffusive behavior。Inflamed condition 下，cluster 外的 T cells 呈現較具方向性的 recruitment；進入 cluster 後卻未明顯減速，仍能快速移動並殺傷。該模型中，interferon-γ-treated β cells 與較多 T-cell accumulation、較高 cell death 相關。<u>這是工程化體外系統內的結果，支持 inflammation 可能改變 recruitment 與 killing dynamics，但不是對人類 T1D 起始因果的直接證明。</u>

未來將加入 CD8+ T cells 以外的 immune cells、resident macrophages 與 therapeutic screening，並以 microfluidics 建立 flow field，研究 T cells 如何由流體環境進入 niche。講者也提醒，增加 complexity 時必須避免 over-engineering：全身性、跨器官且高度複雜的問題，可能仍更適合 animal models；較明確的 liver–β-cell axis，則可考慮串接 liver-on-a-chip 與 diabetes-on-a-chip，或建立 lymph-node 與 islet niches。

<u>Slides 延伸補充：致謝 slide 列出 Holger Russ、Clayton Mathews、Edward Phelps、Todd Brusko 等合作夥伴，以及 Breakthrough T1D、HIRN、NIDDK、組織捐贈者與家屬和研究動物。</u>

### 現場問答：模型可擴充性與 AI 限制

#### ChemPerturbDB 的物種與細胞範圍

Kulkarni 詢問 ChemPerturbDB 是否能區分 human／mouse data、細胞亞型並持續納入新資料。Chen 說目前資料來自 human **EndoC-βH1** beta-cell line，團隊正產生 human-islet data；mouse data 較少，另有大型 hypothalamic-neuron cohort，希望可用於研究對 GLP-1 drugs 有反應的細胞。

一位 University of Virginia 的聽眾追問免費或付費 ChatGPT 與 hallucination。Chen 回答，ChemPerturbDB 使用 diabetes-focused fine-tuned model，dkNET-AI 也以不需 coding 的 drag-and-run workflow 為目標。<u>這是講者對系統設計的現場說明，不能解讀為模型不會出錯；介面答案、資料來源與引用仍須逐項核對。</u>

#### VMI organoid 的細胞比例

同一位聽眾詢問 endothelial cells 與其他 islet cells 的比例。Chen 表示團隊測試不同 initial mixing ratios，並在 reaggregation 後 **2 週與 4 週**檢查；最終條件以第 4 週 single-cell RNA-seq 所見 cell ratio 接近 human islets 為目標。

#### HLA matching 與 T-cell 來源

一位 Metaphor Biotechnologies 聽眾詢問如何配對 patient-derived islet cells 與 donor T cells。Stabler 說目前聚焦 **HLA-A2** background；同一 patient-derived iPSC 可建立 β cells、endothelial cells、macrophages、dendritic cells、alpha 與 delta cells，但同一人的足量 T cells 較難取得，除非最初即有保存 blood-derived material。現用 T cells 會先擴增並工程化以辨識 β-cell antigens，這也意味著它們已被 activated；stem-cell-derived T cells 目前成熟度仍不足以作為 screening platform。

#### 跨器官訊號與 microbiota

對 gut microbiome 或 liver signal 的問題，Stabler 認為 systemic complexity 可能更適合 animal models；若問題聚焦，可串接 organ-on-chip platforms，或建立不同 niches 研究 recruitment。Chen 補充，與 Sean Brady 實驗室合作的方向是把 microbiota-secreted chemicals 分離成 chemical library，再以 ChemPerturb-seq 測試 human-islet responses。

#### 未轉導 TCR 時是否仍有 basal killing

Chen 詢問在 HLA-A2-matched system 中，若不 overexpress TCR 是否仍有 basal T-cell attack。Stabler 說團隊正比較 untransduced／transduced T cells，也比較 **PPI、IGRP**等 antigens。Activated T cells 共培養時會分泌 cytokines，因此 control condition 本身也可能有 baseline cell death；但 antigen-specific T cells 與對照之間已看到不同的 migratory behavior 與 killing。這正說明對照組不可省略，也不應把所有 cell death 都歸因於 antigen-specific recognition。

### 結語

這套「diabetes in a dish」平台的價值，不是複製人體全部 complexity，而是把細胞組成、抗原、發炎狀態、空間與時間變成可控制、可量化的變項。**Top-down tissue、bottom-up engineered niche 與 animal model 應互補使用**；只有在問題、模型邊界與對照組都清楚時，三維 migration data 才能轉化為可信的機制假說與 therapeutic-screening evidence。
