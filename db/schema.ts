import { pgTable, uuid, text, timestamp, jsonb, integer, boolean, primaryKey } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import type { AdapterAccountType } from 'next-auth/adapters';

/**
 * Users — extended for Auth.js (NextAuth) email/password + OAuth.
 *
 * Column *property names* (id, name, email, emailVerified, image) must match
 * what the Drizzle adapter expects; `passwordHash` and `role` are ours.
 */
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: text('name'),
    email: text('email').unique(),
    emailVerified: timestamp('email_verified', { mode: 'date' }),
    image: text('image'),
    passwordHash: text('password_hash'),
    role: text('role').default('user'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const accounts = pgTable(
    'accounts',
    {
        userId: uuid('user_id')
            .notNull()
            .references(() => users.id, { onDelete: 'cascade' }),
        type: text('type').$type<AdapterAccountType>().notNull(),
        provider: text('provider').notNull(),
        providerAccountId: text('provider_account_id').notNull(),
        refresh_token: text('refresh_token'),
        access_token: text('access_token'),
        expires_at: integer('expires_at'),
        token_type: text('token_type'),
        scope: text('scope'),
        id_token: text('id_token'),
        session_state: text('session_state'),
    },
    (account) => [
        primaryKey({ columns: [account.provider, account.providerAccountId] }),
    ],
);

export const sessions = pgTable('sessions', {
    sessionToken: text('session_token').primaryKey(),
    userId: uuid('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
});

export const verificationTokens = pgTable(
    'verification_tokens',
    {
        identifier: text('identifier').notNull(),
        token: text('token').notNull(),
        expires: timestamp('expires', { mode: 'date' }).notNull(),
    },
    (vt) => [primaryKey({ columns: [vt.identifier, vt.token] })],
);

export const lectures = pgTable('lectures', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    title: text('title').notNull(),
    sourceUrl: text('source_url'),
    videoFileUrl: text('video_file_url'),
    audioFileUrl: text('audio_file_url'),
    provider: text('provider'),
    category: text('category'), // Added category field
    subcategory: text('subcategory'), // Added subcategory field
    tags: text('tags').array(), // Added tags field
    publishDate: timestamp('publish_date'),
    coverImage: text('cover_image'), // Custom cover image URL
    pdfUrl: text('pdf_url'), // PDF file URL
    status: text('status').default('processing'),
    isPublished: boolean('is_published').default(true),
});

export const transcripts = pgTable('transcripts', {
    id: uuid('id').primaryKey().defaultRandom(),
    lectureId: uuid('lecture_id').references(() => lectures.id),
    content: text('content'),
    segments: jsonb('segments'),
});

export const slides = pgTable('slides', {
    id: uuid('id').primaryKey().defaultRandom(),
    lectureId: uuid('lecture_id').references(() => lectures.id),
    timestampSeconds: integer('timestamp_seconds'),
    imageUrl: text('image_url'),
    ocrText: text('ocr_text'),
    aiSummary: text('ai_summary'),
});

export const summaries = pgTable('summaries', {
    id: uuid('id').primaryKey().defaultRandom(),
    lectureId: uuid('lecture_id').references(() => lectures.id),
    executiveSummary: text('executive_summary'),
    keyTakeaways: jsonb('key_takeaways'),
    fullMarkdownContent: text('full_markdown_content'),
    tags: text('tags').array(),
});

export const siteSettings = pgTable('site_settings', {
    key: text('key').primaryKey(),
    value: text('value'),
});
