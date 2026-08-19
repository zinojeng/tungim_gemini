# 日常 AI：讓臨床與學術工作更有效率的實用工具（Everyday AI: Tools to Work Smarter in Clinical and Academic Life）

- **會議／場次：** ENDO 2026／Artificial Intelligence in Endocrinology: Practical Uses, Lessons Learned, and What Comes Next（SY11）
- **短講：** Everyday AI: Tools to Work Smarter in Clinical and Academic Life（SY11-02）
- **講者：** David Toro Tobon, MD

## 整理稿

### 從「取代醫師」改成 co-pilot 思維

主持人 Camilo González Velásquez 與 Juan Pablo Brito 把這場 symposium 定位為不談 hype、只談目前可用的 AI、真實 workflow 經驗，以及如何把 trust、safety、equity 與 patient-centered care 放在設計核心。David Toro Tobon 醫師則將焦點放在當下已能使用的 chatbots、large language models（LLMs）與臨床工具。

講者認為，AI 不會簡單地取代醫師，但會使用 AI 的醫師可能逐漸取代完全不使用 AI 的醫師。人類能處理的資料量有限，優勢在 emotional intelligence、creativity、common sense 與 critical thinking；AI 則擅長大量資料處理、速度、pattern recognition 與 automation。兩者不是同一種智慧，因此目前最適合的角色不是 autopilot，而是由醫師掌握方向、與工具共同創作的 **co-pilot／co-reasoner**。

<u>Slides 延伸補充：講者揭露曾於 2024 年 9 月至 2025 年 9 月擔任 Immunovant 顧問，但與本演講討論的商業 AI 公司或工具沒有財務關係；投影片所列工具均有供個人使用的免費版本或 tier。</u>

### AI scribe 能省多少時間

AI scribe 可錄下診間對話，於看診結束後產生 history of present illness、physical exam 與 assessment and plan 草稿。前瞻性 randomized controlled trial 顯示，兩套系統都能減少寫病歷時間，但圖表看起來的巨大差異，換算後其實相對溫和：一套約少 **18 秒／note**，另一套約少 **41 秒／note**，全天約節省 **6–14 分鐘**。

較重要的可能不是純粹時間，而是 cognitive load、patient-facing time 與下班後完成病歷的 pajama time。研究中的 Mini-Z joy／burnout 與 physician task load 也有改善訊號；不過講者提醒，這些效益不代表 AI 已能替代醫師的 note review。

AI scribe 以機率模型生成文字，錯誤不可避免。Biro 等人的圖表把錯誤分成 omission、addition、irrelevant／wrong output 與 misplaced information；兩個產品中，**omission 約占 54% 或 83%**，addition 約 **11% 或 25%**，irrelevant／wrong output 約 **6% 或 10%**，misplaced information 約 **4% 或 6%**。這些比例是「各類錯誤占總錯誤的組成」，不是所有病歷發生錯誤的機率。

### Better documentation 不必然等於 better care

講者引用一項 primary care 的研究：導入 AI scribe 後，psychiatric symptoms 的病歷紀錄明顯更完整，但醫師針對這些症狀採取的 clinical actions 反而下降。這是一項近期觀察，不能單憑結果斷定 AI 造成照護變差；然而它提出一個重要問題：當整理病歷的認知工作被外包後，醫師是否也少了在撰寫 assessment and plan 時主動梳理問題的過程？

<u>好的病歷草稿只是中間產物，不是照護品質的替代指標。AI 可以減少機械性負擔，但醫師仍須親自確認資訊、形成判斷並採取行動。</u>

### AI scribe 的實作技巧與合規底線

AI scribe 優先追求 completeness，而非模仿每位醫師的 prose。部分產品能依 accent、terminology 與修訂回饋調整，但大型醫療體系為保護病人資料，常使用刻意保持 static 的版本，不一定會隨個人修正而「學會」其風格。因此應調整期待，並主動設定 template，而不是只使用預設值。

診間對話可以自然，但 clinical intent 必須清楚。講者建議明確說出「針對 X，plan 是……」、提示話題轉換，並清楚口述正在評估或排除的診斷。看診結束前，可把系統當作 dictaphone，補上一小段自己的 diagnostic reasoning 與 assessment／plan，讓病歷草稿以醫師的思路為錨點。多數工具也能處理多語言對話並產生指定語言的病歷。

錄音前必須取得 patient consent，且要依所在地的一方或雙方同意規則、機構政策與 EMR 紀錄要求辦理。小型診所自行採購工具時，需確認廠商有適用的 Business Associate Agreement（BAA）、HIPAA 配置與資料不被拿去訓練未授權模型的保障。這些條件不能只靠產品標示推定。

### Point-of-care 工具與 digital skepticism

以 OpenEvidence 為例，講者投影片列出截至 2026 年 5 月已有 **65% 的美國臨床醫師曾使用**；2026 年 3 月 10 日單日記錄 **100 萬次 clinical consultations**，2026 年 4 月則為 **2,700 萬次**。市場上另有 UpToDate Expert AI、Consensus、ChatGPT for Clinicians、Dyna AI for DynaMedex、Vera Health、ClinicalKey AI+ 與 Glass Health 等工具。它們以臨床文獻 grounding，適合 initial query、follow-up questions、patient handouts、multilingual education 與 prior authorization 等行政文件，但 grounding 只是在降低風險，不能消除 hallucination。

投影片引用 Vishwanath 等人的 MedQA error rate 與 HealthBench deficit，比較 general-purpose 與 clinical tools。講者特別說明，這些指標分別近似 knowledge gap 與 alignment gap，研究評量方法也有限制；不能把圖上的百分比直接解讀為每個工具在真實臨床的「幻覺率」或安全排名。

核心策略是 **human in the loop** 與 **digital skepticism**。AI 的工作是尋找、彙整 evidence，醫師的工作是 critical appraisal 與 verification。不可直接依未查證的 AI claim 做決策；至少要點開來源、核對摘要，高風險決策則應閱讀原始全文。

### 用 P.U.L.S.E. 提供足夠 context

短促的 prompt，例如只說「替需要 GLP-1 receptor agonist 的 type 2 diabetes 患者寫 prior authorization appeal」，通常缺乏足夠背景。較好的 prompt 應交代使用者角色、臨床情境、拒付理由、患者風險、需要綜合的 evidence 與期望產物。

講者以 **P.U.L.S.E.** 整理 prompt elements：**P—Persona**（AI 扮演什麼角色）、**U—Universe**（所在情境）、**L—Logic**（需遵循的推理與證據要求）、**S—Structure**（輸出格式），以及 **E—Expectation**（希望達成的結果）。如果要加入病歷資料，前提是工具與機構政策都允許，而且只提供完成任務所需的最少資訊。

### Privacy：green shield 不等於 HIPAA 結論

講者建議，除非明確確認，否則預設一般 LLM／chatbot 不具備可處理 protected health information 的合規條件。即使產品宣稱可支援 HIPAA，醫師仍須確認自己的機構是否核准；病歷資訊屬於醫療機構的受保護資料，個人與服務商簽約不等於獲得機構授權。

他以 Microsoft 365 Copilot 的 green shield 為例：green shield 表示 commercial data protection，例如輸入不被用來訓練模型，**不能單獨視為 HIPAA compliance 證明**。投影片細字進一步指出，Microsoft 365 Copilot 與 Copilot Chat 只在 properly configured implementation 下支援 HIPAA compliance，而且 web search queries 不在 DPA 與 BAA 的保障範圍內。實際可否輸入病人資訊，仍須由機構的合約、設定與政策確認。

無法確認時應先 de-identify：把 exact dates 改成 relative timelines，移除姓名並改用一般代稱／年齡／性別，刪除特定機構、地點與 provider names。這是降低風險的最低措施，不是繞過機構政策的許可。

### 學術工作、authorship 與 peer review

學術工作可把 AI 當作 co-reasoner，用於 brainstorming、outline、title、language polishing、translation 或文獻吸收；Elicit、Consensus 可協助 systematic review workflow，NotebookLM 可把指定文獻整理成 podcast、mind map 或可互動 notebook，Claude、Gemini、Napkin 等則可支援簡報與視覺草稿。任何結果仍須由研究者核對。

Meyer 等人的投影片把責任界線說得很清楚：LLM 產出必須先被使用者採納才可分享，採納者須對 validity 與 truthfulness 負責。若 AI 參與 substantive writing、data analysis 或 figure creation，應依期刊與機構規範在 methods 或 acknowledgements 揭露。

Peer review 的界線更嚴格：不可把 manuscript full text、abstract 或 confidential data 上傳公開工具，也不能把「寫審稿、接受／拒絕、判斷 novelty」外包給 AI。可以在不提供稿件內容的前提下潤飾自己已完成的 feedback，並自行做最新文獻檢索、核對 references、驗證所有 co-created output，且清楚揭露工具、版本與使用範圍。

<u>整場演講的共同原則是：AI 可以處理資料、產生草稿與降低摩擦，但 clinical decision、privacy judgment、學術責任與最終查證仍屬於人；任何工具都應以 co-pilot 使用，而不是交給它 autopilot。</u>
