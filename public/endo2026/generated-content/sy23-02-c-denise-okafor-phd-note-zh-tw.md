# Farnesoid X Receptor 的結構塑性與別構調節（Architectural Plasticity and Allostery in the Farnesoid X Receptor）

- **會議／場次：** ENDO 2026／The Order/Disorder of Nuclear Receptors（SY23）
- **短講：** SY23-02
- **講者：** C. Denise Okafor, PhD

## 整理稿

### 從核受體的結構域溝通出發

核受體通常包含 N 端結構域（N-terminal domain, NTD）、DNA 結合域（DNA-binding domain, DBD）、絞鏈區（hinge region）與配體結合域（ligand-binding domain, LBD）。DBD 負責辨識 DNA，LBD 結合配體與共調節因子，而高度柔性的 hinge 連接兩個折疊結構域。講者的核心問題是：**配體在 LBD 所引發的變化，如何傳到 DBD 並改變 DNA 相關活性？** 過去完整多結構域核受體很難用高解析結構方法研究，NTD 與 hinge 的無序性尤其增加困難；即使已有大量單獨 DBD 或 LBD 結構，同時保留多個結構域的實驗結構仍然有限，而且不同受體的 DBD 與 LBD 相對排列差異很大。

團隊選擇 **farnesoid X receptor（FXR）**作為模型。FXR 主要參與膽汁酸、脂質與葡萄糖代謝，通常以 Type II 核受體形式與 retinoid X receptor（RXR）形成異源二聚體，辨識典型的 inverted repeat separated by one nucleotide（IR1）。本演講依序討論兩種塑性：配體是否改變同一 FXR 分子內的結構域接觸，以及 DNA 序列是否改變 FXR 同源二聚體的四級結構。

<u>Slides 延伸補充：投影片整理了少數多結構域核受體的晶體、cryo-EM 與整合模型；把這些結構依 LBD 對齊後，DBD 落在相當不同的位置，直觀顯示核受體架構並非單一固定構象。</u>

### 配體驅動的單體 FXR 結構重排

在 AlphaFold 普及前，團隊以既有核受體結構建立 FXR 的 DBD–hinge–LBD 同源模型，再以 Anton 超級電腦進行長時間與加速 molecular dynamics（MD）模擬。這裡的多結構域模型**不包含 NTD**，因此不能等同於含所有結構域的完整受體。未結合配體的 apo 模型沒有明顯的大幅重排；加入強效 FXR agonist **obeticholic acid（OCA）**後，模型則出現較顯著的構象改變，DBD 與 LBD 趨向靠近。

把多條 MD 軌跡聚類後，可得到三組主要構象；雖然 DBD 的相對位置不同，共通點都是預測到 DBD、hinge 與 LBD 之間的接觸。軌跡中約辨識出 **60 個獨特的域間鹽橋**：DBD–LBD 約 16 個、DBD–hinge 約 10 個、hinge–LBD 約 32 個。參與鹽橋的殘基來源約為 DBD 15%、LBD 46%、hinge 40%。這些是計算模型的比例，支持的是「hinge 可能主動參與」的工作假說，而不是證明每個鹽橋都在細胞內固定存在。

<u>Slides 延伸補充：代表性的多重鹽橋網路包含 K246、E248、E384、K421 與 K424 等帶電殘基；它提供後續定點突變的候選位置。</u>

### Two-hybrid 實驗顯示 hinge 的方向性角色

團隊用 mammalian two-hybrid assay 驗證結構域接觸：一側接 GAL4 DBD，另一側接 VP16 activation domain，以 UAS reporter 的發光訊號判斷兩個融合構築是否靠近。單獨把 FXR DBD 與 LBD 配對時沒有訊號增加；把 hinge 接在 DBD 端仍沒有增加；只有將 **hinge 與 LBD 連在同一構築，再加入 DBD**時才出現接觸訊號。結果支持 hinge 並非任意的被動接頭，其與 LBD 的連續性對這個 assay 中的域間接觸很重要。

配體比較也與 MD 趨勢相符：lithocholic acid（LCA）在此情境接近 antagonist／極弱 activator，沒有明顯誘導接觸；內源性 agonist **chenodeoxycholic acid（CDCA）**與較強的 **OCA、GW4064**則可誘導訊號。定點突變並非全部都降低接觸，但其中若干帶電殘基突變會使訊號下降；講者特別指出 condition 10、也就是模擬中反覆出現的多重鹽橋網路，對域間接觸的下降達到顯著差異。

因此目前最保守的解讀是：**強 agonist 可促進 FXR 的域間重排，而 hinge 介導其中一部分溝通**。至於配體訊號究竟如何依序由 LBD、helix 1、hinge 傳到 DBD，仍是團隊正在解析的機制，不能由 two-hybrid 結果單獨確定。

### DNA 可誘導 FXR 形成具活性的同源二聚體

接著團隊研究沒有 RXR 時的 FXR。實驗使用純化的 **DBD–hinge–LBD 多結構域 FXR construct**；FXR 能獨立結合 DNA 並不是首次被觀察，但這項工作進一步做了生物物理與結構特徵分析。EMSA 顯示，加入 IR1 或 direct repeat（DR1）DNA 後可見較高分子量複合物。SEC-MALS 中，未加 DNA 時量得約 **46.1 kDa**，加入 IR1 後約 **93.5 kDa**，符合兩個 FXR 分子加一個 DNA 分子的量級；ITC 的 stoichiometry 約 **0.572**、接近 0.5，也支持一條 DNA 對兩個 FXR 分子的比例。

FXR–RXR 結合 IR1 時具有固定方向性，因此若兩個位置都由 FXR 佔據，FXR 必須能辨識 5′ 與 3′ half-site。Fluorescence-polarization competition assay 顯示，完整 IR1 的表觀競爭值約 **98 nM**，5′ motif 與 3′ motif 分別約 **622 nM**與 **430 nM**；完整 IR1 的結合較強，而兩種 half-site 仍保有可測得的特異性結合。這些數值來自 competition assay，不應直接混寫成已獨立量測的 Kd。

在 RXR-knockout HeLa 細胞的 IR1 luciferase assay 中，單獨 RXR 幾乎沒有活性；只轉染 FXR 時的活化與同時轉染 FXR、RXR 的結果相近，兩者在該 assay 中沒有顯著差異。這支持 **FXR homodimer 在 IR1 上具有轉錄活性**，但不代表它在所有細胞、所有 response element 上都等同於 FXR–RXR heterodimer。

### IR1-bound FXR 是非典型的延伸架構

團隊嘗試 cryo-EM 未成功後，改以 small-angle X-ray scattering（SAXS）研究 FXR–IR1 複合物。SAXS envelope 與模型顯示兩個 DBD 在 DNA 上形成介面，而兩個 LBD 分別朝 DNA 兩側伸出、彼此不直接接觸。這與已知許多核受體同源或異源二聚體常見的 LBD–LBD interface 不同；AlphaFold3 對 FXR–IR1 的預測也得到相似的延伸排列。

這部分已發表工作的結論是：IR1 DNA 可促使兩個 FXR monomer 組成一個**非典型、LBD 不相接的延伸 homodimer**。SAXS 提供的是溶液中的整體形狀與模型限制，並不是原子解析度結構；研究論文也指出使用的體外 construct 不含 NTD，FXR isoform 與 NTD 對 DNA 結合的影響仍需進一步研究。

### DNA 序列可能選擇不同四級結構

講者再展示尚未發表的延伸研究。AlphaFold 對不同 response element 的初步預測為：IR1、ER2 與 composite ER2–IR1 偏向延伸構象，DR1 則偏向較緊湊構象、兩個 LBD 較接近。團隊正在以 SAXS 與其他實驗檢驗這些模型，因此目前只能說 **DNA sequence 可能調節 FXR homodimer architecture**，不能把四種預測都當成已完成的實驗結構。

投影片並以 **Y174A**作為功能探針。Y174 位於 IR1 模型的 DBD dimer interface；在 IR1 reporter 中，Y174A 使活性下降一部分。相較之下，DR1 與 ER2 模型中的兩個 Y174 彼此遠離，突變後沒有看到同樣的活性變化。這個序列依賴的功能結果與模型方向一致，但 reporter activity 仍是間接證據，尚不足以單獨證明每一種 DNA 上的實際四級結構。

<u>最重要的整體概念是：核受體並不是只有一個靜態架構。配體可改變單一 FXR 內部 DBD–hinge–LBD 的接觸，而 DNA response element 也可能選擇不同的 homodimer 排列；兩者共同影響後續 coregulator recruitment 與轉錄複合體裝配。</u>

### 現場問答與尚未解決的機制

有人詢問，為什麼 two-hybrid 中只有 hinge 接在 LBD 端時才出現接觸。Okafor 回答目前尚無定論；她的工作模型是配體先改變 LBD，訊號再傳到 hinge，之後影響 DBD，但她明確把這稱為推測。另一位提問者注意到 hinge 直接連接 LBD helix 1；講者表示確實反覆看到 helix 1 的變化，只是目前還不了解其機制。

關於 FXR 是否有 F domain，講者現場的答覆是不認為有典型 F domain。她原本不確定 hinge 是否有 post-translational modifications（PTMs）；實驗室成員 Thilini Pulahinge 補充確有 PTM 位點，而且團隊正在研究。這段應保留現場不確定性，不能改寫成 PTM 已被證明會造成特定構象變化。

Eric Nelson 問配體是否也會改變 homodimer architecture。講者預期很可能會，但尚未測試。另有提問者問突變體是否重新做過 SEC-MALS；團隊沒有為這些突變體完成 SEC-MALS，只做過 EMSA，結果顯示 homodimer formation 被破壞或減少。Taosheng Chen 則確認 two-hybrid 使用的是 GAL4 DBD 所辨識的 **UAS sequence**，不是 FXR response element；講者同意 DNA sequence 很可能改變 hinge 的貢獻，這也是目前的研究方向。
