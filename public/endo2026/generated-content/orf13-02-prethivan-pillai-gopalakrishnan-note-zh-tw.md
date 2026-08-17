# 定量 Metadrenaline 負荷與腫瘤特徵預測嗜鉻細胞瘤與副神經節瘤預後：12 年單中心佇列研究（Quantitative Metadrenaline Burden and Tumor Characteristics Predict Prognosis in Phaeochromocytoma and Paraganglioma: A 12-Year Single Centre Cohort Study）

- **會議／場次：** ENDO 2026／Adrenal: Back to the Basics（ORF13）
- **短講：** ORF13-02
- **講者：** Prethivan Pillai Gopalakrishnan

## 整理稿

### 為何需要新的 PPGL 風險分層工具

嗜鉻細胞瘤與副神經節瘤（pheochromocytoma and paraganglioma, **PPGL**）的風險分層仍然困難。現有的 **PASS、GAPP、SGAP 與 COPPS** 等評分，預測準確度大致只有中等。基因檢測雖然非常重要，也已納入許多評分工具，但臨床上並非每位患者都能及時取得結果。

Metadrenalines 是診斷分泌型 PPGL 的核心檢驗，但既有評分通常只把結果視為「升高或未升高」，沒有量化究竟高出多少。研究團隊因此提出 **BioMax**，希望評估定量生化負荷結合日常可取得的腫瘤特徵，能否預測轉移與全因死亡。

### 研究族群、BioMax 定義與分析方法

研究納入 Royal Liverpool University Hospital 於 2012 至 2023 年間的 **100 位連續 PPGL 患者**；套用排除條件後，共分析 **80 位**，其中 70 位為 pheochromocytoma、10 位為 paraganglioma。

血漿 normetadrenaline、metadrenaline 與 3-methoxytyramine（**3-MT**）以液相層析串聯質譜（LC–MS/MS）測量，再各自除以正常值上限（upper limit of normal, **ULN**）。三項結果中高於 ULN 的最大倍數即定義為 **BioMax**，用來表示最主要的分泌活性，同時降低不同 assay 參考範圍造成的影響。

統計分析使用 Firth penalized logistic regression，並以 receiver operating characteristic（ROC）分析及 **1,000 次 bootstrap** 進行內部驗證；Youden analysis 用來選定 BioMax 與腫瘤大小的最佳切點。<u>Slides 延伸補充：投影片註明統計分析使用 R version 4.5.2。</u>

### NBS 評分的建立

團隊評估 BioMax、組織病理中央壞死、腫瘤大小、Ki-67 index、年齡與性別。此佇列中，與轉移顯著相關的三項變數是**中央壞死、BioMax 與腫瘤大小**；Ki-67 index、年齡與性別未達顯著。

研究者將三項訊號組合為 **Necrosis–BioMax–Size（NBS）score**，總分 0–3 分：有中央壞死計 1 分、BioMax **至少 6 倍 ULN** 計 1 分、最大腫瘤直徑**至少 7 cm** 計 1 分。這是一個以常規臨床、血液與病理資料構成的簡化工具。

### 轉移患者的腫瘤表型與個別生化指標

中位追蹤時間為 **4 年（IQR 2–7）**，診斷時中位年齡為 **59 歲（IQR 51–71）**，男性占 54%。全體轉移率為 **13%（10/80）**；在這個單中心樣本中，pheochromocytoma 與 paraganglioma 的轉移率分別為 13% 與 10%。

轉移性腫瘤整體較大、較常出現中央壞死，BioMax 也較高。<u>Slides 延伸補充：轉移組與非轉移組的腫瘤大小中位數分別為 84 mm 與 34.5 mm，中央壞死比例為 80% 與 7%，BioMax 中位數為 20.2 倍與 2.2 倍 ULN；三項比較皆為 p＜0.001。</u>

個別血漿指標的表現並不一致：normetadrenaline 的敏感度高但特異度低，3-MT 的特異度高於敏感度，metadrenaline 則無論敏感度或特異度都不理想。<u>Slides 延伸補充：normetadrenaline 的敏感度／特異度為 100%／19%，3-MT 為 75%／86%，metadrenaline 為 20%／49%。這也說明研究者為何改用三者最大 ULN 倍數的 BioMax，而非依賴單一 analyte。</u>

### NBS 對轉移的鑑別能力與死亡率訊號

NBS 預測轉移的 ROC 曲線下面積（AUC）為 **0.96**。以 **NBS ≥2** 為門檻時，敏感度、特異度與準確度均為 **90%**，陰性預測值為 **98%**。這表示低分在本研究族群中具有很高的排除價值，但仍不能直接視為外部族群的確證結果。

<u>Slides 延伸補充：AUC 的 95% CI 為 0.90–0.99，陽性預測值為 56%；NBS 0、1、2、3 分對應的觀察到轉移風險依序為 0%、5%、33%、86%。這是研究樣本中的階梯式關聯，不是尚未經外部驗證的個人絕對風險估算。</u>

全因死亡率為 **18.8%**。轉移患者的死亡率高於非轉移患者，而 NBS ≥2 者也高於 NBS＜2 者。<u>Slides 延伸補充：轉移組與非轉移組死亡率為 60%（6/10）與 13%（9/70），OR 10、p＜0.001；NBS ≥2 與＜2 組為 40%（6/16）與 14%（9/64），OR 4、p＝0.03。</u>

### 臨床意義、限制與下一步

BioMax 只需要生化數值相對於 ULN 的倍數，因此術前即可取得；若數值偏高，可能提示較具侵襲性的 PPGL 表型，並協助考慮更早安排功能性影像，例如 **68Ga-DOTATATE PET/CT** 或 DOPA PET/CT。這在尚未常規將這類影像納入 PPGL 診斷評估、主要使用 MIBG 的中心尤其可能有幫助。

BioMax 與 NBS 的定位是補充臨床判斷，**不能取代基因檢測**。若能較早發現轉移，才有機會更準確地分期、進行預後分層、評估 radionuclide therapy，並設計個別化監測。

實際使用時也必須區分兩者的可取得時點：**BioMax 可在術前計算**，但完整 NBS 還包含組織病理上的中央壞死，因此通常要在取得手術檢體後才能完整評分。它不能單靠術前 BioMax 就被視為完整的 NBS 結果；對尚未手術或無病理檢體的患者，適用性仍需另外研究。

這項研究是單一中心、80 人的觀察性佇列，只有 10 位發生轉移；ROC 與 cut-off 雖經 bootstrap 內部驗證，仍可能受樣本選擇與事件數有限影響。死亡結果是**全因死亡**，不能由這份報告判定死亡均由 PPGL、轉移或 NBS 所造成。<u>NBS 是有潛力的簡易預後工具，但目前最重要的下一步是由更大型、多中心佇列完成外部驗證，而不是把本研究的切點直接當成普遍適用的臨床規則。</u>
