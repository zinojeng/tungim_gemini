// ADA 2026 — 86th Scientific Sessions of the American Diabetes Association
// 5–8 June 2026, Ernest N. Morial Convention Center, New Orleans
// Source: https://events.diabetes.org/live/32/page/330
//
// Curated archive page: only sessions with on-demand recordings are featured.
// Themes mirror the 6 official ADA 2026 program tracks.

export interface Ada2026Theme {
    /** Stable id stored in lectures.subcategory */
    id: string
    name: string
    shortName: string
    description: string
    accent: {
        chip: string
        chipActive: string
        border: string
        text: string
        dot: string
    }
}

export const ADA_2026_META = {
    name: 'ADA 2026',
    fullName: '86th Scientific Sessions of the American Diabetes Association',
    city: 'New Orleans',
    country: 'USA',
    venue: 'Ernest N. Morial Convention Center',
    startDate: '2026-06-05',
    endDate: '2026-06-08',
    timezone: 'America/Chicago',
    websiteUrl: 'https://professional.diabetes.org/scientific-sessions',
    archiveUrl: 'https://events.diabetes.org/live/32/page/330',
}

export const ADA_2026_THEMES: Ada2026Theme[] = [
    {
        id: 'obesity-metabolic',
        name: 'Obesity & Metabolic Health',
        shortName: 'Obesity',
        description:
            'GLP-1, dual/triple agonists, weight-management trials, and the metabolic underpinnings of T2D.',
        accent: {
            chip: 'bg-rose-50 text-rose-800 hover:bg-rose-100',
            chipActive: 'bg-rose-600 text-white hover:bg-rose-600',
            border: 'border-rose-400',
            text: 'text-rose-700',
            dot: 'bg-rose-500',
        },
    },
    {
        id: 'cardiometabolic',
        name: 'Cardiometabolic Outcomes',
        shortName: 'Cardiometabolic',
        description:
            'Cardiorenal trials, SGLT2/GLP-1 outcomes, heart failure, and kidney disease in diabetes.',
        accent: {
            chip: 'bg-orange-50 text-orange-800 hover:bg-orange-100',
            chipActive: 'bg-orange-600 text-white hover:bg-orange-600',
            border: 'border-orange-400',
            text: 'text-orange-700',
            dot: 'bg-orange-500',
        },
    },
    {
        id: 'prevention',
        name: 'Prevention & Early Detection',
        shortName: 'Prevention',
        description:
            'Disease modification, screening strategies, prediabetes, and T1D prevention pathways.',
        accent: {
            chip: 'bg-amber-50 text-amber-800 hover:bg-amber-100',
            chipActive: 'bg-amber-600 text-white hover:bg-amber-600',
            border: 'border-amber-400',
            text: 'text-amber-700',
            dot: 'bg-amber-500',
        },
    },
    {
        id: 'innovation-access',
        name: 'Innovation & Access',
        shortName: 'Innovation',
        description:
            'Care delivery transformation, equity, digital health, AI, and access to next-generation therapies.',
        accent: {
            chip: 'bg-fuchsia-50 text-fuchsia-800 hover:bg-fuchsia-100',
            chipActive: 'bg-fuchsia-600 text-white hover:bg-fuchsia-600',
            border: 'border-fuchsia-400',
            text: 'text-fuchsia-700',
            dot: 'bg-fuchsia-500',
        },
    },
    {
        id: 'beta-cell',
        name: 'Beta Cell & Cure Strategies',
        shortName: 'Beta cell',
        description:
            'Beta-cell replacement, stem-cell-derived islets, immunotherapy, and curative approaches for T1D.',
        accent: {
            chip: 'bg-violet-50 text-violet-800 hover:bg-violet-100',
            chipActive: 'bg-violet-600 text-white hover:bg-violet-600',
            border: 'border-violet-400',
            text: 'text-violet-700',
            dot: 'bg-violet-500',
        },
    },
    {
        id: 'complications',
        name: 'Complications & Guidelines',
        shortName: 'Complications',
        description:
            'Diabetes-related complications, microvascular outcomes, and 2026 guideline updates.',
        accent: {
            chip: 'bg-pink-50 text-pink-800 hover:bg-pink-100',
            chipActive: 'bg-pink-600 text-white hover:bg-pink-600',
            border: 'border-pink-400',
            text: 'text-pink-700',
            dot: 'bg-pink-500',
        },
    },
]

export function getTheme(id: string | null | undefined): Ada2026Theme | undefined {
    if (!id) return undefined
    return ADA_2026_THEMES.find((t) => t.id === id)
}
