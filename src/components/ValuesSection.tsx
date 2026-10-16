import { values } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function ValuesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-4xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Our values</p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
              Social change begins when people come together.
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 space-y-5">
          {values.map(({ title, description, icon: Icon }, index) => (
            <Reveal key={title} delay={index * 0.04}>
              <div className="grid gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-5 py-5 transition hover:bg-white sm:grid-cols-[1.1fr_2.5fr_1.2fr] sm:items-center sm:px-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-semibold text-slate-900">{title}</span>
                </div>
                <p className="text-base leading-7 text-slate-600">{description}</p>
                <div className="text-right text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                  0{index + 1}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
