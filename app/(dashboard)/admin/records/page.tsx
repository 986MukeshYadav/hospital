"use client"

import { useState, useEffect } from "react"
import { Search, FileText, Download, ClipboardList, Plus, X, Trash2 } from "lucide-react"
import { hmsStore, MedicalRecord } from "@/lib/store"
import { AddRecordForm } from "@/components/add-record-form"

export default function RecordsPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  useEffect(() => {
    setRecords(hmsStore.getRecords())
  }, [])

  const filteredRecords = records.filter(
    (r) =>
      r.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.doctor.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = (data: Omit<MedicalRecord, "id" | "createdAt">) => {
    hmsStore.addRecord(data)
    setRecords(hmsStore.getRecords())
    setIsAddModalOpen(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this medical record?")) return
    hmsStore.deleteRecord(id)
    setRecords(hmsStore.getRecords())
  }

  // Download a single record as text
  const handleDownloadRecord = (record: MedicalRecord) => {
    const text = [
      `MEDICAL RECORD — ${record.id}`,
      `Date: ${record.date}`,
      ``,
      `Patient: ${record.patient}`,
      `Doctor: ${record.doctor}`,
      ``,
      `Diagnosis: ${record.diagnosis}`,
      `Prescription: ${record.prescription}`,
      `Notes: ${record.notes || "—"}`,
    ].join("\n")
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
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Medical Records</h1>
          <p className="text-muted-foreground">Access and manage comprehensive patient clinical history.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Add Record
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by patient, diagnosis or doctor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredRecords.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <ClipboardList className="mx-auto h-10 w-10 mb-3 opacity-30" />
              <p className="font-medium">No records found</p>
            </div>
          ) : (
            filteredRecords.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ClipboardList className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{record.patient}</h3>
                    <p className="text-sm font-medium text-primary/80">{record.diagnosis}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{record.prescription}</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-10">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Doctor</p>
                    <p className="text-xs font-medium text-foreground">{record.doctor}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Date</p>
                    <p className="text-xs font-medium text-foreground">{record.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">ID</p>
                    <p className="text-xs font-mono text-muted-foreground">{record.id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDownloadRecord(record)}
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </button>
                  <button
                    onClick={() => handleDelete(record.id)}
                    className="rounded-lg p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Record Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Add Medical Record</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Enter patient diagnosis and prescription</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-2 hover:bg-muted text-muted-foreground"
              >
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
