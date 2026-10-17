import type { Metadata } from "next";
import Link from "next/link";
import { CAFETERIA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy policy | Machine Room Coffee",
  description: "What the fictional Machine Room landing page stores, collects, and never does.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-32 md:py-40">
      <p className="mb-3 text-sm font-medium text-muted">
        <span aria-hidden className="mr-3 inline-block h-px w-10 bg-ember" />
        The small print
      </p>
      <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Privacy policy</h1>
      <div className="mt-10 space-y-6 text-base leading-7 text-muted">
        <p>
          This site is a design demo for a fictional coffee shop. There are no accounts, no
          tracking pixels, no ads, and no analytics scripts. The page sets no cookies of its own.
        </p>
        <p>
          The reservation form runs entirely in your browser. What you type is never sent to a
          server; nothing is written to a database, and the confirmation message after sending is
          part of the demonstration. In production this would email the cafe desk using your own
          mail provider, and only the details you typed.
        </p>
        <p>
          Hosting is provided by Vercel, which serves static files and logs standard request data
          (IP address, user agent, requested path) under its own{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noreferrer"
            className="text-cream underline decoration-line underline-offset-2 hover:text-ember-strong"
          >
            privacy policy
          </a>
          . No other third party receives any request from this page.
        </p>
        <p>
          Photography comes from Unsplash contributors under the Unsplash license, credited in the
          site footer.
        </p>
        <p>
          Questions about this demo can go to {CAFETERIA.email}.
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
