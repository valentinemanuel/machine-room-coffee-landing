import type { Metadata } from "next";
import Link from "next/link";
import { CAFETERIA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms | Machine Room Coffee",
  description: "The terms that apply to the fictional Machine Room landing page demo.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32 md:py-40">
      <p className="mb-3 text-sm font-medium text-muted">
        <span aria-hidden className="mr-3 inline-block h-px w-10 bg-ember" />
        The small print
      </p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Terms</h1>
      <div className="mt-10 space-y-6 text-base leading-7 text-muted">
        <p>
          Machine Room is a fictional brand created for a landing page demonstration. The menu,
          the people quoted in the testimonials, the address, and every claim on the page are
          invented. Nothing here offers real goods, services, or prices.
        </p>
        <p>
          The code in this repository is provided as is for learning and demonstration. You may
          fork it, restyle it, and build real pages with it; the copy, the photos, and the brand
          assets are meant to be replaced with your own.
        </p>
        <p>
          The demo reservation form is illustrative only. It validates fields locally and never
          transmits them.
        </p>
        <p>
          Photography from Unsplash contributors is used under the Unsplash license and cannot be
          resold uncompiled. Typography is served through the Google Fonts integration in the
          project itself.
        </p>
        <p>
          For anything about the demo, write to {CAFETERIA.email}.
        </p>
      </div>
      <Link
        href="/"
        className="mt-12 inline-block rounded-full border border-line py-2 pr-3 pl-3 text-sm font-semibold text-cream transition-colors duration-300 ease-fluid hover:bg-white/10"
      >
        Back to the counter
      </Link>
    </main>
  );
}
