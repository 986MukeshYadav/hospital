"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { hmsStore } from "@/lib/store"

const appointmentSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  doctorId: z.string().min(1, "Doctor is required"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.enum(["Consultation", "Follow-up", "Emergency"]),
  notes: z.string().optional(),
})

type AppointmentFormValues = z.infer<typeof appointmentSchema>

interface AddAppointmentFormProps {
  onClose: () => void
  onSubmitSuccess: (data: AppointmentFormValues & { patient: string; doctor: string; specialty: string }) => void
}

export function AddAppointmentForm({ onClose, onSubmitSuccess }: AddAppointmentFormProps) {
  const patients = hmsStore.getPatients()
  const doctors = hmsStore.getDoctors()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentFormValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      type: "Consultation",
      date: new Date().toISOString().split("T")[0],
    },
  })

  const selectedDoctorId = watch("doctorId")

  const onSubmit = async (data: AppointmentFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const patient = patients.find((p) => p.id === data.patientId)
    const doctor = doctors.find((d) => d.id === data.doctorId)
    onSubmitSuccess({
      ...data,
      patient: patient?.name ?? "",
      doctor: doctor?.name ?? "",
      specialty: doctor?.specialty ?? "",
    })
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
  const labelClass = "block text-sm font-medium text-foreground mb-1"
  const errorClass = "text-xs text-destructive mt-0.5"

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Patient</label>
          <select {...register("patientId")} className={inputClass}>
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          {errors.patientId && <p className={errorClass}>{errors.patientId.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Doctor</label>
          <select {...register("doctorId")} className={inputClass}>
            <option value="">Select Doctor</option>
            {doctors.filter(d => d.status === "Active").map((d) => (
              <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
            ))}
          </select>
          {errors.doctorId && <p className={errorClass}>{errors.doctorId.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Date</label>
          <input type="date" {...register("date")} className={inputClass} />
          {errors.date && <p className={errorClass}>{errors.date.message}</p>}
        </div>

        <div>
          <label className={labelClass}>Time</label>
          <input type="time" {...register("time")} className={inputClass} />
          {errors.time && <p className={errorClass}>{errors.time.message}</p>}
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Appointment Type</label>
          <select {...register("type")} className={inputClass}>
            <option value="Consultation">Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Emergency">Emergency</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Notes (optional)</label>
        <textarea
          {...register("notes")}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Reason for visit or special instructions..."
        />
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
          {isSubmitting ? "Booking..." : "Book Appointment"}
        </button>
      </div>
    </form>
  )
}
