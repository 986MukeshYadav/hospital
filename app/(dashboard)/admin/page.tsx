"use client"

import { StatCard } from "@/components/stat-card"
import { Users, UserPlus, Calendar, IndianRupee, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Overview</h1>
                <p className="text-muted-foreground">Monitor your hospital's performance at a glance.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Patients"
                    value="1,284"
                    icon={Users}
                    trend={{ value: "12%", positive: true }}
                    description="from last month"
                />
                <StatCard
                    title="Active Doctors"
                    value="48"
                    icon={UserPlus}
                    trend={{ value: "4%", positive: true }}
                    description="newly joined"
                />
                <StatCard
                    title="Appointments"
                    value="156"
                    icon={Calendar}
                    trend={{ value: "8%", positive: false }}
                    description="decreased today"
                />
                <StatCard
                    title="Total Revenue"
                    value="₹45,200"
                    icon={IndianRupee}
                    trend={{ value: "23%", positive: true }}
                    description="profit this week"
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                        <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/30" />
                        <p className="mt-4 text-sm font-medium text-muted-foreground">Appointment Trends Chart Placeholder</p>
                    </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm min-h-[300px]">
                    <h3 className="font-semibold text-foreground mb-4">Recent Appointments</h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center font-semibold text-xs text-muted-foreground">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-foreground">John Doe</p>
                                        <p className="text-xs text-muted-foreground">Consultation with Dr. Smith</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-medium text-foreground">10:30 AM</p>
                                    <p className="text-xs text-emerald-600 font-medium">Confirmed</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
