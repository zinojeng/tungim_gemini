# 以 CGM 動態指標與機器學習追蹤糖尿病進展（CGM-Based Dynamic Markers and Machine Learning for Tracking Diabetes Progression）

- **會議／場次：** ENDO 2026／In Range: Gadgets for a New Era of Precision Medicine in Glucose Management（SY08）
- **短講：** SY08-01
- **講者：** Eslam Montaser, PhD

## 整理稿

### 從代謝快照走向時間序列

Montaser 的出發點是：fasting glucose、HbA1c 與 oral glucose tolerance test（OGTT）都很重要，但主要提供單一時間點的「快照」。OGTT 仍是 type 1 diabetes（T1D）分期工具，卻有 day-to-day variability、2–3 小時程序、多次採血與不易頻繁重測等限制。CGM 雖連續記錄 glucose，標準報告多仍濃縮成 mean glucose、time in range、time above range 或 time below range，回答「有多少」而不是「如何隨時間變化」。

講者把 CGM 分析分成三層：static metrics 描述 glucose level；dynamic metrics 描述 glucose 如何移動、是否穩定；再把兩者輸入 machine-learning model 進行 risk classification。他的核心假說是，**glucose dynamics 可能在傳統 dysglycemia threshold 出現前即開始改變**。這是早期 digital-biomarker 研究方向，不能直接等同已核准的篩檢或診斷流程。

### Entropy rate：量化狀態轉換的不可預測性

第一個指標是 entropy rate（ER）。團隊先把 CGM 每 15 分鐘區段依平均 glucose 編成 A–H 八個狀態：A <54、B 54–69、C 70–120 mg/dL，之後逐段延伸至 H >250 mg/dL；再建立 **8×8 transition-probability matrix**、估計各狀態的 stationary distribution，最後以 bits per transition（BPT）表示轉換的不可預測性。

健康示例大多停留在 C 狀態，轉換較集中；diabetes 或較高 islet-autoantibody risk 的示例跨越較多狀態，ER 較高。投影片中的 illustrative cases 為健康個體 **0.35 BPT**、diabetes 個體 0.96 BPT，以及 autoantibody-negative 0.21 BPT、≥2 autoantibodies 0.93 BPT。這些個案數值用來說明機制，不是本場建立的通用 clinical cutoff。

一名受試者在 2016 年 3 月 OGTT 的 2-hour glucose 為 **109 mg/dL**，但同時 ER 已達 0.93 BPT；2019 年 2 月診斷 T1D。這個 longitudinal example 顯示 dynamics 可能早於傳統檢查發出訊號，但單一案例不能證明每個高 ER 個體都會進展，也不能用來估計 sensitivity、specificity 或發病時間。

### Poincaré plot：把不穩定性轉成橢圓面積

第二個指標把每一個 glucose 值 G(t) 與下一點 G(t+Δt) 畫成 Poincaré plot。SD1 反映短期波動，SD2 反映較長期變異，ellipse area S 將兩者整合：點雲集中、面積小代表較穩定；分布擴散、面積大代表較不穩定。ER 偏向 predictability marker，S 偏向 instability marker，數學意義不同，但都利用時間順序而不只看平均濃度。

投影片示例中，健康與 diabetes 個體的 S 分別約 **394.50 與 6566.23 mg²/dL²**；autoantibody-negative 與 ≥2 autoantibodies 個體則約 353.06 與 1993.60 mg²/dL²。這些是選定的 representative examples，不能當作所有裝置、年齡與族群都適用的門檻。

已發表的 JCEM 研究合併 **843 人、5,754 個 daily CGM profiles**，涵蓋健康者、不同 autoantibody status、T1D 與 type 2 diabetes。ER 與 S 對「健康 vs diabetes」的 AUC 分別為 0.98 與 0.99，但對「低 vs 高 T1D immunological risk」僅為 **0.72 與 0.66**，信賴區間也較寬。<u>因此，這些指標能清楚分隔極端 phenotype，並不代表已能精準預測早期 T1D 個人的進展。</u>

該研究以 Youden index 在原資料內得到健康／diabetes 對比的 ER 0.76 BPT、S 1993.91 mg²/dL²，以及低／高 T1D immunological risk 對比的 ER 0.52 BPT、S 923.65 mg²/dL²。這些 data-derived cutoffs 尚未在獨立人群完成臨床效益驗證；不同 sensor、sampling interval 與族群若直接套用，可能造成 calibration drift。

### Cystic fibrosis-related diabetes 的探索性應用

團隊也把 Poincaré 方法用於 67 位 cystic fibrosis 成人，形成 glucose dynamic instability index（GDI）：normal glucose tolerance（NGT）19 人、abnormal glucose tolerance（AGT）21 人、cystic fibrosis-related diabetes（CFRD）27 人。代表性個案的 GDI 為 223.69、785.00 與 2894.42 mg²/dL²；分類 AUC 為 CFRD vs NGT 0.951、CFRD vs AGT 0.855、CFRD vs non-CFRD 0.901，而 AGT vs NGT 僅 0.744。

<u>Slides 延伸補充：投影片以 logistic regression 將 GDI 轉成 0–1 risk score，示範 cutoff 1277；但這是小型 cross-sectional dataset，講者也明確表示需要至少 3–5 年 longitudinal follow-up，才能判斷它是否真的能預測 CFRD 發生。</u>

### CGM 特徵的 machine-learning 分類

第一項研究納入 60 位 T1D 親屬：autoantibody-negative 21 人、1 autoantibody 18 人、≥2 autoantibodies 21 人，完成 1-week home CGM。研究比較全天、午夜至清晨 6 時的 overnight traces，以及 standardized liquid mixed meal（SLMM）後的 glucose features，再以 LDA、linear SVM、logistic regression 與 KNN 區分 Ab-positive 與 Ab-negative。投影片顯示只使用 SLMM 的 9 個 features 時，LDA AUC 為 **0.804**、linear SVM 為 **0.825**；整合 overnight 與 SLMM 的 21 個 features 時，兩者則分別為 0.693 與 0.776。這是同一小型 cohort 的 classification performance，不是外部驗證後的臨床預測器。

第二項研究只分析 39 位 autoantibody-positive 親屬：1 autoantibody 18 人、≥2 autoantibodies 21 人，結合 post-meal CGM features 與 T1D genetic risk score（GRS）。GRS 與多數 CGM features 關聯低，代表可能提供互補資訊。Linear SVM 使用全部 features 的平均 AUC 為 0.80；經 recursive feature elimination 後為 **0.93**。由於樣本小、在同一資料集做 feature selection 與 5-fold cross-validation，0.93 不應描述成已能「精準識別」個人，仍需 independent external validation 與 calibration。

### 現場問答揭露的臨床落差

講者認為，在未確診 diabetes 的高風險者中，1-week CGM 可能足以計算動態指標；對已確診 diabetes 的管理則常看至少 2 週資料。他也希望把 ER 與 S 寫入 calculator／software，將 CGM time series 轉成單一風險數值。不過當聽眾詢問成本效益以及能否取代 TrialNet OGTT 時，他明確回答：**目前分期仍以 OGTT 進行**。

兒童內分泌醫師追問 5 歲與 14 歲的 baseline risk 不同，以及 sensor generation、raw data、algorithmic smoothing 可能影響 entropy。講者表示同一數學框架可以運算不同資料，但本場沒有提供足夠 age-stratified 或 head-to-head device validation。<u>「可以計算」不等於已證明跨年齡、跨品牌、跨採樣頻率與跨 smoothing algorithm 的數值可直接互換。</u>

談到 T1D staging，講者區分 stage 1（≥2 autoantibodies、尚無 dysglycemia）與 stage 2（≥2 autoantibodies 加 dysglycemia），並提到 stage 2 可進入 intervention pathway，例如 teplizumab 延緩 stage 3 onset。CGM dynamics 目前只能作為研究性的補充訊號，不能自行決定 staging 或 treatment eligibility。

### 講者的結論

CGM 所含資訊確實多於 glucose level；ER 與 Poincaré ellipse area 嘗試把 predictability 與 instability 轉成可量化的 dynamic marker，machine learning 則探索如何整合 static、dynamic 與 genetic features。這些方法在健康與已確立 diabetes 的對比中表現強，也提供了早期 T1D、CFRD 與其他 metabolic-decline research 的合理方向。

現階段最重要的限制是 cohort 小、部分分析 cross-sectional、少數數值來自 illustrative cases，且 device、age、diet、sampling interval 與 longitudinal stability 尚未充分驗證。<u>在 prospective、device-aware、age-stratified external validation 完成前，CGM dynamics 應被視為候選 digital biomarkers，而不是 OGTT、autoantibody testing 或既有臨床分期的替代品。</u>
