import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <span className="hidden font-bold sm:inline-block text-primary text-lg">
                            MediNote AI
                        </span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        <Link href="/lectures" className="transition-colors hover:text-foreground/80 text-foreground/60">
                            Lectures
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
                            <Input placeholder="Search lectures..." className="pl-8 w-full md:w-[300px]" />
                        </div>
                    </div>
                    <nav className="flex items-center gap-2">

                        <Button variant="ghost" size="icon">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/nanobanana.png" alt="User" />
                                <AvatarFallback>MD</AvatarFallback>
                            </Avatar>
                        </Button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
