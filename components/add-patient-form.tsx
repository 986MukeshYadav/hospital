"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  status: z.enum(["Active", "Inactive"]),
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
    defaultValues: { status: "Active", gender: "Male" },
  })

  const onSubmit = async (data: PatientFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600))
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
          <input {...register("name")} className={inputClass} placeholder="Ram Bahadur Thapa" />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="ram@example.com" />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Phone Number</label>
          <input {...register("phone")} className={inputClass} placeholder="+977 9841234567" />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Gender</label>
          <select {...register("gender")} className={inputClass}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Date of Birth</label>
          <input type="date" {...register("dateOfBirth")} className={inputClass} />
          {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select {...register("status")} className={inputClass}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Address</label>
        <textarea
          {...register("address")}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Full address details..."
        />
        {errors.address && <p className={errorClass}>{errors.address.message}</p>}
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-border">
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
          className="rounded-lg bg-primary px-5 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50 shadow-md shadow-primary/20"
        >
          {isSubmitting ? "Adding..." : "Add Patient"}
        </button>
      </div>
    </form>
  )
}
