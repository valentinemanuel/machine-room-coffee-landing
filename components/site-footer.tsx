"use client";

import { InstagramLogo, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import Link from "next/link";
import { NAV_LINKS, CAFETERIA } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="flex items-center gap-2 text-lg font-semibold tracking-tight">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-ember" />
            Machine Room
          </p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
            {CAFETERIA.tagline}. Open daily, roasting on Thursdays, dialing in every morning before opening.
          </p>
          <ul className="mt-6 flex flex-col gap-3 text-sm text-muted">
            <li className="flex items-center gap-3">
              <MapPin size={16} aria-hidden className="text-ember" />
              {CAFETERIA.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} aria-hidden className="text-ember" />
              <a href="tel:+15037632148" className="transition-colors hover:text-cream">
                {CAFETERIA.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <EnvelopeSimple size={16} aria-hidden className="text-ember" />
              <a
                href={`mailto:${CAFETERIA.email}`}
                className="transition-colors hover:text-cream"
              >
                {CAFETERIA.email}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer">
          <h2 className="mb-4 text-sm font-semibold tracking-tight text-cream">Around the page</h2>
          <ul className="space-y-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-muted transition-colors hover:text-cream">
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#reserve" className="text-muted transition-colors hover:text-cream">
                Reservations
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold tracking-tight text-cream">Elsewhere</h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-cream"
          >
            <InstagramLogo size={16} aria-hidden className="text-ember" />
            @machineroom.coffee
          </a>

          <h2 className="mt-8 mb-4 text-sm font-semibold tracking-tight text-cream">The small print</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/privacy" prefetch={false} className="text-muted transition-colors hover:text-cream">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" prefetch={false} className="text-muted transition-colors hover:text-cream">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Machine Room Coffee Roasters LLC. A fictional coffee shop for a landing page
            demo.
          </p>
          <p>
            Photography by{" "}
            <a
              href="https://unsplash.com"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-line underline-offset-2 hover:text-cream"
            >
              Unsplash contributors
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
