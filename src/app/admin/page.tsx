"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, HandHeart, LoaderCircle, LogOut, MessageSquareText, Users } from "lucide-react";
import { useEffect, useState } from "react";
import type { Database } from "@/lib/supabase";
import { siteImages } from "@/data/images";
import { supabase } from "@/lib/supabase";

type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];
type VolunteerApplication = Database["public"]["Tables"]["volunteer_applications"]["Row"];
type DonationIntent = Database["public"]["Tables"]["donation_intents"]["Row"];
type RecordState<Row> = { rows: Row[]; error: boolean };

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
});
const rupeeFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
});

function displayValue(value: string | null | undefined) {
  return value?.trim() || "Not provided";
}

function SubmissionCard({
  name,
  email,
  phone,
  status,
  createdAt,
  fields,
}: {
  name: string;
  email: string;
  phone: string | null;
  status: string;
  createdAt: string;
  fields: Array<{ label: string; value: string }>;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_8px_24px_rgba(16,35,63,0.035)] sm:p-6">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-100 pb-4 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h3 className="break-words text-base font-semibold text-[#10233f]">{displayValue(name)}</h3>
          <a className="mt-1 inline-flex max-w-full break-all text-sm text-sky-800 underline decoration-sky-200 underline-offset-2" href={`mailto:${email}`}>{email}</a>
          <p className="mt-1 text-sm text-slate-600">{displayValue(phone)}</p>
        </div>
        <span className="inline-flex w-fit shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold capitalize text-sky-900">{displayValue(status)}</span>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.label} className="min-w-0">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">{field.label}</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-800">{displayValue(field.value)}</dd>
          </div>
        ))}
        <div>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">Received</dt>
          <dd className="mt-1 text-sm leading-6 text-slate-800">{dateFormatter.format(new Date(createdAt))}</dd>
        </div>
      </dl>
    </article>
  );
}

function SubmissionSection<Row>({
  title,
  description,
  icon,
  state,
  children,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  state: RecordState<Row>;
  children: (row: Row) => React.ReactNode;
}) {
  return (
    <section aria-label={title} className="scroll-mt-6 border-t border-slate-200 py-9 first:border-t-0 first:pt-0">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e9f3f7] text-[#0e3f68]">{icon}</span>
          <div>
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-[#10233f]">{title}</h2>
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          </div>
        </div>
        {!state.error && <span className="text-sm font-medium tabular-nums text-slate-500">{state.rows.length}</span>}
      </div>

      {state.error ? (
        <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm leading-6 text-red-800">
          Could not load these records. Check your access and connection, then refresh the page.
        </div>
      ) : state.rows.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white/60 px-5 py-8 text-center text-sm text-slate-600">No submissions yet.</p>
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">{state.rows.map((row) => children(row))}</div>
      )}
    </section>
  );
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const [contacts, setContacts] = useState<RecordState<ContactSubmission>>({ rows: [], error: false });
  const [volunteers, setVolunteers] = useState<RecordState<VolunteerApplication>>({ rows: [], error: false });
  const [donations, setDonations] = useState<RecordState<DonationIntent>>({ rows: [], error: false });

  useEffect(() => {
    let isMounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.replace("/admin/login");
        return;
      }
      if (isMounted) {
        setUserEmail(session.user.email ?? "");
        setIsCheckingSession(false);
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return;
      if (!data.session) {
        router.replace("/admin/login");
        return;
      }
      setUserEmail(data.session.user.email ?? "");
      setIsCheckingSession(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  useEffect(() => {
    if (isCheckingSession) return;
    let isMounted = true;
    void Promise.all([
      supabase.from("contact_submissions").select("id, full_name, email, phone, subject, message, status, created_at").order("created_at", { ascending: false }),
      supabase.from("volunteer_applications").select("id, full_name, email, phone, city, help_type, areas_of_interest, message, status, created_at").order("created_at", { ascending: false }),
      supabase.from("donation_intents").select("id, full_name, email, phone, amount, purpose, message, status, created_at").order("created_at", { ascending: false }),
    ]).then(([contactResult, volunteerResult, donationResult]) => {
      if (!isMounted) return;
      setContacts({ rows: contactResult.data ?? [], error: Boolean(contactResult.error) });
      setVolunteers({ rows: volunteerResult.data ?? [], error: Boolean(volunteerResult.error) });
      setDonations({ rows: donationResult.data ?? [], error: Boolean(donationResult.error) });
      setIsLoading(false);
    }).catch(() => {
      if (!isMounted) return;
      setContacts({ rows: [], error: true });
      setVolunteers({ rows: [], error: true });
      setDonations({ rows: [], error: true });
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isCheckingSession]);

  const handleLogout = async () => {
    setLogoutError("");
    const { error } = await supabase.auth.signOut();
    if (error) {
      setLogoutError("Unable to sign out right now. Please try again.");
      return;
    }
    router.replace("/admin/login");
  };

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f4ee] px-4 text-[#10233f]" role="status">
        <LoaderCircle className="h-6 w-6 animate-spin text-sky-800" aria-hidden="true" />
        <span className="ml-3 text-sm">Checking administrator session…</span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f4ee] text-[#10233f]">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Image src={siteImages.logo} alt="Izra Smile Foundation logo" width={48} height={48} className="h-12 w-12 shrink-0 rounded-full object-contain" />
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-[0.12em]">Izra Smile</p>
              <p className="truncate text-xs text-slate-600">{userEmail || "Administrator dashboard"}</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" aria-label="Sign out">
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-9 sm:px-6 lg:px-8 lg:pt-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-800">Private workspace</p>
            <h1 className="mt-2 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Submission inbox</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Review the details shared with Izra Smile Foundation.</p>
          </div>
          {isLoading && <span className="inline-flex items-center gap-2 text-sm text-slate-600" role="status"><LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />Loading records</span>}
        </motion.div>

        {logoutError && <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{logoutError}</p>}

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 shadow-[0_18px_50px_rgba(16,35,63,0.045)] sm:px-6 lg:px-8">
          <SubmissionSection title="Contact Submissions" description="Messages received through the contact form." icon={<MessageSquareText className="h-5 w-5" aria-hidden="true" />} state={contacts}>
            {(record) => <SubmissionCard key={record.id} name={record.full_name} email={record.email} phone={record.phone} status={record.status} createdAt={record.created_at} fields={[{ label: "Subject", value: record.subject }, { label: "Message", value: record.message }]} />}
          </SubmissionSection>
          <SubmissionSection title="Volunteer Applications" description="People who shared their interest in helping." icon={<Users className="h-5 w-5" aria-hidden="true" />} state={volunteers}>
            {(record) => <SubmissionCard key={record.id} name={record.full_name} email={record.email} phone={record.phone} status={record.status} createdAt={record.created_at} fields={[{ label: "City", value: record.city }, { label: "How they can help", value: record.help_type }, { label: "Areas of interest", value: record.areas_of_interest.join(", ") }, { label: "Message", value: record.message ?? "" }]} />}
          </SubmissionSection>
          <SubmissionSection title="Donation Intents" description="Donation enquiries and intents submitted online." icon={<HandHeart className="h-5 w-5" aria-hidden="true" />} state={donations}>
            {(record) => <SubmissionCard key={record.id} name={record.full_name} email={record.email} phone={record.phone} status={record.status} createdAt={record.created_at} fields={[{ label: "Amount", value: rupeeFormatter.format(record.amount) }, { label: "Purpose", value: record.purpose }, { label: "Message", value: record.message ?? "" }]} />}
          </SubmissionSection>
        </div>
        <p className="mt-5 flex items-center gap-2 text-xs leading-5 text-slate-500"><CalendarDays className="h-4 w-4 shrink-0" aria-hidden="true" />Submission details are visible only to the authorized administrator.</p>
      </div>
    </main>
  );
}