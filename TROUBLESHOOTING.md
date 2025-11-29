# Zeabur 部署問題排查記錄

## 問題總覽

在將 MediNote AI 專案部署到 Zeabur 時遇到的主要問題：**無法創建 lecture，持續出現資料庫連接和插入錯誤**。

---

## 錯誤歷程與解決方案

### 1️⃣ 本地開發環境：`ECONNRESET` 錯誤

**錯誤訊息**：
```
Error: read ECONNRESET
Client network socket disconnected before secure TLS connection was established
```

**原因**：
- 本地網路無法連接到 Zeabur 的外部資料庫端口（25002）
- SSL 握手在建立 TLS 連接前被中斷
- 可能是 ISP、防火牆或網路設備封鎖了非標準端口的加密流量

**測試結果**：
- ✅ TCP 連接成功（`nc -zv`）
- ❌ SSL 握手失敗（`openssl s_client`）
- ❌ 所有 PostgreSQL 驅動（`postgres.js`, `pg`）都失敗

**解決方案**：
- 不在本地測試資料庫連接
- 直接在 Zeabur 上部署和測試

---

### 2️⃣ Zeabur 構建失敗：無效的 DATABASE_URL

**錯誤訊息**：
```
Error: Invalid URL
input: '<從 Zeabur PostgreSQL 服務複製>'
```

**原因**：
- Next.js 在構建時嘗試預渲染頁面
- `DATABASE_URL` 環境變數在構建階段未設置
- 使用了文檔中的佔位符文字

**解決方案**：
修改 `lib/db.ts`，在構建時使用假的資料庫 URL：

```typescript
const connectionString = process.env.DATABASE_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'postgres://dummy:dummy@localhost:5432/dummy' 
        : 'postgres://postgres:postgres@localhost:5432/medinote');
```

---

### 3️⃣ Zeabur 運行時：使用外部連接導致 SSL 錯誤

**錯誤訊息**：
```
Error: Client network socket disconnected before secure TLS connection was established
code: 'ECONNRESET'
```

**原因**：
- 使用了外部公網地址：`tpe1.clusters.zeabur.com:24533`
- 通過公網連接導致 SSL 握手問題

**解決方案**：
使用 Zeabur 內部服務連接：

**錯誤配置**：
```bash
DATABASE_URL=postgresql://root:xxx@tpe1.clusters.zeabur.com:24533/zeabur
```

**正確配置**：
```bash
DATABASE_URL=${POSTGRES_CONNECTION_STRING}
# 或
DATABASE_URL=postgresql://root:xxx@service-692b17e51c070c62e64e2057:5432/zeabur
```

---

### 4️⃣ 資料庫表不存在

**錯誤訊息**：
```
Error: Failed query: insert into "lectures" ...
```

**原因**：
- 資料庫 schema 未初始化
- `lectures` 等表尚未創建

**解決方案**：
在 Zeabur Console 中執行：
```bash
npm run db:push
```

輸出：
```
[✓] Pulling schema from database...
[✓] Changes applied
```

---

### 5️⃣ UUID 生成問題

**錯誤訊息**：
```
Error creating lecture: The string did not match the expected pattern.
```

**原因**：
- `defaultRandom()` 生成的 SQL 可能與 PostgreSQL 18 不相容

**解決方案**：
修改 `db/schema.ts`，明確使用 PostgreSQL 的 UUID 函數：

```typescript
import { sql } from 'drizzle-orm';

export const lectures = pgTable('lectures', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    // ...
});
```

---

### 6️⃣ 內部連接強制使用 SSL

**錯誤訊息**：
```
Error: Client network socket disconnected before secure TLS connection was established
```

**原因**：
- `lib/db.ts` 強制所有連接使用 SSL
- Zeabur 內部服務連接（`service-xxx`）不需要也不支持 SSL

**測試驗證**：
原生 SQL 可以成功插入（未使用 SSL）：
```bash
✅ Success: { id: '78b4c101-...', title: 'Test Lecture', ... }
```

**最終解決方案**：
修改 `lib/db.ts`，偵測內部連接並禁用 SSL：

```typescript
const isInternalConnection = connectionString.includes('service-') || 
                            connectionString.includes('.zeabur.internal');

const client = postgres(connectionString, {
    ssl: isInternalConnection ? false : { rejectUnauthorized: false },
    prepare: false,
});
```

---

## 最終工作配置

### Zeabur 環境變數（tungim_gemini 服務）

```bash
DATABASE_URL=${POSTGRES_CONNECTION_STRING}
# 或直接使用
DATABASE_URL=postgresql://root:324HU6NdK1x7kwOeqc5Y8Q9MIXBJoAy0@service-692b17e51c070c62e64e2057:5432/zeabur

PASSWORD=y32516Y9w87MBSel4dK0bzhpvZoqmNWE
GOOGLE_API_KEY=AIzaSyD2WSpzoU81gzGtAAR_qQ5Gud3qXEGVfHM
NODE_ENV=production
```

### 關鍵代碼修改

**`lib/db.ts`**：
```typescript
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

const connectionString = process.env.DATABASE_URL || 
    (process.env.NODE_ENV === 'production' 
        ? 'postgres://dummy:dummy@localhost:5432/dummy' 
        : 'postgres://postgres:postgres@localhost:5432/medinote');

const isInternalConnection = connectionString.includes('service-') || 
                            connectionString.includes('.zeabur.internal');

const client = postgres(connectionString, {
    ssl: isInternalConnection ? false : { rejectUnauthorized: false },
    prepare: false,
});

export const db = drizzle(client, { schema });
```

**`db/schema.ts`**：
```typescript
import { pgTable, uuid, text, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const lectures = pgTable('lectures', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    // ...
});
```

---

## 經驗教訓

### ✅ Do's

1. **使用內部服務連接** - Zeabur 服務間應使用內部地址
2. **根據環境配置 SSL** - 內部連接不需要 SSL
3. **在雲端環境測試** - 本地網路可能有限制
4. **使用 Zeabur 自動注入的變數** - `${POSTGRES_CONNECTION_STRING}`
5. **明確指定 SQL 函數** - 如 `gen_random_uuid()`

### ❌ Don'ts

1. **不要使用外部公網地址** - 在 Zeabur 內部連接時
2. **不要強制所有連接使用 SSL** - 需要根據環境判斷
3. **不要在本地測試雲端資料庫** - 網路限制會干擾
4. **不要跳過資料庫初始化** - 部署後必須執行 `npm run db:push`

---

## 調試技巧

### 1. 檢查環境變數

```bash
env | grep POSTGRES
echo $DATABASE_URL
```

### 2. 測試原生 SQL

```bash
node -e "
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);
sql\`SELECT 1\`.then(console.log).finally(() => sql.end());
"
```

### 3. 檢查資料庫 Schema

```bash
node -e "
const postgres = require('postgres');
const sql = postgres(process.env.DATABASE_URL);
sql\`
  SELECT column_name, data_type, column_default
  FROM information_schema.columns
  WHERE table_name = 'lectures';
\`.then(console.table).finally(() => sql.end());
"
```

### 4. 查看完整錯誤

在代碼中添加詳細日誌：
```typescript
catch (error: any) {
    console.error('Error:', error);
    console.error('Message:', error.message);
    console.error('Cause:', error.cause);
    console.error('Stack:', error.stack);
}
```

---

## 總結

整個問題的根源在於：**Zeabur 內部服務連接不應該使用 SSL，但代碼中強制啟用了 SSL**。

通過偵測連接字串中的 `service-` 前綴來判斷是否為內部連接，並相應地禁用或啟用 SSL，最終解決了所有連接問題。
