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
  History,
  UserCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession } from "next-auth/react"

export function Sidebar() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const role = (session?.user as any)?.role as string | undefined

  const getNavItems = () => {
    switch (role) {
      case "Admin":
        return [
          { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
          { name: "Patients", href: "/admin/patients", icon: Users },
          { name: "Doctors", href: "/admin/doctors", icon: UserRound },
          { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
          { name: "Medical Records", href: "/admin/records", icon: FileText },
          { name: "Billing & Payments", href: "/admin/billing", icon: CreditCard },
          { name: "Users", href: "/admin/users", icon: UserCircle },
          { name: "Settings", href: "/admin/settings", icon: Settings },
        ]
      case "Doctor":
        return [
          { name: "Dashboard", href: "/doctor", icon: LayoutDashboard },
          { name: "My Patients", href: "/doctor/patients", icon: Users },
          { name: "Appointments", href: "/doctor/appointments", icon: CalendarDays },
          { name: "Medical Records", href: "/doctor/records", icon: FileText },
          { name: "Settings", href: "/doctor/settings", icon: Settings },
        ]
      case "Patient":
        return [
          { name: "Dashboard", href: "/patient", icon: LayoutDashboard },
          { name: "Find Doctors", href: "/patient/doctors", icon: Stethoscope },
          { name: "My Appointments", href: "/patient/appointments", icon: CalendarDays },
          { name: "Medical History", href: "/patient/history", icon: History },
          { name: "Billing", href: "/patient/billing", icon: CreditCard },
          { name: "Settings", href: "/patient/settings", icon: Settings },
        ]
      default:
        return []
    }
  }

  const navItems = getNavItems()

  // Determine active: exact match OR starts-with for sub-pages
  const isActive = (href: string) => {
    if (href === "/admin" || href === "/doctor" || href === "/patient") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-screen w-64 flex-col border-r border-border bg-card">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-border">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Stethoscope className="h-5 w-5" />
        </div>
        <span className="font-bold text-lg text-foreground">HMS Premium</span>
      </div>

      {status === "loading" ? (
        <div className="flex-1 p-4 space-y-2 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-9 rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <>
          {session && (
            <div className="px-4 py-3 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {role ?? "Staff"}
              </p>
              <p className="text-sm font-semibold text-foreground truncate mt-0.5">
                {session.user?.name ?? session.user?.email}
              </p>
            </div>
          )}

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-0.5 px-3">
              {navItems.map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                      active
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-4 w-4 flex-shrink-0" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </>
      )}

      <div className="border-t border-border p-4 text-xs text-muted-foreground text-center">
        © 2026 HMS Systems
      </div>
    </div>
  )
}
