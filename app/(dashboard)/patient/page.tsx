export default function PatientDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Patient Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, John. Manage your health and appointments.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4">Upcoming Appointment</h3>
                    <p className="text-lg font-medium text-foreground">Dr. Smith</p>
                    <p className="text-sm text-muted-foreground">Feb 20, 2026 • 10:30 AM</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4">Latest Prescriptions</h3>
                    <p className="text-sm text-muted-foreground">Available to download</p>
                    <button className="mt-4 text-sm font-semibold text-primary hover:underline">View All</button>
                </div>
            </div>
        </div>
    )
}
