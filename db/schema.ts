import { pgTable, uuid, text, timestamp, jsonb, integer, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').unique(),
    role: text('role').default('user'),
});

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
