"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    UserRound,
    CalendarDays,
    FileText,
    CreditCard,
    Settings,
    Stethoscope,
    History
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export function Sidebar() {
    const pathname = usePathname()
    const { data: session } = useSession()
    const role = (session?.user as any)?.role

    const getNavItems = () => {
        switch (role) {
            case "Admin":
                return [
                    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
                    { name: "Users", href: "/admin/users", icon: Users },
                    { name: "Patients", href: "/admin/patients", icon: Users },
                    { name: "Doctors", href: "/admin/doctors", icon: UserRound },
                    { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
                    { name: "Medical Records", href: "/admin/records", icon: FileText },
                    { name: "Billing & Payments", href: "/admin/billing", icon: CreditCard },
                    { name: "Settings", href: "/admin/settings", icon: Settings },
                ]
            case "Doctor":
                return [
                    { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
                    { name: "My Patients", href: "/doctor/patients", icon: Users },
                    { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
                    { name: "Records", href: "/admin/records", icon: FileText },
                    { name: "Settings", href: "/admin/settings", icon: Settings },
                ]
            case "Patient":
                return [
                    { name: "Dashboard", href: "/patient", icon: LayoutDashboard },
                    { name: "Find Doctors", href: "/patient/doctors", icon: Stethoscope },
                    { name: "My Appointments", href: "/patient/appointments", icon: CalendarDays },
                    { name: "Medical History", href: "/patient/history", icon: History },
                    { name: "Billing", href: "/admin/billing", icon: CreditCard },
                    { name: "Settings", href: "/admin/settings", icon: Settings },
                ]
            default:
                return []
        }
    }

    const navItems = getNavItems()

    return (
        <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
            <div className="flex h-16 items-center px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
                    <Stethoscope className="h-6 w-6" />
                    <span>HMS Premium</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="space-y-1 px-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </div>
            <div className="border-t border-border p-4 text-xs text-muted-foreground text-center">
                © 2026 HMS Systems
            </div>
        </div>
    )
}
