"use client"

import { useState, useEffect } from "react"
import { X, Calendar, Clock, User, Stethoscope } from "lucide-react"
import { hmsStore, Doctor } from "@/lib/store"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react"

const bookingSchema = z.object({
    specialty: z.string().min(1, "Please select a specialty"),
    doctorId: z.string().min(1, "Please select a doctor"),
    date: z.string().min(1, "Date is required"),
    time: z.string().min(1, "Time is required"),
    notes: z.string().optional(),
})

type BookingFormValues = z.infer<typeof bookingSchema>

interface AppointmentBookingModalProps {
    onClose: () => void
    onBooked?: () => void
}

export function AppointmentBookingModal({ onClose, onBooked }: AppointmentBookingModalProps) {
    const { data: session } = useSession()
    const [doctors, setDoctors] = useState<Doctor[]>([])
    const [specialties, setSpecialties] = useState<string[]>([])

    useEffect(() => {
        const allDoctors = hmsStore.getDoctors().filter(d => d.status === "Active")
        setDoctors(allDoctors)
        const uniqueSpecialties = Array.from(new Set(allDoctors.map(d => d.specialty)))
        setSpecialties(uniqueSpecialties)
    }, [])

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            date: new Date().toISOString().split("T")[0],
        }
    })

    const selectedSpecialty = watch("specialty")

    const onSubmit = async (data: BookingFormValues) => {
        const doctor = doctors.find(d => d.id === data.doctorId)
        
        hmsStore.addAppointment({
            patientId: "P-DEMO", // In real app, get from session/patient record
            patient: session?.user?.name || "John Doe",
            doctorId: data.doctorId,
            doctor: doctor?.name || "Unknown Doctor",
            specialty: doctor?.specialty || data.specialty,
            date: data.date,
            time: data.time,
            type: "Consultation",
            status: "Pending",
            notes: data.notes || "",
        })

        await new Promise((resolve) => setTimeout(resolve, 800))
        if (onBooked) onBooked()
        onClose()
    }

    const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
    const labelClass = "text-sm font-medium text-foreground mb-1.5 block"

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Book Appointment</h2>
                    <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted text-muted-foreground transition-colors">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className={labelClass}>Select Specialty</label>
                        <select
                            {...register("specialty")}
                            className={inputClass}
                        >
                            <option value="">Select Specialty</option>
                            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.specialty && <p className="text-xs text-destructive mt-1">{errors.specialty.message}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Select Doctor</label>
                        <select
                            {...register("doctorId")}
                            className={inputClass}
                            disabled={!selectedSpecialty}
                        >
                            <option value="">Select Doctor</option>
                            {doctors
                                .filter(d => d.specialty === selectedSpecialty)
                                .map(d => <option key={d.id} value={d.id}>{d.name}</option>)
                            }
                        </select>
                        {errors.doctorId && <p className="text-xs text-destructive mt-1">{errors.doctorId.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClass}>Date</label>
                            <input
                                type="date"
                                {...register("date")}
                                className={inputClass}
                            />
                            {errors.date && <p className="text-xs text-destructive mt-1">{errors.date.message}</p>}
                        </div>
                        <div>
                            <label className={labelClass}>Time</label>
                            <input
                                type="time"
                                {...register("time")}
                                className={inputClass}
                            />
                            {errors.time && <p className="text-xs text-destructive mt-1">{errors.time.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Reason for visit (optional)</label>
                        <textarea
                            {...register("notes")}
                            className={`${inputClass} resize-none`}
                            rows={2}
                            placeholder="Briefly describe your concern..."
                        />
                    </div>

                    <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/25 transition-all disabled:opacity-50"
                        >
                            {isSubmitting ? "Booking..." : "Confirm Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
