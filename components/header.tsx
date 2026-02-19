"use client"

import { Search, Bell, User } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

export function Header() {
    const { data: session } = useSession()

    return (
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8">
            <div className="flex w-96 items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 focus-within:ring-1 focus-within:ring-primary transition-all">
                <Search className="h-4 w-4 text-muted-foreground" />
                <input
                    type="text"
                    placeholder="Search patients, results..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full p-2 hover:bg-muted transition-colors">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-card" />
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-border">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-foreground">{session?.user?.name || "User"}</p>
                        <p className="text-xs text-muted-foreground">{(session?.user as any)?.role || "Staff"}</p>
                    </div>
                    <button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="h-10 w-10 overflow-hidden rounded-full border border-border bg-muted flex items-center justify-center hover:opacity-80 transition-opacity"
                    >
                        <User className="h-5 w-5 text-muted-foreground" />
                    </button>
                </div>
            </div>
        </header>
    )
}
