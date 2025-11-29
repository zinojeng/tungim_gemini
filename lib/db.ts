import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/medinote';
const client = postgres(connectionString, {
    ssl: { rejectUnauthorized: false },
    prepare: false,
});
export const db = drizzle(client, { schema });
