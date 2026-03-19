# SDD: Google Drive Backup Feature

## 1. Problem Statement

目前網站的備份僅有 JSON export（`/api/admin/export`）和 DB script backup。文章內容（Markdown）和圖像（S3/MinIO）分散在不同系統中，沒有一個統一的、可讀的備份方案。需要將文章以 Markdown 格式、圖像以原始檔案獨立備份到 Google Drive，使得備份內容人類可讀且結構清晰。

## 2. Goals

1. **單篇上傳**：在編輯頁面提供「Upload to Google Drive」按鈕
2. **一鍵全部上傳**：在管理介面提供批量上傳所有文章到 Google Drive
3. **結構化存儲**：Markdown 文件 + 獨立圖像資料夾
4. **增量更新**：避免重複上傳已存在的檔案

## 3. Google Drive 資料夾結構

```
imwebsite-backup/
├── lectures/
│   ├── {lecture-title-slug}/
│   │   ├── article.md          # 文章 Markdown（含 metadata frontmatter）
│   │   ├── images/
│   │   │   ├── cover.{ext}     # 封面圖
│   │   │   ├── slide-001.{ext} # 投影片圖
│   │   │   ├── slide-002.{ext}
│   │   │   └── ...
│   │   └── attachments/
│   │       └── lecture.pdf      # PDF 附件（如有）
│   └── ...
└── site-settings/
    └── settings.json            # 站台設定備份
```

## 4. Markdown 文件格式

```markdown
---
title: "Lecture Title"
category: "Diabetes"
subcategory: "Type 2"
tags: ["insulin", "management"]
publishDate: "2026-01-15"
coverImage: "./images/cover.jpg"
pdfUrl: "./attachments/lecture.pdf"
sourceUrl: "https://youtube.com/..."
---

## Executive Summary

...content...

## Full Content

...full markdown content...

## Transcript

...transcript content...
```

## 5. 技術方案

### 5.1 Google Drive API 認證

使用 **Google Service Account** 搭配 **googleapis** npm 套件：

- 建立 Google Cloud Project → 啟用 Google Drive API
- 建立 Service Account → 下載 JSON key
- 將 key 內容存為環境變數 `GOOGLE_SERVICE_ACCOUNT_KEY`
- 指定共用 Drive 資料夾 ID：`GOOGLE_DRIVE_FOLDER_ID`

**為什麼選 Service Account 而非 OAuth？**
- 不需要使用者在瀏覽器中登入授權
- 適合 server-side 自動化操作
- 只需將 Service Account email 加入 Drive 資料夾的共用即可

### 5.2 新增套件

```
googleapis  (Google APIs Node.js Client)
```

### 5.3 新增環境變數

```env
GOOGLE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
GOOGLE_DRIVE_FOLDER_ID=your-shared-folder-id
```

### 5.4 API Routes

#### `POST /api/admin/gdrive/upload-single`
上傳單篇文章到 Google Drive

**Request Body:**
```json
{ "lectureId": "uuid" }
```

**Flow:**
1. 從 DB 查詢 lecture + transcript + summary + slides
2. 組裝 Markdown 文件（含 frontmatter）
3. 在 Google Drive 建立/查找資料夾
4. 上傳 Markdown 文件
5. 下載並上傳所有圖像（cover、slides）
6. 下載並上傳 PDF（如有）
7. 回傳結果

#### `POST /api/admin/gdrive/upload-all`
批量上傳所有文章到 Google Drive

**Request Body:**
```json
{ "overwrite": false }  // 是否覆蓋已存在的檔案
```

**Flow:**
1. 查詢所有 lectures
2. 逐篇呼叫上傳邏輯（含進度回報）
3. 使用 streaming response 回報進度
4. 回傳彙總結果

#### `GET /api/admin/gdrive/status`
檢查 Google Drive 連線狀態與備份統計

### 5.5 核心模組

新增 `lib/gdrive.ts`：
- `getGDriveClient()` — 初始化 Google Drive API client
- `findOrCreateFolder(name, parentId)` — 查找或建立資料夾
- `uploadFile(name, content, mimeType, folderId)` — 上傳/更新檔案
- `buildMarkdown(lecture, transcript, summary)` — 組裝 Markdown 文件
- `downloadAndUploadImage(imageUrl, fileName, folderId)` — 從 S3 下載圖像後上傳到 Drive
- `uploadLecture(lectureId)` — 上傳單篇的完整流程
- `slugify(title)` — 產生資料夾名稱用的 slug

### 5.6 UI 變更

#### 編輯 Dialog（單篇上傳）
在 `app/admin/page.tsx` 的 edit dialog 底部新增：
```
[☁ Upload to Google Drive] 按鈕
```
- 點擊後呼叫 `/api/admin/gdrive/upload-single`
- 顯示上傳進度與結果

#### 管理頁面（批量上傳）
在 Manage Lectures tab 的頂部（Export Data 按鈕旁邊）新增：
```
[☁ Upload All to Google Drive] 按鈕
```
- 點擊後顯示確認對話框
- 執行批量上傳，顯示即時進度
- 完成後顯示結果摘要（成功/失敗/跳過數量）

## 6. 實作檔案清單

| 檔案 | 動作 | 說明 |
|------|------|------|
| `lib/gdrive.ts` | 新增 | Google Drive 核心模組 |
| `app/api/admin/gdrive/upload-single/route.ts` | 新增 | 單篇上傳 API |
| `app/api/admin/gdrive/upload-all/route.ts` | 新增 | 批量上傳 API |
| `app/api/admin/gdrive/status/route.ts` | 新增 | 連線狀態檢查 API |
| `app/admin/page.tsx` | 修改 | 新增 UI 按鈕與互動邏輯 |
| `package.json` | 修改 | 新增 googleapis 依賴 |
| `.env.example` | 修改 | 新增環境變數說明 |

## 7. 錯誤處理

- Google Drive API 連線失敗 → 顯示友善錯誤訊息，提示檢查環境變數
- 圖像下載失敗 → 記錄錯誤但繼續其他檔案上傳，最後彙報失敗項目
- 資料夾已存在 → 查找現有資料夾，更新檔案而非重複建立
- 大量上傳超時 → 使用 streaming response，避免 timeout

## 8. 安全考量

- Service Account key 僅存於環境變數，不進 git
- API routes 需要管理員認證（複用現有 auth 機制）
- 圖像下載僅允許從配置的 S3 endpoint
