import { handlers } from '@/lib/auth'

// bcrypt + postgres-js need the Node.js runtime.
export const runtime = 'nodejs'

export const { GET, POST } = handlers
