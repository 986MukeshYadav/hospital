"use client"

import { useState } from "react"
import { Search, UserPlus, MoreVertical, User, Phone, MapPin, Plus } from "lucide-react"
import { AddPatientForm } from "@/components/add-patient-form"

const initialPatients = [
    { id: "P-001", name: "John Doe", email: "john@example.com", phone: "+1 234 567 890", gender: "Male", dob: "1990-05-15", address: "123 Main St" },
    { id: "P-002", name: "Jane Smith", email: "jane@example.com", phone: "+1 234 567 891", gender: "Female", dob: "1988-10-22", address: "456 Oak Ave" },
]

export default function PatientsPage() {
    const [patients, setPatients] = useState(initialPatients)
    const [searchTerm, setSearchTerm] = useState("")
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleAddPatient = (data: any) => {
        const newPatient = {
            id: `P-00${patients.length + 1}`,
            ...data,
        }
        setPatients([newPatient, ...patients])
        setIsAddModalOpen(false)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Patients</h1>
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

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="divide-y divide-border">
                    {filteredPatients.map((patient) => (
                        <div key={patient.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-foreground">{patient.name}</h3>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span>ID: {patient.id}</span>
                                        <span>•</span>
                                        <span>{patient.gender}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:flex items-center gap-8">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <Phone className="h-4 w-4" />
                                    {patient.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    {patient.address}
                                </div>
                            </div>

                            <button className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                                <MoreVertical className="h-5 w-5" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl relative">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute right-4 top-4 rounded-lg p-2 hover:bg-muted text-muted-foreground"
                        >
                            ×
                        </button>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-foreground">Add New Patient</h2>
                        </div>
                        <AddPatientForm onClose={() => setIsAddModalOpen(false)} onSubmitSuccess={handleAddPatient} />
                    </div>
                </div>
            )}
        </div>
    )
}
