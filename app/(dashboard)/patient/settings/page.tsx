"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export default function GeneralSettingsPage() {
    const { theme, setTheme } = useTheme()
    const { data: session, update } = useSession()
    const [name, setName] = useState(session?.user?.name || "")
    const [email, setEmail] = useState(session?.user?.email || "")
    const [isUpdating, setIsUpdating] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        if (session?.user) {
            setName(session.user.name || "")
            setEmail(session.user.email || "")
        }
    }, [session])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsUpdating(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success("Profile updated successfully", {
            description: `Name updated to ${name}`,
        })
        setIsUpdating(false)
    }

    const handleChangePassword = async () => {
        const newPass = prompt("Enter new password:")
        if (!newPass) return
        
        setIsUpdating(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success("Password changed successfully", {
            description: "Your security credentials have been updated.",
        })
        setIsUpdating(false)
    }

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and application settings.</p>
            </div>

            {/* Profile Section */}
            <form onSubmit={handleUpdateProfile} className="rounded-2xl border border-border bg-card p-6 space-y-6 shadow-sm">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 border-b border-border pb-3">
                    <User className="h-5 w-5" /> Profile Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-background text-foreground font-medium outline-none focus:ring-1 focus:ring-primary transition-all"
                            placeholder="Your full name"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 rounded-lg border border-border bg-background text-foreground font-medium outline-none focus:ring-1 focus:ring-primary transition-all"
                            placeholder="your.email@example.com"
                        />
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={isUpdating}
                        className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {isUpdating ? "Saving..." : "Save Changes"}
                    </button>
                    <button
                        type="button"
                        onClick={handleChangePassword}
                        className="rounded-xl border border-border px-6 py-2.5 text-sm font-bold text-foreground hover:bg-muted transition-all"
                    >
                        Change Password
                    </button>
                </div>
            </form>

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
        </div>
    )
}

