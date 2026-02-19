"use client"

import { useState } from "react"
import { Search, MapPin, Star, Calendar, ChevronRight } from "lucide-react"

import { AppointmentBookingModal } from "@/components/appointment-booking-modal"

const mockDoctors = [
    {
        id: "1",
        name: "Dr. Sarah Smith",
        specialty: "Cardiologist",
        experience: "12 years",
        rating: 4.9,
        location: "Block A, New Wing",
        available: "Today"
    },
    {
        id: "2",
        name: "Dr. James Wilson",
        specialty: "Neurologist",
        experience: "8 years",
        rating: 4.7,
        location: "Main Building, 2nd Floor",
        available: "Tomorrow"
    },
    {
        id: "3",
        name: "Dr. Emily Chen",
        specialty: "Pediatrician",
        experience: "15 years",
        rating: 5.0,
        location: "Children's Ward",
        available: "Today"
    },
]

export default function PatientDoctorsPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [isBookingOpen, setIsBookingOpen] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Find a Doctor</h1>
                    <p className="text-muted-foreground">Browse through our qualified medical specialists.</p>
                </div>
            </div>

            {isBookingOpen && <AppointmentBookingModal onClose={() => setIsBookingOpen(false)} />}

            <div className="flex gap-4 items-center bg-card p-4 rounded-2xl border border-border shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by name or specialty..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                </div>
                <button className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors">
                    Filter
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockDoctors.map((doctor) => (
                    <div key={doctor.id} className="group relative rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                        <div className="flex items-start justify-between mb-4">
                            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-lg text-primary">
                                {doctor.name.split(" ")[1].charAt(0)}
                            </div>
                            <div className="flex items-center gap-1 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg text-xs font-bold">
                                <Star className="h-3 w-3 fill-amber-500" />
                                {doctor.rating}
                            </div>
                        </div>

                        <div className="space-y-1 mb-6">
                            <h3 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">{doctor.name}</h3>
                            <p className="text-sm font-medium text-primary/80">{doctor.specialty}</p>
                            <div className="flex items-center gap-4 pt-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="h-3.5 w-3.5" />
                                    {doctor.available}
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="h-3.5 w-3.5" />
                                    {doctor.location}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsBookingOpen(true)}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary/5 py-3 text-sm font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                            Book Appointment
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
