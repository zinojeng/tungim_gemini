// ATTD 2026 — 19th International Conference on Advanced Technologies & Treatments for Diabetes
// 11–14 March 2026, Barcelona, Spain
// Source: https://attd.kenes.com/wp-content/uploads/sites/126/2026/01/ATTD-2026-time-table-Website-10-March-26.pdf

export type SessionType =
    | 'plenary'
    | 'parallel-scientific'
    | 'oral'
    | 'industry'
    | 'symposium'
    | 'opening'
    | 'closing'
    | 'networking'
    | 'course'
    | 'startup'

export interface AttdTrack {
    id: string
    name: string
    shortName: string
    description: string
    /** tailwind color used for accents — must be in safelist or Tailwind JIT picks them up */
    accent: {
        chip: string
        chipActive: string
        border: string
        text: string
        dot: string
    }
    featured: boolean
}

export interface AttdSession {
    id: string
    trackId: string
    /** ISO date YYYY-MM-DD */
    date: string
    /** "HH:mm" 24h Madrid local */
    startTime: string
    endTime: string
    title: string
    type: SessionType
    room: string
    /** comma-separated chairs/speakers when known. Most rows in the timetable PDF do not list speakers — this stays empty until detail is fetched. */
    speakers?: string
    description?: string
}

export const ATTD_2026_META = {
    name: 'ATTD 2026',
    fullName: '19th International Conference on Advanced Technologies & Treatments for Diabetes',
    city: 'Barcelona',
    country: 'Spain',
    venue: 'Fira Barcelona Gran Via',
    startDate: '2026-03-11',
    endDate: '2026-03-14',
    timezone: 'Europe/Madrid',
    websiteUrl: 'https://attd.kenes.com',
    agendaUrl:
        'https://cslide.ctimeetingtech.com/attd26/attendee/confcal/session/list',
    timetablePdfUrl:
        'https://attd.kenes.com/wp-content/uploads/sites/126/2026/01/ATTD-2026-time-table-Website-10-March-26.pdf',
}

export const ATTD_2026_DAYS: { key: string; date: string; label: string; shortLabel: string }[] = [
    { key: 'D1', date: '2026-03-11', label: 'Wed · 11 Mar', shortLabel: 'D1' },
    { key: 'D2', date: '2026-03-12', label: 'Thu · 12 Mar', shortLabel: 'D2' },
    { key: 'D3', date: '2026-03-13', label: 'Fri · 13 Mar', shortLabel: 'D3' },
    { key: 'D4', date: '2026-03-14', label: 'Sat · 14 Mar', shortLabel: 'D4' },
]

export const ATTD_2026_TRACKS: AttdTrack[] = [
    {
        id: 'plenary',
        name: 'Plenary & Keynote',
        shortName: 'Plenary',
        description:
            'Opening, scientific plenaries, ATTD Yearbook, closing remarks — the through-line of the meeting.',
        accent: {
            chip: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
            chipActive: 'bg-slate-800 text-white hover:bg-slate-800',
            border: 'border-slate-400',
            text: 'text-slate-700',
            dot: 'bg-slate-500',
        },
        featured: true,
    },
    {
        id: 'cgm',
        name: 'CGM & Glucose Monitoring',
        shortName: 'CGM',
        description:
            'Continuous glucose monitoring from real-life use, beyond traditional indications, to data interoperability and gold-standard debates.',
        accent: {
            chip: 'bg-teal-50 text-teal-800 hover:bg-teal-100',
            chipActive: 'bg-teal-700 text-white hover:bg-teal-700',
            border: 'border-teal-500',
            text: 'text-teal-700',
            dot: 'bg-teal-500',
        },
        featured: true,
    },
    {
        id: 'aid',
        name: 'Automated Insulin Delivery',
        shortName: 'AID',
        description:
            'Closed-loop systems — where they are now, adjunct therapies, updates on AID, and bridging academia with industry.',
        accent: {
            chip: 'bg-sky-50 text-sky-800 hover:bg-sky-100',
            chipActive: 'bg-sky-700 text-white hover:bg-sky-700',
            border: 'border-sky-500',
            text: 'text-sky-700',
            dot: 'bg-sky-500',
        },
        featured: true,
    },
    {
        id: 'ai',
        name: 'AI, Big Data & Digital Health',
        shortName: 'AI & Digital',
        description:
            'AI in diabetes care — from foundational decision support to agentic CDSS workflows. ATTD AI School, plenaries, oral sessions on big data.',
        accent: {
            chip: 'bg-violet-50 text-violet-800 hover:bg-violet-100',
            chipActive: 'bg-violet-700 text-white hover:bg-violet-700',
            border: 'border-violet-500',
            text: 'text-violet-700',
            dot: 'bg-violet-500',
        },
        featured: true,
    },
    {
        id: 't1d',
        name: 'Type 1 Diabetes',
        shortName: 'T1D',
        description:
            'Screening, prevention, cell replacement therapy, cardiovascular risk, refining care — the full T1D arc across all four days.',
        accent: {
            chip: 'bg-rose-50 text-rose-800 hover:bg-rose-100',
            chipActive: 'bg-rose-700 text-white hover:bg-rose-700',
            border: 'border-rose-500',
            text: 'text-rose-700',
            dot: 'bg-rose-500',
        },
        featured: true,
    },
    {
        id: 't2d',
        name: 'Type 2 Diabetes',
        shortName: 'T2D',
        description:
            'Technology adoption in T2D, basal insulin strategies, and outcomes for people with type 2 diabetes.',
        accent: {
            chip: 'bg-amber-50 text-amber-800 hover:bg-amber-100',
            chipActive: 'bg-amber-700 text-white hover:bg-amber-700',
            border: 'border-amber-500',
            text: 'text-amber-700',
            dot: 'bg-amber-500',
        },
        featured: true,
    },
    {
        id: 'special',
        name: 'Pregnancy & Special Populations',
        shortName: 'Special Pop.',
        description:
            'Pregnancy, older adults, female health, and other populations whose diabetes care diverges from the default playbook.',
        accent: {
            chip: 'bg-pink-50 text-pink-800 hover:bg-pink-100',
            chipActive: 'bg-pink-700 text-white hover:bg-pink-700',
            border: 'border-pink-500',
            text: 'text-pink-700',
            dot: 'bg-pink-500',
        },
        featured: true,
    },
    {
        id: 'pediatric',
        name: 'Pediatric Diabetes',
        shortName: 'Pediatric',
        description:
            'ISPAD session, pediatric updates on technology, guidelines, and global outreach.',
        accent: {
            chip: 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100',
            chipActive: 'bg-emerald-700 text-white hover:bg-emerald-700',
            border: 'border-emerald-500',
            text: 'text-emerald-700',
            dot: 'bg-emerald-500',
        },
        featured: true,
    },
    {
        id: 'insulin',
        name: 'Insulin Therapy & Smart Pens',
        shortName: 'Insulin',
        description:
            'New insulins, insulin delivery systems, and the rise of smart pens — opportunities and hurdles.',
        accent: {
            chip: 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100',
            chipActive: 'bg-indigo-700 text-white hover:bg-indigo-700',
            border: 'border-indigo-500',
            text: 'text-indigo-700',
            dot: 'bg-indigo-500',
        },
        featured: true,
    },
    {
        id: 'lifestyle',
        name: 'Nutrition, Exercise & Obesity',
        shortName: 'Lifestyle',
        description:
            'Exercise physiology and metabolism, nutrition and food technologies, treating obesity in T1D and beyond.',
        accent: {
            chip: 'bg-lime-50 text-lime-800 hover:bg-lime-100',
            chipActive: 'bg-lime-700 text-white hover:bg-lime-700',
            border: 'border-lime-500',
            text: 'text-lime-700',
            dot: 'bg-lime-500',
        },
        featured: true,
    },
    {
        id: 'care',
        name: 'Equity, Education & Care Delivery',
        shortName: 'Care',
        description:
            'Equity and disparities, nursing, healthcare-provider challenges, ATTD x UNLOK x IDF education, and population-level innovation.',
        accent: {
            chip: 'bg-cyan-50 text-cyan-800 hover:bg-cyan-100',
            chipActive: 'bg-cyan-700 text-white hover:bg-cyan-700',
            border: 'border-cyan-500',
            text: 'text-cyan-700',
            dot: 'bg-cyan-500',
        },
        featured: true,
    },
    {
        id: 'industry',
        name: 'Industry Symposia',
        shortName: 'Industry',
        description:
            'Industry plenaries and parallel symposia (not included in main event CME/CPD credit).',
        accent: {
            chip: 'bg-stone-100 text-stone-700 hover:bg-stone-200',
            chipActive: 'bg-stone-700 text-white hover:bg-stone-700',
            border: 'border-stone-400',
            text: 'text-stone-600',
            dot: 'bg-stone-400',
        },
        featured: false,
    },
]

// ────────────────────────────────────────────────────────────────────────────
// Sessions
// IDs: PSnn = Parallel Scientific, OPnn = Oral Presentations, PLn = Plenary,
//      INDn = Industry Plenary, SYMn = Symposium, OPENn / CLOSEn / SOCn = misc.
// ────────────────────────────────────────────────────────────────────────────

export const ATTD_2026_SESSIONS: AttdSession[] = [
    // ─── WEDNESDAY 11 MAR (D1) ────────────────────────────────────────────
    {
        id: 'STARTUP1',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '09:00',
        endTime: '13:00',
        title: 'ATTD Ignite Start-Up',
        type: 'startup',
        room: 'Hall 212',
        description:
            'ATTD Ignite — start-up showcase and pitching for diabetes-tech ventures.',
    },
    {
        id: 'SYM-EDENT1FI',
        trackId: 't1d',
        date: '2026-03-11',
        startTime: '09:00',
        endTime: '12:00',
        title: 'EDENT1FI Symposium',
        type: 'symposium',
        room: 'Hall 113',
        description:
            'EDENT1FI consortium symposium on early detection of type 1 diabetes.',
    },
    {
        id: 'IND-D1-1',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 117',
        description: 'Not included in the main event CME/CPD credit.',
    },
    {
        id: 'IND-D1-2A',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Parallel Industry — Hall 112',
        type: 'industry',
        room: 'Hall 112',
        description: 'Not included in the main event CME/CPD credit.',
    },
    {
        id: 'SYM-DEDOC',
        trackId: 'care',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: '#dedoc° Symposium',
        type: 'symposium',
        room: 'Hall 211',
        description:
            '#dedoc° voices — patient advocacy and lived-experience perspectives in diabetes tech.',
    },
    {
        id: 'IND-D1-2B',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Parallel Industry — Hall 113',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'IND-D1-2C',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Parallel Industry — Hall 114',
        type: 'industry',
        room: 'Hall 114',
    },
    {
        id: 'IND-D1-2D',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Parallel Industry — Hall 115',
        type: 'industry',
        room: 'Hall 115',
    },
    {
        id: 'IND-D1-2E',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Parallel Industry — Hall 116',
        type: 'industry',
        room: 'Hall 116',
    },
    {
        id: 'IND-D1-2F',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Parallel Industry — Hall 212',
        type: 'industry',
        room: 'Hall 212',
    },
    {
        id: 'IND-D1-3',
        trackId: 'industry',
        date: '2026-03-11',
        startTime: '16:20',
        endTime: '17:50',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 117',
        description: 'Not included in the main event CME/CPD credit.',
    },
    {
        id: 'OPEN1',
        trackId: 'plenary',
        date: '2026-03-11',
        startTime: '18:00',
        endTime: '18:40',
        title: 'Opening Session & Opening Ceremony',
        type: 'opening',
        room: 'Auditorium',
    },
    {
        id: 'SOC1',
        trackId: 'plenary',
        date: '2026-03-11',
        startTime: '18:40',
        endTime: '19:00',
        title: 'Welcome Reception',
        type: 'networking',
        room: 'Exhibition Area',
    },

    // ─── THURSDAY 12 MAR (D2) ─────────────────────────────────────────────
    {
        id: 'PL-HOTOVEN',
        trackId: 'plenary',
        date: '2026-03-12',
        startTime: '07:45',
        endTime: '09:00',
        title: 'Hot from the Oven',
        type: 'plenary',
        room: 'Auditorium',
        description: 'Late-breaking and just-published research highlights.',
    },
    {
        id: 'PL-AI',
        trackId: 'ai',
        date: '2026-03-12',
        startTime: '09:00',
        endTime: '10:00',
        title: 'Scientific Plenary: Transforming Diabetes Management with Artificial Intelligence (AI)',
        type: 'plenary',
        room: 'Auditorium',
    },
    {
        id: 'IND-D2-1',
        trackId: 'industry',
        date: '2026-03-12',
        startTime: '10:30',
        endTime: '12:00',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 117',
    },
    {
        id: 'CRS-T1D',
        trackId: 't1d',
        date: '2026-03-12',
        startTime: '12:15',
        endTime: '12:45',
        title: 'Breakthrough T1D — ATTD Interventional Type 1 Diabetes Course',
        type: 'course',
        room: 'Hall 115',
    },
    {
        id: 'PS01',
        trackId: 't1d',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Parallel Scientific 01: Screening and Treatment Options for Delaying Onset of Type 1 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS02',
        trackId: 'special',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Parallel Scientific 02: Use of Technology in Older Adults with Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS03',
        trackId: 'lifestyle',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Parallel Scientific 03: Exercise Physiology and Metabolism in Diabetes — From Theory to Clinical Application',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'IND-D2-PARA1',
        trackId: 'industry',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Parallel Industry — Hall 113',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'PS04',
        trackId: 'cgm',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Parallel Scientific 04: Real-Life Use of Continuous Glucose Monitoring (CGM)',
        type: 'parallel-scientific',
        room: 'Hall 115',
    },
    {
        id: 'PS05',
        trackId: 'special',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: "Parallel Scientific 05: Updates on Diabetes Management and Females' Health",
        type: 'parallel-scientific',
        room: 'Hall 116',
    },
    {
        id: 'OP01',
        trackId: 'ai',
        date: '2026-03-12',
        startTime: '13:00',
        endTime: '14:30',
        title: 'Oral Presentations 01: Big Data and AI-Based Decision Support Systems',
        type: 'oral',
        room: 'Hall 212',
    },
    {
        id: 'IND-D2-2',
        trackId: 'industry',
        date: '2026-03-12',
        startTime: '14:40',
        endTime: '16:10',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 117',
    },
    {
        id: 'PS06',
        trackId: 'lifestyle',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Scientific 06: The Leona M. and Harry B. Helmsley Charitable Trust Session — Pushing the Field of Exercise Forward for People Living with Type 1 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS07',
        trackId: 'aid',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Scientific 07: Closed-Loop Systems — Where Are We Now?',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS08',
        trackId: 't1d',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Scientific 08: Global Stages of Screening of Type 1 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'IND-D2-PARA2',
        trackId: 'industry',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Industry — Hall 113',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'IND-D2-PARA3',
        trackId: 'industry',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Industry — Hall 114',
        type: 'industry',
        room: 'Hall 114',
    },
    {
        id: 'PS09',
        trackId: 't2d',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Scientific 09: The Use of Technology in Treating Type 2 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 115',
    },
    {
        id: 'PS10',
        trackId: 'lifestyle',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Parallel Scientific 10: Nutrition and Food Technologies',
        type: 'parallel-scientific',
        room: 'Hall 116',
    },
    {
        id: 'OP02',
        trackId: 'insulin',
        date: '2026-03-12',
        startTime: '16:40',
        endTime: '18:10',
        title: 'Oral Presentations 02: New Insulins and Insulin Delivery Systems',
        type: 'oral',
        room: 'Hall 212',
    },

    // ─── FRIDAY 13 MAR (D3) ───────────────────────────────────────────────
    {
        id: 'PL-WHATELSE',
        trackId: 'plenary',
        date: '2026-03-13',
        startTime: '08:00',
        endTime: '08:30',
        title: 'Scientific Plenary: What Else Is New?',
        type: 'plenary',
        room: 'Hall 115',
    },
    {
        id: 'IND-D3-1',
        trackId: 'industry',
        date: '2026-03-13',
        startTime: '08:30',
        endTime: '09:20',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'PS11',
        trackId: 'ai',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Parallel Scientific 11: Revolutionizing Diabetes Care — Artificial Intelligence, Machine Learning and Continuous Glucose Monitoring in Practice',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS12',
        trackId: 'cgm',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Parallel Scientific 12: From Prediction to Diabetes Complications',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS13',
        trackId: 'cgm',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Parallel Scientific 13: Debate — HbA1c and Not CGM Should Be the Gold Standard to Evaluate Glucose Control',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'IND-D3-PARA1',
        trackId: 'industry',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Parallel Industry — Hall 113',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'IND-D3-PARA2',
        trackId: 'industry',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Parallel Industry — Hall 114',
        type: 'industry',
        room: 'Hall 114',
    },
    {
        id: 'OP03',
        trackId: 'lifestyle',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Oral Presentations 03: Physical Activities and Diabetes',
        type: 'oral',
        room: 'Hall 115',
    },
    {
        id: 'PS14',
        trackId: 'ai',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Parallel Scientific 14: Data Interoperability',
        type: 'parallel-scientific',
        room: 'Hall 116',
    },
    {
        id: 'OP04',
        trackId: 't1d',
        date: '2026-03-13',
        startTime: '09:30',
        endTime: '10:30',
        title: 'Oral Presentations 04: Screening, Prevention and Cure of Diabetes',
        type: 'oral',
        room: 'Hall 212',
    },
    {
        id: 'IND-D3-2',
        trackId: 'industry',
        date: '2026-03-13',
        startTime: '11:00',
        endTime: '12:30',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 117',
    },
    {
        id: 'PS15',
        trackId: 'care',
        date: '2026-03-13',
        startTime: '12:35',
        endTime: '13:05',
        title: 'Parallel Scientific 15: IDF Europe Symposium — From Diabetes Detection to Cure: Turning Vision into Reality',
        type: 'symposium',
        room: 'Hall 113',
        description: 'Lunch boxes are offered.',
    },
    {
        id: 'PL-YEARBOOK',
        trackId: 'plenary',
        date: '2026-03-13',
        startTime: '13:30',
        endTime: '15:00',
        title: 'Scientific Plenary: ATTD Yearbook Session',
        type: 'plenary',
        room: 'Auditorium',
    },
    {
        id: 'IND-D3-3',
        trackId: 'industry',
        date: '2026-03-13',
        startTime: '15:15',
        endTime: '16:45',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 117',
    },
    {
        id: 'PS16',
        trackId: 't1d',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 16: Breakthrough T1D (JDRF) Session — Cell Replacement Therapy: Functional Cure for Type 1 Diabetes — How Far Are We?',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS17',
        trackId: 'aid',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 17: Adjunct Therapies with Automated Insulin Delivery',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS18',
        trackId: 'special',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 18: Using Technology in Pregnancy',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'IND-D3-PARA3',
        trackId: 'industry',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Industry — Hall 113',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'PS19',
        trackId: 't2d',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 19: Betting on Basal Insulin — Improving the Odds for People with Type 2 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 114',
        description: 'Not included in the main event CME/CPD credit.',
    },
    {
        id: 'PS20',
        trackId: 'care',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 20: Beyond the Basics — Elevating Diabetes Nursing',
        type: 'parallel-scientific',
        room: 'Hall 115',
    },
    {
        id: 'PS21',
        trackId: 'care',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 21: Equity and Innovation in Diabetes — Challenges, Disparities, and Breakthroughs',
        type: 'parallel-scientific',
        room: 'Hall 116',
    },
    {
        id: 'PS22',
        trackId: 'lifestyle',
        date: '2026-03-13',
        startTime: '17:15',
        endTime: '18:45',
        title: 'Parallel Scientific 22: Managing Overweight & Obesity in Type 1 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 212',
    },

    // ─── SATURDAY 14 MAR (D4) ─────────────────────────────────────────────
    {
        id: 'IND-D4-1',
        trackId: 'industry',
        date: '2026-03-14',
        startTime: '08:30',
        endTime: '09:20',
        title: 'Industry Plenary',
        type: 'industry',
        room: 'Hall 114',
    },
    {
        id: 'PS23',
        trackId: 'cgm',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Parallel Scientific 23: Updates on Hypo- and Hyperglycemia',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS24',
        trackId: 't1d',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Parallel Scientific 24: Cardiovascular Disease in Type 1 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS25',
        trackId: 'aid',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Parallel Scientific 25: Updates on Automated Insulin Delivery (AID)',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'IND-D4-PARA1',
        trackId: 'industry',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Parallel Industry — Part 1',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'PS26',
        trackId: 't1d',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Parallel Scientific 26: Refining Care of Type 1 Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 114',
    },
    {
        id: 'OP05',
        trackId: 'aid',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Oral Presentations 05: Closed-Loop Systems (1)',
        type: 'oral',
        room: 'Hall 115',
    },
    {
        id: 'OP06',
        trackId: 't2d',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Oral Presentations 06: Medications for Treatment of Diabetes',
        type: 'oral',
        room: 'Hall 116',
    },
    {
        id: 'OP07',
        trackId: 'cgm',
        date: '2026-03-14',
        startTime: '09:30',
        endTime: '11:00',
        title: 'Oral Presentations 07: Use of CGM in Practice',
        type: 'oral',
        room: 'Hall 212',
    },
    {
        id: 'PS27',
        trackId: 't1d',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Parallel Scientific 27: Navigating Early Type 1 Diabetes — From Screening to Management',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS28',
        trackId: 'cgm',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Parallel Scientific 28: Continuous Glucose Monitoring (CGM) Outside the Traditional Areas',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS29',
        trackId: 't1d',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Parallel Scientific 29: Breakthrough T1D (JDRF) Session — Bridging the Gap Between Academia and Industry in Diabetes Technology',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'IND-D4-PARA2',
        trackId: 'industry',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Parallel Industry — Part 2',
        type: 'industry',
        room: 'Hall 113',
    },
    {
        id: 'PS30',
        trackId: 'care',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Parallel Scientific 30: Challenges of Health Care Providers in Treating People with Diabetes',
        type: 'parallel-scientific',
        room: 'Hall 114',
    },
    {
        id: 'PS31',
        trackId: 'care',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Parallel Scientific 31: ATTD on UNLOK x IDF — Transforming Learning, Empowering Care',
        type: 'parallel-scientific',
        room: 'Hall 115',
    },
    {
        id: 'OP08',
        trackId: 'care',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Oral Presentations 08: Diabetes Care — From Population Trends to Patient-Centered Innovation',
        type: 'oral',
        room: 'Hall 116',
    },
    {
        id: 'OP09',
        trackId: 'cgm',
        date: '2026-03-14',
        startTime: '11:30',
        endTime: '13:00',
        title: 'Oral Presentations 09: Use of CGM and Other Technologies in Diabetes',
        type: 'oral',
        room: 'Hall 212',
    },
    {
        id: 'PS32',
        trackId: 'care',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Parallel Scientific 32: India D-Tech Session',
        type: 'parallel-scientific',
        room: 'Hall 117',
    },
    {
        id: 'PS33',
        trackId: 'insulin',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Parallel Scientific 33: Opportunities and Hurdles for Smart Pens',
        type: 'parallel-scientific',
        room: 'Hall 112',
    },
    {
        id: 'PS34',
        trackId: 'pediatric',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Parallel Scientific 34: ISPAD Session — Pediatric Diabetes: Updates on Technology, Guidelines, and Global Outreach',
        type: 'parallel-scientific',
        room: 'Hall 211',
    },
    {
        id: 'OP10',
        trackId: 'aid',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Oral Presentations 10: Closed-Loop Systems (2)',
        type: 'oral',
        room: 'Hall 113',
    },
    {
        id: 'PS35',
        trackId: 'ai',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Parallel Scientific 35: ATTD AI School for Clinicians — From GenAI Foundations to Agentic CDSS Workflows: Safe, Practical Use in Diabetes Care',
        type: 'parallel-scientific',
        room: 'Hall 114',
    },
    {
        id: 'OP11',
        trackId: 'lifestyle',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Oral Presentations 11: Treating Obesity',
        type: 'oral',
        room: 'Hall 115',
    },
    {
        id: 'OP12',
        trackId: 'care',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Oral Presentations 12: Use of Technology in Various Conditions',
        type: 'oral',
        room: 'Hall 116',
    },
    {
        id: 'OP13',
        trackId: 'cgm',
        date: '2026-03-14',
        startTime: '13:45',
        endTime: '15:15',
        title: 'Oral Presentations 13: Updates on Glucose Monitoring',
        type: 'oral',
        room: 'Hall 212',
    },
    {
        id: 'PL-T1D-CLOSING',
        trackId: 't1d',
        date: '2026-03-14',
        startTime: '15:25',
        endTime: '16:25',
        title: 'Scientific Plenary: Advancements in Type 1 Diabetes — From Pathogenesis to Therapy',
        type: 'plenary',
        room: 'Hall 113',
    },
    {
        id: 'CLOSE1',
        trackId: 'plenary',
        date: '2026-03-14',
        startTime: '16:25',
        endTime: '16:45',
        title: 'Closing Remarks',
        type: 'closing',
        room: 'Hall 113',
    },
    {
        id: 'SOC2',
        trackId: 'plenary',
        date: '2026-03-14',
        startTime: '16:45',
        endTime: '17:15',
        title: 'Farewell Refreshments',
        type: 'networking',
        room: 'Exhibition Area',
    },
]

// ────────────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────────────

export function getTrackById(id: string): AttdTrack | undefined {
    return ATTD_2026_TRACKS.find((t) => t.id === id)
}

export function getSessionById(id: string): AttdSession | undefined {
    return ATTD_2026_SESSIONS.find((s) => s.id === id)
}

export function getSessionsByTrack(trackId: string): AttdSession[] {
    return ATTD_2026_SESSIONS.filter((s) => s.trackId === trackId).sort(
        (a, b) =>
            (a.date + a.startTime).localeCompare(b.date + b.startTime),
    )
}

export function getSessionsByDay(date: string): AttdSession[] {
    return ATTD_2026_SESSIONS.filter((s) => s.date === date).sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
    )
}

export function getDayKey(date: string): string {
    return ATTD_2026_DAYS.find((d) => d.date === date)?.key ?? '?'
}

export function getDayLabel(date: string): string {
    return ATTD_2026_DAYS.find((d) => d.date === date)?.label ?? date
}

/** "Upcoming" / "Live (Day N)" / "Past event" relative to today. */
export function getConferenceLiveStatus(today: Date = new Date()): {
    state: 'upcoming' | 'live' | 'past'
    label: string
    dayKey?: string
} {
    const todayIso = today.toISOString().slice(0, 10)
    if (todayIso < ATTD_2026_META.startDate) {
        const start = new Date(ATTD_2026_META.startDate)
        const days = Math.ceil((start.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
        return { state: 'upcoming', label: days <= 60 ? `${days} day${days === 1 ? '' : 's'} to go` : 'Upcoming' }
    }
    if (todayIso > ATTD_2026_META.endDate) {
        return { state: 'past', label: 'Past event · archive available' }
    }
    const day = ATTD_2026_DAYS.find((d) => d.date === todayIso)
    return { state: 'live', label: `Live now · ${day?.label ?? 'in session'}`, dayKey: day?.key }
}
