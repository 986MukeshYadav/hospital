"use client"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Patient {
  id: string
  name: string
  email: string
  phone: string
  gender: "Male" | "Female" | "Other"
  dateOfBirth: string
  address: string
  status: "Active" | "Inactive"
  createdAt: string
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  department: string
  email: string
  phone: string
  experience: string
  status: "Active" | "On Leave" | "Inactive"
  createdAt: string
}

export interface Appointment {
  id: string
  patientId: string
  patient: string
  doctorId: string
  doctor: string
  specialty: string
  date: string
  time: string
  type: "Consultation" | "Follow-up" | "Emergency"
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled"
  notes: string
  createdAt: string
}

export interface MedicalRecord {
  id: string
  patientId: string
  patient: string
  doctorId: string
  doctor: string
  diagnosis: string
  prescription: string
  notes: string
  date: string
  createdAt: string
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const SEED_PATIENTS: Patient[] = [
  { id: "P-001", name: "Ram Bahadur Thapa", email: "ram@example.com", phone: "+977 9841234567", gender: "Male", dateOfBirth: "1990-05-15", address: "New Baneshwor, Kathmandu", status: "Active", createdAt: "2026-01-10" },
  { id: "P-002", name: "Sita Kumari Baral", email: "sita@example.com", phone: "+977 9812345678", gender: "Female", dateOfBirth: "1988-10-22", address: "Lakeside, Pokhara", status: "Active", createdAt: "2026-01-15" },
  { id: "P-003", name: "Gopal Prasad Yadav", email: "gopal@example.com", phone: "+977 9851098765", gender: "Male", dateOfBirth: "1975-03-08", address: "Nayatola, Biratnagar", status: "Active", createdAt: "2026-02-01" },
]

const SEED_DOCTORS: Doctor[] = [
  { id: "D-001", name: "Dr. Anish Prasad Joshi", specialty: "Cardiology", department: "Cardiac Sciences", email: "anish@hms.com", phone: "+977 9861000001", experience: "12 years", status: "Active", createdAt: "2025-06-01" },
  { id: "D-002", name: "Dr. Pratima Sharma", specialty: "Neurology", department: "Neuro Sciences", email: "pratima@hms.com", phone: "+977 9842000002", experience: "8 years", status: "Active", createdAt: "2025-07-15" },
  { id: "D-003", name: "Dr. Suman K.C.", specialty: "Pediatrics", department: "Child Health", email: "suman@hms.com", phone: "+977 9813000003", experience: "15 years", status: "On Leave", createdAt: "2025-05-10" },
  { id: "D-004", name: "Dr. Bidhya Devi Shah", specialty: "Orthopedics", department: "Bone & Joint", email: "bidhya@hms.com", phone: "+977 9851000004", experience: "10 years", status: "Active", createdAt: "2025-08-20" },
]

const SEED_APPOINTMENTS: Appointment[] = [
  { id: "A-1001", patientId: "P-001", patient: "Ram Bahadur Thapa", doctorId: "D-001", doctor: "Dr. Anish Prasad Joshi", specialty: "Cardiology", date: "2026-04-22", time: "10:30", type: "Consultation", status: "Confirmed", notes: "Regular checkup", createdAt: "2026-04-20" },
  { id: "A-1002", patientId: "P-002", patient: "Sita Kumari Baral", doctorId: "D-002", doctor: "Dr. Pratima Sharma", specialty: "Neurology", date: "2026-04-25", time: "14:15", type: "Follow-up", status: "Pending", notes: "Follow-up on MRI results", createdAt: "2026-04-21" },
  { id: "A-1003", patientId: "P-003", patient: "Gopal Prasad Yadav", doctorId: "D-003", doctor: "Dr. Suman K.C.", specialty: "Pediatrics", date: "2026-04-28", time: "09:00", type: "Consultation", status: "Cancelled", notes: "", createdAt: "2026-04-18" },
]

const SEED_RECORDS: MedicalRecord[] = [
  { id: "REC-001", patientId: "P-001", patient: "Ram Bahadur Thapa", doctorId: "D-001", doctor: "Dr. Anish Prasad Joshi", diagnosis: "Hypertension", prescription: "Amlodipine 5mg once daily", notes: "Monitor BP weekly", date: "2026-02-15", createdAt: "2026-02-15" },
  { id: "REC-002", patientId: "P-002", patient: "Sita Kumari Baral", doctorId: "D-002", doctor: "Dr. Pratima Sharma", diagnosis: "Diabetes Type II", prescription: "Metformin 500mg twice daily", notes: "HbA1c retest in 3 months", date: "2026-02-18", createdAt: "2026-02-18" },
  { id: "REC-003", patientId: "P-003", patient: "Gopal Prasad Yadav", doctorId: "D-003", doctor: "Dr. Suman K.C.", specialty: "Acute Bronchitis", prescription: "Amoxicillin 500mg 3x daily", notes: "Rest and hydration", date: "2026-02-20", createdAt: "2026-02-20" },
]


// ─── Storage Keys ─────────────────────────────────────────────────────────────

const KEYS = {
  patients: "hms_patients",
  doctors: "hms_doctors",
  appointments: "hms_appointments",
  records: "hms_records",
}

// ─── Store Helpers ────────────────────────────────────────────────────────────

const STORE_VERSION = "2.0-nepali"

function load<T>(key: string, seed: T[]): T[] {
  if (typeof window === "undefined") return seed
  try {
    // Force reset if version mismatch
    const currentVersion = localStorage.getItem("hms_store_version")
    if (currentVersion !== STORE_VERSION) {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k))
      localStorage.setItem("hms_store_version", STORE_VERSION)
      localStorage.setItem(key, JSON.stringify(seed))
      return seed
    }

    const raw = localStorage.getItem(key)
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(seed))
      return seed
    }
    return JSON.parse(raw) as T[]
  } catch {
    return seed
  }
}

function save<T>(key: string, data: T[]): void {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

function generateId(prefix: string, items: { id: string }[]): string {
  const nums = items.map(i => parseInt(i.id.replace(/\D/g, ""), 10)).filter(Boolean)
  const next = nums.length > 0 ? Math.max(...nums) + 1 : 1
  return `${prefix}-${String(next).padStart(3, "0")}`
}

// ─── Public Store API ─────────────────────────────────────────────────────────

export const hmsStore = {
  // Patients
  getPatients: (): Patient[] => load<Patient>(KEYS.patients, SEED_PATIENTS),
  addPatient: (data: Omit<Patient, "id" | "createdAt">): Patient => {
    const patients = load<Patient>(KEYS.patients, SEED_PATIENTS)
    const newPatient: Patient = {
      ...data,
      id: generateId("P", patients),
      createdAt: new Date().toISOString().split("T")[0],
    }
    save(KEYS.patients, [newPatient, ...patients])
    return newPatient
  },
  updatePatient: (id: string, data: Partial<Patient>): void => {
    const patients = load<Patient>(KEYS.patients, SEED_PATIENTS)
    save(KEYS.patients, patients.map(p => p.id === id ? { ...p, ...data } : p))
  },
  deletePatient: (id: string): void => {
    const patients = load<Patient>(KEYS.patients, SEED_PATIENTS)
    save(KEYS.patients, patients.filter(p => p.id !== id))
  },

  // Doctors
  getDoctors: (): Doctor[] => load<Doctor>(KEYS.doctors, SEED_DOCTORS),
  addDoctor: (data: Omit<Doctor, "id" | "createdAt">): Doctor => {
    const doctors = load<Doctor>(KEYS.doctors, SEED_DOCTORS)
    const newDoctor: Doctor = {
      ...data,
      id: generateId("D", doctors),
      createdAt: new Date().toISOString().split("T")[0],
    }
    save(KEYS.doctors, [newDoctor, ...doctors])
    return newDoctor
  },
  updateDoctor: (id: string, data: Partial<Doctor>): void => {
    const doctors = load<Doctor>(KEYS.doctors, SEED_DOCTORS)
    save(KEYS.doctors, doctors.map(d => d.id === id ? { ...d, ...data } : d))
  },
  deleteDoctor: (id: string): void => {
    const doctors = load<Doctor>(KEYS.doctors, SEED_DOCTORS)
    save(KEYS.doctors, doctors.filter(d => d.id !== id))
  },

  // Appointments
  getAppointments: (): Appointment[] => load<Appointment>(KEYS.appointments, SEED_APPOINTMENTS),
  addAppointment: (data: Omit<Appointment, "id" | "createdAt">): Appointment => {
    const appointments = load<Appointment>(KEYS.appointments, SEED_APPOINTMENTS)
    const newAppt: Appointment = {
      ...data,
      id: generateId("A", appointments),
      createdAt: new Date().toISOString().split("T")[0],
    }
    save(KEYS.appointments, [newAppt, ...appointments])
    return newAppt
  },
  updateAppointment: (id: string, data: Partial<Appointment>): void => {
    const appointments = load<Appointment>(KEYS.appointments, SEED_APPOINTMENTS)
    save(KEYS.appointments, appointments.map(a => a.id === id ? { ...a, ...data } : a))
  },
  deleteAppointment: (id: string): void => {
    const appointments = load<Appointment>(KEYS.appointments, SEED_APPOINTMENTS)
    save(KEYS.appointments, appointments.filter(a => a.id !== id))
  },

  // Records
  getRecords: (): MedicalRecord[] => load<MedicalRecord>(KEYS.records, SEED_RECORDS),
  addRecord: (data: Omit<MedicalRecord, "id" | "createdAt">): MedicalRecord => {
    const records = load<MedicalRecord>(KEYS.records, SEED_RECORDS)
    const newRecord: MedicalRecord = {
      ...data,
      id: generateId("REC", records),
      createdAt: new Date().toISOString().split("T")[0],
    }
    save(KEYS.records, [newRecord, ...records])
    return newRecord
  },
  updateRecord: (id: string, data: Partial<MedicalRecord>): void => {
    const records = load<MedicalRecord>(KEYS.records, SEED_RECORDS)
    save(KEYS.records, records.map(r => r.id === id ? { ...r, ...data } : r))
  },
  deleteRecord: (id: string): void => {
    const records = load<MedicalRecord>(KEYS.records, SEED_RECORDS)
    save(KEYS.records, records.filter(r => r.id !== id))
  },

  // Clear all (for testing)
  clearAll: () => {
    Object.values(KEYS).forEach(k => localStorage.removeItem(k))
  },
}
