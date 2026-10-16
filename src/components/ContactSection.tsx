"use client";
"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Camera, Mail, MapPin, Phone, Send } from "lucide-react";
import { contactDetails } from "@/data/site";
import { supabase } from "@/lib/supabase";
import { Reveal } from "@/components/Reveal";

type FormValues = {
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  subject: string;
  message: string;
};

type FormField = keyof FormValues;
type FormErrors = Partial<Record<FormField, string>>;

const emptyFormValues: FormValues = {
  fullName: "",
  emailAddress: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const subjectOptions = [
  "General Enquiry",
  "Volunteering",
  "Donation",
  "Partnership",
  "Support",
  "Other",
];

export function ContactSection() {
  const [formValues, setFormValues] = useState<FormValues>(emptyFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const nextErrors: FormErrors = {};
    const fullName = formValues.fullName.trim();
    const emailAddress = formValues.emailAddress.trim();
    const phoneNumber = formValues.phoneNumber.trim();
    const message = formValues.message.trim();

    if (!fullName) nextErrors.fullName = "Please enter your full name.";
    else if (fullName.length < 2) nextErrors.fullName = "Please enter at least 2 characters.";

    if (!emailAddress) nextErrors.emailAddress = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailAddress)) {
      nextErrors.emailAddress = "Please enter a valid email address.";
    }

    if (phoneNumber) {
      const normalizedPhone = phoneNumber.replace(/[\s()-]/g, "");
      if (!/^(?:\+91|91|0)?[6-9]\d{9}$/.test(normalizedPhone)) {
        nextErrors.phoneNumber = "Please enter a valid Indian phone number.";
      }
    }

    if (!formValues.subject) nextErrors.subject = "Please select a subject.";
    if (!message) nextErrors.message = "Please enter a message.";
    else if (message.length < 10) nextErrors.message = "Please enter at least 10 characters.";

    setErrors(nextErrors);

    const firstInvalidField = Object.keys(nextErrors)[0] as FormField | undefined;
    if (firstInvalidField) {
      window.requestAnimationFrame(() => {
        document.getElementById(`contact-${firstInvalidField}`)?.focus();
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        full_name: formValues.fullName.trim(),
        email: formValues.emailAddress.trim(),
        phone: formValues.phoneNumber.trim() || null,
        subject: formValues.subject,
        message: formValues.message.trim(),
      });

      if (error) {
        setSubmissionError("We couldn’t send your message right now. Please try again.");
        return;
      }

      setIsSubmitted(true);
      setFormValues(emptyFormValues);
      setErrors({});
    } catch {
      setSubmissionError("We couldn’t send your message right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChange = (field: FormField, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSubmissionError("");
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormValues(emptyFormValues);
    setErrors({});
    setSubmissionError("");
    window.requestAnimationFrame(() => fullNameInputRef.current?.focus());
  };

  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Contact</p>
          <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
            Let’s connect with purpose.
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal delay={0.06}>
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 shadow-[0_20px_60px_rgba(15,23,42,0.04)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Let’s connect</p>
            <h3 className="mt-5 text-3xl font-medium tracking-[-0.06em] text-slate-900">We’re ready to listen.</h3>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Whether you want to volunteer, partner, or support our mission, we would love to hear from you.
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Address</div>
                  <address className="mt-2 whitespace-pre-line break-words text-base leading-7 text-slate-700 not-italic">
                    {contactDetails.address}
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Phone</div>
                  <a href={`tel:${contactDetails.phone}`} className="mt-2 inline-block text-base text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-sky-800">
                    {contactDetails.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Email</div>
                  <a href={`mailto:${contactDetails.email}`} className="mt-2 inline-block break-all text-base text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-sky-800">
                    {contactDetails.email}
                  </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                <Camera className="h-5 w-5" aria-hidden="true" />
              </div>
              <div>
                <div className="text-sm uppercase tracking-[0.18em] text-slate-500">Instagram</div>
                <a
                  href={contactDetails.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-base text-slate-700 underline decoration-slate-300 underline-offset-4 transition hover:text-sky-800"
                >
                  {contactDetails.instagramHandle}
                </a>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {isSubmitted ? (
            <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_22px_60px_rgba(15,23,42,0.03)] sm:p-8">
              <div role="status" aria-live="polite" className="space-y-5">
                <h3 className="text-2xl font-medium text-slate-900">Thank you for reaching out</h3>
                <p className="text-base leading-7 text-slate-600">
                  Thank you for reaching out to Izra Smile Foundation. We have received your message and will get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="inline-flex items-center justify-center rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                >
                  Send another message
                </button>
                <p className="text-xs leading-5 text-slate-500">
                  Your message has been submitted to Izra Smile Foundation.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-busy={isSubmitting}
              className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_22px_60px_rgba(15,23,42,0.03)] sm:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-fullName" className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    ref={fullNameInputRef}
                    id="contact-fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    minLength={2}
                    required
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "contact-fullName-error" : undefined}
                    value={formValues.fullName}
                    onChange={(event) => onChange("fullName", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                    placeholder="Your full name"
                  />
                  {errors.fullName ? <p id="contact-fullName-error" role="alert" className="mt-2 text-sm text-rose-600">{errors.fullName}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-emailAddress" className="mb-2 block text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="contact-emailAddress"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.emailAddress)}
                    aria-describedby={errors.emailAddress ? "contact-emailAddress-error" : undefined}
                    value={formValues.emailAddress}
                    onChange={(event) => onChange("emailAddress", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                    placeholder="Your email address"
                  />
                  {errors.emailAddress ? <p id="contact-emailAddress-error" role="alert" className="mt-2 text-sm text-rose-600">{errors.emailAddress}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-phoneNumber" className="mb-2 block text-sm font-medium text-slate-700">
                    Phone Number <span className="font-normal text-slate-500">(optional)</span>
                  </label>
                  <input
                    id="contact-phoneNumber"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phoneNumber)}
                    aria-describedby={errors.phoneNumber ? "contact-phoneNumber-error" : undefined}
                    value={formValues.phoneNumber}
                    onChange={(event) => onChange("phoneNumber", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                    placeholder="Your phone number"
                  />
                  {errors.phoneNumber ? <p id="contact-phoneNumber-error" role="alert" className="mt-2 text-sm text-rose-600">{errors.phoneNumber}</p> : null}
                </div>

                <div>
                  <label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-slate-700">
                    Subject
                  </label>
                  <select
                    id="contact-subject"
                    name="subject"
                    required
                    aria-invalid={Boolean(errors.subject)}
                    aria-describedby={errors.subject ? "contact-subject-error" : undefined}
                    value={formValues.subject}
                    onChange={(event) => onChange("subject", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                  {errors.subject ? <p id="contact-subject-error" role="alert" className="mt-2 text-sm text-rose-600">{errors.subject}</p> : null}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={6}
                    minLength={10}
                    required
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    value={formValues.message}
                    onChange={(event) => onChange("message", event.target.value)}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-400 focus:bg-white"
                    placeholder="Tell us how you would like to support or connect"
                  />
                  {errors.message ? <p id="contact-message-error" role="alert" className="mt-2 text-sm text-rose-600">{errors.message}</p> : null}
                </div>
              </div>

              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-75"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
                </button>
                <p className="text-xs leading-5 text-slate-500">
                  Your message will be submitted to Izra Smile Foundation.
                </p>
              </div>
              {submissionError ? <p role="alert" className="mt-4 text-sm text-rose-600">{submissionError}</p> : null}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
