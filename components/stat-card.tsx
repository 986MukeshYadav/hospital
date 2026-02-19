import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
    title: string
    value: string
    icon: LucideIcon
    description?: string
    trend?: {
        value: string
        positive: boolean
    }
    className?: string
}

export function StatCard({
    title,
    value,
    icon: Icon,
    description,
    trend,
    className
}: StatCardProps) {
    return (
        <div className={cn("rounded-2xl border border-border bg-card p-6 shadow-sm", className)}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <h3 className="mt-1 text-2xl font-bold text-foreground">{value}</h3>
                </div>
                <div className="rounded-xl bg-primary/10 p-2.5 text-primary">
                    <Icon className="h-6 w-6" />
                </div>
            </div>
            {(description || trend) && (
                <div className="mt-4 flex items-center gap-2">
                    {trend && (
                        <span className={cn(
                            "text-xs font-semibold px-1.5 py-0.5 rounded",
                            trend.positive ? "bg-emerald-500/15 text-emerald-600" : "bg-rose-500/15 text-rose-600"
                        )}>
                            {trend.positive ? "+" : "-"}{trend.value}
                        </span>
                    )}
                    {description && <p className="text-xs text-muted-foreground">{description}</p>}
                </div>
            )}
        </div>
    )
}
