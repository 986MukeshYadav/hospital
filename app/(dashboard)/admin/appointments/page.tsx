"use client"

import { useState, useEffect } from "react"
import {
  Calendar, CheckCircle2, Timer, XCircle, Search,
  Filter, Plus, Download, X, Trash2
} from "lucide-react"
import { cn } from "@/lib/utils"
import { hmsStore, Appointment } from "@/lib/store"
import { AddAppointmentForm } from "@/components/add-appointment-form"

const STATUS_STYLES: Record<string, string> = {
  Confirmed: "bg-emerald-500/10 text-emerald-600",
  Pending: "bg-amber-500/10 text-amber-600",
  Completed: "bg-blue-500/10 text-blue-600",
  Cancelled: "bg-destructive/10 text-destructive",
}

const STATUS_ICON: Record<string, React.ReactNode> = {
  Confirmed: <CheckCircle2 className="h-3 w-3" />,
  Pending: <Timer className="h-3 w-3" />,
  Completed: <CheckCircle2 className="h-3 w-3" />,
  Cancelled: <XCircle className="h-3 w-3" />,
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    setAppointments(hmsStore.getAppointments())
  }, [])

  const filtered = appointments.filter((apt) => {
    const matchSearch =
      apt.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchStatus = statusFilter === "All" || apt.status === statusFilter
    return matchSearch && matchStatus
  })

  const updateStatus = (id: string, newStatus: Appointment["status"]) => {
    hmsStore.updateAppointment(id, { status: newStatus })
    setAppointments(hmsStore.getAppointments())
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this appointment?")) return
    hmsStore.deleteAppointment(id)
    setAppointments(hmsStore.getAppointments())
  }

  const handleAdd = (data: Omit<Appointment, "id" | "createdAt" | "status">) => {
    hmsStore.addAppointment({ ...data, status: "Pending" })
    setAppointments(hmsStore.getAppointments())
    setIsAddModalOpen(false)
  }

  // Export only the currently FILTERED rows
  const handleExportCSV = () => {
    const headers = ["ID", "Patient", "Doctor", "Specialty", "Date", "Time", "Type", "Status", "Notes"]
    const rows = filtered.map((a) => [
      a.id, a.patient, a.doctor, a.specialty, a.date, a.time, a.type, a.status, a.notes ?? ""
    ])
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `appointments_${statusFilter.toLowerCase()}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Appointments</h1>
          <p className="text-muted-foreground">Manage and track all medical consultations.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" />
            New Appointment
          </button>
        </div>
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
            {s}
            <span className="ml-1.5 opacity-70">
              {s === "All" ? appointments.length : appointments.filter((a) => a.status === s).length}
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
              placeholder="Search patient, doctor or ID..."
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
                <th className="px-5 py-4">ID</th>
                <th className="px-5 py-4">Patient</th>
                <th className="px-5 py-4">Doctor</th>
                <th className="px-5 py-4">Date / Time</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground">
                    No appointments found
                  </td>
                </tr>
              ) : (
                filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">{apt.id}</td>
                    <td className="px-5 py-4 font-medium text-foreground">{apt.patient}</td>
                    <td className="px-5 py-4 text-foreground">
                      <div>{apt.doctor}</div>
                      <div className="text-xs text-muted-foreground">{apt.specialty}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="text-foreground font-medium">{apt.date}</span>
                        <span className="text-xs text-muted-foreground">{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                        {apt.type}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={cn(
                        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                        STATUS_STYLES[apt.status]
                      )}>
                        {STATUS_ICON[apt.status]}
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {apt.status === "Pending" && (
                          <>
                            <button onClick={() => updateStatus(apt.id, "Confirmed")} className="text-xs font-bold text-emerald-600 hover:underline">Approve</button>
                            <button onClick={() => updateStatus(apt.id, "Cancelled")} className="text-xs font-bold text-destructive hover:underline">Reject</button>
                          </>
                        )}
                        {apt.status === "Confirmed" && (
                          <button onClick={() => updateStatus(apt.id, "Completed")} className="text-xs font-bold text-blue-600 hover:underline">Complete</button>
                        )}
                        <button
                          onClick={() => handleDelete(apt.id)}
                          className="rounded p-1 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Appointment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">New Appointment</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Schedule a consultation or follow-up</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <AddAppointmentForm
              onClose={() => setIsAddModalOpen(false)}
              onSubmitSuccess={handleAdd}
            />
          </div>
        </div>
      )}
    </div>
  )
}
