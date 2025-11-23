import { AudioPlayer } from "@/components/AudioPlayer"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LecturePage({ params }: { params: { id: string } }) {
    return (
        <div className="flex h-[calc(100vh-3.5rem)] overflow-hidden">
            {/* Sidebar / Outline */}
            <aside className="w-80 border-r bg-muted/10 hidden md:flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="font-semibold">Outline</h2>
                </div>
                <ScrollArea className="flex-1">
                    <div className="p-4 space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Introduction</h3>
                            <Button variant="ghost" className="w-full justify-start h-auto whitespace-normal text-left">
                                00:00 - Opening Remarks
                            </Button>
                            <Button variant="ghost" className="w-full justify-start h-auto whitespace-normal text-left bg-accent">
                                02:15 - Epidemiology of Heart Failure
                            </Button>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-muted-foreground">Main Topics</h3>
                            <Button variant="ghost" className="w-full justify-start h-auto whitespace-normal text-left">
                                15:30 - New Guidelines 2024
                            </Button>
                        </div>
                    </div>
                </ScrollArea>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 overflow-y-auto p-6 pb-24">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div>
                            <Badge className="mb-2">Cardiology</Badge>
                            <h1 className="text-3xl font-bold mb-2">2024 Updates in Heart Failure Management</h1>
                            <p className="text-muted-foreground">Dr. Sarah Chen • March 15, 2024</p>
                        </div>

                        <Tabs defaultValue="summary">
                            <TabsList>
                                <TabsTrigger value="summary">Summary</TabsTrigger>
                                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                                <TabsTrigger value="slides">Slides</TabsTrigger>
                            </TabsList>
                            <TabsContent value="summary" className="space-y-4 mt-4">
                                <div className="prose dark:prose-invert max-w-none">
                                    <h3>Executive Summary</h3>
                                    <p>
                                        This lecture covers the latest updates in heart failure management, focusing on the 2024 guidelines.
                                        Key changes include the recommendation of SGLT2 inhibitors for all patients with HFpEF.
                                    </p>
                                    <h3>Key Takeaways</h3>
                                    <ul>
                                        <li>SGLT2i are now Class I recommendation for HFpEF.</li>
                                        <li>Four pillars of GDMT should be initiated simultaneously if possible.</li>
                                    </ul>
                                </div>
                            </TabsContent>
                            <TabsContent value="transcript">
                                <div className="prose dark:prose-invert max-w-none">
                                    <p><span className="text-muted-foreground">[00:00]</span> Welcome everyone to this session...</p>
                                    <p><span className="text-muted-foreground">[02:15]</span> Let's look at the epidemiology...</p>
                                </div>
                            </TabsContent>
                            <TabsContent value="slides">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">Slide 1</div>
                                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">Slide 2</div>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>

            <AudioPlayer />
        </div>
    )
}
