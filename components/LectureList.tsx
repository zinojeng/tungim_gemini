"use client"

import { useState, useMemo } from "react"
import { Lecture } from "@/types"
import { LectureCard } from "@/components/LectureCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LectureListProps {
    initialLectures: Lecture[]
}

const CATEGORIES = [
    "All",
    "Internal Medicine",
    "Diabetes",
    "Endocrinology",
    "Other"
]

export function LectureList({ initialLectures }: LectureListProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Filter lectures
    const filteredLectures = useMemo(() => {
        return initialLectures.filter(lecture => {
            // Search filter
            const matchesSearch = (
                lecture.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lecture.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lecture.subcategory?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lecture.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
            )

            // Category filter
            const matchesCategory = selectedCategory === "All" || lecture.category === selectedCategory

            return matchesSearch && matchesCategory
        })
    }, [initialLectures, searchQuery, selectedCategory])

    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {/* Search Input */}
                <div className="relative max-w-md mx-auto md:mx-0">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search lectures..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Category Tabs */}
                <Tabs defaultValue="All" value={selectedCategory} onValueChange={setSelectedCategory} className="w-full overflow-x-auto">
                    <TabsList className="w-full justify-start md:w-auto h-auto p-1 flex-wrap">
                        {CATEGORIES.map(category => (
                            <TabsTrigger key={category} value={category} className="px-4 py-2">
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>

            {/* Results Grid */}
            {filteredLectures.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No lectures found matching your criteria.</p>
                    <Button
                        variant="link"
                        onClick={() => {
                            setSearchQuery("")
                            setSelectedCategory("All")
                        }}
                    >
                        Clear all filters
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredLectures.map((lecture) => (
                        <LectureCard key={lecture.id} lecture={lecture} />
                    ))}
                </div>
            )}
        </div>
    )
}
