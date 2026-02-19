"use client"

import { useState } from "react"
import { Search, FileText, Download, Calendar, User, ClipboardList, Plus } from "lucide-react"

const initialRecords = [
    { id: "REC-001", patient: "John Doe", diagnosis: "Hypertension", date: "2026-02-15", doctor: "Dr. Sarah Smith" },
    { id: "REC-002", patient: "Jane Smith", diagnosis: "Diabetes Type II", date: "2026-02-18", doctor: "Dr. James Wilson" },
    { id: "REC-003", patient: "Robert Wilson", diagnosis: "Acute Bronchitis", date: "2026-02-20", doctor: "Dr. Emily Chen" },
]

export default function RecordsPage() {
    const [records, setRecords] = useState(initialRecords)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredRecords = records.filter(r =>
        r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Medical Records</h1>
                    <p className="text-muted-foreground">Access and manage comprehensive patient clinical history.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                    <Plus className="h-4 w-4" />
                    New Record
                </button>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by patient or diagnosis..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {filteredRecords.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <ClipboardList className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{record.patient}</h3>
                                    <p className="text-sm font-medium text-primary/80">{record.diagnosis}</p>
                                </div>
                            </div>

                            <div className="hidden lg:flex items-center gap-12">
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Doctor</span>
                                    <span className="text-xs font-medium text-foreground">{record.doctor}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-1">Date</span>
                                    <span className="text-xs font-medium text-foreground">{record.date}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                                    <Download className="h-3.5 w-3.5" />
                                    PDF
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
