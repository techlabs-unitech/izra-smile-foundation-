"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Send } from "lucide-react";
import { siteImages } from "@/data/images";
import { supabase } from "@/lib/supabase";
import { Reveal } from "@/components/Reveal";

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  helpType: string;
  interests: string[];
  message: string;
};

type FormField = keyof FormValues;
type FormErrors = Partial<Record<FormField, string>>;

const emptyFormValues: FormValues = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  helpType: "",
  interests: [],
  message: "",
};

const helpOptions = [
  "Volunteer",
  "Donate",
  "Organize / Support an Event",
  "Corporate / Institutional Partnership",
  "Awareness & Social Media",
  "Other",
];

const interestOptions = [
  "Children & Education",
  "Women & Families",
  "Elderly Care",
  "Healthcare & Cancer Support",
  "People with Disabilities",
  "Animal Welfare",
  "Community Support",
  "Essential Needs",
];

export function GetInvolvedSection() {
  const [formValues, setFormValues] = useState<FormValues>(emptyFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const validate = () => {
    const nextErrors: FormErrors = {};
    const fullName = formValues.fullName.trim();
    const email = formValues.email.trim();
    const phone = formValues.phone.trim();
    const city = formValues.city.trim();
    const message = formValues.message.trim();

    if (!fullName) nextErrors.fullName = "Please enter your full name.";
    else if (fullName.length < 2) nextErrors.fullName = "Please enter at least 2 characters.";

    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (phone) {
      const normalizedPhone = phone.replace(/[\s().-]/g, "");
      if (!/^(?:\+91|91|0)?[6-9]\d{9}$/.test(normalizedPhone)) {
        nextErrors.phone = "Please enter a valid Indian phone number.";
      }
    }

    if (!city) nextErrors.city = "Please enter your city.";
    else if (city.length < 2) nextErrors.city = "Please enter at least 2 characters.";

    if (!formValues.helpType) nextErrors.helpType = "Please choose how you would like to help.";
    if (formValues.interests.length === 0) {
      nextErrors.interests = "Please select at least one area of interest.";
    }

    if (message && message.length < 10) {
      nextErrors.message = "Please enter at least 10 characters, or leave the message blank.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const { error } = await supabase.from("volunteer_applications").insert({
        full_name: formValues.fullName.trim(),
        email: formValues.email.trim(),
        phone: formValues.phone.trim() || null,
        city: formValues.city.trim(),
        help_type: formValues.helpType,
        areas_of_interest: [...formValues.interests],
        message: formValues.message.trim() || null,
      });

      if (error) {
        setSubmissionError("We couldn’t submit your response right now. Please try again.");
        return;
      }

      setIsSubmitted(true);
      setFormValues(emptyFormValues);
      setErrors({});
    } catch {
      setSubmissionError("We couldn’t submit your response right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onChange = (field: Exclude<FormField, "interests">, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
    setSubmissionError("");
  };

  const toggleInterest = (interest: string) => {
    setFormValues((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((selectedInterest) => selectedInterest !== interest)
        : [...current.interests, interest],
    }));
    setErrors((current) => ({ ...current, interests: "" }));
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
    <section id="involved" className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <Image src={siteImages.women} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-slate-950/70" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_28px_70px_rgba(15,23,42,0.2)] backdrop-blur-sm sm:p-10 lg:p-14">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div className="max-w-3xl text-white">
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Get involved</p>
                <h2 className="text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">
                  Change begins with one act.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
                  Donors, volunteers, institutions, companies and communities can all play a role in creating a more caring and inclusive society.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  href="#involved-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                >
                  Become a Volunteer
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#involved-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Partner With Us
                </Link>
              </div>
            </div>

            {isSubmitted ? (
              <div className="mt-10 border-t border-white/15 pt-8">
                <div role="status" aria-live="polite" className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
                  <h3 className="text-2xl font-medium text-white">Thank you for your interest</h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-slate-200">
                    Thank you for your interest in supporting Izra Smile Foundation. We appreciate your willingness to make a difference.
                  </p>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="mt-6 inline-flex items-center justify-center rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                  >
                    Send another response
                  </button>
                  <p className="mt-4 text-xs leading-5 text-slate-300">
                    Your application has been submitted to Izra Smile Foundation.
                  </p>
                </div>
              </div>
            ) : (
              <form
                id="involved-form"
                onSubmit={handleSubmit}
                noValidate
                aria-busy={isSubmitting}
                className="mt-10 border-t border-white/15 pt-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="involved-fullName" className="mb-2 block text-sm font-medium text-white">
                      Full Name
                    </label>
                    <input
                      ref={fullNameInputRef}
                      id="involved-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      minLength={2}
                      required
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "involved-fullName-error" : undefined}
                      value={formValues.fullName}
                      onChange={(event) => onChange("fullName", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-300/80 outline-none transition focus:border-sky-300 focus:bg-slate-950/55"
                      placeholder="Your full name"
                    />
                    {errors.fullName ? <p id="involved-fullName-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.fullName}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="involved-email" className="mb-2 block text-sm font-medium text-white">
                      Email Address
                    </label>
                    <input
                      id="involved-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "involved-email-error" : undefined}
                      value={formValues.email}
                      onChange={(event) => onChange("email", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-300/80 outline-none transition focus:border-sky-300 focus:bg-slate-950/55"
                      placeholder="Your email address"
                    />
                    {errors.email ? <p id="involved-email-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.email}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="involved-phone" className="mb-2 block text-sm font-medium text-white">
                      Phone Number <span className="font-normal text-slate-300">(optional)</span>
                    </label>
                    <input
                      id="involved-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "involved-phone-error" : undefined}
                      value={formValues.phone}
                      onChange={(event) => onChange("phone", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-300/80 outline-none transition focus:border-sky-300 focus:bg-slate-950/55"
                      placeholder="Your phone number"
                    />
                    {errors.phone ? <p id="involved-phone-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.phone}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="involved-city" className="mb-2 block text-sm font-medium text-white">
                      City
                    </label>
                    <input
                      id="involved-city"
                      name="city"
                      type="text"
                      autoComplete="address-level2"
                      minLength={2}
                      required
                      aria-invalid={Boolean(errors.city)}
                      aria-describedby={errors.city ? "involved-city-error" : undefined}
                      value={formValues.city}
                      onChange={(event) => onChange("city", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-300/80 outline-none transition focus:border-sky-300 focus:bg-slate-950/55"
                      placeholder="Your city"
                    />
                    {errors.city ? <p id="involved-city-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.city}</p> : null}
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="involved-helpType" className="mb-2 block text-sm font-medium text-white">
                      How would you like to help?
                    </label>
                    <select
                      id="involved-helpType"
                      name="helpType"
                      required
                      aria-invalid={Boolean(errors.helpType)}
                      aria-describedby={errors.helpType ? "involved-helpType-error" : undefined}
                      value={formValues.helpType}
                      onChange={(event) => onChange("helpType", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-sky-300 focus:bg-slate-950/55"
                    >
                      <option value="" className="text-slate-900">Select how you would like to help</option>
                      {helpOptions.map((option) => <option key={option} value={option} className="text-slate-900">{option}</option>)}
                    </select>
                    {errors.helpType ? <p id="involved-helpType-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.helpType}</p> : null}
                  </div>

                  <fieldset
                    id="involved-interests"
                    aria-describedby={errors.interests ? "involved-interests-error" : undefined}
                    className="min-w-0 sm:col-span-2"
                  >
                    <legend className="mb-3 text-sm font-medium text-white">
                      Areas you’re interested in <span className="font-normal text-slate-300">(select one or more)</span>
                    </legend>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      {interestOptions.map((interest, index) => (
                        <label
                          key={interest}
                          htmlFor={`involved-interest-${index}`}
                          className="flex min-w-0 cursor-pointer items-start gap-3 rounded-xl border border-white/15 bg-white/5 p-3 text-sm leading-5 text-slate-100 transition hover:bg-white/10"
                        >
                          <input
                            id={`involved-interest-${index}`}
                            name="interests"
                            type="checkbox"
                            value={interest}
                            checked={formValues.interests.includes(interest)}
                            onChange={() => toggleInterest(interest)}
                            aria-invalid={Boolean(errors.interests)}
                            aria-describedby={errors.interests ? "involved-interests-error" : undefined}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-sky-400"
                          />
                          <span className="break-words">{interest}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interests ? <p id="involved-interests-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.interests}</p> : null}
                  </fieldset>

                  <div className="sm:col-span-2">
                    <label htmlFor="involved-message" className="mb-2 block text-sm font-medium text-white">
                      Message <span className="font-normal text-slate-300">(optional)</span>
                    </label>
                    <textarea
                      id="involved-message"
                      name="message"
                      rows={5}
                      minLength={10}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "involved-message-error" : undefined}
                      value={formValues.message}
                      onChange={(event) => onChange("message", event.target.value)}
                      className="w-full resize-y rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white placeholder:text-slate-300/80 outline-none transition focus:border-sky-300 focus:bg-slate-950/55"
                      placeholder="Share anything else you would like us to know"
                    />
                    {errors.message ? <p id="involved-message-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.message}</p> : null}
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-75"
                  >
                    {isSubmitting ? "Sending..." : "Send response"}
                    {!isSubmitting ? <Send className="h-4 w-4" aria-hidden="true" /> : null}
                  </button>
                  <p className="text-xs leading-5 text-slate-300">
                    Your application will be submitted to Izra Smile Foundation.
                  </p>
                </div>
                {submissionError ? <p role="alert" className="mt-4 text-sm text-rose-200">{submissionError}</p> : null}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}