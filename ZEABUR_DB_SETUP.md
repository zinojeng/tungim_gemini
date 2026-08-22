# Zeabur 資料庫設置指南

由於本地環境的 drizzle-kit generate 存在問題（macOS 檔案系統相關），我們將直接在 Zeabur 上初始化資料庫。

## 方法：在 Zeabur 上使用 drizzle-kit push

### 步驟 1：在 Zeabur 控制台設置環境變數

確保以下環境變數已設置：

```bash
DATABASE_URL=<從 Zeabur PostgreSQL 服務自動注入>
GOOGLE_API_KEY=<您的 Google API Key>
NODE_ENV=production

# S3 相關（如果需要）
S3_ENDPOINT=<您的 endpoint>
S3_REGION=auto
S3_ACCESS_KEY_ID=<您的 key>
S3_SECRET_ACCESS_KEY=<您的 secret>
S3_BUCKET_NAME=<您的 bucket>
S3_PUBLIC_URL=<您的 public URL>
```

### 步驟 2：添加資料庫初始化腳本

在 `package.json` 中添加一個 script：

```json
{
  "scripts": {
    "db:push": "drizzle-kit push"
  }
}
```

### 步驟 3：在 Zeabur 上執行初始化

**選項 A：使用 Zeabur 的一次性命令**
1. 進入 Zeabur 服務設置
2. 找到 "Command" 或"自定義啟動命令"
3. 臨時設置為：`npm run db:push && npm start`
4. 重新部署
5. 部署成功後，改回 `npm start`

**選項 B：使用 Zeabur CLI（如果已安裝）**
```bash
zeabur exec -- npm run db:push
```

### 步驟 4：驗證資料庫

資料庫應該已經創建以下表：
- `users`
- `lectures`
- `transcripts`
- `slides`
- `summaries`
- `site_settings`

## 下一步

資料庫設置完成後，您的應用就可以在 Zeabur 上正常運行了！
