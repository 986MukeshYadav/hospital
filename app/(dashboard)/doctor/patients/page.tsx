"use client"

import { useEffect, useState } from "react"
import { hmsStore, Patient } from "@/lib/store"
import { Search, User, Phone, MapPin, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    setPatients(hmsStore.getPatients())
  }, [])

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">My Patients</h1>
        <p className="text-muted-foreground">Browse and review patient profiles.</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
        />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="p-12 text-center text-muted-foreground">
              <User className="mx-auto h-10 w-10 mb-3 opacity-30" />
              <p className="font-medium">No patients found</p>
            </div>
          ) : (
            filtered.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm">
                    {patient.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span className="font-mono bg-muted px-1.5 py-0.5 rounded">{patient.id}</span>
                      <span>•</span>
                      <span>{patient.gender}</span>
                      <span>•</span>
                      <span className={cn(
                        "font-bold",
                        patient.status === "Active" ? "text-emerald-600" : "text-muted-foreground"
                      )}>{patient.status}</span>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3.5 w-3.5" />
                    DOB: {patient.dateOfBirth}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
