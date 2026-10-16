"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteImages } from "@/data/images";
import { navItems } from "@/data/site";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const updateActiveHref = () => setActiveHref(window.location.hash);
    updateActiveHref();
    window.addEventListener("hashchange", updateActiveHref);
    return () => window.removeEventListener("hashchange", updateActiveHref);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200/80 bg-white/90 shadow-[0_12px_28px_rgba(15,23,42,0.08)] backdrop-blur-xl"
          : "bg-white/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav aria-label="Main navigation" className="flex h-20 items-center justify-between gap-5">
          <Link
            href="#home"
            className="flex items-center gap-3"
            aria-label="Izra Smile Foundation home"
            aria-current={activeHref === "#home" ? "location" : undefined}
            onClick={() => setActiveHref("#home")}
          >
            <div className="relative h-14 w-14 shrink-0">
              <Image
                src={siteImages.logo}
                alt="Izra Smile Foundation logo"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <div className="leading-none">
              <div className="text-base font-semibold tracking-[0.14em] text-slate-900">IZRA</div>
              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                Smile Foundation
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 lg:flex xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "location" : undefined}
                onClick={() => setActiveHref(item.href)}
                className="group relative text-xs font-medium text-slate-700 transition duration-200 hover:text-sky-800 xl:text-sm"
              >
                <span>{item.label}</span>
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sky-700 transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="#donate"
              aria-current={activeHref === "#donate" ? "location" : undefined}
              onClick={() => setActiveHref("#donate")}
              className="inline-flex items-center gap-2 rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_35px_rgba(14,63,104,0.2)] transition hover:-translate-y-0.5 hover:bg-sky-800"
            >
              DONATE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-800 shadow-sm transition lg:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      <div className={`border-t border-slate-200 bg-white/95 backdrop-blur-xl lg:hidden ${isOpen ? "block" : "hidden"}`}>
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "location" : undefined}
                onClick={() => {
                  setActiveHref(item.href);
                  setIsOpen(false);
                  menuButtonRef.current?.focus();
                }}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-sky-800"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#donate"
              aria-current={activeHref === "#donate" ? "location" : undefined}
              onClick={() => {
                setActiveHref("#donate");
                setIsOpen(false);
                menuButtonRef.current?.focus();
              }}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-sky-700 px-5 py-3 text-sm font-semibold text-white"
            >
              DONATE
              <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
      </div>
    </header>
  );
}
