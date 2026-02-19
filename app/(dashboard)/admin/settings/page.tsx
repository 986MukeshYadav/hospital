"use client"

import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, Shield, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SettingsPage() {
    const { theme, setTheme } = useTheme()

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
            </div>

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
                                theme === mode.id
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

            <div className="grid gap-6 md:grid-cols-2">
                <section className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Shield className="h-5 w-5" /> Security
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-foreground">Two-Factor Authentication</p>
                                <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                            </div>
                            <div className="h-5 w-10 rounded-full bg-muted relative cursor-pointer">
                                <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-white transition-all shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-sm">
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <Bell className="h-5 w-5" /> Notifications
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-foreground">Email Alerts</p>
                                <p className="text-xs text-muted-foreground">Receive updates via email</p>
                            </div>
                            <div className="h-5 w-10 rounded-full bg-primary relative cursor-pointer">
                                <div className="absolute right-1 top-1 h-3 w-3 rounded-full bg-white transition-all shadow-sm" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}
