import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { siteImages } from "@/data/images";

export const metadata: Metadata = {
  title: "Page Not Found | Izra Smile Foundation",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f9fbff_0%,#f4fbf7_100%)] px-4 py-16 text-center text-slate-900">
      <div className="flex max-w-xl flex-col items-center">
        <Image src={siteImages.logo} alt="Izra Smile Foundation logo" width={112} height={112} className="h-28 w-28 object-contain" />
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">404</p>
        <h1 className="mt-3 text-4xl font-medium sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          The page may have moved or the address may be incorrect.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Return to homepage
        </Link>
      </div>
    </main>
  );
}