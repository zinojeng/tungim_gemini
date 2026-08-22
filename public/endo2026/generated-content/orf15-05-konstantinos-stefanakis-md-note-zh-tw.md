# 肝切片證實之代謝異常相關脂肪肝炎（MASH）中循環血清蛋白質體跨纖維化與發炎光譜之系統級地圖

- **會議／場次：** ENDO 2026／ORF15
- **短講：** ORF15-05｜A Systems-Level Map of the Circulating Serum Proteome Across the Fibrosis and Inflammation Spectrum in Biopsy-Proven Metabolic Dysfunction-Associated Steatohepatitis
- **講者：** Konstantinos Stefanakis, MD

**主講人：** Konstantinos Stefanakis, MD（Beth Israel Deaconess Medical Center, Harvard Medical School）

## 整理稿

### 演講背景與臨床痛點

代謝異常相關脂肪肝病（metabolic dysfunction-associated steatotic liver disease, MASLD）已不再僅是消化內科（gastroenterology）的範疇，而是同時深刻影響內分泌科（endocrinologists）、一般內科（internists）與心臟科（cardiologists）醫師的重大代謝疾病。MASLD 恰好位於肥胖（obesity）、胰島素抵抗（insulin resistance）、第 2 型糖尿病（type 2 diabetes）與心血管疾病（cardiovascular disease, CVD）的交會點。研究團隊提出的核心問題為：**血液中的蛋白質讀數能否精準還原肝臟切片在顯微鏡下所觀察到的病理狀態？**

MASLD 影響極廣泛的成年人口（包括數千萬美國人），並帶來鉅額的醫療成本，預估 10 年內在美國的醫療負擔將達到 1 兆美元（$1 trillion）。臨床上，單純的肝臟脂肪變性（steatosis）雖然不利健康，但並非最主要的處置焦點；醫療團隊最關切的是找出**代謝異常相關脂肪肝炎（metabolic dysfunction-associated steatohepatitis, MASH）**以及伴隨**中度至重度纖維化（moderate to advanced fibrosis, F2–F3 階段）**的高風險族群。目前美國食品藥物管理局（FDA）已有針對 MASH F2–F3 階段的藥物核准（及多項待審核藥物），但我們需要非侵入性方法精準識別此類病患，這是當前最關鍵的臨床瓶頸。

然而，肝臟切片（liver biopsy）作為診斷金標準，存在費用昂貴、具侵入性、無法擴展至數以千萬計的高風險人口，且極易產生抽樣誤差（sampling error）等缺點。此外，現行臨床仍面臨兩大知識缺口：
1. 檢體類型（血清 serum vs. 血漿 plasma）之間的蛋白質體表現是否存在差異？
2. 在代謝科門診（metabolism clinics）與消化內科門診（gastroenterology clinics）所見到的病患表現型（phenotypes）是否存在差異？

循環蛋白質體學（circulating proteomics）的優勢在於能透過單一平台檢測整合來自多個器官系統的訊號，同時反映殘留發炎、脂肪組織與肝臟的交互作用（adipose tissue-liver cross-talk）以及心血管風險。

<u>Slides 延伸補充：目前估計全球 MASLD 盛行率約達 20 億人（佔一般人口 20%–30%），其中 MASH 病患約有 4 億至 5 億人。本研究主要鎖定三大核心病理終點：
1. NAFLD 活動度分數（NAFLD Activity Score, NAS）：涵蓋脂肪變性、發炎與氣球樣變性（ballooning）。
2. 纖維化分數（Fibrosis score）：反映疤痕組織（scarring）形成。
3. 高風險 MASH（at-risk MASH）：即 MASH 伴隨顯著纖維化（F2–F3），為預測肝臟不良預後的主要指標與最關鍵處置視窗。</u>

---

### 研究設計與跨國佇列特徵

為了建立完整的蛋白質體地圖，研究團隊收集了來自 3 個跨國切片證實佇列（包含澳洲、義大利與希臘的消化內科與代謝門診）共 **391 位成年受試者**，涵蓋完整的病理光譜（由健康對照組、單純 MASLD、MASH、高風險 MASH 至 F4 肝硬化）：

* **平台技術：** 採用 SomaScan 7K 適體技術平台（aptamer-based platform）進行高通量循環蛋白質體分析。
* **檢體類型與覆蓋率：** 涵蓋 EDTA 血漿（n=226）與血清（n=165）檢體，分析兩者共有的 7,595 個蛋白標的（shared targets）。
* **統計調整模型：** 使用線性模型（`log2 RFU ~ endpoint + age + sex + BMI + center`），校正年齡（age）、性別（sex）、身體質量指數（BMI）與研究中心（study center），並進行錯誤發現率（False Discovery Rate, FDR）校正（limma + FDR）。
* **分析方法：** 包含全蛋白質體主成分分析（PCA）、加權基因共表達網路分析（WGCNA）、通路富集分析（deCODE, GSEA）以及彈性網路模型（Elastic-net models）進行非侵入性檢測（non-invasive tests, NITs）基準比較。

<u>Slides 延伸補充：佇列病患總體特徵顯示，324 例為 MASLD、207 例為 MASH、148 例為高風險 MASH（MASH F2–F3），20 例為 F4 肝硬化（cirrhosis）。受試者中 84% 伴有肥胖（obesity），並有相當高比例合併第 2 型糖尿病，展現完整的代謝與疾病盛行率分佈。</u>

---

### 檢體一致性與血清–血漿對應（Serum-Plasma Convergence）

研究團隊首先驗證蛋白質體訊號在不同佇列與不同檢體基質（血清 vs. 血漿）之間是否具備再現性：

1. **佇列間一致性：** 在三個獨立研究佇列中，全蛋白質體訊號呈現顯著且一致的正相關。
2. **主要終點相關性：** 針對前 1,000 個高相關蛋白進行分析，Spearman 相關係數（Spearman rho）在各大組織學終點均達到極高一致性：
   * **NAS：** Spearman rho $\approx 0.80$
   * **Fibrosis：** Spearman rho $\approx 0.81$
   * **At-risk MASH：** Spearman rho $\approx 0.76$
3. **全蛋白標的一致性：** 在全部 7,595 個共享蛋白中，血清與血漿的調整後迴歸係數（adjusted beta）亦展現顯著相關（NAS 的 Spearman rho = 0.237；at-risk MASH 為 0.140；Fibrosis 為 0.132）。

<u>Slides 延伸補充：跨終點頻繁出現的核心蛋白包括：NAS 相關之 SERPINC1、BORCS5、TARS1、GSS、WDR5 與 MUC16；Fibrosis 相關之 MRPL58、FZD10、THBS4、ENPP7、KPNA6、KLRB1、DECR2 與 BORCS5。</u>

---

### NAS 與纖維化之蛋白質體軌跡與分子通路

#### 1. NAFLD Activity Score (NAS) 之動態變化
在 NAS（發炎、氣球樣變性、脂肪變性）分析中，火山圖（volcano plots）揭示了隨 NAS 上升而同步增加（紅點）或減少（藍點）的蛋白軌跡：
* **血清（Serum）：** 發現 270 個具 FDR 顯著性的蛋白（FDR < 0.05：237 個上調，28 個下調；<u>原始 P < 0.05：873 個上調，295 個下調</u>）。主要領頭蛋白包含 SERPINC1、BORCS5、TARS1、GSS、PPM1D、WDR5。
* **血漿（Plasma）：** 發現 445 個具 FDR 顯著性蛋白（FDR < 0.05：278 個上調，160 個下調；<u>原始 P < 0.05：651 個上調，509 個下調</u>）。主要領頭蛋白包含 MRPL58、MUC16、FZD10、THBS4、DLG2、BORCS5，而 SERPINA1 則呈下降趨勢。
* **通路變化特徵：**
  1. *免疫發炎活化（Immune-inflammatory activation）：* 細胞激素、先天／後天免疫與發炎表型標記同步上升。
  2. *代謝壓力（Metabolic stress）：* 糖尿病、肥胖、脂質與葡萄糖相關蛋白程序增加。
  3. *細胞壓力反應（Cellular stress response）：* 氧化壓力、翻譯機器（translational machinery）與損傷反應生物學高度活化。
  4. *心血管代謝重疊（Cardiometabolic overlap）：* 與冠狀動脈疾病（CAD）相關的通路顯著上調，而具備心臟保護作用（cardioprotection）的通路則顯著下降。

#### 2. 纖維化分數（Fibrosis Score）之動態變化
纖維化反映的是肝臟疤痕化進程，其蛋白質軌跡與 NAS 呈現部分重疊但具備獨特病理特徵：
* **顯著蛋白：** 血漿中獲得 339 個 FDR 顯著蛋白，血清中顯著蛋白數量較少但總體軌跡高度一致。
* **主要領頭蛋白：** 血漿端包含 MRPL58、ENPP7、THBS4、CTF1、PDZD11、DSTN、FZD10、STK16；血清端包含 MRPL58、KPNA6、BORCS5、TNFRSF25、IL17RC、HAMP。
* **四大核心通路：**
  1. *基質重塑（Matrix remodeling）：* THBS4、ENPP7 等促纖維化訊號引導細胞外基質（ECM）與組織重塑。
  2. *Wnt／發育訊號（Wnt / developmental signaling）：* FZD10 及相關重塑通路。
  3. *血管–發炎交互作用（Vascular-inflammation crosstalk）：* 血小板、凝血、血管與免疫程序隨纖維化分期上升。
  4. *心血管代謝與肝臟相關通路：* 急性心血管事件、糖尿病／肥胖及肝癌進程（Iizuka / Boyault liver cancer progression）相關程序高度重疊。

---

### 臨床、激素與代謝指標之錨定（Clinical & Hormonal Anchoring）

前述篩選出的前 20 個核心蛋白在血清與血漿中展現高度保守性。研究團隊將其與受試者併行的臨床特徵、非侵入性檢測及代謝激素進行熱圖（heatmap）連結錨定：

* **臨床與檢驗指標：** ALT、AST、GGT、血小板（Platelets）、白蛋白（Albumin）、BMI、腰圍（Waist）、HOMA-IR、FIB-4、FAST。
* **內分泌與細胞激素：** Activin A、Activin B、Follistatin、FSTL3、Free IGF-1、Total GDF15、Intact GDF15、Adiponectin、Leptin。
* **核心保守蛋白群：** 包括 BORCS5、DECR2、MUC16、SERPINC1、ZKSCAN7、KPNA6、DCUN1D2、MRPL58、KLRB1、SIGIRR、WDR5、FZD10、PPM1D、HAMP、TARS1、THBS4、RUFY1、APOL3。

結果證實，此蛋白質體標誌絕非隨機發現，而是深度與肝臟酵素、組織學分期、胰島素抵抗、脂肪細胞激素（adipokines）及 Activin A / Follistatin / GDF15 體系密切扣合。將這些蛋白質提煉為加權保守標誌分數（conserved signature score）後，小提琴圖（violin plots）顯示其能極其顯著地區分健康者、MASLD、MASH、高風險 MASH（F2–F3）及 F4 肝硬化，其中以 **MASH F2–F3 階段的組間分離度最為顯著（$P < 0.001$）**。

---

### 臨床診斷效能與非侵入性檢測（NITs）基準比較

為了評估蛋白質體模型能否改善非侵入性診斷，研究團隊將新建立的蛋白質體模型與現行臨床建立的傳統 NITs 進行直接效能對比（經重複外層交叉驗證 outer cross-validation）：

| 檢測模型／指標 | 針對 MASH F2–F3（高風險 MASH）之 AUROC | 效能提升幅度（$\Delta$ AUROC） |
| :--- | :--- | :--- |
| **最佳現行傳統 NIT（FAST score）** | **0.67**（或 0.66–0.67） | 基準點 |
| **5-蛋白血清蛋白質體模型（Serum proteome）** | **0.77** | $+0.10$ |
| **血清 + 血漿蛋白質體模型（Serum + Plasma）** | **0.79** | $+0.12$ |
| **蛋白質體 + 2 項臨床變數最終模型（Proteome + Clinical）** | **0.80** | **$+0.13$** |

<u>Slides 延伸補充：評估的傳統指標包含 NLFS、aNASH、TyG、FNI、LAP、HSI、FLI、ION、TyG-obesity、FibroScan LSM、APRI、Agile 3+、FIB-4、NFS、FIB-4 + FibroScan 與 FAST。在重複外層交叉驗證中，蛋白質體模型不論經由 DeLong 檢定或陽性預測值（positive predictive value, PPV）均顯著優於所有傳統 NITs。外層交叉驗證中反覆出現的穩定預測蛋白包含：MRPL58、ENPP7、FZD10、THBS4、BORCS5、DECR2、SERPINA1 與 TARS1。</u>

**本研究最核心的轉譯訊息：** 透過極少數關鍵蛋白結合臨床變數，即可將診斷 AUROC 從 FAST 的 0.67 大幅提升至 0.80，因為蛋白質體檢測捕捉到了更貼近疾病本質的分子病理生物學。

---

### 演講重點總結（Take-Home Messages）

1. **血液蛋白質體能還原切片層級的病理訊號：** NAS、纖維化分期及高風險 MASH 族群皆能透過協調一致的循環蛋白質標誌精準呈現。
2. **反映真實生物學機制：** 蛋白質標誌將肝臟損傷與免疫發炎、細胞外基質重塑、凝血／血小板及心血管代謝通路緊密連結。
3. **高風險 MASH（at-risk MASH）具備高度區隔性：** 循環蛋白質體能清晰分離出最需要介入治療的 MASH F2–F3 族群。
4. **顯著超越現行非侵入性工具：** 結合蛋白質體與臨床 surrogates 的模型（AUROC $\approx 0.80$）表現遠優於現行最佳傳統工具 FAST（AUROC $\approx 0.67$），有助於篩選適合治療的病患並大幅減少不必要的肝臟切片。

<u>Slides 延伸補充：未來展望包含將蛋白質體與輕量化機器學習模型（lightweight machine learning models）、代謝物（metabolomics）、激素及基因體（如 PNPLA3 基因突變）進行多組學整合（multi-omics profiling），並透過跨國多中心佇列進行進一步推廣驗證。致謝單位包含 Massachusetts Life Sciences Center（MLSC）之支持。</u>

---

### 現場問答

#### Q1（Kyung Joon An, Auburn, Michigan）：請問血漿（Plasma）與血清（Serum）作為生物標記各有何優缺點？血清中的血小板釋放效應（platelet effect）是否應納入考慮？採血前是否需要空腹？採血時間點與切片的時間差是否有影響？
**Konstantinos Stefanakis 醫師：**
這是非常關鍵的問題。首先回答採血時間與空腹的部分：在我們的三個佇列中，有兩個佇列的血液採集、影像學檢查與肝臟切片是在**同一天**完成的；第三個佇列採血時間則是在切片後 6 個月內。所有採血均嚴格要求**至少空腹 8 至 12 小時**。

關於血清與血漿的差異：由於血小板活化，血漿檢體確實包含更多凝血相關蛋白；但令人興奮的是，我們發現**與 MASH 疾病本質相關的核心蛋白質標誌在血清與血漿中高度一致**，且完全獨立於凝血蛋白的干擾。這是首批在 SomaScan 平台上證實血清與血漿對於 MASH 病理診斷具備高度一致性（congruence）的大型研究之一。因此，基質差異並不影響對 MASH 的精準診斷。

#### Q2（Jürgen Borlak, Hannover Medical School, Germany）：在您的數據中似乎沒有看到 Galectin-3 或 Galectin-3 binding protein，這是未偵測到還是顯著性較低？此外，標記的篩選是純統計模型，還是有結合機制上的考量？另外，疾病進程是否真的是從純脂肪變性單向演變為發炎與纖維化，抑或基因（如 PNPLA3）在早期即已完成對 MASH 的 Priming？
**Konstantinos Stefanakis 醫師：**
非常感謝這些深刻的見解。
1. **關於 Galectin-3：** 我們確實有測得 Galectin-3，但它的統計顯著性被 Thrombospondins 等更強烈的訊號所掩蓋，因此未列入前幾名領頭蛋白中。
2. **統計與機制結合：** 本次發表的數據主要基於統計輸出的顯著性排名。但我們團隊正在建構結合領域知識（domain knowledge）與統計顯著性的綜合模型，並將這些蛋白與我們已獲得的代謝體（metabolomics）數據及 GDF15 等激素進行整合。將機制考量納入最終模型的構建絕對是核心關鍵。
3. **關於疾病 Priming 與基因型：** 我完全同意您的觀點！疾病未必是嚴格遞進的。我們過去的研究發現，某個特定代謝體與 **PNPLA3 基因突變** 存在極強烈的相關性。我們下一步計畫正是對這些受試者進行基因體學（genomics）與轉錄體學（transcriptomics）分析，探討帶有 PNPLA3 或其他高風險突變的病患是否具備特殊的代謝與蛋白質體亞型（subgroups）。

#### Q3（Michal, Meir Medical Center, Israel）：關於外部驗證（External Validation）：研究樣本來自接受肝切片的特定族群，演算法是否已在其他佇列驗證？能否套用到一般社區中懷疑 MASLD 但尚未切片的廣泛人群？
**Konstantinos Stefanakis 医师：**
這是模型開發最核心的問題。雖然投影片未完全展現，但我們在模型訓練時採用了 **10 折外層交叉驗證（10-fold outer cross-validation）**。此外，若僅使用三個佇列中的一個佇列進行訓練，並直接套用到另外兩個獨立佇列進行外部驗證，依然能獲得相似甚至更好的診斷效能（AUROC）。我們目前正積極擴大跨國合作，收集來自 6 個不同國家、涵蓋不同臨床表型的人群檢體（目標約 1,500 例受試者），以建立更大的資料庫，驗證此模型在一般廣泛人群中的外推性（extrapolation）。

#### Q4（現場座長／與會者）：臨床上預測病患是否會從 F3 惡化至 F4 是一大挑戰。蛋白質標誌是否會隨時間動態改變？是否能用來預測治療反應或疾病進展？
**Konstantinos Stefanakis 醫師：**
這正是我們目前正在進行的下一階段研究！在我們的佇列中，有兩個佇列擁有病患接受治療前後的前瞻性血清／血漿檢體。蛋白質體絕對是動態變化的（例如即使 NAS 分數僅改變 1 分，也能觀察到截然不同的蛋白質峰值與軌跡）。我們目前正在分析治療前後的蛋白質體動態變化，評估其是否能精準預測病患對治療的組織學改善反應（treatment response）。

#### Q5（現場與會者）：消瘦型 MASH（Lean MASH）在亞洲人群中較常見。請問在不同 BMI 或不同族裔（racial differences）之間，蛋白質體標誌是否存在差異？
**Konstantinos Stefanakis 醫師：**
極佳的問題。我們的受試者中 84% 伴有肥胖（obesity）。然而，當我們在統計模型中對 BMI 進行嚴格校正後，蛋白質體的效應值與顯著性在校正前後完全沒有發生改變。這意味著該蛋白質體標誌反映的是肝臟真實的組織學病理（histology-dependent），而非單純由肥胖所驅動。在過去的研究中，我們的模型在非肥胖（non-obese）與肥胖受試者中均展現出一致的效能。

在族裔差異方面，本次分析的受試者主要來自希臘、義大利與澳洲，其中澳洲佇列包含部分非白人族群。初步分析顯示，白人與非白人之間的循環蛋白質體軌跡高度一致，主要仍由肝臟病理嚴重度主導。當然，進一步在亞洲等不同族裔人群中進行大規模驗證是我們持續推進的重點方向。
