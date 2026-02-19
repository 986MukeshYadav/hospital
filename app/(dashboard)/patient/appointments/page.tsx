"use client"

import { useState } from "react"
import { Calendar, Clock, User, CheckCircle2, Timer, XCircle, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

import { AppointmentBookingModal } from "@/components/appointment-booking-modal"

const mockAppointments = [
    {
        id: "1",
        doctor: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        date: "Feb 22, 2026",
        time: "10:30 AM",
        status: "Confirmed"
    },
    {
        id: "2",
        doctor: "Dr. James Wilson",
        specialty: "Neurologist",
        date: "Feb 25, 2026",
        time: "02:15 PM",
        status: "Pending"
    },
]

export default function PatientAppointmentsPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false)

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
                    Book New Appointment
                </button>
            </div>

            {isBookingOpen && <AppointmentBookingModal onClose={() => setIsBookingOpen(false)} />}

            <div className="grid gap-6">
                {mockAppointments.map((apt) => (
                    <div key={apt.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl border border-border bg-card shadow-sm hover:border-primary/20 transition-all">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                            <div className="h-12 i-12 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary">
                                <Calendar className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-foreground text-lg">{apt.doctor}</h3>
                                <p className="text-sm text-muted-foreground">{apt.specialty}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
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
                                apt.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                            )}>
                                {apt.status === "Confirmed" ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Timer className="h-3.5 w-3.5" />}
                                {apt.status}
                            </div>
                            <button className="text-xs font-bold text-destructive hover:underline">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="rounded-2xl bg-primary/5 p-8 border border-dashed border-primary/20 flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Need a checkup?</h3>
                <p className="text-muted-foreground max-w-sm mt-1">Book an appointment with our top specialists in just a few clicks.</p>
                <button className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-primary/25">
                    Schedule Now
                </button>
            </div>
        </div>
    )
}
