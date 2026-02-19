"use client"

import { useState } from "react"
import { Search, User, FileText, ChevronRight, Activity } from "lucide-react"

const mockDoctorPatients = [
    { id: "P-001", name: "John Doe", age: 34, gender: "Male", condition: "Common Cold", lastVisit: "2026-02-10" },
    { id: "P-005", name: "Robert Wilson", age: 45, gender: "Male", condition: "Hypertension", lastVisit: "2026-02-15" },
]

export default function DoctorPatientsPage() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">My Patients</h1>
                <p className="text-muted-foreground">Manage and monitor patients assigned to your care.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {mockDoctorPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                                    <p className="text-sm text-muted-foreground">{patient.age} years • {patient.gender}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-8">
                                <div className="hidden md:flex flex-col items-center">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Condition</span>
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 text-xs font-bold">
                                        <Activity className="h-3 w-3" />
                                        {patient.condition}
                                    </span>
                                </div>
                                <div className="hidden sm:flex flex-col items-end">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Last Visit</span>
                                    <span className="text-sm font-medium text-foreground">{patient.lastVisit}</span>
                                </div>
                                <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted transition-colors">
                                    <FileText className="h-4 w-4" />
                                    Records
                                    <ChevronRight className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
