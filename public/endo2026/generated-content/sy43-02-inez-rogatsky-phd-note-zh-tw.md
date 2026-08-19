# 巨噬細胞功能狀態的差異性表觀基因組與轉錄程式化（Differential Epigenomic and Transcriptional Programming of Macrophage Functional States）

- **會議／場次：** ENDO 2026；SY43 — Steroid Receptor Actions in Immunity
- **短講：** SY43-02 — Differential Epigenomic and Transcriptional Programming of Macrophage Functional States
- **講者：** Inez Rogatsky, PhD

## 整理稿

### 從發炎性巨噬細胞到 homeostatic macrophage

主持人介紹 Inez Rogatsky 博士後，講者先說明實驗室長期關注的是**發炎反應的轉錄調控**。發炎是身體對感染或損傷的正常反應；單核細胞會移入感染部位並分化成發炎性巨噬細胞，製造多種介質，以形成有利於清除感染的環境。但過度發炎也會傷害宿主，因此全身層級會啟動下丘腦—垂體—腎上腺軸（hypothalamic-pituitary-adrenal axis, HPA axis）的回饋控制。腎上腺皮質產生的 glucocorticoids 經廣泛表達的 glucocorticoid receptor（GR）作用於巨噬細胞，可抑制其遷移與發炎介質產生；GR 會結合許多 coregulators，其中 **GRIP1／NCoA2** 是講者實驗室多年研究的核心。

巨噬細胞可來自不同前驅細胞、定居於不同組織 niche，因而具有不同的 transcriptome 與功能。位於發炎性巨噬細胞光譜另一端的是參與組織修復與恆定維持的 homeostatic macrophages，也就是傳統上稱為 **M2 macrophages** 的族群。講者帶著幽默提醒，M2 分類雖曾備受爭議，近年又因名稱簡短而常被使用；這裡的 M2 是實驗操作上的稱呼，不表示所有組織巨噬細胞都能被二分成固定狀態。

第 2 型細胞激素 **IL-4** 可活化 **STAT6**，進而誘導多個 M2-associated genes；其中 STAT6 的下游轉錄因子 **KLF4** 常被視為此程式的重要 master regulator。

### IL-4 與 glucocorticoid 轉錄程式的交會

巨噬細胞暴露於 glucocorticoids 約 **24 小時**後，外觀與部分功能很像 M2 macrophages。團隊因此比較小鼠 bone marrow-derived macrophages（BMDMs）經 IL-4、小鼠內源性 **corticosterone**，或強效合成 glucocorticoid **dexamethasone（Dex）**處理後的基因表達。

PCR 與 transcriptomic analysis 顯示：

- *Klf4*、*Klf9*、*Mrc1* 在不同 M2-like populations 中均被誘導。
- *Arg1* 與 *Pparg* 主要由 IL-4 程式誘導；*Hif3a* 與 *Gilz* 則主要回應 glucocorticoids。
- 相對於未極化的 M0，M2 IL-4 約有 **700 個 differentially expressed genes（DEGs）**，M2 Dex 約為其一半；M2 Dex 的 DEGs 中約 **30%**也在 M2 IL-4 改變。
- 共同下調者包括 *Tnf*、*Cxcl14*、*Ifit1*，共同上調者包括 Klf family、*Ccl24*、*Chil3*。

ATAC-seq 所見的 chromatin accessibility，以及 H3K27ac 所代表的 enhancer landscape，在差異 peak 數量與兩種刺激間的重疊比例上，也呈現與 transcriptome 類似的格局。不過，重疊不代表兩條訊號完全相同；後續功能實驗正是要找出它們共享與分流的調控節點。

先前工作顯示 **GRIP1 與 KLF4 有 physical interaction，且 GRIP1 可作為 KLF4 coactivator**。團隊遂以 LysM-Cre 建立 myeloid-cell-specific *Grip1* deletion，在 2 種 genotype、4 種 polarization state，共 **8 個 cell populations**中比較結果。無論是兩路徑共用、IL-4-specific 或 glucocorticoid-specific genes，GRIP1 缺失都會削弱部分基因的誘導。全基因組分析中，共用 gene cluster 的 GRIP1-dependent fraction 最大；glucocorticoid-specific cluster 約四分之一依賴 GRIP1，IL-4-specific cluster 也有相當比例受影響。這支持 GRIP1 參與兩種程式的交會，但並不表示所有相關基因都由同一複合體直接控制。

### PPARγ、GRIP1 與 enhancer occupancy

另一個促進 M2-like phenotype 的核受體是 **PPARγ**。它是 type II nuclear receptor，與 RXR 形成 heterodimer；不需 ligand 便可位於細胞核並結合 DNA。Ligand 的作用主要是促使 corepressor complexes 與 HDACs 離開，再換入 p160 family、GRIP1 等 coactivators，並招募 histone acetyltransferases 以活化轉錄。

Maria Dacic 先注意到，既有 PPARγ-knockout data 中的 PPARγ-dependent genes，與實驗室的 GRIP1-dependent genes 很相似。因跨實驗室資料不能直接視為同一實驗證據，她以相同的 LysM-Cre 系統重新建立 myeloid PPARγ knockout。結果顯示，M2 IL-4 條件下在 PPARγ knockout 無法正常上調的部分 genes，在 GRIP1 knockout 中也有相近缺陷；已知 PPARγ enhancers 的 enhancer RNA（eRNA）亦呈現相似變化。這些結果提示兩者可能在同一調控架構內合作，但僅憑共同 target genes 還不足以證明它們位於同一 complex。

進一步建立 M2 IL-4 macrophage 的 PPARγ cistrome，並與先前發表的 GRIP1 cistrome 疊合後發現：

- **超過一半的 PPARγ peaks 與 GRIP1 peaks 重疊**；這些 peaks 可分成 prebound 與 IL-4 後才明顯出現的 de novo groups，並富集 PPRE 與 RXRE motifs。
- **超過 60% 的 p300 peaks 至少與一個 PPARγ peak 重疊**，且訊號在 IL-4 polarization 後增加。
- 原始預測是 GRIP1 deletion 會先妨礙 p300 recruitment；實際數據卻顯示，GRIP1 缺失時 **PPARγ binding 本身即大幅下降**，prebound 與 IL-4-dependent sites 都受影響，p300 binding 也隨之下降。
- 這並非全域 chromatin accessibility 一起下降。相反地，在失去 PPARγ 的 enhancers、鄰近區域與相關 promoters，出現高度局部化的 **CTCF loading**；若看全基因組 CTCF volcano plot，wild type 與 GRIP1 knockout 並沒有單向的整體改變。

講者據此提出模型：GRIP1 可能協助穩定 enhancer transcriptional complex；GRIP1 缺失後，PPARγ occupancy 降低，而 CTCF 在特定 enhancer／promoter regions 增加。<u>這是由 cistrome 與局部 chromatin data 支持的工作模型，不能直接延伸成 GRIP1 對所有 PPARγ sites 都具有相同作用。</u>

### 吞噬作用與 efferocytosis 的分流

團隊先用在 phagosome 酸性環境中發光的 pHrodo particles 測量基礎 phagocytosis。各種 M2-polarized populations 的 particle uptake 均上升，而且這項增加大致依賴 GRIP1。然而，生理上巨噬細胞每天處理的是數千億個 apoptotic cells；講者引用約 **1% 全身細胞每日 turnover** 的估計，引出免疫靜默的 apoptotic-cell clearance——**efferocytosis**。

Apoptotic cells 會釋放 ATP 等 find-me signals，並外露 phosphatidylserine 等 eat-me signals。巨噬細胞吞噬後，還須回收膜成分、排出 cholesterol、提高 fatty-acid oxidation，並壓低 Toll-like receptor responses。

第一組體外實驗以 staurosporine 誘導 Jurkat cells apoptosis，再以 pHrodo 標記，與不同 polarization state 的 BMDMs 共培養 **1 小時**，以 CD11b、F4/80 與 pHrodo signal 定量。結果不是所有 M2-like states 都相同：

- 只有 Dex-polarized macrophages 明顯提高 efferocytosis。
- IL-4 單獨處理沒有相同提升；IL-4 與 Dex 併用時，IL-4 甚至消除了本實驗中 Dex 的促進效果。
- Dex-associated increase 依賴 GRIP1。

為降低特定 apoptosis inducer 或 dye 造成的偏差，團隊加入以 LPS＋interferon-γ 極化的 M1 population，將 apoptosis induction 改成 UV，並把標記改成 CypHer5E；結果仍只有 glucocorticoid-polarized population 提高 efferocytosis。

值得注意的是，基線 RNA-seq heatmap 並未顯示 M2 Dex 的 efferocytosis-related receptors、adaptors、transcription factors 或 metabolic genes 整體高於 M2 IL-4 或 M1；部分反而更低。因此，靜態 transcriptome 不能解釋 M2 Dex 的功能優勢。

### 3D chromatin 與 two-step model

團隊推測 **24 小時 polarization**可能已重塑 topologically associating domains（TADs）與 enhancer–promoter loops，遂進行 Arima-HiC，並結合 H3K27ac 與 H3K4me3 CUT&RUN。Hi-C 有 2 個 biological replicates，各約定序 **5 億 reads**，之後合併分析，總量約 10 億 reads。PCA 中 M1 與其他狀態分得較遠，M2 Dex 與 M2 IL-4 較接近；講者指出所示 component 僅解釋 **6% variance**，因此這幅 PCA 只支持整體結構差異的初步方向，不能單獨證明功能機制。

團隊再人工整理約 **40–50 個 efferocytosis genes**，評分各狀態的 enhancer loops 與 hubs；hub 在此指單一 enhancer 發出超過 2–3 個 loops。幾個代表性 loci 顯示：

- *Il4* locus 的大型 TAD 與新 loops 只在 M1 明顯出現。
- *Mertk* locus 在各狀態都有 loops／hubs，M1 可能略多。
- *Klf4* locus 的 H3K27ac／H3K4me3 在 M2 Dex 與 M2 IL-4 看似相近，但 enhancer hubs 與 loops 只在 Dex-polarized cells 明顯出現。

整體評分顯示，Dex-polarized macrophages 在這組人工選定的 efferocytosis genes 中富集 enhancer hubs 與 enhancer–promoter loops。這形成「chromatin 已準備好、基線 RNA 尚未全面上升」的假說。

為測試觸發階段，團隊讓巨噬細胞接觸 apoptotic cells **1 小時**，再分選出僅接觸／辨識到 apoptotic cells 與已吞入 apoptotic cells 的 populations，立即做 RNA-seq。僅接觸便可快速提高許多 efferocytosis genes，實際吞入後反應更強，而且此格局主要出現在 glucocorticoid-primed macrophages。

講者因此提出 two-step model：第一步是 glucocorticoid 在約 24 小時內建立 histone marks、TADs、enhancer–promoter loops 與 hubs 的 slow priming；第二步是在接觸 apoptotic cells 後約 1 小時內啟動 fast transcriptional response，將細胞推向 professional efferocyte state。<u>這段即時 RNA-seq 只有 2 個 replicates，講者明言展示的是 raw data，無法提供完整統計推論；two-step model 應視為有功能與染色質證據支持、但仍待更多重複與機制實驗驗證的模型。</u>

### 現場問答

#### GRIP1 knockout 後 RXR 是否也離開 DNA？

講者回答尚未直接測量 RXR。依 CTCF loading 推測整個 nuclear-receptor complex 可能都已離開，但這仍是待驗證的猜測。

#### Dex-primed macrophage 吞噬後的存活期是否改變？

目前標準流程只有 24 小時 polarization 後短暫加入 apoptotic cells，團隊尚未延長追蹤，因此不知道吞噬後 viability 或 lifespan 是否與其他 populations 不同。

#### Apoptotic-cell source 與 tissue context 是否改變反應？

Zeynep Madak-Erdogan 詢問 Jurkat cells 以外的免疫細胞或 tumor microenvironment。講者指出既有文獻支持 apoptotic-cell origin 會影響 macrophage transcriptional response；團隊正以 neutrophils 研究 inflammation resolution，tumor context 也很重要，但本次資料尚未測試其普遍性。

#### H3K27ac 與其他 transcription-factor motifs

Lee Kraus 詢問 GRIP1 deletion 對 histone marks 的影響。講者表示 knockout 中 H3K27ac 明顯下降；H3K4me1 與 H3K4me3 也測過，但各 modification 的下降並不完全一致。她也指出 PPARγ sites 附近有大量 AP-1 motifs，與 PPRE／RXRE 一樣達到很高的 enrichment significance；團隊尚未深入拆解 AP-1 或其他 factors 是否介入 PPARγ occupancy 的改變。

#### Cortisol／corticosterone 是否也提高 efferocytosis？

最後一問涉及 macrophage mineralocorticoid receptor 與內源性 glucocorticoids。講者明確回答：**efferocytosis 實驗只做過 Dex，沒有做 corticosterone，更不能由本研究推定 cortisol 的功能效果**。在先前 polarization study 中，corticosterone 的方向與 Dex 類似但較弱，增加一個 replicate 後才達統計顯著；那項結果不能替代尚未進行的 corticosterone efferocytosis experiment。
