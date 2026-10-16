import Image from "next/image";
import { Sparkles } from "lucide-react";
import { siteImages } from "@/data/images";
import { visionPillars } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function VisionSection() {
  return (
    <section id="vision" className="relative overflow-hidden bg-slate-900 py-24">
      <div className="absolute inset-0 opacity-35">
        <Image src={siteImages.community} alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/65" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-4xl text-white">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-200">Our vision</p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] sm:text-5xl lg:text-6xl">Our Vision</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
              “To build a compassionate and inclusive society where every individual has the opportunity to live with dignity, access essential support and work towards a better future.”
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-12 flex flex-wrap gap-3">
            {visionPillars.map((pillar) => (
              <div
                key={pillar}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-slate-100 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4 text-sky-300" />
                {pillar}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
