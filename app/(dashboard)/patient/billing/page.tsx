"use client"

import { useState } from "react"
import { CreditCard, Download, Search, CheckCircle2, Clock, IndianRupee, Printer } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const initialInvoices = [
    { id: "INV-001", description: "General Consultation", amount: 500.00, status: "Paid", date: "2026-04-18" },
    { id: "INV-002", description: "Blood Test & Pharmacy", amount: 1250.00, status: "Paid", date: "2026-04-20" },
]

export default function PatientBillingPage() {
    const [invoices, setInvoices] = useState(initialInvoices)

    const handlePay = (id: string) => {
        setInvoices(invoices.map(inv =>
            inv.id === id ? { ...inv, status: "Paid" } : inv
        ))
        toast.success("Payment successful!", {
            description: `Invoice ${id} has been marked as paid.`,
        })
    }

    const handleDownload = async (invoice: any) => {
        toast.promise(
            (async () => {
                await new Promise(resolve => setTimeout(resolve, 1200))
                
                const text = [
                    `INVOICE: ${invoice.id}`,
                    `Date: ${invoice.date}`,
                    `Description: ${invoice.description}`,
                    `Amount: ₹${invoice.amount.toLocaleString()}`,
                    `Status: ${invoice.status}`,
                    ``,
                    `Thank you for using our Hospital Management System.`,
                ].join("\n")
                
                const blob = new Blob([text], { type: "text/plain" })
                const url = URL.createObjectURL(blob)
                const a = document.createElement("a")
                a.href = url
                a.download = `invoice_${invoice.id}.txt`
                a.click()
                URL.revokeObjectURL(url)
            })(),
            {
                loading: `Preparing invoice ${invoice.id}...`,
                success: `Invoice ${invoice.id} downloaded successfully.`,
                error: "Failed to download invoice.",
            }
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Billing & Payments</h1>
                <p className="text-muted-foreground">Manage your invoices and view payment history.</p>
            </div>

            {/* Billing Summary */}
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Outstanding</p>
                    <div className="flex items-center gap-2">
                        <IndianRupee className="h-6 w-6 text-destructive" />
                        <span className="text-3xl font-bold text-foreground">
                            {invoices.filter(i => i.status === "Unpaid").reduce((acc, current) => acc + current.amount, 0).toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Total Paid</p>
                    <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                        <span className="text-3xl font-bold text-foreground">
                            {invoices.filter(i => i.status === "Paid").reduce((acc, current) => acc + current.amount, 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border bg-muted/30 font-semibold text-foreground">
                    Invoice History
                </div>

                <div className="divide-y divide-border">
                    {invoices.length === 0 ? (
                        <div className="p-12 text-center text-muted-foreground">No invoices found</div>
                    ) : (
                        invoices.map((invoice) => (
                            <div key={invoice.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-muted/30 transition-all gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                        <CreditCard className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-foreground">{invoice.description}</h3>
                                        <p className="text-sm text-muted-foreground">Invoice: {invoice.id} • {invoice.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 justify-between sm:justify-end">
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-foreground">₹{invoice.amount.toLocaleString()}</p>
                                        <span className={cn(
                                            "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
                                            invoice.status === "Paid"
                                                ? "bg-emerald-500/10 text-emerald-600"
                                                : "bg-amber-500/10 text-amber-600"
                                        )}>
                                            {invoice.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {invoice.status === "Unpaid" && (
                                            <button
                                                onClick={() => handlePay(invoice.id)}
                                                className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition-all shadow-sm shadow-primary/20"
                                            >
                                                Pay Now
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDownload(invoice)}
                                            className="rounded-lg border border-border p-2 hover:bg-muted text-muted-foreground transition-all"
                                        >
                                            <Download className="h-4 w-4" />
                                        </button>
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
