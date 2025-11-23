"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"

const CATEGORIES = [
    "Internal Medicine",
    "Cardiology",
    "Endocrinology",
    "Nephrology",
    "Gastroenterology",
    "Infectious Disease",
    "Pulmonology",
    "Neurology",
    "Oncology",
    "Hematology",
    "Rheumatology",
    "General"
]

export default function AdminPage() {
    const [isLoading, setIsLoading] = useState(false)

    // Form States
    const [category, setCategory] = useState("Internal Medicine")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [transcript, setTranscript] = useState("")
    const [summary, setSummary] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const res = await fetch('/api/lectures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                    title,
                    category,
                    transcript,
                    summary,
                    provider: 'Manual Import'
                })
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || 'Failed to create lecture')
            }

            alert("Lecture created successfully!")
            // Reset form
            setUrl("")
            setTitle("")
            setTranscript("")
            setSummary("")
        } catch (error: any) {
            console.error(error)
            alert("Error creating lecture: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container py-10 max-w-3xl">
            <Card>
                <CardHeader>
                    <CardTitle>Lecture Management</CardTitle>
                    <CardDescription>
                        Import lectures via YouTube URL or manually enter content.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="manual">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="youtube">YouTube Import</TabsTrigger>
                            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                        </TabsList>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Category</Label>
                                <Select value={category} onValueChange={setCategory}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <TabsContent value="youtube" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="url">YouTube URL</Label>
                                    <Input
                                        id="url"
                                        placeholder="https://www.youtube.com/watch?v=..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="manual" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Lecture Title</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., 2024 Diabetes Updates"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="summary">Summary / Notes (Markdown)</Label>
                                    <Textarea
                                        id="summary"
                                        placeholder="# Key Takeaways..."
                                        className="min-h-[200px] font-mono"
                                        value={summary}
                                        onChange={(e) => setSummary(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transcript">Transcript</Label>
                                    <Textarea
                                        id="transcript"
                                        placeholder="Paste full transcript here..."
                                        className="min-h-[150px]"
                                        value={transcript}
                                        onChange={(e) => setTranscript(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="audioUrl">Audio/Video URL (Optional)</Label>
                                    <Input
                                        id="audioUrl"
                                        placeholder="https://..."
                                        value={url}
                                        onChange={(e) => setUrl(e.target.value)}
                                    />
                                </div>
                            </TabsContent>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Processing..." : "Create Lecture"}
                            </Button>
                        </form>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
