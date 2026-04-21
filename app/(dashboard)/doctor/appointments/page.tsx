"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, CheckCircle2, Timer, XCircle, Search, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { hmsStore, Appointment } from "@/lib/store"

const STATUS_STYLES: Record<string, string> = {
  Confirmed:  "bg-emerald-500/10 text-emerald-600",
  Pending:    "bg-amber-500/10 text-amber-600",
  Completed:  "bg-blue-500/10 text-blue-600",
  Cancelled:  "bg-destructive/10 text-destructive",
}

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    setAppointments(hmsStore.getAppointments())
  }, [])

  const filtered = appointments.filter((a) => {
    const matchSearch = a.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "All" || a.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, status: Appointment["status"]) => {
    hmsStore.updateAppointment(id, { status })
    setAppointments(hmsStore.getAppointments())
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Appointments</h1>
        <p className="text-muted-foreground">Review and manage your patient consultations.</p>
      </div>

      {/* Status tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {["All", "Pending", "Confirmed", "Completed", "Cancelled"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
              statusFilter === s
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground hover:text-foreground"
            )}
          >
            {s} <span className="ml-1 opacity-70">
              {s === "All" ? appointments.length : appointments.filter(a => a.status === s).length}
            </span>
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search patient or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Date / Time</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Notes</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground">No appointments found</td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-medium text-foreground">{apt.patient}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-foreground">{apt.date}</div>
                      <div className="text-xs text-muted-foreground">{apt.time}</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{apt.type}</span>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground max-w-[160px] truncate">{apt.notes || "—"}</td>
                    <td className="px-5 py-4">
                      <span className={cn("inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold", STATUS_STYLES[apt.status])}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {apt.status === "Pending" && (
                          <>
                            <button onClick={() => updateStatus(apt.id, "Confirmed")} className="text-xs font-bold text-emerald-600 hover:underline">Confirm</button>
                            <button onClick={() => updateStatus(apt.id, "Cancelled")} className="text-xs font-bold text-destructive hover:underline">Cancel</button>
                          </>
                        )}
                        {apt.status === "Confirmed" && (
                          <button onClick={() => updateStatus(apt.id, "Completed")} className="text-xs font-bold text-blue-600 hover:underline">Mark Done</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
