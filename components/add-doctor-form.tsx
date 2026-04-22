"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X } from "lucide-react"

const doctorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  specialty: z.string().min(2, "Specialty is required"),
  department: z.string().min(2, "Department is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  experience: z.string().min(1, "Experience is required"),
  status: z.enum(["Active", "On Leave", "Inactive"]),
})

type DoctorFormValues = z.infer<typeof doctorSchema>

interface AddDoctorFormProps {
  onClose: () => void
  onSubmitSuccess: (data: DoctorFormValues) => void
}

const specialties = [
  "Cardiology", "Neurology", "Pediatrics", "Dermatology",
  "Orthopedics", "Gynecology", "Oncology", "Psychiatry",
  "Radiology", "General Medicine", "ENT", "Ophthalmology",
]

const departments = [
  "Cardiac Sciences", "Neuro Sciences", "Child Health", "Skin & Cosmetics",
  "Bone & Joint", "Women's Health", "Cancer Care", "Mental Health",
  "Imaging & Diagnostics", "General OPD", "Head & Neck", "Eye Care",
]

export function AddDoctorForm({ onClose, onSubmitSuccess }: AddDoctorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorSchema),
    defaultValues: { status: "Active" },
  })

  const onSubmit = async (data: DoctorFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSubmitSuccess(data)
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
  const labelClass = "block text-sm font-medium text-foreground mb-1"
  const errorClass = "text-xs text-destructive mt-0.5"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Full Name</label>
          <input {...register("name")} className={inputClass} placeholder="Dr. Anish Prasad Joshi" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="doctor@hms.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input {...register("phone")} className={inputClass} placeholder="+977 9861000001" />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Experience</label>
          <input {...register("experience")} className={inputClass} placeholder="e.g. 10 years" />
          {errors.experience && <p className={errorClass}>{errors.experience.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Specialty</label>
          <select {...register("specialty")} className={inputClass}>
            <option value="">Select Specialty</option>
            {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          {errors.specialty && <p className={errorClass}>{errors.specialty.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Department</label>
          <select {...register("department")} className={inputClass}>
            <option value="">Select Department</option>
            {departments.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          {errors.department && <p className={errorClass}>{errors.department.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select {...register("status")} className={inputClass}>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
          {errors.status && <p className={errorClass}>{errors.status.message}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border mt-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
        >
          {isSubmitting ? "Adding..." : "Add Doctor"}
        </button>
      </div>
    </form>
  )
}
