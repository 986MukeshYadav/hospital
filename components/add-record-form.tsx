"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { hmsStore } from "@/lib/store"

const recordSchema = z.object({
  patientId: z.string().min(1, "Patient is required"),
  doctorId: z.string().min(1, "Doctor is required"),
  diagnosis: z.string().min(3, "Diagnosis is required"),
  prescription: z.string().min(3, "Prescription is required"),
  notes: z.string().optional(),
  date: z.string().min(1, "Date is required"),
})

type RecordFormValues = z.infer<typeof recordSchema>

interface AddRecordFormProps {
  onClose: () => void
  onSubmitSuccess: (data: RecordFormValues & { patient: string; doctor: string }) => void
}

export function AddRecordForm({ onClose, onSubmitSuccess }: AddRecordFormProps) {
  const patients = hmsStore.getPatients()
  const doctors = hmsStore.getDoctors()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RecordFormValues>({
    resolver: zodResolver(recordSchema),
    defaultValues: { date: new Date().toISOString().split("T")[0] },
  })

  const onSubmit = async (data: RecordFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const patient = patients.find(p => p.id === data.patientId)
    const doctor = doctors.find(d => d.id === data.doctorId)
    onSubmitSuccess({
      ...data,
      patient: patient?.name ?? data.patientId,
      doctor: doctor?.name ?? data.doctorId,
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
            {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
          {errors.patientId && <p className={errorClass}>{errors.patientId.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Doctor</label>
          <select {...register("doctorId")} className={inputClass}>
            <option value="">Select Doctor</option>
            {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
          </select>
          {errors.doctorId && <p className={errorClass}>{errors.doctorId.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Diagnosis</label>
        <input {...register("diagnosis")} className={inputClass} placeholder="e.g. Hypertension" />
        {errors.diagnosis && <p className={errorClass}>{errors.diagnosis.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Prescription</label>
        <input {...register("prescription")} className={inputClass} placeholder="e.g. Amlodipine 5mg once daily" />
        {errors.prescription && <p className={errorClass}>{errors.prescription.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Clinical Notes</label>
        <textarea
          {...register("notes")}
          rows={3}
          className={`${inputClass} resize-none`}
          placeholder="Additional observations or instructions..."
        />
      </div>

      <div>
        <label className={labelClass}>Date</label>
        <input type="date" {...register("date")} className={inputClass} />
        {errors.date && <p className={errorClass}>{errors.date.message}</p>}
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
          {isSubmitting ? "Saving..." : "Save Record"}
        </button>
      </div>
    </form>
  )
}
