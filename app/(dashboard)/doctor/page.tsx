"use client"

import { useEffect, useState } from "react"
import { Calendar, Users, ClipboardList, CheckCircle2, Timer, TrendingUp } from "lucide-react"
import { hmsStore, Appointment } from "@/lib/store"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils"

export default function DoctorDashboard() {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    setAppointments(hmsStore.getAppointments())
  }, [])

  const pending = appointments.filter(a => a.status === "Pending")
  const confirmed = appointments.filter(a => a.status === "Confirmed")
  const completed = appointments.filter(a => a.status === "Completed")

  const STATUS_STYLES: Record<string, string> = {
    Confirmed: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Completed: "bg-blue-500/10 text-blue-600",
    Cancelled: "bg-destructive/10 text-destructive",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Welcome, {session?.user?.name ?? "Doctor"}
        </h1>
        <p className="text-muted-foreground">Here's your schedule and patient overview for today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Appointments", value: appointments.length, icon: Calendar, color: "text-foreground" },
          { label: "Pending", value: pending.length, icon: Timer, color: "text-amber-600" },
          { label: "Confirmed", value: confirmed.length, icon: CheckCircle2, color: "text-emerald-600" },
          { label: "Completed", value: completed.length, icon: TrendingUp, color: "text-blue-600" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <s.icon className={cn("h-5 w-5", s.color)} />
            </div>
            <p className={cn("text-3xl font-bold", s.color)}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Today's Appointments */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Pending Appointments</h3>
          {pending.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No pending appointments 🎉</p>
          ) : (
            <div className="space-y-3">
              {pending.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{apt.patient}</p>
                    <p className="text-xs text-muted-foreground">{apt.type} · {apt.date} at {apt.time}</p>
                  </div>
                  <span className="text-[11px] font-bold rounded-full px-2.5 py-0.5 bg-amber-500/10 text-amber-600">
                    Pending
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Confirmed Appointments</h3>
          {confirmed.length === 0 ? (
            <p className="text-sm text-muted-foreground py-6 text-center">No confirmed appointments</p>
          ) : (
            <div className="space-y-3">
              {confirmed.slice(0, 5).map((apt) => (
                <div key={apt.id} className="flex items-center justify-between py-2.5 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{apt.patient}</p>
                    <p className="text-xs text-muted-foreground">{apt.type} · {apt.date} at {apt.time}</p>
                    {apt.notes && <p className="text-xs italic text-muted-foreground mt-0.5">{apt.notes}</p>}
                  </div>
                  <span className="text-[11px] font-bold rounded-full px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600">
                    Confirmed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
