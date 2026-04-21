"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Stethoscope, Eye, EyeOff } from "lucide-react";

const DEMO_CREDENTIALS = [
  { label: "Admin", email: "admin@hms.com", password: "admin123" },
  { label: "Doctor", email: "doctor@hms.com", password: "doctor123" },
  { label: "Patient", email: "patient@hms.com", password: "patient123" },
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
        return;
      }

      // Determine role from email and redirect immediately
      if (email === "admin@hms.com") router.push("/admin");
      else if (email === "doctor@hms.com") router.push("/doctor");
      else if (email === "patient@hms.com") router.push("/patient");
      else router.push("/");

    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const fillDemo = (cred: typeof DEMO_CREDENTIALS[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError("");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
            <Stethoscope size={30} />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-foreground">HMS Portal</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Quick Login Buttons */}
        <div className="rounded-xl border border-border bg-muted/30 p-4">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Login (Demo)</p>
          <div className="grid grid-cols-3 gap-2">
            {DEMO_CREDENTIALS.map((cred) => (
              <button
                key={cred.label}
                type="button"
                onClick={() => fillDemo(cred)}
                className="rounded-lg border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted hover:border-primary/50 transition-all"
              >
                {cred.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-xl">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="admin@hms.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-foreground shadow-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm hover:opacity-90 focus:outline-none disabled:opacity-60 transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
