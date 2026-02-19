"use client"

import { useState } from "react"
import { Calendar, Clock, User, CheckCircle2, Timer, XCircle, Search, Filter } from "lucide-react"
import { cn } from "@/lib/utils"

const initialAppointments = [
    { id: "A-1234", patient: "John Doe", doctor: "Dr. Sarah Smith", date: "2026-02-22", time: "10:30 AM", status: "Confirmed" },
    { id: "A-1235", patient: "Jane Smith", doctor: "Dr. James Wilson", date: "2026-02-25", time: "02:15 PM", status: "Pending" },
    { id: "A-1236", patient: "Robert Wilson", doctor: "Dr. Emily Chen", date: "2026-02-28", time: "09:00 AM", status: "Cancelled" },
]

export default function AppointmentsPage() {
    const [appointments, setAppointments] = useState(initialAppointments)
    const [searchTerm, setSearchTerm] = useState("")

    const updateStatus = (id: string, newStatus: string) => {
        setAppointments(appointments.map(apt =>
            apt.id === id ? { ...apt, status: newStatus } : apt
        ))
    }

    const filtered = appointments.filter(apt =>
        apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        apt.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Appointments</h1>
                    <p className="text-muted-foreground">Manage and track all medical consultations.</p>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-4">
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search appointments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                        <Filter className="h-4 w-4" />
                        Filter
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Doctor</th>
                                <th className="px-6 py-4">Date/Time</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filtered.map((apt) => (
                                <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{apt.id}</td>
                                    <td className="px-6 py-4 text-foreground">{apt.patient}</td>
                                    <td className="px-6 py-4 text-foreground">{apt.doctor}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-foreground">{apt.date}</span>
                                            <span className="text-xs text-muted-foreground">{apt.time}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                                            apt.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" :
                                                apt.status === "Pending" ? "bg-amber-500/10 text-amber-600" :
                                                    "bg-destructive/10 text-destructive"
                                        )}>
                                            {apt.status === "Confirmed" ? <CheckCircle2 className="h-3 w-3" /> :
                                                apt.status === "Pending" ? <Timer className="h-3 w-3" /> :
                                                    <XCircle className="h-3 w-3" />}
                                            {apt.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {apt.status === "Pending" && (
                                                <>
                                                    <button
                                                        onClick={() => updateStatus(apt.id, "Confirmed")}
                                                        className="text-xs font-bold text-emerald-600 hover:underline"
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => updateStatus(apt.id, "Cancelled")}
                                                        className="text-xs font-bold text-destructive hover:underline"
                                                    >
                                                        Reject
                                                    </button>
                                                </>
                                            )}
                                            {apt.status !== "Pending" && (
                                                <span className="text-xs text-muted-foreground italic">No actions</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
