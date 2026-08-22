"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Menu } from "lucide-react"
import { useState } from "react"

const NAV_LINKS: { href: string; label: string; isNew?: boolean }[] = [
    { href: "/lectures", label: "Lectures" },
    { href: "/ada-2026", label: "2026 ADA" },
    { href: "/diabetes-ai", label: "糖尿病 AI" },
    { href: "/aoce-2026", label: "AOCE2026" },
    { href: "/attd-2026", label: "ATTD2026" },
    { href: "/ada2026", label: "ADA2026" },
    { href: "/endo-2026", label: "ENDO2026", isNew: true },
    { href: "/about", label: "About" },
]
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

function UserMenu() {
    const { data: session, status } = useSession()

    if (status === "loading") return null
    if (!session?.user) return null

    const name = session.user.name || session.user.email || "Account"
    const initials = name.slice(0, 2).toUpperCase()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                        {session.user.image ? <AvatarImage src={session.user.image} alt={name} /> : null}
                        <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                    <div className="text-sm font-medium">{session.user.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{session.user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {session.user.role === "admin" ? (
                    <DropdownMenuItem asChild>
                        <Link href="/admin">Admin</Link>
                    </DropdownMenuItem>
                ) : null}
                <DropdownMenuItem onSelect={() => signOut({ callbackUrl: "/" })}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function MobileNav() {
    return (
        <div className="md:hidden">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-1 -ml-2" aria-label="Open menu">
                        <Menu className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                    {NAV_LINKS.map((l) => (
                        <DropdownMenuItem key={l.href} asChild>
                            <Link href={l.href} className={l.isNew ? "font-semibold text-rose-600" : undefined}>
                                {l.label}
                                {l.isNew && (
                                    <span className="ml-2 inline-flex items-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                                        New
                                    </span>
                                )}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export function Navbar() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState("")

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (searchQuery.trim()) {
                router.push(`/lectures?search=${encodeURIComponent(searchQuery.trim())}`)
            } else {
                router.push('/lectures')
            }
        }
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-2 flex items-center md:mr-4">
                    {/* Mobile: hamburger menu holding the nav links */}
                    <MobileNav />
                    <Link href="/" className="mr-4 flex items-center space-x-2 md:mr-6">
                        <span className="font-bold text-primary text-lg">
                            MedNote AI
                        </span>
                    </Link>
                    {/* Desktop: inline links (collapse below md to avoid overflow) */}
                    <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
                        {NAV_LINKS.map((l) =>
                            l.isNew ? (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="relative inline-flex items-center gap-1.5 transition-colors text-rose-600 hover:text-rose-700 font-semibold"
                                >
                                    {l.label}
                                    <span className="inline-flex items-center rounded-full bg-rose-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm animate-pulse motion-reduce:animate-none">
                                        New
                                    </span>
                                </Link>
                            ) : (
                                <Link
                                    key={l.href}
                                    href={l.href}
                                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                                >
                                    {l.label}
                                </Link>
                            ),
                        )}
                    </nav>
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search lectures..."
                                className="pl-8 w-full md:w-[300px]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                        </div>
                    </div>
                    <nav className="flex items-center gap-2">
                        <UserMenu />
                    </nav>
                </div>
            </div>
        </header>
    )
}
