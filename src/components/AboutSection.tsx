import Image from "next/image";
import { siteImages } from "@/data/images";
import { Reveal } from "@/components/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-3 shadow-[0_30px_70px_rgba(15,23,42,0.08)]">
            <Image
              src={siteImages.about}
              alt="People coming together to support their community"
              width={900}
              height={900}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-[540px] w-full rounded-[1.5rem] object-cover"
            />
            <div className="absolute left-8 top-8 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-800 backdrop-blur-sm">
              WHO WE ARE
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Who we are</p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
              Compassion in action.
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Izra Smile Foundation is a Section 8 non-profit organization working toward the welfare
              and development of vulnerable and underserved communities.
            </p>

            <p className="mt-5 text-base leading-8 text-slate-600">
              We work with a people-centered approach to support individuals and families who may need
              assistance with education, food, healthcare, hygiene, essential daily needs, and other
              forms of social support.
            </p>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
