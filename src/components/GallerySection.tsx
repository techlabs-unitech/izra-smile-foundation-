"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryItems } from "@/data/site";
import { Reveal } from "@/components/Reveal";

export function GallerySection() {
  const [selected, setSelected] = useState<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (selected !== null && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  }, [selected]);

  const closeLightbox = () => {
    if (selected === null) return;

    setIsClosing(true);
    window.setTimeout(() => {
      if (dialogRef.current?.open) dialogRef.current.close();
    }, prefersReducedMotion ? 0 : 220);
  };

  const changeImage = (direction: -1 | 1) => {
    setSelected((current) => {
      if (current === null) return current;
      return (current + direction + galleryItems.length) % galleryItems.length;
    });
  };

  return (
    <section id="gallery" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">Gallery</p>
            <h2 className="text-4xl font-medium tracking-[-0.06em] text-slate-900 sm:text-5xl">
              Moments That Matter
            </h2>
          </div>
        </Reveal>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {galleryItems.map((item, index) => (
            <Reveal key={item.src} delay={index * 0.04}>
              <button
                type="button"
                onClick={(event) => {
                  openerRef.current = event.currentTarget;
                  setIsClosing(false);
                  setSelected(index);
                }}
                className="group relative mb-5 block w-full overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white text-left shadow-[0_18px_42px_rgba(15,23,42,0.04)]"
                aria-label={`View ${item.alt}`}
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={900}
                    height={1200}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 48vw, 100vw"
                    className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                      index % 3 === 0 ? "h-[420px]" : index % 3 === 1 ? "h-[320px]" : "h-[420px]"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-white/10 opacity-80" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="text-sm font-medium opacity-90">{item.title}</span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {selected !== null ? (
        <dialog
          ref={dialogRef}
          aria-label={`Gallery: ${galleryItems[selected].title}`}
          onCancel={(event) => {
            event.preventDefault();
            closeLightbox();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.preventDefault();
              closeLightbox();
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              changeImage(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              changeImage(1);
            }
          }}
          onClose={() => {
            setSelected(null);
            setIsClosing(false);
            window.requestAnimationFrame(() => openerRef.current?.focus());
          }}
          onClick={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
          className="fixed inset-0 z-[60] m-0 flex h-dvh w-screen max-h-none max-w-none items-center justify-center border-0 bg-transparent p-0 backdrop:bg-slate-950/85 backdrop:backdrop-blur-sm"
        >
          <button
            type="button"
            tabIndex={-1}
            onClick={closeLightbox}
            aria-label="Dismiss gallery backdrop"
            className="absolute inset-0 z-0 cursor-default bg-transparent"
          />
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0.98 : 1 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.18, ease: "easeOut" }}
            onAnimationComplete={() => {
              if (isClosing && dialogRef.current?.open) dialogRef.current.close();
            }}
            className="relative z-10 mx-auto flex h-[min(82dvh,900px)] w-[min(96vw,72rem)] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-2xl sm:w-[min(92vw,72rem)] sm:rounded-[2rem]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.16 }}
                className="absolute inset-0"
              >
                <Image
                  src={galleryItems[selected].src}
                  alt={galleryItems[selected].alt}
                  fill
                  sizes="(min-width: 1152px) 1100px, 96vw"
                  className="object-contain"
                />
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:right-4 sm:top-4"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeImage(-1)}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/70 bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:left-4"
              aria-label="Previous gallery image"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => changeImage(1)}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200/70 bg-white/95 text-slate-900 shadow-lg transition hover:bg-white sm:right-4"
              aria-label="Next gallery image"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <p
              aria-live="polite"
              aria-atomic="true"
              className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/15 bg-slate-950/80 px-4 py-2 text-sm font-medium text-white shadow-lg sm:bottom-4"
            >
              {selected + 1} / {galleryItems.length}
            </p>
          </motion.div>
        </dialog>
      ) : null}
    </section>
  );
}
