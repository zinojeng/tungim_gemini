# 如何設置文件上傳 (S3/MinIO)

您的應用程式使用 S3 協議來儲存上傳的文件（如圖片、投影片）。要在 Zeabur 上啟用此功能，最簡單的方法是使用 **Zeabur Object Storage (MinIO)**。

## 步驟 1：在 Zeabur 添加 Object Storage 服務

1. 進入您的 Zeabur 專案
2. 點擊 **"Create Service"** (創建服務)
3. 選擇 **"Prebuilt"** (預建服務)
4. 搜尋並選擇 **"MinIO"** 或 **"Object Storage"**

## 步驟 2：獲取連接資訊

服務創建成功後：
1. 進入 MinIO 服務
2. 找到 **"Connection"** 或 **"Instruction"** 頁面
3. 您會看到以下資訊：
   - Endpoint (API 地址)
   - Access Key
   - Secret Key
   - Bucket Name (如果沒有，需進入 MinIO 控制台創建)

## 步驟 3：創建 Bucket (如果需要)

1. 如果 Zeabur 沒有自動創建 Bucket，您需要進入 MinIO 的 Web 控制台
2. 使用提供的帳號密碼登入
3. 創建一個名為 `medinote` (或您喜歡的名字) 的 Bucket
4. **重要**：將 Bucket 的 Access Policy 設為 `Public` (公開)，這樣圖片才能被訪問

## 步驟 4：設置環境變數

回到您的 **tungim_gemini** 服務，添加以下環境變數：

```bash
# S3 設置 (MinIO)
S3_REGION=auto
S3_ACCESS_KEY_ID=minio
S3_SECRET_ACCESS_KEY=N9g7Kz2csnX4t30edE1lj5LDZ6ub8Pph
S3_BUCKET_NAME=zeabur

# ⚠️ 需要填寫 Endpoint (請在 MinIO 服務的 "Domain" 或 "Connection" 頁面查找)
# 格式通常是: https://minio-xxx.zeabur.app
S3_ENDPOINT=<您的 MinIO 公開域名>

# 公開訪問 URL (通常與 Endpoint 相同)
S3_PUBLIC_URL=${S3_ENDPOINT}
```

### 💡 提示：使用 Zeabur 內部連接

如果 MinIO 和您的網站在同一個 Zeabur 專案，您可以使用內部變數（如果 Zeabur 有提供）：

```bash
S3_ENDPOINT=${minio.MINIO_API_URL}
S3_ACCESS_KEY_ID=${minio.MINIO_ROOT_USER}
S3_SECRET_ACCESS_KEY=${minio.MINIO_ROOT_PASSWORD}
```

*(具體變數名稱請參考 Zeabur MinIO 服務的說明)*

## 步驟 5：重新部署

保存變數後，重新部署 tungim_gemini 服務。

---

## 替代方案：Cloudflare R2 (免費額度大)

如果您不想在 Zeabur 跑 MinIO，可以使用 Cloudflare R2：

1. 在 Cloudflare 創建 R2 Bucket
2. 獲取 S3 API Credentials
3. 填入環境變數：
   - `S3_ENDPOINT`: `https://<ACCOUNT_ID>.r2.cloudflarestorage.com`
   - `S3_ACCESS_KEY_ID`: `<Access Key>`
   - `S3_SECRET_ACCESS_KEY`: `<Secret Key>`
   - `S3_BUCKET_NAME`: `<Bucket Name>`
   - `S3_PUBLIC_URL`: `https://<您的自定義域名>`
