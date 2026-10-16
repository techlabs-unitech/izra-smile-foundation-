import Image from "next/image";
import { siteImages } from "@/data/images";
import { Reveal } from "@/components/Reveal";

export function FounderSection() {
  return (
    <section className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900 p-3 shadow-[0_35px_90px_rgba(15,23,42,0.38)]">
            <Image
              src={siteImages.founder}
              alt="Izra Smile Foundation community work"
              width={900}
              height={1000}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-[520px] w-full rounded-[1.5rem] object-cover grayscale-[0.2]"
            />
            <div className="absolute bottom-8 left-8 rounded-full border border-white/20 bg-slate-900/60 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-sky-200 backdrop-blur-sm">
              Personal story
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">
              Founder’s Desk
            </p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl">
              From the Founder’s Desk
            </h2>

            <div className="mt-8 space-y-5 text-lg leading-8 text-slate-200">
              <p>
                Our journey is driven by a simple belief: a small act of kindness can create a
                meaningful difference in someone’s life.
              </p>
              <p>
                There are many individuals and families who struggle with basic necessities,
                education, healthcare, disability, financial difficulties and other challenges. Our
                aim is to reach such people with responsible and meaningful support.
              </p>
              <p>
                Izra Smile Foundation works towards the welfare of children, women, single mothers,
                elderly people, people with disabilities, cancer patients and other vulnerable
                sections of society.
              </p>
              <p>
                We also believe in extending compassion towards street animals and supporting their
                basic welfare.
              </p>
              <p>
                We believe that lasting social change is possible when people come together.
              </p>
            </div>

            <div className="mt-10 grid gap-6 border-t border-white/10 pt-8 sm:grid-cols-2">
              <div>
                <div className="text-2xl font-semibold text-white">Imtyaj Husain</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-sky-200">Founder</div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-white">Rajiya Parvin</div>
                <div className="mt-2 text-sm uppercase tracking-[0.2em] text-sky-200">Co-Founder</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
