import postgres from 'postgres';
import fs from 'fs';

/**
 * Zeabur 資料庫還原腳本
 */

async function restoreDatabase(backupFile: string) {
    const sql = postgres(process.env.DATABASE_URL!);

    try {
        console.log(`📦 開始還原資料庫從: ${backupFile}`);

        // 讀取備份文件
        const backupData = JSON.parse(fs.readFileSync(backupFile, 'utf-8'));

        console.log(`📅 備份時間: ${backupData.timestamp}`);
        console.log(`📊 版本: ${backupData.version}`);

        const tables = backupData.tables;

        // 確認操作
        console.log('\n⚠️  警告: 這將清空現有資料並還原備份！');
        console.log('按 Ctrl+C 取消，或等待 5 秒後自動繼續...\n');

        await new Promise(resolve => setTimeout(resolve, 5000));

        // 開始事務
        await sql.begin(async sql => {
            // 清空並還原每個表
            for (const [tableName, rows] of Object.entries(tables)) {
                console.log(`\n處理表: ${tableName}`);

                // 清空表
                await sql`DELETE FROM ${sql(tableName)}`;
                console.log(`  ✓ 已清空`);

                // 還原數據
                if (Array.isArray(rows) && rows.length > 0) {
                    for (const row of rows) {
                        const columns = Object.keys(row);
                        const values = Object.values(row);

                        await sql`
                            INSERT INTO ${sql(tableName)} ${sql(row)}
                        `;
                    }
                    console.log(`  ✓ 已還原 ${rows.length} 筆資料`);
                } else {
                    console.log(`  - 無資料需要還原`);
                }
            }
        });

        console.log('\n✅ 資料庫還原完成！');

    } catch (error) {
        console.error('❌ 還原失敗:', error);
        throw error;
    } finally {
        await sql.end();
    }
}

// 從命令行參數獲取備份文件
const backupFile = process.argv[2];

if (!backupFile) {
    console.error('❌ 請指定備份文件！');
    console.error('用法: npm run restore <backup-file>');
    process.exit(1);
}

restoreDatabase(backupFile)
    .then(() => {
        console.log('\n✅ 還原完成！');
        process.exit(0);
    })
    .catch(error => {
        console.error('還原過程發生錯誤:', error);
        process.exit(1);
    });
