import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryItems } from "@/data/site";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Reveal } from "@/components/Reveal";

export function GallerySection() {
  return (
    <section id="gallery" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Gallery</p>
              <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
                Moments That Matter
              </h2>
            </div>
            <Link
              href="/gallery"
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:border-sky-300 hover:text-sky-800 sm:self-auto"
            >
              View full gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <PhotoGallery items={galleryItems} />
      </div>
    </section>
  );
}
