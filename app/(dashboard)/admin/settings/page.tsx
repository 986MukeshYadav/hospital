"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, RefreshCw, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { hmsStore } from "@/lib/store"
import { toast } from "sonner"

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const handleReset = () => {
        toast.warning("Reset to Nepali defaults?", {
            description: "This will clear all current records and restore the localized Nepali seed data.",
            action: {
                label: "Reset Now",
                onClick: () => {
                    hmsStore.clearAll()
                    toast.success("System reset successfully!")
                    setTimeout(() => window.location.reload(), 1000)
                }
            }
        })
    }

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
            </div>

            {/* Appearance Section */}
            <section className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <Monitor className="h-5 w-5" /> Appearance
                </h3>
                <div className="grid gap-4 sm:grid-cols-3">
                    {[
                        { id: "light", icon: Sun, label: "Light" },
                        { id: "dark", icon: Moon, label: "Dark" },
                        { id: "system", icon: Monitor, label: "System" },
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setTheme(mode.id)}
                            className={cn(
                                "flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 transition-all",
                                mounted && theme === mode.id
                                    ? "border-primary bg-primary/5 text-primary"
                                    : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30"
                            )}
                        >
                            <mode.icon className="h-6 w-6" />
                            <span className="text-sm font-medium">{mode.label}</span>
                        </button>
                    ))}
                </div>
            </section>

            {/* Data Management Section */}
            <section className="space-y-4 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold text-destructive flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" /> Data Management
                </h3>
                <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h4 className="font-bold text-foreground">Reset Application Data</h4>
                            <p className="text-sm text-muted-foreground">Reload the system with localized Nepali seed data. This will clear all existing records.</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="inline-flex items-center gap-2 rounded-xl bg-destructive px-5 py-2.5 text-sm font-bold text-destructive-foreground hover:opacity-90 transition-all shadow-lg shadow-destructive/20"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Reset to Nepali Defaults
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}
