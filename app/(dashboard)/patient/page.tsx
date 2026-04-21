"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { hmsStore, Appointment, MedicalRecord } from "@/lib/store"
import { Calendar, ClipboardList, CreditCard, ChevronRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function PatientDashboard() {
    const { data: session } = useSession()
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [records, setRecords] = useState<MedicalRecord[]>([])

    useEffect(() => {
        setAppointments(hmsStore.getAppointments())
        setRecords(hmsStore.getRecords())
    }, [])

    const upcoming = appointments.find(a => a.status === "Confirmed" || a.status === "Pending")
    const latestRecord = records[records.length - 1]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    Welcome back, {session?.user?.name?.split(" ")[0] || "Patient"}!
                </h1>
                <p className="text-muted-foreground mt-1 font-medium">Manage your health and clinical activities.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Upcoming Appointment Card */}
                <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Calendar className="h-5 w-5" />
                        </div>
                        <Link href="/patient/appointments" className="text-muted-foreground hover:text-primary transition-colors">
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Upcoming Appointment</h3>
                    {upcoming ? (
                        <div>
                            <p className="text-foreground font-semibold">{upcoming.doctor}</p>
                            <p className="text-sm text-muted-foreground">{upcoming.date} • {upcoming.time}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No upcoming appointments scheduled.</p>
                    )}
                    <Link
                        href="/patient/appointments"
                        className="mt-6 flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider group-hover:gap-3 transition-all"
                    >
                        View Calendar <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>

                {/* Latest Records Card */}
                <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                            <ClipboardList className="h-5 w-5" />
                        </div>
                        <Link href="/patient/history" className="text-muted-foreground hover:text-blue-600 transition-colors">
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Medical History</h3>
                    {latestRecord ? (
                        <div>
                            <p className="text-foreground font-semibold line-clamp-1">{latestRecord.diagnosis}</p>
                            <p className="text-sm text-muted-foreground">Updated on {latestRecord.date}</p>
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No medical history available yet.</p>
                    )}
                    <Link
                        href="/patient/history"
                        className="mt-6 flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider group-hover:gap-3 transition-all"
                    >
                        Browse History <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>

                {/* Billing Preview Card */}
                <div className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/40 transition-all">
                    <div className="flex justify-between items-start mb-4">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                            <CreditCard className="h-5 w-5" />
                        </div>
                        <Link href="/patient/billing" className="text-muted-foreground hover:text-emerald-600 transition-colors">
                            <ArrowUpRight className="h-5 w-5" />
                        </Link>
                    </div>
                    <h3 className="font-bold text-foreground text-lg mb-1">Billing & Invoices</h3>
                    <div>
                        <p className="text-foreground font-semibold">₹1,250 Outstanding</p>
                        <p className="text-sm text-muted-foreground">Last payment: April 18, 2026</p>
                    </div>
                    <Link
                        href="/patient/billing"
                        className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider group-hover:gap-3 transition-all"
                    >
                        Make Payment <ChevronRight className="h-3 w-3" />
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-2xl bg-muted/30 border border-border p-8 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-foreground mb-2">Need to see a specialist?</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                    Search through our verified doctors and book an appointment in less than a minute.
                </p>
                <Link
                    href="/patient/doctors"
                    className="mt-6 rounded-xl bg-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/20 transition-all"
                >
                    Find a Doctor
                </Link>
            </div>
        </div>
    )
}
