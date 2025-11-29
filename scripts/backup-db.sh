#!/bin/bash
# Zeabur 資料庫備份腳本

# 設置備份目錄
BACKUP_DIR="./backups"
mkdir -p $BACKUP_DIR

# 生成時間戳
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/db_backup_$TIMESTAMP.sql"

# 從 Zeabur 導出資料庫
# 需要先設置 DATABASE_URL 環境變數
pg_dump $DATABASE_URL > $BACKUP_FILE

# 壓縮備份
gzip $BACKUP_FILE

echo "✅ 備份完成: ${BACKUP_FILE}.gz"

# 可選：刪除超過 30 天的備份
find $BACKUP_DIR -name "*.gz" -mtime +30 -delete
