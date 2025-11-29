# 備份與還原指南

## 📦 資料庫備份

### 方法 1：JSON 備份（推薦）

**備份**：
```bash
# 設置 DATABASE_URL（從 Zeabur 複製）
export DATABASE_URL="postgresql://..."

# 執行備份
npm run db:backup
```

備份文件會保存在 `backups/db_backup_YYYY-MM-DD-HH-MM-SS.json`

**還原**：
```bash
# 設置 DATABASE_URL
export DATABASE_URL="postgresql://..."

# 還原備份
npm run db:restore backups/db_backup_2025-11-30-02-30-00.json
```

### 方法 2：SQL 備份（需要 pg_dump）

```bash
# 設置 DATABASE_URL
export DATABASE_URL="postgresql://..."

# 執行備份
bash scripts/backup-db.sh
```

備份文件：`backups/db_backup_YYYYMMDD_HHMMSS.sql.gz`

---

## 🔄 自動化備份

### 選項 A：使用 Cron（本地/服務器）

編輯 crontab：
```bash
crontab -e
```

添加定時任務（每天凌晨 2 點備份）：
```bash
0 2 * * * cd /path/to/imwebsite && DATABASE_URL="postgresql://..." npm run db:backup
```

### 選項 B：使用 GitHub Actions

創建 `.github/workflows/backup.yml`（需要設置 GitHub Secrets）

### 選項 C：手動定期備份

在 Zeabur Console 中執行：
```bash
npm run db:backup
```

然後下載備份文件到本地保存。

---

## 📁 備份內容

JSON 備份包含：
- ✅ `users` - 用戶資料
- ✅ `lectures` - 文章列表
- ✅ `transcripts` - 文章轉錄稿
- ✅ `slides` - 文章投影片
- ✅ `summaries` - 文章摘要
- ✅ `site_settings` - 網站設置

---

## 💾 備份策略建議

### 每日備份
- 方式：自動執行 `npm run db:backup`
- 保留：最近 30 天

### 每週備份
- 方式：手動下載到本地 + 上傳到雲端（Google Drive/Dropbox）
- 保留：最近 3 個月

### 重要更新前備份
- 方式：手動備份
- 保留：永久

---

## ⚠️ 注意事項

1. **備份文件包含敏感資料**，請妥善保管
2. **定期測試還原**，確保備份可用
3. **不要將備份提交到 Git**（已在 `.gitignore` 中）
4. **使用環境變數**存儲 DATABASE_URL
5. **還原前先備份**當前資料

---

## 🔐 安全建議

- 將 `backups/` 添加到 `.gitignore`
- 使用加密存儲備份文件
- 定期輪換資料庫密碼
- 限制資料庫訪問 IP
