"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { X, Shield } from "lucide-react"

const userSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    role: z.enum(["Admin", "Doctor", "Staff", "Patient"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

type UserFormValues = z.infer<typeof userSchema>

interface AddUserFormProps {
    onClose: () => void
    onSubmitSuccess: (data: UserFormValues) => void
}

export function AddUserForm({ onClose, onSubmitSuccess }: AddUserFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            role: "Staff"
        }
    })

    const onSubmit = async (data: UserFormValues) => {
        console.log("Adding system user:", data)
        await new Promise((resolve) => setTimeout(resolve, 1000))
        onSubmitSuccess(data)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <div className="rounded-lg bg-primary/10 p-2 text-primary">
                            <Shield className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Add System User</h2>
                    </div>
                    <button onClick={onClose} className="rounded-lg p-2 hover:bg-muted text-muted-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Full Name</label>
                        <input
                            {...register("name")}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                            placeholder="Full Name"
                        />
                        {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Email Address</label>
                        <input
                            {...register("email")}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                            placeholder="email@hms.com"
                        />
                        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">User Role</label>
                        <select
                            {...register("role")}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                        >
                            <option value="Admin">Admin</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Staff">Staff</option>
                            <option value="Patient">Patient</option>
                        </select>
                        {errors.role && <p className="text-xs text-destructive">{errors.role.message}</p>}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-foreground">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
                        >
                            {isSubmitting ? "Creating..." : "Create User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
