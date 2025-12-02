export type Role = 'admin' | 'user';

export type LectureStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface User {
    id: string;
    email: string | null;
    role: Role | null;
}

export interface Lecture {
    id: string;
    title: string;
    sourceUrl: string | null;
    videoFileUrl: string | null;
    audioFileUrl: string | null;
    provider: string | null;
    category: string | null;
    subcategory: string | null;
    tags: string[] | null;
    coverImage: string | null;
    publishDate: Date | null;
    status: string | null;
    isPublished: boolean | null;
}

export interface Transcript {
    id: string;
    lectureId: string | null;
    content: string | null;
    segments: any | null;
}

export interface Slide {
    id: string;
    lectureId: string | null;
    timestampSeconds: number | null;
    imageUrl: string | null;
    ocrText: string | null;
    aiSummary: string | null;
}

export interface Summary {
    id: string;
    lectureId: string | null;
    executiveSummary: string | null;
    keyTakeaways: any | null;
    fullMarkdownContent: string | null;
    tags: string[] | null;
}
