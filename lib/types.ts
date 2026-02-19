export type UserRole = "Admin" | "Doctor" | "Staff" | "Patient"

export interface Patient {
    id: string
    name: string
    email: string
    phone: string
    gender: "Male" | "Female" | "Other"
    dateOfBirth: string
    address: string
    medicalHistory?: string[]
    status: "Active" | "Inactive"
    lastVisit?: string
}

export interface Doctor {
    id: string
    name: string
    email: string
    specialization: string
    department: string
    availability: {
        day: string
        slots: string[]
    }[]
    status: "Available" | "On Leave" | "Busy"
}

export interface Appointment {
    id: string
    patientId: string
    patientName: string
    doctorId: string
    doctorName: string
    date: string
    time: string
    type: "Consultation" | "Follow-up" | "Emergency"
    status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
}
