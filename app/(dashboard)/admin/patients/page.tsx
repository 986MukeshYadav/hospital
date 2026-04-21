"use client"

import { useState, useEffect } from "react"
import { Search, User, Phone, MapPin, Plus, MoreVertical, Trash2, X } from "lucide-react"
import { hmsStore, Patient } from "@/lib/store"
import { AddPatientForm } from "@/components/add-patient-form"
import { cn } from "@/lib/utils"

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  useEffect(() => {
    setPatients(hmsStore.getPatients())
  }, [])

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = (data: Omit<Patient, "id" | "createdAt">) => {
    hmsStore.addPatient(data)
    setPatients(hmsStore.getPatients())
    setIsAddModalOpen(false)
  }

  const handleToggleStatus = (id: string) => {
    const patient = patients.find((p) => p.id === id)
    if (!patient) return
    hmsStore.updatePatient(id, { status: patient.status === "Active" ? "Inactive" : "Active" })
    setPatients(hmsStore.getPatients())
    setMenuOpenId(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Delete this patient? This action cannot be undone.")) return
    hmsStore.deletePatient(id)
    setPatients(hmsStore.getPatients())
    setMenuOpenId(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Patient Management</h1>
          <p className="text-muted-foreground">Manage patient records and clinical information.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Add Patient
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Patients", value: patients.length, color: "text-foreground" },
          { label: "Active", value: patients.filter((p) => p.status === "Active").length, color: "text-emerald-600" },
          { label: "Inactive", value: patients.filter((p) => p.status === "Inactive").length, color: "text-muted-foreground" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.label}</p>
            <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border bg-muted/30">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredPatients.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <User className="mx-auto h-10 w-10 mb-3 opacity-30" />
              <p className="font-medium">No patients found</p>
            </div>
          ) : (
            filteredPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                    {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{patient.id}</span>
                      <span>•</span>
                      <span>{patient.gender}</span>
                      <span>•</span>
                      <span className={cn(
                        "text-[11px] font-bold",
                        patient.status === "Active" ? "text-emerald-600" : "text-muted-foreground"
                      )}>{patient.status}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-3.5 w-3.5" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-[180px] truncate">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                    {patient.address}
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setMenuOpenId(menuOpenId === patient.id ? null : patient.id)}
                    className="rounded-lg p-2 hover:bg-muted text-muted-foreground transition-colors"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                  {menuOpenId === patient.id && (
                    <div className="absolute right-0 top-9 z-50 w-44 rounded-xl border border-border bg-card shadow-xl py-1">
                      <button
                        onClick={() => handleToggleStatus(patient.id)}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                      >
                        Toggle Status
                      </button>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete Patient
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Patient Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Add New Patient</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Fill in the patient's details below</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-2 hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AddPatientForm
              onClose={() => setIsAddModalOpen(false)}
              onSubmitSuccess={handleAdd}
            />
          </div>
        </div>
      )}
    </div>
  )
}
