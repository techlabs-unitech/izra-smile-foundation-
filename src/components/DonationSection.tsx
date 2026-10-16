"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, HandHeart } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Reveal } from "@/components/Reveal";

type DonorDetails = {
  fullName: string;
  email: string;
  phone: string;
  purpose: string;
  message: string;
};

type DonorField = keyof DonorDetails;
type DonorErrors = Partial<Record<DonorField, string>>;
type DonationStep = 1 | 2 | 3 | 4;

const presetAmounts = [500, 1000, 2500, 5000, 10000];
const maximumCustomAmount = 10_000_000;

const purposeOptions = [
  "General Support",
  "Children & Education",
  "Women & Families",
  "Elderly Care",
  "Healthcare & Cancer Support",
  "People with Disabilities",
  "Animal Welfare",
  "Community Support",
  "Essential Needs",
];

const emptyDonorDetails: DonorDetails = {
  fullName: "",
  email: "",
  phone: "",
  purpose: "",
  message: "",
};

const formatRupees = (amount: number) =>
  `₹${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 }).format(amount)}`;

export function DonationSection() {
  const [step, setStep] = useState<DonationStep>(1);
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [donorDetails, setDonorDetails] = useState<DonorDetails>(emptyDonorDetails);
  const [errors, setErrors] = useState<DonorErrors>({});
  const [isConfirming, setIsConfirming] = useState(false);
  const [submissionError, setSubmissionError] = useState("");

  const selectedAmount = selectedPreset ?? (isCustomAmount && customAmount ? Number(customAmount) : null);
  const amountIsCustom = isCustomAmount;

  const choosePreset = (amount: number) => {
    setSelectedPreset(amount);
    setIsCustomAmount(false);
    setAmountError("");
  };

  const chooseCustom = () => {
    setSelectedPreset(null);
    setIsCustomAmount(true);
    setAmountError("");
  };

  const continueToDetails = () => {
    if (selectedPreset !== null) {
      setStep(2);
      return;
    }

    if (!isCustomAmount) {
      setAmountError("Please choose an amount or select Custom Amount.");
      return;
    }

    const amountText = customAmount.trim();
    const amount = Number(amountText);
    const isValidAmount =
      /^\d+(?:\.\d{1,2})?$/.test(amountText) &&
      Number.isFinite(amount) &&
      amount > 0 &&
      amount <= maximumCustomAmount;

    if (!isValidAmount) {
      setAmountError(`Enter a valid amount greater than ₹0 and no more than ${formatRupees(maximumCustomAmount)}.`);
      return;
    }

    setAmountError("");
    setStep(2);
  };

  const updateDonorDetails = (field: DonorField, value: string) => {
    setDonorDetails((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateDonorDetails = () => {
    const nextErrors: DonorErrors = {};
    const fullName = donorDetails.fullName.trim();
    const email = donorDetails.email.trim();
    const phone = donorDetails.phone.trim();
    const message = donorDetails.message.trim();

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

    if (!donorDetails.purpose) nextErrors.purpose = "Please select a donation purpose.";
    if (message && message.length < 10) {
      nextErrors.message = "Please enter at least 10 characters, or leave the message blank.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleDetailsSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateDonorDetails()) setStep(3);
  };

  const confirmDonationIntent = async () => {
    if (isConfirming || selectedAmount === null || selectedAmount <= 0) return;

    setIsConfirming(true);
    setSubmissionError("");

    try {
      const { error } = await supabase.from("donation_intents").insert({
        full_name: donorDetails.fullName.trim(),
        email: donorDetails.email.trim(),
        phone: donorDetails.phone.trim() || null,
        amount: selectedAmount,
        purpose: donorDetails.purpose,
        message: donorDetails.message.trim() || null,
      });

      if (error) {
        setSubmissionError("We couldn’t record your donation intent right now. Please try again.");
        return;
      }

      setStep(4);
      setSelectedPreset(null);
      setIsCustomAmount(false);
      setCustomAmount("");
      setDonorDetails(emptyDonorDetails);
      setErrors({});
    } catch {
      setSubmissionError("We couldn’t record your donation intent right now. Please try again.");
    } finally {
      setIsConfirming(false);
    }
  };

  const resetDonation = () => {
    setStep(1);
    setSelectedPreset(null);
    setIsCustomAmount(false);
    setCustomAmount("");
    setAmountError("");
    setDonorDetails(emptyDonorDetails);
    setErrors({});
    setSubmissionError("");
  };

  return (
    <section id="donate" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="overflow-hidden rounded-[2.3rem] bg-[linear-gradient(135deg,#0f172a_0%,#0c3357_100%)] px-6 py-12 text-white shadow-[0_28px_70px_rgba(15,23,42,0.22)] sm:px-8 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Donate</p>
              <h2 className="text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">
                Your kindness can become someone’s hope.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-slate-200">
                Every act of support strengthens the Foundation’s ability to serve vulnerable communities with compassion, dignity and practical care.
              </p>
              <Link
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-50"
              >
                Ask About Donating
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="min-w-0 rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-7">
              <div className="mb-8 rounded-2xl bg-white p-5 text-center text-slate-900 sm:p-7">
                <p className="text-xl font-semibold sm:text-2xl">Scan to Donate</p>
                <p className="mt-2 text-sm text-slate-600">
                  Open any UPI app (GPay, PhonePe, Paytm, BHIM) and scan this code.
                </p>
                <div className="mx-auto mt-5 w-full max-w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md sm:max-w-[380px]">
                  <Image
                    src="/images/donation-qr.jpeg"
                    alt="Izra Smile Foundation UPI donation QR code. Scan here to pay."
                    width={463}
                    height={816}
                    sizes="(min-width: 640px) 380px, 320px"
                    className="h-auto w-full object-contain"
                    priority
                  />
                </div>
                <a
                  href="/images/donation-qr.jpeg"
                  download="izra-smile-foundation-donation-qr.jpeg"
                  className="mt-3 inline-flex items-center rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Download QR
                </a>
                <p className="mt-3 text-xs leading-5 text-slate-500">
                  Please verify the recipient name in your payment app before paying.
                </p>
              </div>

              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-200">
                  {step === 4 ? <Check className="h-5 w-5" aria-hidden="true" /> : <HandHeart className="h-5 w-5" aria-hidden="true" />}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">
                    {step === 4 ? "Intent received" : "Donation intent"}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-white">
                    {step === 4 ? "Thank you" : "Make a donation intent"}
                  </h3>
                </div>
              </div>

              {step < 4 ? (
                <ol aria-label="Donation intent steps" className="mb-6 grid grid-cols-3 gap-2 text-center text-xs">
                  {["Amount", "Details", "Review"].map((label, index) => {
                    const stepNumber = index + 1;
                    const isCurrent = step === stepNumber;
                    const isComplete = step > stepNumber;
                    return (
                      <li
                        key={label}
                        aria-current={isCurrent ? "step" : undefined}
                        className={`rounded-lg border px-2 py-2 ${isCurrent ? "border-sky-300 bg-sky-400/15 text-white" : isComplete ? "border-white/20 bg-white/10 text-slate-200" : "border-white/10 text-slate-400"}`}
                      >
                        <span className="font-semibold">0{stepNumber}</span>
                        <span className="ml-1.5">{label}</span>
                      </li>
                    );
                  })}
                </ol>
              ) : null}

              {step === 1 ? (
                <div>
                  <fieldset
                    aria-describedby={
                      amountError
                        ? amountIsCustom ? "donation-amount-error" : "donation-amount-selection-error"
                        : undefined
                    }
                  >
                    <legend className="mb-3 text-sm font-medium text-white">
                      Choose an amount <span className="text-slate-300">(INR / ₹)</span>
                    </legend>
                    <div role="group" aria-label="Donation amount in Indian rupees" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {presetAmounts.map((amount) => (
                        <button
                          key={amount}
                          type="button"
                          aria-pressed={selectedPreset === amount}
                          onClick={() => choosePreset(amount)}
                          className={`min-w-0 rounded-xl border px-2 py-3 text-sm font-semibold transition ${selectedPreset === amount ? "border-sky-300 bg-sky-300/20 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.25)]" : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"}`}
                        >
                          {formatRupees(amount)}
                        </button>
                      ))}
                      <button
                        type="button"
                        aria-pressed={amountIsCustom}
                        onClick={chooseCustom}
                        className={`min-w-0 rounded-xl border px-2 py-3 text-sm font-semibold transition ${amountIsCustom ? "border-sky-300 bg-sky-300/20 text-white shadow-[0_0_0_1px_rgba(125,211,252,0.25)]" : "border-white/15 bg-white/5 text-slate-200 hover:border-white/30 hover:bg-white/10"}`}
                      >
                        Custom Amount
                      </button>
                    </div>
                  </fieldset>

                  {amountIsCustom ? (
                    <div className="mt-4">
                      <label htmlFor="donation-custom-amount" className="mb-2 block text-sm font-medium text-white">
                        Custom Amount <span className="text-slate-300">(INR / ₹)</span>
                      </label>
                      <div className="flex items-center rounded-2xl border border-white/20 bg-slate-950/40 focus-within:border-sky-300">
                        <span aria-hidden="true" className="pl-4 text-base font-semibold text-slate-200">₹</span>
                        <input
                          id="donation-custom-amount"
                          name="customAmount"
                          type="number"
                          inputMode="decimal"
                          min="0.01"
                          max={maximumCustomAmount}
                          step="0.01"
                          value={customAmount}
                          aria-invalid={Boolean(amountError)}
                          aria-describedby={amountError ? "donation-amount-error" : "donation-amount-hint"}
                          onChange={(event) => {
                            setCustomAmount(event.target.value);
                            setAmountError("");
                          }}
                          className="min-w-0 flex-1 rounded-r-2xl bg-transparent px-3 py-3 text-white outline-none placeholder:text-slate-400"
                          placeholder="Enter an amount"
                        />
                      </div>
                      <p id="donation-amount-hint" className="mt-2 text-xs leading-5 text-slate-300">
                        Enter an amount up to {formatRupees(maximumCustomAmount)}. Amounts may include paise.
                      </p>
                      {amountError ? <p id="donation-amount-error" role="alert" className="mt-2 text-sm text-rose-200">{amountError}</p> : null}
                    </div>
                  ) : null}

                  {amountError && !amountIsCustom ? (
                    <p id="donation-amount-selection-error" role="alert" className="mt-3 text-sm text-rose-200">
                      {amountError}
                    </p>
                  ) : null}

                  {selectedAmount !== null && selectedAmount > 0 ? (
                    <p aria-live="polite" className="mt-4 rounded-xl border border-sky-200/20 bg-sky-300/10 px-4 py-3 text-sm text-slate-100">
                      Selected amount: <strong className="font-semibold text-white">{formatRupees(selectedAmount)} INR</strong>
                    </p>
                  ) : null}

                  <button
                    type="button"
                    onClick={continueToDetails}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <p className="mt-3 text-center text-xs leading-5 text-slate-300">
                    This records an intent only. Online payment is not connected.
                  </p>
                </div>
              ) : null}

              {step === 2 ? (
                <form onSubmit={handleDetailsSubmit} noValidate className="space-y-4">
                  <div>
                    <label htmlFor="donation-fullName" className="mb-2 block text-sm font-medium text-white">Full Name</label>
                    <input
                      id="donation-fullName"
                      name="fullName"
                      type="text"
                      autoComplete="name"
                      minLength={2}
                      required
                      value={donorDetails.fullName}
                      aria-invalid={Boolean(errors.fullName)}
                      aria-describedby={errors.fullName ? "donation-fullName-error" : undefined}
                      onChange={(event) => updateDonorDetails("fullName", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                      placeholder="Your full name"
                    />
                    {errors.fullName ? <p id="donation-fullName-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.fullName}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="donation-email" className="mb-2 block text-sm font-medium text-white">Email Address</label>
                    <input
                      id="donation-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={donorDetails.email}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "donation-email-error" : undefined}
                      onChange={(event) => updateDonorDetails("email", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                      placeholder="Your email address"
                    />
                    {errors.email ? <p id="donation-email-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.email}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="donation-phone" className="mb-2 block text-sm font-medium text-white">
                      Phone Number <span className="font-normal text-slate-300">(optional)</span>
                    </label>
                    <input
                      id="donation-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={donorDetails.phone}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? "donation-phone-error" : undefined}
                      onChange={(event) => updateDonorDetails("phone", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                      placeholder="Your phone number"
                    />
                    {errors.phone ? <p id="donation-phone-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.phone}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="donation-purpose" className="mb-2 block text-sm font-medium text-white">Donation Purpose</label>
                    <select
                      id="donation-purpose"
                      name="purpose"
                      required
                      value={donorDetails.purpose}
                      aria-invalid={Boolean(errors.purpose)}
                      aria-describedby={errors.purpose ? "donation-purpose-error" : undefined}
                      onChange={(event) => updateDonorDetails("purpose", event.target.value)}
                      className="w-full rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none transition focus:border-sky-300"
                    >
                      <option value="" className="text-slate-900">Select a donation purpose</option>
                      {purposeOptions.map((purpose) => <option key={purpose} value={purpose} className="text-slate-900">{purpose}</option>)}
                    </select>
                    {errors.purpose ? <p id="donation-purpose-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.purpose}</p> : null}
                  </div>

                  <div>
                    <label htmlFor="donation-message" className="mb-2 block text-sm font-medium text-white">
                      Message <span className="font-normal text-slate-300">(optional)</span>
                    </label>
                    <textarea
                      id="donation-message"
                      name="message"
                      rows={3}
                      value={donorDetails.message}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "donation-message-error" : undefined}
                      onChange={(event) => updateDonorDetails("message", event.target.value)}
                      className="w-full resize-y rounded-2xl border border-white/20 bg-slate-950/40 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-sky-300"
                      placeholder="Add a message, if you wish"
                    />
                    {errors.message ? <p id="donation-message-error" role="alert" className="mt-2 text-sm text-rose-200">{errors.message}</p> : null}
                  </div>

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Back to amount
                    </button>
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                    >
                      Review intent
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              ) : null}

              {step === 3 ? (
                <div>
                  <h4 className="text-base font-semibold text-white">Review donation intent</h4>
                  <dl className="mt-4 divide-y divide-white/10 rounded-xl border border-white/10 bg-slate-950/25 px-4">
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                      <dt className="text-sm text-slate-300">Donation Amount</dt>
                      <dd className="break-words text-right text-sm font-semibold text-white">{selectedAmount === null ? "" : `${formatRupees(selectedAmount)} INR`}</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                      <dt className="text-sm text-slate-300">Donor Name</dt>
                      <dd className="max-w-[65%] break-words text-right text-sm font-medium text-white">{donorDetails.fullName.trim()}</dd>
                    </div>
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                      <dt className="text-sm text-slate-300">Email</dt>
                      <dd className="max-w-[65%] break-all text-right text-sm font-medium text-white">{donorDetails.email.trim()}</dd>
                    </div>
                    {donorDetails.phone.trim() ? (
                      <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                        <dt className="text-sm text-slate-300">Phone</dt>
                        <dd className="break-words text-right text-sm font-medium text-white">{donorDetails.phone.trim()}</dd>
                      </div>
                    ) : null}
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                      <dt className="text-sm text-slate-300">Donation Purpose</dt>
                      <dd className="max-w-[65%] break-words text-right text-sm font-medium text-white">{donorDetails.purpose}</dd>
                    </div>
                    {donorDetails.message.trim() ? (
                      <div className="py-3">
                        <dt className="text-sm text-slate-300">Message</dt>
                        <dd className="mt-1 break-words text-sm leading-6 text-white">{donorDetails.message.trim()}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="mt-4 text-xs leading-5 text-slate-300">
                    This is a donation intent only. No payment will be taken or recorded.
                  </p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionError("");
                        setStep(2);
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionError("");
                        setStep(1);
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Edit Amount
                    </button>
                    <button
                      type="button"
                      disabled={isConfirming}
                      onClick={confirmDonationIntent}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-wait disabled:opacity-75"
                    >
                      {isConfirming ? "Confirming..." : "Continue"}
                      {!isConfirming ? <ArrowRight className="h-4 w-4" aria-hidden="true" /> : null}
                    </button>
                  </div>
                  {submissionError ? <p role="alert" className="mt-4 text-sm text-rose-200">{submissionError}</p> : null}
                </div>
              ) : null}

              {step === 4 ? (
                <div role="status" aria-live="polite" className="rounded-2xl border border-white/10 bg-white/5 p-5 sm:p-6">
                  <h4 className="text-xl font-semibold text-white">Thank you for your generosity.</h4>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Your donation intent has been recorded for this demo experience. Online payment is not connected yet. Please contact Izra Smile Foundation using the verified contact details on this website for the current donation process.
                  </p>
                  <p className="mt-3 text-xs leading-5 text-slate-300">
                    No payment is taken. This form records your donation intent only.
                  </p>
                  <button
                    type="button"
                    onClick={resetDonation}
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-50"
                  >
                    Start another donation
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
