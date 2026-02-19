"use client"

import { useState } from "react"
import { Search, UserPlus, MoreVertical, Shield, Mail, Activity, Plus, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AddUserForm } from "@/components/add-user-form"

const initialUsers = [
    { id: "U-001", name: "Admin System", email: "admin@hms.com", role: "Admin", status: "Active" },
    { id: "U-002", name: "Dr. Smith", email: "doctor@hms.com", role: "Doctor", status: "Active" },
    { id: "U-003", name: "John Doe", email: "patient@hms.com", role: "Patient", status: "Active" },
]

export default function UsersPage() {
    const [users, setUsers] = useState(initialUsers)
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const deleteUser = (id: string) => {
        if (confirm("Are you sure you want to delete this user?")) {
            setUsers(users.filter(u => u.id !== id))
        }
    }

    const handleAddUser = (data: any) => {
        const newUser = {
            id: `U-00${users.length + 1}`,
            ...data,
            status: "Active",
        }
        setUsers([...users, newUser])
        setIsAddModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">User Management</h1>
                    <p className="text-muted-foreground">Manage system access and roles for all users.</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                >
                    <Plus className="h-4 w-4" />
                    Add User
                </button>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, email or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "flex h-12 w-12 items-center justify-center rounded-xl font-bold",
                                    user.role === "Admin" ? "bg-amber-500/10 text-amber-600" :
                                        user.role === "Doctor" ? "bg-blue-500/10 text-blue-600" :
                                            "bg-emerald-500/10 text-emerald-600"
                                )}>
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Mail className="h-3 w-3" />
                                        {user.email}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Role</span>
                                    <span className={cn(
                                        "text-xs font-bold px-2 py-0.5 rounded-md",
                                        user.role === "Admin" ? "text-amber-600 bg-amber-500/10" :
                                            user.role === "Doctor" ? "text-blue-600 bg-blue-500/10" :
                                                "text-emerald-600 bg-emerald-500/10"
                                    )}>
                                        {user.role}
                                    </span>
                                </div>
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Status</span>
                                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                                        <Activity className="h-3 w-3" />
                                        {user.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="rounded-lg p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl relative">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute right-4 top-4 rounded-lg p-2 hover:bg-muted text-muted-foreground"
                        >
                            ×
                        </button>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground">Add New User</h2>
                            <p className="text-sm text-muted-foreground font-medium">Create a new system account with specific permissions.</p>
                        </div>
                        <AddUserForm onClose={() => setIsAddModalOpen(false)} onSubmitSuccess={handleAddUser} />
                    </div>
                </div>
            )}
        </div>
    )
}
