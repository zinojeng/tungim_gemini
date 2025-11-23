"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause } from "lucide-react"

export function AudioPlayer() {
    const [isPlaying, setIsPlaying] = React.useState(false)
    const [progress, setProgress] = React.useState(33)

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur p-4 z-50 supports-[backdrop-filter]:bg-background/60">
            <div className="container flex items-center gap-4">
                <Button size="icon" variant="ghost" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <div className="flex-1">
                    <Slider
                        defaultValue={[33]}
                        max={100}
                        step={1}
                        className="w-full"
                        onValueChange={(value) => setProgress(value[0])}
                    />
                </div>
                <div className="text-sm text-muted-foreground w-12 text-right font-mono">
                    12:34
                </div>
            </div>
        </div>
    )
}
