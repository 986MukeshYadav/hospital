"use client"

import { useEffect, useState } from "react"
import { hmsStore, MedicalRecord } from "@/lib/store"
import { ClipboardList, Download, Search, Calendar } from "lucide-react"

export default function PatientHistoryPage() {
  const [records, setRecords] = useState<MedicalRecord[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    // Show all records for demo; in production filter by patient id from session
    setRecords(hmsStore.getRecords())
  }, [])

  const filtered = records.filter(
    (r) =>
      (r.diagnosis?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (r.doctor?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  )

  const handleDownload = (record: MedicalRecord) => {
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
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Medical History</h1>
        <p className="text-muted-foreground">Your complete clinical records and prescriptions.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by diagnosis or doctor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            <ClipboardList className="mx-auto h-10 w-10 mb-3 opacity-30" />
            <p className="font-medium">No records found</p>
          </div>
        ) : (
          filtered.map((record) => (
            <div
              key={record.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-primary/20 transition-all"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">{record.diagnosis}</h3>
                    <p className="text-sm text-muted-foreground">Dr: {record.doctor}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {record.date}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(record)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-muted transition-colors flex-shrink-0"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 rounded-xl bg-muted/40 p-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Prescription</p>
                  <p className="text-sm text-foreground">{record.prescription}</p>
                </div>
                {record.notes && (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Notes</p>
                    <p className="text-sm text-foreground">{record.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
