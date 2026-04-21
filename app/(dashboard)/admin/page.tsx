"use client"

import { useEffect, useState } from "react"
import { Users, UserPlus, Calendar, IndianRupee, TrendingUp, CheckCircle2, Timer, XCircle } from "lucide-react"
import { StatCard } from "@/components/stat-card"
import { hmsStore, Appointment } from "@/lib/store"
import { cn } from "@/lib/utils"

export default function AdminDashboard() {
  const [patients, setPatients] = useState(0)
  const [doctors, setDoctors] = useState(0)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    setPatients(hmsStore.getPatients().length)
    setDoctors(hmsStore.getDoctors().filter(d => d.status === "Active").length)
    setAppointments(hmsStore.getAppointments())
  }, [])

  const recentAppointments = appointments.slice(0, 5)
  const pendingCount = appointments.filter(a => a.status === "Pending").length
  const confirmedCount = appointments.filter(a => a.status === "Confirmed").length

  const STATUS_STYLES: Record<string, string> = {
    Confirmed: "text-emerald-600 bg-emerald-500/10",
    Pending: "text-amber-600 bg-amber-500/10",
    Completed: "text-blue-600 bg-blue-500/10",
    Cancelled: "text-destructive bg-destructive/10",
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your hospital's performance at a glance.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Patients"
          value={String(patients)}
          icon={Users}
          trend={{ value: "Live", positive: true }}
          description="registered patients"
        />
        <StatCard
          title="Active Doctors"
          value={String(doctors)}
          icon={UserPlus}
          trend={{ value: "On duty", positive: true }}
          description="available today"
        />
        <StatCard
          title="Appointments"
          value={String(appointments.length)}
          icon={Calendar}
          trend={{ value: `${pendingCount} pending`, positive: pendingCount === 0 }}
          description="total scheduled"
        />
        <StatCard
          title="Confirmed Today"
          value={String(confirmedCount)}
          icon={IndianRupee}
          trend={{ value: "Active", positive: true }}
          description="confirmed visits"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Appointment Status Summary */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-5">Appointment Status Summary</h3>
          <div className="space-y-3">
            {["Pending", "Confirmed", "Completed", "Cancelled"].map((status) => {
              const count = appointments.filter(a => a.status === status).length
              const pct = appointments.length > 0 ? Math.round((count / appointments.length) * 100) : 0
              return (
                <div key={status}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{status}</span>
                    <span className="text-muted-foreground">{count} ({pct}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        status === "Confirmed" ? "bg-emerald-500" :
                        status === "Pending" ? "bg-amber-500" :
                        status === "Completed" ? "bg-blue-500" : "bg-destructive"
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">Recent Appointments</h3>
          {recentAppointments.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No appointments yet</p>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className="flex items-center justify-between py-2.5 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center font-semibold text-xs text-muted-foreground">
                      {apt.patient.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{apt.patient}</p>
                      <p className="text-xs text-muted-foreground">{apt.doctor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-foreground">{apt.date}</p>
                    <span className={cn(
                      "text-[11px] font-bold rounded-full px-2 py-0.5",
                      STATUS_STYLES[apt.status]
                    )}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
