"use client"

import { useState } from "react"
import { CreditCard, Download, Search, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const initialInvoices = [
    { id: "INV-001", patient: "John Doe", amount: 1200.00, status: "Paid", date: "2026-02-18" },
    { id: "INV-002", patient: "Jane Smith", amount: 2500.00, status: "Unpaid", date: "2026-02-19" },
    { id: "INV-003", patient: "Robert Wilson", amount: 750.25, status: "Unpaid", date: "2026-02-19" },
]

export default function BillingPage() {
    const [invoices, setInvoices] = useState(initialInvoices)
    const [searchTerm, setSearchTerm] = useState("")

    const handlePay = (id: string) => {
        setInvoices(invoices.map(inv =>
            inv.id === id ? { ...inv, status: "Paid" } : inv
        ))
    }

    const filteredInvoices = invoices.filter(inv =>
        inv.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing & Payments</h1>
                    <p className="text-muted-foreground">Manage invoices and track hospital revenue.</p>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by patient or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm outline-none focus:ring-1 focus:ring-primary transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Invoice ID</th>
                                <th className="px-6 py-4">Patient</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">{invoice.id}</td>
                                    <td className="px-6 py-4 text-foreground">{invoice.patient}</td>
                                    <td className="px-6 py-4 font-bold text-foreground">₹{invoice.amount.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                                            invoice.status === "Paid"
                                                ? "bg-emerald-500/10 text-emerald-600"
                                                : "bg-amber-500/10 text-amber-600"
                                        )}>
                                            {invoice.status === "Paid" ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-3">
                                            {invoice.status === "Unpaid" && (
                                                <button
                                                    onClick={() => handlePay(invoice.id)}
                                                    className="text-xs font-bold text-primary hover:underline"
                                                >
                                                    Pay Now
                                                </button>
                                            )}
                                            <button className="text-muted-foreground hover:text-foreground">
                                                <Download className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
