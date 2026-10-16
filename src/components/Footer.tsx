import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";
import { siteImages } from "@/data/images";
import { contactDetails } from "@/data/site";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Our Work", href: "#support" },
  { label: "Impact", href: "#impact" },
  { label: "Gallery", href: "#gallery" },
  { label: "Get Involved", href: "#involved" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <Image
                  src={siteImages.logo}
                  alt="Izra Smile Foundation logo"
                  fill
                  className="object-contain"
                  sizes="56px"
                />
              </div>
              <div>
                <div className="text-xl font-semibold text-white">IZRA SMILE FOUNDATION</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-lg leading-8 text-slate-300">
              Bringing Hope • Creating Smiles • Changing Lives
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Quick Links</h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200">Instagram</h3>
            <a
              href={contactDetails.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-700 bg-slate-900">
                <Camera className="h-4 w-4" aria-hidden="true" />
              </span>
              {contactDetails.instagramHandle}
            </a>
          </div>

          <div className="flex items-center lg:justify-end">
            <Link
              href="#donate"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-50"
            >
              Donate
            </Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© Izra Smile Foundation. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
