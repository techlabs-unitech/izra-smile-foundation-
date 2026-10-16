import Image from "next/image";
import { initiatives } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function ProgramsSection() {
  return (
    <section id="programs" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Initiatives</p>
          <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">Our Initiatives</h2>
        </div>
      </Reveal>

      <div className="space-y-8">
        {initiatives.map(({ category, title, description, image }, index) => (
          <Reveal key={title} delay={index * 0.06}>
            <article className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.05)] md:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[280px]">
                <Image src={image} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-8 lg:p-10">
                <div>
                  <span className="inline-flex rounded-full bg-sky-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700">
                    {category}
                  </span>
                  <h3 className="mt-5 text-3xl font-medium tracking-[-0.05em] text-slate-900">{title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">{description}</p>
                </div>

              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
