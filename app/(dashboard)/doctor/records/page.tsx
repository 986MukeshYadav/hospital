"use client"

import { useEffect, useState } from "react"
import { Search, ClipboardList, Download, Calendar, User, Plus, X } from "lucide-react"
import { hmsStore, MedicalRecord } from "@/lib/store"
import { AddRecordForm } from "@/components/add-record-form"

export default function DoctorRecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    setRecords(hmsStore.getRecords())
  }, [])

  const filtered = records.filter(
    (r) =>
      (r.patient?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (r.diagnosis?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  )

  const handleAdd = (data: any) => {
    hmsStore.addRecord(data)
    setRecords(hmsStore.getRecords())
    setIsAddModalOpen(false)
  }

  const handleDownload = (record: MedicalRecord) => {
      const text = `
MEDICAL RECORD - ${record.id}
Date: ${record.date}
Patient: ${record.patient}
Doctor: ${record.doctor}
Diagnosis: ${record.diagnosis}
Prescription: ${record.prescription}
Notes: ${record.notes || "N/A"}
      `.trim()
      const blob = new Blob([text], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `record_${record.id}.txt`
      a.click()
      URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Clinical Records</h1>
          <p className="text-muted-foreground">Manage and review patient diagnosis history.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Add New Record
        </button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by patient or diagnosis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <ClipboardList className="mx-auto h-10 w-10 mb-3 opacity-30" />
              <p className="font-medium">No records found</p>
            </div>
          ) : (
            filtered.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{record.patient}</h3>
                    <p className="text-sm text-primary font-medium">{record.diagnosis}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{record.prescription}</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-10 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    {record.date}
                  </div>
                  <button
                    onClick={() => handleDownload(record)}
                    className="inline-flex items-center gap-1.5 text-primary hover:underline font-medium"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">New Medical Record</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                    <X className="h-5 w-5" />
                </button>
            </div>
            <AddRecordForm
                onClose={() => setIsAddModalOpen(false)}
                onSubmitSuccess={handleAdd}
            />
          </div>
        </div>
      )}
    </div>
  )
}
