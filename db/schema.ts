import { pgTable, uuid, text, timestamp, jsonb, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: text('email').unique(),
    role: text('role').default('user'),
});

export const lectures = pgTable('lectures', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    sourceUrl: text('source_url'),
    videoFileUrl: text('video_file_url'),
    audioFileUrl: text('audio_file_url'),
    provider: text('provider'),
    publishDate: timestamp('publish_date'),
    status: text('status').default('processing'),
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
