"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from "lucide-react"

const patientSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    gender: z.enum(["Male", "Female", "Other"]),
    dateOfBirth: z.string().min(1, "Date of birth is required"),
    address: z.string().min(5, "Address must be at least 5 characters"),
})

type PatientFormValues = z.infer<typeof patientSchema>

interface AddPatientFormProps {
    onClose: () => void
    onSubmitSuccess: (data: PatientFormValues) => void
}

export function AddPatientForm({ onClose, onSubmitSuccess }: AddPatientFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PatientFormValues>({
        resolver: zodResolver(patientSchema),
    })

    const onSubmit = async (data: PatientFormValues) => {
        // Simulate API call
        console.log("Submitting patient data:", data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        onSubmitSuccess(data)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">Add New Patient</h2>
                    <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-foreground">Full Name</label>
                            <input
                                {...register("name")}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-foreground">Email</label>
                            <input
                                {...register("email")}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-foreground">Phone Number</label>
                            <input
                                {...register("phone")}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                                placeholder="+91 9876543210"
                            />
                            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-foreground">Gender</label>
                            <select
                                {...register("gender")}
                                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            {errors.gender && <p className="text-xs text-destructive">{errors.gender.message}</p>}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Date of Birth</label>
                        <input
                            type="date"
                            {...register("dateOfBirth")}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                        />
                        {errors.dateOfBirth && <p className="text-xs text-destructive">{errors.dateOfBirth.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Address</label>
                        <textarea
                            {...register("address")}
                            rows={3}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
                            placeholder="Full address details..."
                        />
                        {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting ? "Adding..." : "Add Patient"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
