"use client"

import { useEffect, useState } from "react"
import { hmsStore, Doctor } from "@/lib/store"
import { Search, Stethoscope, Phone, Mail, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { AppointmentBookingModal } from "@/components/appointment-booking-modal"

const SPECIALTIES = ["All", "Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics", "General Medicine"]

export default function PatientDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("All")
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    setDoctors(hmsStore.getDoctors())
  }, [])

  const handleBookClick = (id: string) => {
    setSelectedDoctorId(id)
    setIsBookingOpen(true)
  }

  const filtered = doctors.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchSpecialty = specialtyFilter === "All" || d.specialty === specialtyFilter
    return matchSearch && matchSpecialty
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Find a Doctor</h1>
        <p className="text-muted-foreground">Browse our team of qualified specialists.</p>
      </div>

      {/* Filters omitted for brevity in replace_file_content targetContent, but I will provide full replacement below */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {SPECIALTIES.map((s) => (
            <button
              key={s}
              onClick={() => setSpecialtyFilter(s)}
              className={cn(
                "rounded-full px-4 py-1.5 text-xs font-bold transition-all",
                specialtyFilter === s
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length === 0 ? (
          <div className="sm:col-span-3 text-center py-12 text-muted-foreground">
            <Stethoscope className="mx-auto h-10 w-10 mb-3 opacity-30" />
            <p>No doctors found</p>
          </div>
        ) : (
          filtered.map((doctor) => (
            <div
              key={doctor.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary flex-shrink-0">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground">{doctor.name}</h3>
                  <p className="text-sm text-primary font-medium">{doctor.specialty}</p>
                  <p className="text-xs text-muted-foreground">{doctor.department}</p>
                </div>
                <span className={cn(
                  "text-[11px] font-bold rounded-full px-2.5 py-0.5 flex-shrink-0",
                  doctor.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"
                )}>
                  {doctor.status}
                </span>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground mb-5">
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-primary/60" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-primary/60" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary/60" />
                  <span>{doctor.experience} experience</span>
                </div>
              </div>

              <button
                onClick={() => handleBookClick(doctor.id)}
                disabled={doctor.status !== "Active"}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm shadow-primary/20"
              >
                {doctor.status === "Active" ? "Book Appointment" : "Not Available"}
              </button>
            </div>
          ))
        )}
      </div>

      {isBookingOpen && (
        <AppointmentBookingModal
          preSelectedDoctorId={selectedDoctorId || undefined}
          onClose={() => setIsBookingOpen(false)}
          onBooked={() => toast.success("Redirecting to appointments...")}
        />
      )}
    </div>
  )
}
