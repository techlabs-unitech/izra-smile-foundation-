"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { Home, MapPin } from "lucide-react";
import { impactStats, shelterStory } from "@/data/site";
import { Reveal } from "@/components/Reveal";

const formatNumber = (value: number) => new Intl.NumberFormat("en-IN").format(value);

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref}>
      {formatNumber(display)}
      {suffix}
    </span>
  );
}

export function ImpactSection() {
  return (
    <section id="impact" className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Our impact</p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] text-white sm:text-5xl lg:text-6xl">
              Impact is more than numbers.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-300">
              Every number below is a person who was fed, cared for, treated or given a chance to learn.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {impactStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.05}>
              <div className="h-full rounded-[1.5rem] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-7">
                <p className="text-4xl font-semibold tracking-[-0.04em] text-emerald-400 sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-3 text-sm leading-6 text-slate-300 sm:text-base">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[320px]">
              <Image
                src="/images/shelter-little-girl.jpg"
                alt="A smiling child at one of our shelters in Bengaluru"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <div className="p-7 sm:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-sky-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200">
                <Home className="h-3.5 w-3.5" aria-hidden="true" />
                Our shelters
              </span>
              <h3 className="mt-5 text-3xl font-medium tracking-[-0.04em] text-white">Shelters in Bengaluru</h3>
              <p className="mt-4 text-base leading-8 text-slate-200">{shelterStory.intro}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {shelterStory.locations.map((place) => (
                  <span key={place} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-sm text-white">
                    <MapPin className="h-4 w-4 text-sky-300" aria-hidden="true" />
                    {place}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-sky-200">We provide</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {shelterStory.needs.map((need) => (
                  <li key={need} className="rounded-full bg-emerald-400/15 px-3 py-1.5 text-sm text-emerald-200">
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
