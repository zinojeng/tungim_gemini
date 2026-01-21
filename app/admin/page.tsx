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
import { Trash2, Plus, Pencil, Lock, Wand2, Loader2, Upload, Settings, Download } from "lucide-react"
import { Lecture } from "@/types"
import mammoth from "mammoth"
import TurndownService from "turndown"
import { gfm } from "turndown-plugin-gfm"

const CATEGORIES = [
    "Internal Medicine",
    "Diabetes",
    "Endocrinology",
    "2026 ADA",
    "Diabetes AI",
    "Other"
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
    const [subcategory, setSubcategory] = useState("") // Added subcategory state
    const [tags, setTags] = useState("") // Added tags state (comma separated)
    const [customCategory, setCustomCategory] = useState("")
    const [isCustomCategory, setIsCustomCategory] = useState(false)
    const [url, setUrl] = useState("")
    const [coverImage, setCoverImage] = useState("")
    const [pdfUrl, setPdfUrl] = useState("") // Added PDF state
    const [title, setTitle] = useState("")
    const [transcript, setTranscript] = useState("")
    const [summary, setSummary] = useState("")
    const [slides, setSlides] = useState<{ imageUrl: string, timestampSeconds: number }[]>([])
    const [isPublished, setIsPublished] = useState(true)

    // Edit States
    const [editingLecture, setEditingLecture] = useState<Lecture | null>(null)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editCategory, setEditCategory] = useState("")
    const [editSubcategory, setEditSubcategory] = useState("") // Added edit subcategory state
    const [editTags, setEditTags] = useState("") // Added edit tags state
    const [editCustomCategory, setEditCustomCategory] = useState("")
    const [isEditCustomCategory, setIsEditCustomCategory] = useState(false)
    const [editProvider, setEditProvider] = useState("")
    const [editCoverImage, setEditCoverImage] = useState("")
    const [editPdfUrl, setEditPdfUrl] = useState("") // Added edit PDF state
    const [editTranscript, setEditTranscript] = useState("")
    const [editSummary, setEditSummary] = useState("")
    const [editSlides, setEditSlides] = useState<{ imageUrl: string, timestampSeconds: number }[]>([])
    const [editIsPublished, setEditIsPublished] = useState(true)

    // AI Generation State
    const [isGenerating, setIsGenerating] = useState(false)
    const [promptTemplate, setPromptTemplate] = useState("infographic")
    const [editPromptTemplate, setEditPromptTemplate] = useState("infographic")
    const [customPrompt, setCustomPrompt] = useState("")
    const [editCustomPrompt, setEditCustomPrompt] = useState("")

    // File Upload State
    const [isUploading, setIsUploading] = useState(false)

    // Site Settings State
    const [heroTitle, setHeroTitle] = useState("")
    const [heroDescription, setHeroDescription] = useState("")
    const [aboutContent, setAboutContent] = useState("")
    const [ada2026Content, setAda2026Content] = useState("") // Added ADA content state
    const [diabetesAiContent, setDiabetesAiContent] = useState("") // Added Diabetes AI content state
    const [isSavingSettings, setIsSavingSettings] = useState(false)

    const handleExport = async () => {
        try {
            const response = await fetch('/api/admin/export')
            if (!response.ok) throw new Error('Export failed')

            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `imwebsite-backup-${new Date().toISOString().split('T')[0]}.json`
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)
        } catch (error) {
            console.error('Export error:', error)
            alert('Failed to export data')
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        try {
            const arrayBuffer = await file.arrayBuffer()
            const result = await mammoth.convertToHtml({ arrayBuffer })
            const turndownService = new TurndownService()
            turndownService.use(gfm)
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

    // Batch Upload Handler
    const handleBatchUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
        const files = e.target.files
        if (!files || files.length === 0) return

        setIsUploading(true)

        // Helper to extract time from filename (HH:MM:SS or HH-MM-SS or HH.MM.SS)
        const extractTime = (filename: string): number | null => {
            // Regex to exclude space as separator to avoid matching "Slide 1 10..." as "1:10"
            const timeRegex = /(?:^|\D)(\d{1,2})[:.\-_](\d{2})(?:[:.\-_](\d{2}))?(?:\D|$)/;
            const match = filename.match(timeRegex);
            if (match) {
                const hours = parseInt(match[1], 10);
                const minutes = parseInt(match[2], 10);
                const seconds = match[3] ? parseInt(match[3], 10) : 0;

                // Validate time components
                if (hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60 && seconds >= 0 && seconds < 60) {
                    return hours * 3600 + minutes * 60 + seconds;
                }
            }
            return null;
        }

        // Convert FileList to Array and Sort
        const fileArray = Array.from(files).sort((a, b) => {
            const timeA = extractTime(a.name);
            const timeB = extractTime(b.name);

            // If both have time, sort by time first (Ascending: Smallest time first)
            if (timeA !== null && timeB !== null) {
                if (timeA !== timeB) return timeA - timeB;
            }

            // Fallback to natural sort order for filenames (Ascending: A before Z)
            return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
        });

        const formData = new FormData()
        fileArray.forEach(file => {
            formData.append("files", file)
        })

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) {
                const text = await res.text();
                let errorMsg = "Upload failed";
                try {
                    const errorData = JSON.parse(text);
                    errorMsg = errorData.error || errorMsg;
                } catch (e) {
                    console.error("Upload failed with non-JSON response:", text);
                    errorMsg = `Upload failed: ${res.status} ${res.statusText}`;
                }
                throw new Error(errorMsg);
            }

            const data = await res.json()
            const newSlides = data.urls.map((url: string) => ({
                imageUrl: url,
                timestampSeconds: 0
            }))

            if (isEdit) {
                setEditSlides((prev) => [...prev, ...newSlides])
            } else {
                setSlides((prev) => [...prev, ...newSlides])
            }
        } catch (error: any) {
            console.error("Batch upload error:", error)
            alert(`Failed to upload images: ${error.message}`)
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    // Content Image Upload Handler
    const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("files", file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) throw new Error('Upload failed')

            const data = await res.json()
            const imageUrl = data.urls[0]
            const markdownImage = `\n![Image](${imageUrl})\n`

            const textareaId = isEdit ? 'edit-summary' : 'summary';
            const textarea = document.getElementById(textareaId) as HTMLTextAreaElement;

            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const currentContent = isEdit ? editSummary : summary;

                const newContent = currentContent.substring(0, start) + markdownImage + currentContent.substring(end);

                if (isEdit) {
                    setEditSummary(newContent);
                } else {
                    setSummary(newContent);
                }

                // Restore cursor position after update (optional but nice)
                // We need to wait for react to re-render, but for now just setting state is enough.
                // If we wanted to be perfect we'd use a useEffect or requestAnimationFrame but that might be overkill for this simple fix.
            } else {
                // Fallback to append if textarea not found
                if (isEdit) {
                    setEditSummary((prev) => prev + markdownImage)
                } else {
                    setSummary((prev) => prev + markdownImage)
                }
            }

        } catch (error) {
            console.error("Content image upload error:", error)
            alert("Failed to upload image")
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    // Cover Image Upload Handler
    const handleCoverImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("files", file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) throw new Error('Upload failed')

            const data = await res.json()
            const imageUrl = data.urls[0]

            if (isEdit) {
                setEditCoverImage(imageUrl)
            } else {
                setCoverImage(imageUrl)
            }
        } catch (error) {
            console.error("Cover image upload error:", error)
            alert("Failed to upload cover image")
        } finally {
            setIsUploading(false)
            e.target.value = ""
        }
    }

    // PDF Upload Handler
    const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>, isEdit: boolean) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        const formData = new FormData()
        formData.append("files", file)

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            })

            if (!res.ok) throw new Error('Upload failed')

            const data = await res.json()
            const pdfUrl = data.urls[0]

            if (isEdit) {
                setEditPdfUrl(pdfUrl)
            } else {
                setPdfUrl(pdfUrl)
            }
        } catch (error) {
            console.error("PDF upload error:", error)
            alert("Failed to upload PDF")
        } finally {
            setIsUploading(false)
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

    // Fetch Site Settings
    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings')
            if (res.ok) {
                const data = await res.json()
                setHeroTitle(data.hero_title || "")
                setHeroDescription(data.hero_description || "")
                setAboutContent(data.about_content || "")
                setAda2026Content(data.ada_2026_content || "")
                setDiabetesAiContent(data.diabetes_ai_content || "")
            }
        } catch (error) {
            console.error('Error fetching settings:', error)
        }
    }

    // Save Site Settings
    const handleSaveSettings = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSavingSettings(true)
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    hero_title: heroTitle,
                    hero_description: heroDescription,
                    about_content: aboutContent,
                    ada_2026_content: ada2026Content,
                    diabetes_ai_content: diabetesAiContent
                })
            })

            if (!res.ok) throw new Error('Failed to save settings')
            alert('Settings saved successfully!')
        } catch (error) {
            console.error('Error saving settings:', error)
            alert('Failed to save settings')
        } finally {
            setIsSavingSettings(false)
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

                setEditSubcategory(lecture.subcategory || "") // Set subcategory
                setEditTags(lecture.tags ? lecture.tags.join(", ") : "") // Set tags (join array)

                setEditProvider(lecture.provider || '')
                setEditCoverImage(data.coverImage || '')
                setEditPdfUrl(data.pdfUrl || '') // Set PDF URL
                setEditTranscript(data.transcript || '')
                setEditSummary(data.summary || '')
                setEditSummary(data.summary || '')
                setEditSlides(data.slides || [])
                setEditIsPublished(lecture.isPublished ?? true)
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
            if (isAuthenticated) {
                fetchLectures()
                fetchSettings()
            }
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
            // 1. Generate Image (returns base64 data URI)
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
            const base64DataUri = data.url; // This is currently a data URI: "data:image/png;base64,..."

            // 2. Convert Base64 Data URI to Blob
            const fetchResponse = await fetch(base64DataUri);
            const blob = await fetchResponse.blob();
            const file = new File([blob], "generated-cover.png", { type: "image/png" });

            // 3. Upload to S3
            const formData = new FormData();
            formData.append("files", file);

            const uploadRes = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!uploadRes.ok) {
                throw new Error("Failed to upload generated image to storage");
            }

            const uploadData = await uploadRes.json();
            const publicUrl = uploadData.urls[0];

            // 4. Save URL
            if (isEdit) {
                setEditCoverImage(publicUrl);
            } else {
                setCoverImage(publicUrl);
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
                    subcategory, // Add subcategory
                    tags: tags.split(",").map(t => t.trim()).filter(t => t), // Process tags
                    coverImage,
                    pdfUrl, // Added pdfUrl
                    summary,
                    provider: 'Manual Import',
                    slides: slides,
                    isPublished
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
            setTranscript("")
            setSummary("")
            setCoverImage("")
            setPdfUrl("") // Reset PDF URL
            setSlides([])
            setCategory("Internal Medicine")
            setIsCustomCategory(false)
            setCustomCategory("")
            setSubcategory("") // Reset subcategory
            setTags("") // Reset tags
            setIsPublished(true) // Reset published status
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
                    slides: editSlides,
                    category: finalCategory,
                    subcategory: editSubcategory,
                    tags: editTags.split(",").map(t => t.trim()).filter(t => t),
                    coverImage: editCoverImage,
                    transcript: editTranscript,
                    summary: editSummary,
                    pdfUrl: editPdfUrl,
                    isPublished: editIsPublished
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
        <div className="container py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <Button variant="outline" onClick={handleExport}>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                </Button>
            </div>
            <Button variant="outline" onClick={handleLogout}>
                Logout
            </Button>

            <Tabs defaultValue="create" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="create">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Lecture
                    </TabsTrigger>
                    <TabsTrigger value="manage">
                        <Pencil className="h-4 w-4 mr-2" />
                        Manage Lectures
                    </TabsTrigger>
                    <TabsTrigger value="settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Site Settings
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

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="subcategory">Subcategory</Label>
                                            <Input
                                                id="subcategory"
                                                placeholder="e.g., SGLT2i, GLP-1"
                                                value={subcategory}
                                                onChange={(e) => setSubcategory(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="tags">Tags (comma separated)</Label>
                                            <Input
                                                id="tags"
                                                placeholder="e.g., ADA, EASD, 2025"
                                                value={tags}
                                                onChange={(e) => setTags(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="pdfUrl">PDF URL (Optional)</Label>
                                        <div className="flex gap-2">
                                            <Input
                                                id="pdfUrl"
                                                value={pdfUrl}
                                                onChange={(e) => setPdfUrl(e.target.value)}
                                                className="flex-1"
                                                placeholder="https://..."
                                            />
                                            <Input
                                                type="file"
                                                accept="application/pdf"
                                                className="hidden"
                                                id="pdf-upload"
                                                onChange={(e) => handlePdfUpload(e, false)}
                                                disabled={isUploading}
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                onClick={() => document.getElementById('pdf-upload')?.click()}
                                                disabled={isUploading}
                                                title="Upload PDF"
                                            >
                                                {isUploading ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Upload className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>Status</Label>
                                        <Select
                                            value={isPublished ? "published" : "draft"}
                                            onValueChange={(val) => setIsPublished(val === "published")}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="published">Published</SelectItem>
                                                <SelectItem value="draft">Draft (Hidden)</SelectItem>
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
                                                    <SelectItem value="running_doctor">🏃‍♀️ 數位醫療效率 (Nanobanana)</SelectItem>
                                                    <SelectItem value="corporate_minimalist">🏢 企業簡約風格 (Nanobanana)</SelectItem>
                                                    <SelectItem value="remote_laptop">💻 遠端互動與學習 (原型)</SelectItem>
                                                    <SelectItem value="remote_laptop_v1">💻 遠端互動與學習 (專注藍) - V1</SelectItem>
                                                    <SelectItem value="remote_laptop_v2">💻 遠端互動與學習 (創意暖) - V2</SelectItem>
                                                    <SelectItem value="remote_laptop_v3">💻 遠端互動與學習 (自然綠) - V3</SelectItem>
                                                    <SelectItem value="editorial_cutout">✂️ 剪紙插畫風格 (Editorial Cutout)</SelectItem>
                                                    <SelectItem value="eco_growth">🌿 自然與成長 (Nanobanana)</SelectItem>
                                                    <SelectItem value="tech_innovation">🧬 創新與未來 (Nanobanana)</SelectItem>
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
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    id="cover-image-upload"
                                                    onChange={(e) => handleCoverImageUpload(e, false)}
                                                    disabled={isUploading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => document.getElementById('cover-image-upload')?.click()}
                                                    disabled={isUploading}
                                                    title="Upload Image"
                                                >
                                                    {isUploading ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Upload className="h-4 w-4" />
                                                    )}
                                                </Button>
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
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="content-image-upload"
                                                        onChange={(e) => handleContentImageUpload(e, false)}
                                                        disabled={isUploading}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => document.getElementById('content-image-upload')?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        <Upload className="h-4 w-4 mr-2" />
                                                        Insert Image
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

                                        <div className="space-y-2">
                                            <Label>Slides (Image URLs)</Label>
                                            <div className="space-y-2">
                                                {slides.map((slide, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <Input
                                                            placeholder="Image URL"
                                                            value={slide.imageUrl}
                                                            onChange={(e) => {
                                                                const newSlides = [...slides];
                                                                newSlides[index].imageUrl = e.target.value;
                                                                setSlides(newSlides);
                                                            }}
                                                        />
                                                        <Input
                                                            type="number"
                                                            placeholder="Time (s)"
                                                            className="w-24"
                                                            value={slide.timestampSeconds}
                                                            onChange={(e) => {
                                                                const newSlides = [...slides];
                                                                newSlides[index].timestampSeconds = parseInt(e.target.value) || 0;
                                                                setSlides(newSlides);
                                                            }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="icon"
                                                            onClick={() => {
                                                                const newSlides = slides.filter((_, i) => i !== index);
                                                                setSlides(newSlides);
                                                            }}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() => setSlides([...slides, { imageUrl: "", timestampSeconds: 0 }])}
                                                >
                                                    <Plus className="h-4 w-4 mr-2" /> Add Slide
                                                </Button>
                                                <div className="relative inline-block">
                                                    <Input
                                                        type="file"
                                                        multiple
                                                        accept="image/*"
                                                        className="hidden"
                                                        id="batch-upload"
                                                        onChange={(e) => handleBatchUpload(e, false)}
                                                        disabled={isUploading}
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="secondary"
                                                        onClick={() => document.getElementById('batch-upload')?.click()}
                                                        disabled={isUploading}
                                                    >
                                                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                                                        Batch Upload
                                                    </Button>
                                                </div>
                                            </div>
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
                                            <TableHead>Published</TableHead>
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
                                                    <Badge variant={lecture.isPublished ? 'default' : 'secondary'}>
                                                        {lecture.isPublished ? 'Published' : 'Draft'}
                                                    </Badge>
                                                </TableCell>
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
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleDelete(lecture.id)}>Delete</AlertDialogAction>
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

                <TabsContent value="settings">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site Settings</CardTitle>
                            <CardDescription>
                                Edit homepage hero text and about page content.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSaveSettings} className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">Homepage Hero</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="heroTitle">Hero Title</Label>
                                        <Input
                                            id="heroTitle"
                                            value={heroTitle}
                                            onChange={(e) => setHeroTitle(e.target.value)}
                                            placeholder="Master Medical Knowledge in Minutes"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="heroDescription">Hero Description</Label>
                                        <Textarea
                                            id="heroDescription"
                                            value={heroDescription}
                                            onChange={(e) => setHeroDescription(e.target.value)}
                                            placeholder="AI-powered summaries, slides, and transcripts..."
                                            className="min-h-[100px]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium">About Page</h3>
                                    <div className="space-y-2">
                                        <Label htmlFor="aboutContent">About Content (Markdown)</Label>
                                        <Textarea
                                            id="about"
                                            rows={10}
                                            value={aboutContent}
                                            onChange={(e) => setAboutContent(e.target.value)}
                                            placeholder="Enter markdown content for About page..."
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Supports Markdown syntax.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="ada2026">2026 ADA Content (Markdown)</Label>
                                        <Textarea
                                            id="ada2026"
                                            rows={10}
                                            value={ada2026Content}
                                            onChange={(e) => setAda2026Content(e.target.value)}
                                            placeholder="Enter markdown content for 2026 ADA page..."
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Supports Markdown syntax.
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="diabetesAi">Diabetes AI Content (Markdown)</Label>
                                        <Textarea
                                            id="diabetesAi"
                                            rows={10}
                                            value={diabetesAiContent}
                                            onChange={(e) => setDiabetesAiContent(e.target.value)}
                                            placeholder="Enter markdown content for Diabetes AI page..."
                                        />
                                        <p className="text-sm text-muted-foreground">
                                            Supports Markdown syntax.
                                        </p>
                                    </div>
                                </div>
                                <Button type="submit" disabled={isSavingSettings}>
                                    {isSavingSettings ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Settings"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

            </Tabs >

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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-subcategory">Subcategory</Label>
                                <Input
                                    id="edit-subcategory"
                                    placeholder="e.g., SGLT2i, GLP-1"
                                    value={editSubcategory}
                                    onChange={(e) => setEditSubcategory(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-tags">Tags (comma separated)</Label>
                                <Input
                                    id="edit-tags"
                                    placeholder="e.g., ADA, EASD, 2025"
                                    value={editTags}
                                    onChange={(e) => setEditTags(e.target.value)}
                                />
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
                                    <SelectItem value="running_doctor">🏃‍♀️ 數位醫療效率 (Nanobanana)</SelectItem>
                                    <SelectItem value="corporate_minimalist">🏢 企業簡約風格 (Nanobanana)</SelectItem>
                                    <SelectItem value="remote_laptop">💻 遠端互動與學習 (原型)</SelectItem>
                                    <SelectItem value="remote_laptop_v1">💻 遠端互動與學習 (專注藍) - V1</SelectItem>
                                    <SelectItem value="remote_laptop_v2">💻 遠端互動與學習 (創意暖) - V2</SelectItem>
                                    <SelectItem value="remote_laptop_v3">💻 遠端互動與學習 (自然綠) - V3</SelectItem>
                                    <SelectItem value="editorial_cutout">✂️ 剪紙插畫風格 (Editorial Cutout)</SelectItem>
                                    <SelectItem value="eco_growth">🌿 自然與成長 (Nanobanana)</SelectItem>
                                    <SelectItem value="tech_innovation">🧬 創新與未來 (Nanobanana)</SelectItem>
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
                            <Label htmlFor="editCoverImage">Cover Image URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="editCoverImage"
                                    value={editCoverImage}
                                    onChange={(e) => setEditCoverImage(e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="edit-cover-image-upload"
                                    onChange={(e) => handleCoverImageUpload(e, true)}
                                    disabled={isUploading}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => document.getElementById('edit-cover-image-upload')?.click()}
                                    disabled={isUploading}
                                    title="Upload Image"
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="h-4 w-4" />
                                    )}
                                </Button>
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
                                    Generate AI Cover
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
                            <Label htmlFor="edit-pdfUrl">PDF URL</Label>
                            <div className="flex gap-2">
                                <Input
                                    id="edit-pdfUrl"
                                    value={editPdfUrl}
                                    onChange={(e) => setEditPdfUrl(e.target.value)}
                                    className="flex-1"
                                />
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    id="edit-pdf-upload"
                                    onChange={(e) => handlePdfUpload(e, true)}
                                    disabled={isUploading}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={() => document.getElementById('edit-pdf-upload')?.click()}
                                    disabled={isUploading}
                                    title="Upload PDF"
                                >
                                    {isUploading ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Upload className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
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
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="edit-content-image-upload"
                                        onChange={(e) => handleContentImageUpload(e, true)}
                                        disabled={isUploading}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => document.getElementById('edit-content-image-upload')?.click()}
                                        disabled={isUploading}
                                    >
                                        <Upload className="h-4 w-4 mr-2" />
                                        Insert Image
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
                        <div className="space-y-2">
                            <Label>Slides (Image URLs)</Label>
                            <div className="space-y-2">
                                {editSlides.map((slide, index) => (
                                    <div key={index} className="flex gap-2">
                                        <Input
                                            placeholder="Image URL"
                                            value={slide.imageUrl}
                                            onChange={(e) => {
                                                const newSlides = [...editSlides];
                                                newSlides[index].imageUrl = e.target.value;
                                                setEditSlides(newSlides);
                                            }}
                                        />
                                        <Input
                                            type="number"
                                            placeholder="Time (s)"
                                            className="w-24"
                                            value={slide.timestampSeconds}
                                            onChange={(e) => {
                                                const newSlides = [...editSlides];
                                                newSlides[index].timestampSeconds = parseInt(e.target.value) || 0;
                                                setEditSlides(newSlides);
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => {
                                                const newSlides = editSlides.filter((_, i) => i !== index);
                                                setEditSlides(newSlides);
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setEditSlides([...editSlides, { imageUrl: "", timestampSeconds: 0 }])}
                                >
                                    <Plus className="h-4 w-4 mr-2" /> Add Slide
                                </Button>
                                <div className="relative inline-block">
                                    <Input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        className="hidden"
                                        id="edit-batch-upload"
                                        onChange={(e) => handleBatchUpload(e, true)}
                                        disabled={isUploading}
                                    />
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        onClick={() => document.getElementById('edit-batch-upload')?.click()}
                                        disabled={isUploading}
                                    >
                                        {isUploading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
                                        Batch Upload
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <Select
                                value={editIsPublished ? "published" : "draft"}
                                onValueChange={(val) => setEditIsPublished(val === "published")}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="published">Published</SelectItem>
                                    <SelectItem value="draft">Draft (Hidden)</SelectItem>
                                </SelectContent>
                            </Select>
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
        </div >
    )
}
