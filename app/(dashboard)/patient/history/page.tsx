"use client"

import { History, FileText, Download, Calendar } from "lucide-react"

const mockHistory = [
    { id: "V-101", doctor: "Dr. Sarah Smith", diagnosis: "Routine Checkup", date: "Jan 15, 2026", type: "Consultation" },
    { id: "V-102", doctor: "Dr. Emily Chen", diagnosis: "Common Cold", date: "Dec 10, 2025", type: "Treatment" },
]

export default function MedicalHistoryPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Medical History</h1>
                <p className="text-muted-foreground">Access your past medical consultations and clinical records.</p>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="divide-y divide-border">
                    {mockHistory.map((record) => (
                        <div key={record.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{record.doctor}</h3>
                                    <p className="text-sm text-muted-foreground">{record.diagnosis}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2 text-right">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {record.date}
                                </div>
                                <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors">
                                    <Download className="h-3.5 w-3.5" />
                                    Report
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {mockHistory.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <History className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-foreground font-medium">No medical history found.</p>
                    <p className="text-sm text-muted-foreground mt-1">Your past records will appear here after your visits.</p>
                </div>
            )}
        </div>
    )
}
