# 自動化胰島素輸送的下一步（Advancing Automated Insulin Delivery: What Comes Next?）

- **會議／場次：** ENDO 2026／In Range: Gadgets for a New Era of Precision Medicine in Glucose Management（SY08）
- **短講：** SY08-03
- **講者：** Ben J. Wheeler, MBChB, FRACP, PhD

## 整理稿

### 為什麼還要追求 full closed loop

Wheeler 從 Type 1 Exchange 資料談起：近年整體控制雖持續改善，投影片所示最近區段的平均 **HbA1c 仍為 8.4%**。他認為 automated insulin delivery（AID）的方向不應只滿足於 HbA1c 低於 7%，而應在安全前提下逐步接近正常血糖；低於 6.5%、甚至低於 6%是講者的遠期主張，不是本場宣布的新臨床指引。

現行主流系統包括 **MiniMed 780G、Omnipod 5 與 Tandem Control-IQ**。它們本質上仍是 hybrid closed loop：演算法可自動調整 insulin，但若要達到最佳表現，使用者仍需進行 meal announcement 或 carbohydrate bolus。講者引述大型 real-world datasets，指出最佳化使用時平均 time in range（TIR）可接近 80%；若完全不 bolus，系統通常仍安全，但 TIR 會下降。這正是 full closed loop（FCL）要解決的生活負擔。

<u>本 child 的 pipeline-v2 handoff 只保留會場議程、利益揭露與講題卡，沒有科學內容圖表；下列研究、病例與數字均以完整 terminology-QA transcript 為主要證據。</u>

### 從 HbA1c 17.6% 的高風險病例看負擔與效益

講者回顧一名早期 MiniMed 780G 研究參與者 Lewis：基準 **HbA1c 17.6%**，過去反覆 DKA 與住院。根據講者在資料中所見，他長期幾乎不做 meal bolus；3 個月 HbA1c 降至 **7.9%**，6 個月降至 **7.2%**，TIR 約在 60%中段。之後雖仍有 cannabis hyperemesis 相關住院，但講者表示並非 diabetes 事件。這是一個已發表的極端病例，顯示 AID 對高負擔、高 HbA1c 個案可能帶來很大改善，但不能當成一般族群療效或零風險保證。

Wheeler 認為未來 FCL 會有不同層級：早期產品也許以約 70% TIR 或 50% time in tight range（TITR）換取大幅減少 bolus 負擔；遠期目標則可能是安全地達到約 90% TITR，且運動期間仍可靠。他主張 TITR 應朝 **63–140 mg/dL**、接近 pregnancy target 的範圍思考；對 63–70 mg/dL 無症狀時的安全看法也是講者個人意見，實際目標仍需依低血糖風險與個人情境設定。

### 餐後控制是演算法難以單獨跨越的障礙

非糖尿病者的 endogenous insulin 在進食後可快速上升又迅速下降；目前皮下注射 insulin 的起效較慢、尾端較長。餐後初期給得不夠會造成 hyperglycemia，為壓住高峰而增加劑量又可能導致較晚的 hypoglycemia。Meal detection、自我調整與 AI 可改善演算法，但講者認為 pharmacokinetics 仍限制演算法能做到的程度。

更快的 insulin 是一條路，但他對目前 commercial data 的評價偏保守，也提醒 OpenAPS／AndroidAPS 使用者的高度客製經驗不能直接等同商業系統證據。另一條路是 adjunctive therapy：不是只把 insulin 曲線向左移，而是延緩 glucose absorption、降低餐後高峰，使兩條曲線更匹配。

### 現有與下一代 FCL 的研究訊號

講者團隊已發表的 self-adapting FCL feasibility study 納入 **42 位成人**，其中 32 位 type 1 diabetes、10 位 type 2 diabetes，基準 HbA1c 均高於 7.5%。在不做 meal bolus 的多階段調整下，TIR 可到約 **65%–70%**，且基準控制較差者改善幅度較大。這是早期 feasibility evidence，不代表所有人都可達到相同結果。

他也引述 University of Virginia 的 34 人資料：基準 HbA1c 低於 8%者，從有 bolus 的 hybrid closed loop 約 68% TIR，改成 FCL 後約 65%–66%；HbA1c 高於 8%者則由 **49%升至 62%**。訊息不是早期 FCL 一定優於最佳 hybrid 使用，而是對原本控制差、meal bolus 負擔大的人，免 bolus 系統可能有較大的實際效益。

14 歲 Shashi 是講者未發表的 next-generation case preview。她生活於兩個家庭，作息變動大且 bolus 逐漸減少；使用 3 個月後 HbA1c 由 **8.0%降至 6.7%**，平均 bolus 0.2 次／日，TIR 約 80%。這個病例展示潛力，但尚不是可泛化的 trial outcome。

### SGLT inhibition：改善 TIR 伴隨 DKA 代價

SGLT2／SGLT1-2 inhibition 可增加尿糖排出、壓低 glucose peak，也能改善 TIR；講者同時強調他**目前不建議在此情境常規使用**，因為 type 1 diabetes 研究顯示 DKA、尤其 euglycemic DKA 增加。他在演講中概括為約三倍風險，但實際幅度會隨藥物、劑量、研究與風險管理而異，不能套用成固定 class-wide 數字。

Continuous glucose and ketone monitoring 可能協助及早辨認風險，但這仍是未來策略，不等於已證明可以消除 DKA。<u>在 type 1 diabetes 使用此類藥物時，TIR 效益不能與 ketone monitoring、illness／fasting／pump-failure education 及停藥規則分開評估。</u>

### GLP-1 receptor agonist 作為 AID adjunct

GLP-1 receptor agonist 可延緩 gastric emptying、減少攝食並降低 insulin requirement。它本身低血糖風險低，但與 insulin 併用仍需依基準 glucose 調整 insulin；不能寫成完全不會發生 hypoglycemia。講者的臨床經驗是 total daily dose 常可下降約 **15%–30%**，並伴隨 weight loss。

ADJUST-T1D trial 隨機分派 72 位使用 AID、合併 obesity 的 type 1 diabetes 成人接受每週 semaglutide 或 placebo。26 週時，semaglutide 組 **36%**、placebo 組 **0%**同時達成三項 composite endpoint：TIR >70%、time below 70 mg/dL <4%、體重下降至少 5%。這是特定 obesity 成人族群的試驗，不能外推為所有 type 1 diabetes 的常規療法。

講者另舉 64 歲 Jane 的病例：使用 MiniMed 780G 時 HbA1c 8.0%、體重 121 kg、total daily dose 74 units/day；加入每週 dulaglutide 後 6 個月，TIR 由 **67%升至 88%**、HbA1c 降至 **7.4%**、體重降至 102 kg，insulin 約降至 46–50 units/day。這是個案經驗，不是隨機比較結果。

### Peripherals 與真正低負擔系統

再好的演算法也依賴穩定的 CGM 與 infusion set。Sensor dropout、warm-up 或偏移會中斷 FCL；infusion-set failure 後可能需要約 12 小時才能重新穩定。Wheeler 的結論是，要同時降低負擔並接近正常 glucose，必須一起改善 insulin、algorithm、sensor、infusion set 與適當的 adjunctive therapy，不能只靠單一元件。

### 現場問答：PRO、年齡、pancreatitis 與上市時間

談到 patient-reported outcomes（PROs），講者表示傳統 quality-of-life questionnaires 常無法捕捉使用者的強烈體驗；早期 780G pivotal study 結束收回設備時，有參與者非常失落，但問卷差異不明顯。Diabetes Treatment Satisfaction Questionnaire（DTSQ）較敏感，因此團隊現在增加 qualitative interviews。

對兒童與青少年，他指出大型資料中的 TIR 通常比成人低約 **5–7 percentage points**；作息變異使 FCL 更困難，但對原本 bolus 執行差、TIR 很低者，仍可能提供重要 safety net。對 dementia 患者，他明確表示自己沒有直接經驗；若有照護者操作，情境可能類似幼兒照護，但治療目標應隨人生階段調整，重點可能是舒適與避免 hypoglycemia，而非一律追求嚴格 TITR。

有聽眾詢問 severe hypertriglyceridemia、chylomicronemia 與 pancreatitis history 下的 GLP-1 receptor agonist。講者只分享 type 1 diabetes 的一般經驗與 microdosing 作法，並明確說無法進一步評論既往 pancreatitis 的特定情境；因此不能把這段改寫成「只要沒有急性 pancreatitis 就應使用」的建議。

最後，Wheeler 說當時尚無他所認定的高階 commercial FCL；他估計下一代 Control-IQ 或 MiniMed 約需 6–12 個月以上。現場另有人提到 CamAPS Liberty，講者認為它是朝 FCL 的 incremental step，且未參與其研究。CamDiab 2026 年 3 月公告則寫明 Liberty 會在各市場核准與供應條件滿足後提供，因此實際上市地點與時間應以各地主管機關及廠商最新公告為準。
