export default function DoctorDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Doctor Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Dr. Smith. Here is your schedule for today.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4">Today's Appointments</h3>
                    <p className="text-3xl font-bold text-primary">8</p>
                    <p className="text-sm text-muted-foreground mt-2">Next: John Doe at 10:30 AM</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="font-semibold text-foreground mb-4">Pending Reports</h3>
                    <p className="text-3xl font-bold text-amber-500">12</p>
                    <p className="text-sm text-muted-foreground mt-2">Requires review</p>
                </div>
            </div>
        </div>
    )
}
