"use client"

import { useState, useEffect } from "react"
import { Search, UserRound, MoreVertical, Plus, Stethoscope, Trash2, Pencil, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { hmsStore, Doctor } from "@/lib/store"
import { AddDoctorForm } from "@/components/add-doctor-form"

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null)

  useEffect(() => {
    setDoctors(hmsStore.getDoctors())
  }, [])

  const filteredDoctors = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAdd = (data: Omit<Doctor, "id" | "createdAt">) => {
    const newDoc = hmsStore.addDoctor(data)
    setDoctors(hmsStore.getDoctors())
    setIsAddModalOpen(false)
  }

  const handleToggleStatus = (id: string) => {
    const doc = doctors.find((d) => d.id === id)
    if (!doc) return
    const newStatus = doc.status === "Active" ? "Inactive" : "Active"
    hmsStore.updateDoctor(id, { status: newStatus })
    setDoctors(hmsStore.getDoctors())
    setMenuOpenId(null)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to remove this doctor?")) return
    hmsStore.deleteDoctor(id)
    setDoctors(hmsStore.getDoctors())
    setMenuOpenId(null)
  }

  const statusColors: Record<string, string> = {
    Active: "bg-emerald-500/10 text-emerald-600",
    "On Leave": "bg-amber-500/10 text-amber-600",
    Inactive: "bg-muted text-muted-foreground",
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Doctor Management</h1>
          <p className="text-muted-foreground">Manage hospital staff and doctor schedules.</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
        >
          <Plus className="h-4 w-4" />
          Add Doctor
        </button>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Doctors", value: doctors.length, color: "text-foreground" },
          { label: "Active", value: doctors.filter((d) => d.status === "Active").length, color: "text-emerald-600" },
          { label: "On Leave", value: doctors.filter((d) => d.status === "On Leave").length, color: "text-amber-600" },
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
              placeholder="Search by name, specialty or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {filteredDoctors.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <Stethoscope className="mx-auto h-10 w-10 mb-3 opacity-30" />
              <p className="font-medium">No doctors found</p>
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{doctor.name}</h3>
                    <p className="text-sm text-primary/80 font-medium">{doctor.specialty}</p>
                    <p className="text-xs text-muted-foreground">{doctor.department}</p>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-10">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Email</p>
                    <p className="text-xs font-medium text-foreground">{doctor.email}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Experience</p>
                    <p className="text-xs font-medium text-foreground">{doctor.experience}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5">Phone</p>
                    <p className="text-xs font-medium text-foreground">{doctor.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                      statusColors[doctor.status] ?? "bg-muted text-muted-foreground"
                    )}
                  >
                    {doctor.status}
                  </span>

                  <div className="relative">
                    <button
                      onClick={() => setMenuOpenId(menuOpenId === doctor.id ? null : doctor.id)}
                      className="rounded-lg p-2 hover:bg-muted text-muted-foreground transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                    {menuOpenId === doctor.id && (
                      <div className="absolute right-0 top-9 z-50 w-44 rounded-xl border border-border bg-card shadow-xl py-1">
                        <button
                          onClick={() => handleToggleStatus(doctor.id)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Toggle Status
                        </button>
                        <button
                          onClick={() => handleDelete(doctor.id)}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete Doctor
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Doctor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-foreground">Add New Doctor</h2>
                <p className="text-sm text-muted-foreground mt-0.5">Fill in the doctor's details below</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="rounded-lg p-2 hover:bg-muted text-muted-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <AddDoctorForm
              onClose={() => setIsAddModalOpen(false)}
              onSubmitSuccess={handleAdd}
            />
          </div>
        </div>
      )}
    </div>
  )
}
