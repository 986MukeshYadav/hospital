import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"

export default async function IndexPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  const role = (session.user as any)?.role

  if (role === "Admin") redirect("/admin")
  if (role === "Doctor") redirect("/doctor")
  if (role === "Patient") redirect("/patient")

  redirect("/login")
}
