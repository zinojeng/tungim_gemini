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
import { Search } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"

function UserMenu() {
    const { data: session, status } = useSession()

    if (status === "loading") {
        return <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
    }

    if (!session?.user) {
        return (
            <div className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/login">Log in</Link>
                </Button>
                <Button asChild size="sm">
                    <Link href="/register">Sign up</Link>
                </Button>
            </div>
        )
    }

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
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-primary text-lg">
                            MedNote AI
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/lectures" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Lectures
                        </Link>
                        <Link href="/ada-2026" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            2026 ADA
                        </Link>
                        <Link href="/diabetes-ai" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            糖尿病 AI
                        </Link>
                        <Link href="/aoce-2026" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            AOCE2026
                        </Link>
                        <Link href="/attd-2026" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            ATTD2026
                        </Link>
                        <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            About
                        </Link>
                    </nav>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
