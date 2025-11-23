"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export default function AdminPage() {
    const [url, setUrl] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            alert("Processing started for: " + url)
            setUrl("")
        }, 1000)
    }

    return (
        <div className="container py-10 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Add New Lecture</CardTitle>
                    <CardDescription>
                        Enter a YouTube URL or upload a video file to start the AI processing pipeline.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="url">YouTube URL</Label>
                            <Input
                                id="url"
                                placeholder="https://www.youtube.com/watch?v=..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or upload file
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">Video/Audio File</Label>
                            <Input id="file" type="file" accept="video/*,audio/*" />
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Processing..." : "Start Processing"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
