"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, LockKeyhole, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { siteImages } from "@/data/images";
import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  useEffect(() => {
    let isMounted = true;

    void supabase.auth.getSession().then(({ data }) => {
      if (isMounted && data.session) router.replace("/admin");
    });

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextFieldErrors = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        ? ""
        : "Enter a valid email address.",
      password: password ? "" : "Enter your password.",
    };
    setFieldErrors(nextFieldErrors);
    setError("");

    if (nextFieldErrors.email || nextFieldErrors.password) return;

    setIsSubmitting(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) {
        setError("Unable to sign in with those credentials. Check your email and password and try again.");
        return;
      }

      router.replace("/admin");
    } catch {
      setError("Unable to sign in with those credentials. Check your email and password and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f4ee] px-4 py-8 text-[#10233f] sm:px-6 lg:grid lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:px-10 lg:py-10">
      <section className="relative hidden min-h-[calc(100vh-5rem)] overflow-hidden rounded-[2rem] bg-[#0d213d] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_82%_82%,rgba(91,182,232,0.32),transparent_48%),linear-gradient(140deg,#0d213d_15%,#0e3f68_100%)]" />
        <div className="relative flex items-center gap-4">
          <Image src={siteImages.logo} alt="Izra Smile Foundation" width={64} height={64} className="h-16 w-16 rounded-full bg-white object-contain p-1" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em]">Izra Smile</p>
            <p className="text-xs text-sky-100">Foundation administration</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="relative max-w-xl"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#f4c95d]">Bringing hope, creating smiles</p>
          <h1 className="text-5xl font-medium leading-[1.08] tracking-[-0.04em] xl:text-6xl">A quieter place to care for the details.</h1>
          <p className="mt-6 max-w-md text-base leading-8 text-sky-50/80">
            Sign in to review messages, volunteer applications, and donation intents shared with the Foundation.
          </p>
        </motion.div>
        <p className="relative text-xs text-sky-100/70">Private access for authorized administrators</p>
      </section>

      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md flex-col justify-center py-8 lg:max-w-lg lg:px-6">
        <Link href="/" className="mb-10 flex items-center gap-3 lg:hidden" aria-label="Izra Smile Foundation home">
          <Image src={siteImages.logo} alt="" width={52} height={52} className="h-13 w-13 rounded-full bg-white object-contain p-1 shadow-sm" />
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.16em]">Izra Smile</span>
            <span className="block text-xs text-slate-600">Foundation</span>
          </span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0e3f68] text-white shadow-[0_12px_24px_rgba(14,63,104,0.18)]">
            <LockKeyhole className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">Administrator access</p>
          <h2 className="mt-3 text-3xl font-medium tracking-[-0.04em] text-[#10233f] sm:text-4xl">Welcome back.</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Sign in with your authorized Foundation account.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-slate-800">Email address</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setFieldErrors((current) => ({ ...current, email: "" }));
                  setError("");
                }}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "admin-email-error" : undefined}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-700 focus:ring-4 focus:ring-sky-700/10"
                placeholder="name@example.com"
              />
              {fieldErrors.email && <p id="admin-email-error" className="mt-2 text-sm text-red-700">{fieldErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-slate-800">Password</label>
              <div className="relative">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setFieldErrors((current) => ({ ...current, password: "" }));
                    setError("");
                  }}
                  aria-invalid={Boolean(fieldErrors.password)}
                  aria-describedby={fieldErrors.password ? "admin-password-error" : undefined}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-700 focus:ring-4 focus:ring-sky-700/10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 inline-flex w-12 items-center justify-center text-slate-500 transition hover:text-slate-900"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" aria-hidden="true" /> : <Eye className="h-5 w-5" aria-hidden="true" />}
                </button>
              </div>
              {fieldErrors.password && <p id="admin-password-error" className="mt-2 text-sm text-red-700">{fieldErrors.password}</p>}
            </div>

            {error && <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">{error}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0e3f68] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(14,63,104,0.16)] transition hover:bg-[#0d3152] focus-visible:outline-offset-4 disabled:cursor-wait disabled:opacity-70"
            >
              {isSubmitting && <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />}
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <Link href="/" className="mt-7 inline-flex text-sm font-medium text-slate-600 underline decoration-slate-300 underline-offset-4 transition hover:text-sky-800">
            Return to the public website
          </Link>
        </motion.div>
      </section>
    </main>
  );
}