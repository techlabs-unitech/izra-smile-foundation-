import Image from "next/image";
import { supportAreas } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function SupportAreas() {
  return (
    <section id="support" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Our work</p>
          <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
            Where Compassion Meets Action
          </h2>
        </div>
      </Reveal>

      <div className="grid auto-rows-[minmax(250px,auto)] gap-6 md:grid-cols-2 xl:grid-cols-4">
        {supportAreas.map(({ title, description, icon: Icon, image }, index) => (
          <Reveal key={title} delay={index * 0.05}>
            <article
              className={`group relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.04)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_80px_rgba(15,23,42,0.08)] ${
                index % 3 === 0 ? "xl:col-span-2" : ""
              }`}
            >
              {image ? (
                <div className="relative overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    width={900}
                    height={700}
                    sizes={index % 3 === 0 ? "(min-width: 1280px) 50vw, 100vw" : "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"}
                    className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                      index % 3 === 0 ? "h-72 xl:h-80" : "h-60"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/55 via-slate-900/15 to-transparent" />
                  <div className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-sky-700 shadow-md">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              ) : (
                <div className="flex h-52 items-center justify-center bg-sky-50">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-sky-700 shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              )}

              <div className="space-y-4 p-6">
                <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                <p className="text-sm leading-6 text-slate-600">{description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
