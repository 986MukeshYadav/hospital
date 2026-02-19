"use client"

import { useState } from "react"
import { Search, UserPlus, MoreVertical, Stethoscope, Mail, Phone, Clock, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const initialDoctors = [
    { id: "D-001", name: "Dr. Sarah Smith", specialty: "Cardiologist", email: "sarah@hms.com", status: "Active", experience: "12 years" },
    { id: "D-002", name: "Dr. James Wilson", specialty: "Neurologist", email: "james@hms.com", status: "Active", experience: "8 years" },
    { id: "D-003", name: "Dr. Emily Chen", specialty: "Pediatrician", email: "emily@hms.com", status: "On Leave", experience: "15 years" },
]

export default function DoctorsPage() {
    const [doctors, setDoctors] = useState(initialDoctors)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredDoctors = doctors.filter(d =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const toggleStatus = (id: string) => {
        setDoctors(doctors.map(d =>
            d.id === id ? { ...d, status: d.status === "Active" ? "Inactive" : "Active" } : d
        ))
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Doctor Management</h1>
                    <p className="text-muted-foreground">Manage hospital staff and doctor schedules.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    Add Doctor
                </button>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name, specialty or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Stethoscope className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                                    <p className="text-sm font-medium text-primary/80">{doctor.specialty}</p>
                                </div>
                            </div>

                            <div className="hidden lg:flex items-center gap-12">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Email</span>
                                    <span className="text-xs font-medium text-foreground">{doctor.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Experience</span>
                                    <span className="text-xs font-medium text-foreground">{doctor.experience}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => toggleStatus(doctor.id)}
                                    className={cn(
                                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold cursor-pointer transition-colors",
                                        doctor.status === "Active" ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                                    )}
                                >
                                    {doctor.status}
                                </button>
                                <button className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
