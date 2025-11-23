"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Trash2, Plus } from "lucide-react"
import { Lecture } from "@/types"

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
    const [lectures, setLectures] = useState<Lecture[]>([])
    const [isLoadingLectures, setIsLoadingLectures] = useState(true)

    // Form States
    const [category, setCategory] = useState("Internal Medicine")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const [transcript, setTranscript] = useState("")
    const [summary, setSummary] = useState("")

    // Fetch lectures
    const fetchLectures = async () => {
        setIsLoadingLectures(true)
        try {
            const res = await fetch('/api/lectures')
            if (res.ok) {
                const data = await res.json()
                setLectures(data)
            }
        } catch (error) {
            console.error('Error fetching lectures:', error)
        } finally {
            setIsLoadingLectures(false)
        }
    }

    useEffect(() => {
        fetchLectures()
    }, [])

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
            // Refresh list
            fetchLectures()
        } catch (error: any) {
            console.error(error)
            alert("Error creating lecture: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/lectures/${id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                throw new Error('Failed to delete lecture')
            }

            alert("Lecture deleted successfully!")
            fetchLectures()
        } catch (error) {
            console.error(error)
            alert("Error deleting lecture")
        }
    }

    return (
        <div className="container py-10 max-w-6xl">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <Tabs defaultValue="create" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Lecture
                    </TabsTrigger>
                    <TabsTrigger value="manage">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Manage Lectures
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="create">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Lecture</CardTitle>
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
                </TabsContent>

                <TabsContent value="manage">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manage Lectures</CardTitle>
                            <CardDescription>
                                View and delete existing lectures
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isLoadingLectures ? (
                                <div className="text-center py-8 text-muted-foreground">Loading...</div>
                            ) : lectures.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No lectures found. Create your first lecture!
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead>Provider</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {lectures.map((lecture) => (
                                            <TableRow key={lecture.id}>
                                                <TableCell className="font-medium">{lecture.title}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{lecture.category || 'N/A'}</Badge>
                                                </TableCell>
                                                <TableCell>{lecture.provider || 'N/A'}</TableCell>
                                                <TableCell>
                                                    <Badge variant={lecture.status === 'completed' ? 'default' : 'outline'}>
                                                        {lecture.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="destructive" size="sm">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>確定要刪除嗎？</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    此操作無法復原。這將永久刪除此 Lecture 及其相關資料（逐字稿、摘要等）。
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>取消</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(lecture.id)}>
                                                                    確定刪除
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
