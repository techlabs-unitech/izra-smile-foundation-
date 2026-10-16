import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, HeartHandshake, Sparkles } from "lucide-react";
import { siteImages } from "@/data/images";
import { Reveal } from "@/components/Reveal";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-[linear-gradient(180deg,#f9fbff_0%,#f4fbf7_100%)]">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-sky-100/80 to-transparent" />
      <div className="absolute -left-16 top-24 h-72 w-72 rounded-full border border-sky-200/80 bg-sky-100/60 blur-3xl" />
      <div className="absolute right-0 top-18 h-96 w-96 rounded-full border border-emerald-200/80 bg-emerald-100/60 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:pb-28 lg:pt-20">
        <Reveal className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-sky-800 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" />
            IZRA SMILE FOUNDATION
          </div>

          <h1 className="text-5xl font-medium tracking-[-0.06em] text-slate-900 sm:text-6xl lg:text-[5.1rem] lg:leading-[0.96]">
            Bringing Hope.
            <span className="mt-2 block text-sky-700">Creating Smiles.</span>
            <span className="mt-2 block text-slate-900">Changing Lives.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
            At Izra Smile Foundation, we believe that every human being deserves dignity,
            compassion, care and an opportunity to build a better life.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#support"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sky-700 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(14,63,104,0.22)] transition hover:-translate-y-0.5 hover:bg-sky-800"
            >
              Support Our Mission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="#involved"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-800"
            >
              Get Involved
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-emerald-800">
              <HeartHandshake className="h-4 w-4" />
              Section 8 Non-Profit Organization
            </div>
          </div>
        </Reveal>

        <Reveal className="relative" delay={0.15}>
          <div className="relative mx-auto max-w-[30rem]">
            <div className="absolute -left-8 top-12 flex h-28 w-28 items-center justify-center rounded-full border border-sky-200 bg-white/80 shadow-lg backdrop-blur-sm">
              <div className="text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700">
                Hope
              </div>
            </div>
            <div className="absolute -right-4 bottom-10 h-32 w-32 rounded-full border border-amber-200 bg-amber-100/70 shadow-lg" />
            <div className="absolute inset-x-10 bottom-4 h-12 rounded-full bg-sky-200/70 blur-2xl" />

            <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-3 shadow-[0_32px_90px_rgba(15,23,42,0.12)]">
              <Image
                src={siteImages.hero}
                alt="A humanitarian scene of community support and care"
                width={800}
                height={600}
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-[4/3] w-full rounded-[1.6rem] object-cover"
                loading="eager"
              />
            </div>

            <div className="absolute -bottom-5 left-4 rounded-[1.4rem] border border-white/80 bg-white/90 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Compassion in action
              </div>
              <div className="mt-2 text-2xl font-semibold text-slate-900">Community care</div>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="flex justify-center pb-8">
        <div className="inline-flex flex-col items-center gap-2 text-slate-500">
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em]">Compassion • Dignity • Community</span>
          <Link href="#about" aria-label="Scroll to about section" className="inline-flex items-center justify-center text-sky-700 transition hover:text-sky-800">
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </Link>
        </div>
      </div>
    </section>
  );
}
