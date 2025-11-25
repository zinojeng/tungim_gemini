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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Trash2, Plus, Pencil, Lock, Wand2, Loader2, Upload } from "lucide-react"
import { Lecture } from "@/types"
import mammoth from "mammoth"
import TurndownService from "turndown"

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
    // Hydration safety
    const [isMounted, setIsMounted] = useState(false)

    // Authentication
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState("")
    const [authError, setAuthError] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [lectures, setLectures] = useState<Lecture[]>([])
    const [isLoadingLectures, setIsLoadingLectures] = useState(true)

    // Form States
    const [category, setCategory] = useState("Internal Medicine")
    const [customCategory, setCustomCategory] = useState("")
    const [isCustomCategory, setIsCustomCategory] = useState(false)
    const [url, setUrl] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [title, setTitle] = useState("")
    const [transcript, setTranscript] = useState("")
    const [summary, setSummary] = useState("")

    // Edit States
    const [editingLecture, setEditingLecture] = useState<Lecture | null>(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editCustomCategory, setEditCustomCategory] = useState("")
    const [isEditCustomCategory, setIsEditCustomCategory] = useState(false)
    const [editProvider, setEditProvider] = useState("")
    const [editCoverImage, setEditCoverImage] = useState("")
    const [editTranscript, setEditTranscript] = useState("")
    const [editSummary, setEditSummary] = useState("")

    // AI Generation State
    const [isGenerating, setIsGenerating] = useState(false)
    const [promptTemplate, setPromptTemplate] = useState("infographic")
    const [editPromptTemplate, setEditPromptTemplate] = useState("infographic")
    const [customPrompt, setCustomPrompt] = useState("")
    const [editCustomPrompt, setEditCustomPrompt] = useState("")

    // File Upload State
    const [isUploading, setIsUploading] = useState(false)

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const result = await mammoth.convertToHtml({ arrayBuffer })
            const turndownService = new TurndownService()
            const markdown = turndownService.turndown(result.value)

            if (isEdit) {
                setEditSummary(markdown)
            } else {
                setSummary(markdown)
            }
        } catch (error) {
            console.error("Error parsing file:", error)
            alert("Failed to parse .docx file")
        } finally {
            setIsUploading(false)
            // Reset input
            e.target.value = ""
        }
    }

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

    // Fetch lecture details for editing
    const fetchLectureDetails = async (id: string) => {
        try {
            const res = await fetch(`/api/lectures/${id}`)
            if (!res.ok) throw new Error('Failed to fetch lecture details')

            const data = await res.json()
            const lecture = lectures.find(l => l.id === id)

            if (lecture) {
                setEditingLecture(lecture)
                setEditTitle(lecture.title || '')

                // Handle custom category
                if (lecture.category && !CATEGORIES.includes(lecture.category)) {
                    setEditCategory("Custom")
                    setEditCustomCategory(lecture.category)
                    setIsEditCustomCategory(true)
                } else {
                    setEditCategory(lecture.category || 'General')
                    setIsEditCustomCategory(false)
                    setEditCustomCategory("")
                }

                setEditProvider(lecture.provider || '')
                setEditCoverImage(data.coverImage || '')
                setEditTranscript(data.transcript || '')
                setEditSummary(data.summary || '')
                setEditDialogOpen(true)
            }
        } catch (error) {
            console.error('Error fetching lecture details:', error)
            alert('Failed to load lecture details')
        }
    }

    // Check if already authenticated in session
    useEffect(() => {
        setIsMounted(true)
        if (typeof window !== 'undefined') {
            try {
                const auth = sessionStorage.getItem('admin_auth')
                if (auth === 'true') {
                    setIsAuthenticated(true)
                }
            } catch (e) {
                console.error("Session storage error:", e)
            }
        }
    }, [])

    // Fetch lectures when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            fetchLectures()
        }
    }, [isAuthenticated])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            })

            if (res.ok) {
                setIsAuthenticated(true)
                if (typeof window !== 'undefined') {
                    try {
                        sessionStorage.setItem('admin_auth', 'true')
                    } catch (e) {
                        console.error("Session storage error:", e)
                    }
                }
                setAuthError("")
            } else {
                setAuthError("密碼錯誤")
            }
        } catch (error) {
            console.error("Login error:", error)
            setAuthError("登入時發生錯誤")
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        if (typeof window !== 'undefined') {
            try {
                sessionStorage.removeItem('admin_auth')
            } catch (e) {
                console.error("Session storage error:", e)
            }
        }
        setPassword("")
    }

    // Generate AI Cover
    const handleGenerateCover = async (isEdit: boolean) => {
        const currentTitle = isEdit ? editTitle : title;
        const currentCategory = isEdit ? (isEditCustomCategory ? editCustomCategory : editCategory) : (isCustomCategory ? customCategory : category);

        if (!currentTitle) {
            alert("Please enter a title first.");
            return;
        }

        setIsGenerating(true);
        try {
            const res = await fetch('/api/generate-cover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: currentTitle,
                    category: currentCategory,
                    summary: isEdit ? editSummary : summary,
                    transcript: isEdit ? editTranscript : transcript,
                    promptTemplate: isEdit ? editPromptTemplate : promptTemplate,
                    customPrompt: isEdit ? editCustomPrompt : customPrompt
                })
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Failed to generate image");
            }

            const data = await res.json();
            if (isEdit) {
                setEditCoverImage(data.url);
            } else {
                setCoverImage(data.url);
            }
        } catch (error: any) {
            console.error("Generation error:", error);
            alert("Error generating image: " + error.message);
        } finally {
            setIsGenerating(false);
        }
    };

    // Prevent hydration mismatch
    if (!isMounted) {
        return null
    }

    // If not authenticated, show login form
    if (!isAuthenticated) {
        return (
            <div className="container py-10 max-w-md">
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-center mb-4">
                            <Lock className="h-12 w-12 text-primary" />
                        </div>
                        <CardTitle className="text-center">Admin Login</CardTitle>
                        <CardDescription>
                            請輸入管理員密碼
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                />
                                {authError && (
                                    <p className="text-sm text-destructive">{authError}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        const finalCategory = isCustomCategory ? customCategory : category

        try {
            const res = await fetch('/api/lectures', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url,
                    title,
                    category: finalCategory,
                    coverImage,
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
            setUrl("")
            setTitle("")
            setTranscript("")
            setSummary("")
            setCoverImage("")
            setCategory("Internal Medicine")
            setIsCustomCategory(false)
            setCustomCategory("")
            fetchLectures()
        } catch (error: any) {
            console.error(error)
            alert("Error creating lecture: " + error.message)
        } finally {
            setIsLoading(false)
        }
    }

    const handleEdit = async () => {
        if (!editingLecture) return

        const finalCategory = isEditCustomCategory ? editCustomCategory : editCategory

        try {
            const res = await fetch(`/api/lectures/${editingLecture.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editTitle,
                    category: finalCategory,
                    provider: editProvider,
                    coverImage: editCoverImage,
                    transcript: editTranscript,
                    summary: editSummary,
                })
            })

            if (!res.ok) {
                throw new Error('Failed to update lecture')
            }

            alert("Lecture updated successfully!")
            setEditDialogOpen(false)
            setEditingLecture(null)
            fetchLectures()
        } catch (error) {
            console.error(error)
            alert("Error updating lecture")
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
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button variant="outline" onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            <Tabs defaultValue="create" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Lecture
                    </TabsTrigger>
                    <TabsTrigger value="manage">
                        <Pencil className="h-4 w-4 mr-2" />
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
                                        <div className="flex gap-2">
                                            <Select
                                                value={isCustomCategory ? "Custom" : category}
                                                onValueChange={(val) => {
                                                    if (val === "Custom") {
                                                        setIsCustomCategory(true)
                                                    } else {
                                                        setIsCustomCategory(false)
                                                        setCategory(val)
                                                    }
                                                }}
                                            >
                                                <SelectTrigger className="w-[200px]">
                                                    <SelectValue placeholder="Select category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {CATEGORIES.map(cat => (
                                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                    ))}
                                                    <SelectItem value="Custom">Custom...</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {isCustomCategory && (
                                                <Input
                                                    placeholder="Enter custom category"
                                                    value={customCategory}
                                                    onChange={(e) => setCustomCategory(e.target.value)}
                                                    className="flex-1"
                                                />
                                            )}
                                        </div>
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
                                            <Label htmlFor="promptTemplate">AI Cover Style</Label>
                                            <Select value={promptTemplate} onValueChange={setPromptTemplate}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="infographic">📊 教育插圖 - 純圖示和圖表</SelectItem>
                                                    <SelectItem value="figurine">🎨 寫實公仔 - 醫學概念立體模型</SelectItem>
                                                    <SelectItem value="plush">🧸 絨毛玩具 - 可愛風格</SelectItem>
                                                    <SelectItem value="crochet">🧶 手工鉤織 - 娃娃風格</SelectItem>
                                                    <SelectItem value="character">😊 角色吉祥物 - 友善風格</SelectItem>
                                                    <SelectItem value="custom">✏️ 自訂 Prompt</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {promptTemplate === "custom" && (
                                                <Textarea
                                                    placeholder="輸入您的自訂 prompt..."
                                                    value={customPrompt}
                                                    onChange={(e) => setCustomPrompt(e.target.value)}
                                                    className="mt-2 min-h-[100px] font-mono text-sm"
                                                />
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="coverImage"
                                                    placeholder="https://example.com/image.jpg"
                                                    value={coverImage}
                                                    onChange={(e) => setCoverImage(e.target.value)}
                                                    className="flex-1"
                                                />
                                                <Button
                                                    type="button"
                                                    variant="secondary"
                                                    onClick={() => handleGenerateCover(false)}
                                                    disabled={isGenerating || !title}
                                                >
                                                    {isGenerating ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Wand2 className="h-4 w-4 mr-2" />
                                                    )}
                                                    Generate AI Cover
                                                </Button>
                                            </div>
                                            {coverImage && (
                                                <div className="mt-2 relative aspect-video w-40 rounded-md overflow-hidden border">
                                                    <img src={coverImage} alt="Cover preview" className="object-cover w-full h-full" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <Label htmlFor="summary">Summary / Notes (Markdown)</Label>
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="file"
                                                        accept=".docx"
                                                        className="hidden"
                                                        id="summary-upload"
                                                        onChange={(e) => handleFileUpload(e, false)}
                                                        disabled={isUploading}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => document.getElementById('summary-upload')?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        {isUploading ? (
                                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                        ) : (
                                                            <Upload className="h-4 w-4 mr-2" />
                                                        )}
                                                        Import .docx
                                                    </Button>
                                                </div>
                                            </div>
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
                                View, edit, and delete existing lectures
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
                                                <TableCell className="text-right space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => fetchLectureDetails(lecture.id)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
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

            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Lecture</DialogTitle>
                        <DialogDescription>
                            Update lecture information, transcript, and summary
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                                id="edit-title"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Category</Label>
                            <div className="flex gap-2">
                                <Select
                                    value={isEditCustomCategory ? "Custom" : editCategory}
                                    onValueChange={(val) => {
                                        if (val === "Custom") {
                                            setIsEditCustomCategory(true)
                                        } else {
                                            setIsEditCustomCategory(false)
                                            setEditCategory(val)
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map(cat => (
                                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                        ))}
                                        <SelectItem value="Custom">Custom...</SelectItem>
                                    </SelectContent>
                                </Select>
                                {isEditCustomCategory && (
                                    <Input
                                        placeholder="Enter custom category"
                                        value={editCustomCategory}
                                        onChange={(e) => setEditCustomCategory(e.target.value)}
                                        className="flex-1"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-promptTemplate">AI Cover Style</Label>
                            <Select value={editPromptTemplate} onValueChange={setEditPromptTemplate}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="infographic">📊 教育插圖 - 純圖示和圖表</SelectItem>
                                    <SelectItem value="figurine">🎨 寫實公仔 - 醫學概念立體模型</SelectItem>
                                    <SelectItem value="plush">🧸 絨毛玩具 - 可愛風格</SelectItem>
                                    <SelectItem value="crochet">🧶 手工鉤織 - 娃娃風格</SelectItem>
                                    <SelectItem value="character">😊 角色吉祥物 - 友善風格</SelectItem>
                                    <SelectItem value="custom">✏️ 自訂 Prompt</SelectItem>
                                </SelectContent>
                            </Select>
                            {editPromptTemplate === "custom" && (
                                <Textarea
                                    placeholder="輸入您的自訂 prompt..."
                                    value={editCustomPrompt}
                                    onChange={(e) => setEditCustomPrompt(e.target.value)}
                                    className="mt-2 min-h-[100px] font-mono text-sm"
                                />
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-coverImage">Cover Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="edit-coverImage"
                                    value={editCoverImage}
                                    onChange={(e) => setEditCoverImage(e.target.value)}
                                    placeholder="https://example.com/image.jpg"
                                    className="flex-1"
                                />
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => handleGenerateCover(true)}
                                    disabled={isGenerating || !editTitle}
                                >
                                    {isGenerating ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Wand2 className="h-4 w-4 mr-2" />
                                    )}
                                    Generate
                                </Button>
                            </div>
                            {editCoverImage && (
                                <div className="mt-2 relative aspect-video w-40 rounded-md overflow-hidden border">
                                    <img src={editCoverImage} alt="Cover preview" className="object-cover w-full h-full" />
                                </div>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-provider">Provider</Label>
                            <Input
                                id="edit-provider"
                                value={editProvider}
                                onChange={(e) => setEditProvider(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="edit-summary">Summary (Markdown)</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="file"
                                        accept=".docx"
                                        className="hidden"
                                        id="edit-summary-upload"
                                        onChange={(e) => handleFileUpload(e, true)}
                                        disabled={isUploading}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => document.getElementById('edit-summary-upload')?.click()}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            <Upload className="h-4 w-4 mr-2" />
                                        )}
                                        Import .docx
                                    </Button>
                                </div>
                            </div>
                            <Textarea
                                id="edit-summary"
                                className="min-h-[200px] font-mono"
                                value={editSummary}
                                onChange={(e) => setEditSummary(e.target.value)}
                                placeholder="Leave empty to keep existing summary"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-transcript">Transcript</Label>
                            <Textarea
                                id="edit-transcript"
                                className="min-h-[150px]"
                                value={editTranscript}
                                onChange={(e) => setEditTranscript(e.target.value)}
                                placeholder="Leave empty to keep existing transcript"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleEdit}>
                            Save Changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
