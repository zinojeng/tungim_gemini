import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

// Use a dummy URL during build time to prevent connection errors
const connectionString = process.env.DATABASE_URL ||
    (process.env.NODE_ENV === 'production'
        ? 'postgres://dummy:dummy@localhost:5432/dummy'
        : 'postgres://postgres:postgres@localhost:5432/medinote');

// Detect if it's an internal Zeabur connection (no SSL needed)
const isInternalConnection = connectionString.includes('service-') ||
    connectionString.includes('.zeabur.internal');

const client = postgres(connectionString, {
    ssl: isInternalConnection ? false : { rejectUnauthorized: false },
    prepare: false,
});
export const db = drizzle(client, { schema });
