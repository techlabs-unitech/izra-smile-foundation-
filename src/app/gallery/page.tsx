import type { Metadata } from "next";
import { Camera } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PhotoGallery } from "@/components/PhotoGallery";
import { foodDistributionAlbum, galleryItems } from "@/data/site";

const pageDescription =
  "Photos from Izra Smile Foundation's work in the community, including our weekly food distribution for families and children in need.";

export const metadata: Metadata = {
  title: "Gallery | Izra Smile Foundation",
  description: pageDescription,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Izra Smile Foundation",
    description: pageDescription,
    url: "/gallery",
    images: [{ url: foodDistributionAlbum.items[0].src, alt: foodDistributionAlbum.items[0].alt }],
  },
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-slate-900">
      <Navbar />

      <main id="main-content">
        <section className="overflow-hidden bg-[#071827] text-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-orange-300">
                <Camera className="h-3.5 w-3.5" aria-hidden="true" />
                Our Gallery
              </p>

              <h1 className="mt-8 font-display text-5xl leading-[0.95] tracking-[-0.06em] text-white sm:text-6xl lg:text-[5rem]">
                Moments of Hope, Captured.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
                A look at our work on the ground: the people we serve, the volunteers who show up,
                and the smiles we share along the way.
              </p>
            </div>
          </div>
        </section>

        <section id="weekly-food-distribution" className="py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  {foodDistributionAlbum.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
                  {foodDistributionAlbum.title}
                </h2>
                <p className="mt-5 inline-flex rounded-full bg-sky-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-800">
                  {foodDistributionAlbum.items.length} photos
                </p>
              </div>
              <div className="space-y-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                {foodDistributionAlbum.description.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <PhotoGallery items={foodDistributionAlbum.items} />
          </div>
        </section>

        <section id="moments" className="bg-slate-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">More From Our Work</p>
              <h2 className="mt-4 text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
                Moments That Matter
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                Shelter care, hygiene drives, learning kits, time with our elders and more.
              </p>
            </div>

            <PhotoGallery items={galleryItems} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
