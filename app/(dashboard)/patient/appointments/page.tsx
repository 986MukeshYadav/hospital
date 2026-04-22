"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, CheckCircle2, Timer, XCircle, Plus, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { hmsStore, Appointment } from "@/lib/store"
import { useSession } from "next-auth/react"
import { AppointmentBookingModal } from "@/components/appointment-booking-modal"
import { toast } from "sonner"

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

export default function PatientAppointmentsPage() {
  const { data: session } = useSession()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    // Show all appointments for demo; in production filter by patientId from session
    setAppointments(hmsStore.getAppointments())
  }, [])

  const handleCancel = (id: string) => {
    toast.warning("Cancel this appointment?", {
      description: "Are you sure you want to cancel your consultation?",
      action: {
        label: "Cancel Appointment",
        onClick: () => {
          hmsStore.updateAppointment(id, { status: "Cancelled" })
          setAppointments(hmsStore.getAppointments())
          toast.success("Appointment cancelled")
        },
      },
    })
  }

  const STATUS_STYLES: Record<string, string> = {
    Confirmed: "bg-emerald-500/10 text-emerald-600",
    Pending: "bg-amber-500/10 text-amber-600",
    Completed: "bg-blue-500/10 text-blue-600",
    Cancelled: "bg-destructive/10 text-destructive",
  }

  const STATUS_ICON: Record<string, React.ReactNode> = {
    Confirmed: <CheckCircle2 className="h-3.5 w-3.5" />,
    Pending: <Timer className="h-3.5 w-3.5" />,
    Completed: <CheckCircle2 className="h-3.5 w-3.5" />,
    Cancelled: <XCircle className="h-3.5 w-3.5" />,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">My Appointments</h1>
          <p className="text-muted-foreground">Manage and track your upcoming medical consultations.</p>
        </div>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          Book Appointment
        </button>
      </div>

      {isBookingOpen && (
        <AppointmentBookingModal
          onClose={() => setIsBookingOpen(false)}
          onBooked={() => {
            setAppointments(hmsStore.getAppointments())
            setIsBookingOpen(false)
          }}
        />
      )}

      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            <Calendar className="mx-auto h-10 w-10 mb-3 opacity-30" />
            <p className="font-medium">No appointments yet</p>
            <button
              onClick={() => setIsBookingOpen(true)}
              className="mt-4 rounded-lg bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Book Your First Appointment
            </button>
          </div>
        ) : (
          appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">{apt.doctor}</h3>
                  <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                  {apt.notes && <p className="text-xs text-muted-foreground mt-0.5 italic">{apt.notes}</p>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="font-medium">{apt.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium">{apt.time}</span>
                </div>

                <div className={cn(
                  "flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                  STATUS_STYLES[apt.status]
                )}>
                  {STATUS_ICON[apt.status]}
                  {apt.status}
                </div>

                {(apt.status === "Pending" || apt.status === "Confirmed") && (
                  <button
                    onClick={() => handleCancel(apt.id)}
                    className="text-xs font-bold text-destructive hover:underline"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-primary/5 p-8 border border-dashed border-primary/20 flex flex-col items-center text-center">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Plus className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Need a checkup?</h3>
        <p className="text-muted-foreground max-w-sm mt-1">Book an appointment with our top specialists in just a few clicks.</p>
        <button
          onClick={() => setIsBookingOpen(true)}
          className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25"
        >
          Schedule Now
        </button>
      </div>
    </div>
  )
}
