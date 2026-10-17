"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { InstagramLogo, EnvelopeSimple, Phone } from "@phosphor-icons/react";
import { CAFETERIA, NAV_LINKS } from "@/lib/data";

const FLUID: [number, number, number, number] = [0.32, 0.72, 0, 1];

const STAGGER_DELAYS = [0.06, 0.11, 0.16, 0.21, 0.26];

/**
 * The fluid island nav from the design skill:
 * a floating glass pill, a hamburger that morphs into an X,
 * and a full screen glass overlay with staggered link reveal.
 */
export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null,
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px" },
    );
    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <nav
          aria-label="Main"
          className="pointer-events-auto mx-auto mt-6 flex w-max items-center gap-1 rounded-full border border-line bg-black/60 py-2 pr-2 pl-5 backdrop-blur-xl"
        >
          <a href="#top" className="mr-2 flex items-center gap-2 text-sm font-semibold tracking-tight">
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-ember" />
            Machine Room
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={`rounded-full px-3 py-2 text-sm font-medium transition-colors duration-300 ease-fluid hover:bg-white/10 ${
                      isActive ? "text-cream" : "text-muted"
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href="#reserve"
            className="ml-1 hidden rounded-full bg-ember py-2 pr-3 pl-3 text-sm font-semibold text-[#131209] transition-transform duration-300 ease-fluid hover:bg-ember-strong md:inline-block active:scale-[0.98]"
          >
            Reserve a table
          </a>

          <button
            ref={hamburgerRef}
            className="relative z-[60] ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 ease-fluid hover:bg-white/10 md:hidden"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span
                className={`absolute top-0 left-0 block h-0.5 w-5 bg-cream transition-all duration-500 ease-fluid ${
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-0.5 w-5 -translate-y-1/2 bg-cream transition-all duration-500 ease-fluid ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 block h-0.5 w-5 bg-cream transition-all duration-500 ease-fluid ${
                  open ? "bottom-0 top-auto translate-y-0 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center bg-black/80 backdrop-blur-3xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: FLUID }}
          >
            <ul className="space-y-2 px-8">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    className="block py-1 text-4xl font-semibold tracking-tight text-cream"
                    onClick={() => setOpen(false)}
                    initial={{ y: 48, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    transition={{ duration: 0.7, delay: STAGGER_DELAYS[index], ease: FLUID }}
                  >
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              className="mt-10 px-8"
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: FLUID }}
            >
              <a
                href="#reserve"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full bg-ember py-2 pr-3 pl-3 text-base font-semibold text-[#131209]"
              >
                Reserve a table
              </a>
              <div className="mt-8 flex flex-col gap-3 text-sm text-muted">
                <a href={`tel:+15037632148`} className="flex items-center gap-3">
                  <Phone size={18} aria-hidden /> {CAFETERIA.phone}
                </a>
                <a href={`mailto:${CAFETERIA.email}`} className="flex items-center gap-3">
                  <EnvelopeSimple size={18} aria-hidden /> {CAFETERIA.email}
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3"
                >
                  <InstagramLogo size={18} aria-hidden /> @machineroom.coffee
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
