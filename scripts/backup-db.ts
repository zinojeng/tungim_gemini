import postgres from 'postgres';
import fs from 'fs';
import path from 'path';

/**
 * Zeabur 資料庫備份腳本（JSON 格式）
 * 適合沒有安裝 pg_dump 的環境
 */

const BACKUP_DIR = './backups';

async function backupDatabase() {
    const sql = postgres(process.env.DATABASE_URL!);

    try {
        // 確保備份目錄存在
        if (!fs.existsSync(BACKUP_DIR)) {
            fs.mkdirSync(BACKUP_DIR, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupFile = path.join(BACKUP_DIR, `db_backup_${timestamp}.json`);

        console.log('📦 開始備份資料庫...');

        // 備份所有表
        const backup: Record<string, any[]> = {};

        // 備份 users
        backup.users = await sql`SELECT * FROM users`;
        console.log(`✓ Users: ${backup.users.length} 筆`);

        // 備份 lectures
        backup.lectures = await sql`SELECT * FROM lectures`;
        console.log(`✓ Lectures: ${backup.lectures.length} 筆`);

        // 備份 transcripts
        backup.transcripts = await sql`SELECT * FROM transcripts`;
        console.log(`✓ Transcripts: ${backup.transcripts.length} 筆`);

        // 備份 slides
        backup.slides = await sql`SELECT * FROM slides`;
        console.log(`✓ Slides: ${backup.slides.length} 筆`);

        // 備份 summaries
        backup.summaries = await sql`SELECT * FROM summaries`;
        console.log(`✓ Summaries: ${backup.summaries.length} 筆`);

        // 備份 site_settings
        backup.site_settings = await sql`SELECT * FROM site_settings`;
        console.log(`✓ Site Settings: ${backup.site_settings.length} 筆`);

        // 添加備份元資料
        const backupData = {
            timestamp: new Date().toISOString(),
            database_url: process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':***@'), // 隱藏密碼
            tables: backup,
            version: '1.0'
        };

        // 寫入文件
        fs.writeFileSync(backupFile, JSON.stringify(backupData, null, 2));

        const stats = fs.statSync(backupFile);
        const sizeMB = (stats.size / 1024 / 1024).toFixed(2);

        console.log(`\n✅ 備份完成！`);
        console.log(`📄 文件: ${backupFile}`);
        console.log(`📊 大小: ${sizeMB} MB`);

        return backupFile;

    } catch (error) {
        console.error('❌ 備份失敗:', error);
        throw error;
    } finally {
        await sql.end();
    }
}

// 執行備份
backupDatabase()
    .then(file => {
        console.log(`\n💾 備份文件已保存到: ${file}`);
        process.exit(0);
    })
    .catch(error => {
        console.error('備份過程發生錯誤:', error);
        process.exit(1);
    });
