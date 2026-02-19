"use client"

import { useState } from "react"
import { X, Calendar, Clock, User, Stethoscope } from "lucide-react"

const specialties = ["Cardiology", "Neurology", "Pediatrics", "Dermatology", "Orthopedics"]
const doctors = [
    { id: "1", name: "Dr. Sarah Smith", specialty: "Cardiology" },
    { id: "2", name: "Dr. James Wilson", specialty: "Neurology" },
    { id: "3", name: "Dr. Emily Chen", specialty: "Pediatrics" },
]

export function AppointmentBookingModal({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        specialty: "",
        doctorId: "",
        date: "",
        time: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Booking appointment:", formData)
        alert("Appointment booked successfully!")
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Book Appointment</h2>
                    <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Select Specialty</label>
                            <select
                                value={formData.specialty}
                                onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                                required
                            >
                                <option value="">Select Specialty</option>
                                {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-foreground">Select Doctor</label>
                            <select
                                value={formData.doctorId}
                                onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                                required
                            >
                                <option value="">Select Doctor</option>
                                {doctors.filter(d => !formData.specialty || d.specialty === formData.specialty).map(d => (
                                    <option key={d.id} value={d.id}>{d.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                                    required
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-foreground">Time</label>
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 transition-all"
                        >
                            Confirm Appointment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
