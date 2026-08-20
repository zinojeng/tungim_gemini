# 雄激素膜受體的鑑定、結構與致效劑設計（Identification, Structure, and Agonist Design of an Androgen Membrane Receptor）

- **會議／場次：** ENDO 2026／SY61 — Signaling: Everything, Everywhere, All at Once
- **短講：** SY61-03
- **講者：** Zhao Yang（代表原訂講者 Jin-Peng Sun, Professor）

## 整理稿

### 從 GPCR 的感知功能走向雄激素快速作用

Zhao Yang 說明，Jin-Peng Sun 教授因簽證延誤未能到場，由他代表發表。團隊長期研究 G protein-coupled receptors（GPCRs）如何連接外界感知與體內恆定：視覺、嗅覺、味覺、癢覺、聽覺與平衡，以及對蛋白質、脂質、醣類、biogenic amines 與其他代謝物的監測，都有 GPCR 參與。講者估計約 80–100 種 GPCR 可回應代謝物，且超過 35% 的 FDA-approved drugs 直接以 GPCR 為標的。

<u>Slides 延伸補充：目前 child slide handoff 只保留場次 agenda、disclosure 與正式 title card；disclosure 記載 Jin-Peng Sun 無需揭露的財務關係。以下科學內容與數字均以 terminology-QA transcript 為主，不把未捕捉到的圖表當作 slide-verified evidence。</u>

### 雄激素的效益、風險與尚未解開的快速訊號

雄激素除了調控第二性徵，也參與能量代謝、肌力與免疫；臨床曾用於 delayed puberty、muscle atrophy 與 anemia 的輔助治療，但長期或高劑量使用也可能伴隨肝腎、心血管與前列腺相關風險。講者以雄激素早期純化、testosterone 命名與 androgen deprivation therapy 的歷史，說明同一生理系統可以同時帶來治療效益與傷害。傳統機制是 testosterone 經 **5α-reductase** 轉為 **5α-dihydrotestosterone（5α-DHT）**，再結合細胞內 androgen receptor（AR），進入細胞核調控基因表現，效應需數小時至數天。

另一方面，5α-DHT 也能在很短時間內引發 macrophage calcium signal、pancreatic β-cell insulin secretion 與 skeletal-muscle contraction。這些反應對 transcription／translation inhibitors 及傳統 AR antagonist 不敏感，卻會被 G-protein inhibition 抑制，因此團隊追問：是否存在一個介導 5α-DHT 快速作用的膜上 GPCR？

### 骨骼肌局部 5α-DHT 與 GPR133 的鑑定

團隊使用小鼠 extensor digitorum longus（EDL）muscle。Mass spectrometry 顯示肌肉內 5α-DHT 高於血中濃度，並有 sex- and age-specific pattern；12-week-old male mice 的肌內濃度與收縮力最高。敲低肌肉的 5α-reductase 後，肌內 5α-DHT 降至接近血中水準，支持骨骼肌存在局部合成。

在 **1–9 nM** 的生理濃度範圍，5α-DHT 可快速增強 EDL contraction，並使 cAMP 呈濃度依賴性上升。研究者從骨骼肌表現量最高的 30 種 GPCR 進行功能篩選，只有 **GPR133／ADGRD1** 對 5α-DHT 產生強烈 cAMP response。Gpr133-GFP knock-in reporter mice 顯示，超過 **75%** 的 skeletal-muscle cells 可見受體位於 cell surface。

BRET-based G-protein dissociation assay 進一步支持 5α-DHT 啟動 **GPR133–Gs–cAMP** pathway。Hanging-wire 與 grip-strength tests 顯示 5α-DHT 可快速提升肌力；在 Gpr133 knockout mice 中效應大幅降低但未完全消失，表示 GPR133 是重要介質，卻可能不是唯一受體。分離的 EDL fiber 中，Gs inhibitor **NF449** 或 Gpr133 deletion 也會阻斷所測得的 cAMP／快速反應。

### 兩種 5α-DHT 結合構型

Cryo-EM 解析顯示，5α-DHT 可在 GPR133 的 orthosteric pocket 採兩種構型：vertical mode 與 horizontal mode。結合曲線較符合 two-site model；配合關鍵殘基突變，研究者將 vertical mode 對應較高親和力、horizontal mode 對應較低親和力。這個結構結果解釋了同一受體為何可呈現兩種 affinity state，也提供後續 structure-based ligand design 的依據。

### AP503：把急性肌力效應與核 AR 活性分開

團隊以 structure-based virtual screening 找到小分子 agonist **AP503**。在本研究的細胞與小鼠實驗中，AP503 活化 GPR133–Gs signaling，未呈現核 AR activity，並能快速增加 muscle strength。前列腺評估中，AP503 未誘發研究者所測量的 AR-related gene-expression 與 5α-DHT-like epithelial changes。

磷酸化蛋白質體分析則顯示，快速效應涉及 cAMP／protein kinase A（PKA）軸及收縮相關蛋白 **MLCK2**、**RYR1** 的 phosphorylation；阻斷 PKA 或相關節點會抑制 calcium signal 與快速收縮。這些結果建立了「5α-DHT／GPR133 → Gs–cAMP–PKA → contractile-protein phosphorylation → acute muscle-strengthening」的模型。

<u>這仍是急性、前臨床的肌力證據：AP503 尚未證明可在人體安全治療 sarcopenia，也不能由目前資料推論它已排除所有 androgenic adverse effects。</u> Cell 論文與後續評論提出的是 therapeutic potential；團隊已申請專利並持續轉譯研究。

### 現場問答：性別、配體選擇性與核 AR 的必要性

有與會者詢問 female mice 是否缺乏反應。講者回答，雌鼠仍表現 GPR133，只是相對較低；若給予相近濃度的 5α-DHT，male 與 female skeletal muscle 可出現相似 cellular response，因此性別差異可能主要來自 hormone level。不過 GPR133 expression 如何受到調控仍不清楚，團隊只觀察到它與核 AR 之間可能存在關聯。

另一問題聚焦 AR-targeting compounds 是否會作用於 GPR133。團隊尚未系統測試 nuclear-AR antagonists，不能直接下結論；現有篩選中的陽性配體是 **5α-DHT** 與 **methenolone（MET）**，而 testosterone 未活化 GPR133。講者推測受體口袋的 aromatic residues 可能辨識 steroid 結構中細微的 double-bond difference，但此推論尚待直接實驗。

最後的討論直指研究限制：GPR133 足以介導快速肌力反應，不代表長期 muscle mass、remodeling 與持續功能可脫離核 AR。講者同意，完整 androgen effect 很可能需要膜受體的快速訊號與核 AR 的 transcriptional effect 共同作用；目前也尚未證明急性反應可獨立轉化為長期 anabolic benefit。與會者另指出 GPR133 是 mechanosensitive receptor，講者接受這項提醒，但本場資料並未完成其 mechanical sensing、AR regulation 與藥理作用之間的因果鏈。

因此，本研究最穩健的結論是：**GPR133／ADGRD1 是可感知 5α-DHT、啟動 Gs–cAMP pathway 並參與小鼠急性肌力提升的膜受體**；AP503 提供了一個把此快速訊號與核 AR activity 分開研究的工具與候選先導物。至於長期增肌、性別差異、其他受體的貢獻及人體治療安全性，仍需後續研究回答。
