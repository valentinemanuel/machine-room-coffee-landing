"use client";

import { useId, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { CAFETERIA } from "@/lib/data";

const FLUID: [number, number, number, number] = [0.32, 0.72, 0, 1];

type Status = "idle" | "sending" | "success";

type FieldErrors = { name?: string; email?: string; date?: string; form?: string };

const HOURS = [
  { day: "Monday to Friday", time: "7:00 to 18:00" },
  { day: "Saturday", time: "8:00 to 19:00" },
  { day: "Sunday", time: "8:00 to 16:00" },
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3 py-2 text-base text-cream placeholder:text-muted/70 transition-colors duration-300 ease-fluid hover:border-cream/25 focus:border-ember focus:outline-none";

export function ReservationSection() {
  const formId = useId();
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sentName, setSentName] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const date = String(data.get("date") ?? "");

    const nextErrors: FieldErrors = {};
    if (!name) nextErrors.name = "Please tell us who the table is for.";
    if (!email) nextErrors.email = "We need an email to confirm your reservation.";
    else if (!EMAIL_PATTERN.test(email)) nextErrors.email = "That email does not look complete.";
    if (date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (new Date(`${date}T00:00:00`) < today) {
        nextErrors.date = "Pick a day from today onwards.";
      }
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setErrors((current) => ({
        ...current,
        form: "A couple of fields need attention before we can send this.",
      }));
      return;
    }

    setErrors({});
    setStatus("sending");
    // The reservation desk currently reads these by email. Simulate the send.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setSentName(name);
    setStatus("success");
    form.reset();
  }

  return (
    <section id="reserve" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 rounded-3xl border border-line bg-surface p-8 md:p-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Reveal>
              <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
                <span aria-hidden className="h-px w-10 bg-ember" />
                Reservations
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Save a seat, we will make the rest warm
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-md text-base leading-7 text-muted">
                Tables indoors, the heated patio, and the Saturday roastery tour all go through the
                same form. You will hear back from the desk the same day, usually within the hour
                after opening.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-12 space-y-6 text-base">
                <dl className="space-y-5">
                  {HOURS.map((entry) => (
                    <div key={entry.day} className="flex justify-between gap-8 border-b border-line pb-3">
                      <dt className="text-muted">{entry.day}</dt>
                      <dd className="font-mono text-sm text-cream">{entry.time}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="space-y-3 text-muted">
                  <li className="flex items-center gap-3">
                    <MapPin size={18} aria-hidden className="shrink-0 text-ember" />
                    {CAFETERIA.address}
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone size={18} aria-hidden className="shrink-0 text-ember" />
                    <a href="tel:+15037632148" className="transition-colors hover:text-cream">
                      {CAFETERIA.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <EnvelopeSimple size={18} aria-hidden className="shrink-0 text-ember" />
                    <a
                      href={`mailto:${CAFETERIA.email}`}
                      className="transition-colors hover:text-cream"
                    >
                      {CAFETERIA.email}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            {status === "success" ? (
              <motion.div
                initial={reduced ? undefined : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: FLUID }}
                role="status"
                className="flex h-full min-h-80 flex-col items-start justify-center rounded-2xl border border-line bg-surface-2 p-8"
              >
                <span
                  aria-hidden
                  className="mb-5 inline-block h-10 w-10 rounded-full bg-ember/20 align-middle"
                >
                  <span className="mt-3 block h-4 w-4 ml-3 rounded-full border-2 border-ember border-t-0 border-r-0 rotate-45" />
                </span>
                <h3 className="text-2xl font-semibold tracking-tight">
                  Thanks {sentName}, the table request is in
                </h3>
                <p className="mt-3 max-w-sm text-base leading-7 text-muted">
                  The desk replies from hello@machineroom.coffee, so keep the thread nearby. If it is
                  urgent, calling {CAFETERIA.phone} works faster than any form.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 rounded-full border border-line py-2 pr-3 pl-3 text-sm font-semibold text-cream transition-colors duration-300 ease-fluid hover:bg-white/10"
                >
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {errors.form && (
                  <p role="alert" className="rounded-xl bg-ember/10 px-3 py-2 text-sm text-[#f0b983]">
                    {errors.form}
                  </p>
                )}

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Name" htmlFor={`${formId}-name`} error={errors.name}>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      type="text"
                      required
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Ada Reyes"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Email" htmlFor={`${formId}-email`} error={errors.email}>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      required
                      aria-invalid={Boolean(errors.email)}
                      placeholder="you@somewhere.com"
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Date" htmlFor={`${formId}-date`} error={errors.date}>
                    <input
                      id={`${formId}-date`}
                      name="date"
                      type="date"
                      required
                      aria-invalid={Boolean(errors.date)}
                      className={inputClass}
                    />
                  </Field>
                  <Field label="Guests" htmlFor={`${formId}-guests`}>
                    <select id={`${formId}-guests`} name="guests" className={inputClass} defaultValue="2">
                      {["1", "2", "3", "4", "5", "6", "7 or more"].map((option) => (
                        <option key={option} value={option}>
                          {option} {option === "1" ? "guest" : "guests"}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Time" htmlFor={`${formId}-time`}>
                    <select id={`${formId}-time`} name="time" className={inputClass} defaultValue="10:00">
                      {["8:00", "10:00", "12:00", "14:00", "16:00", "18:00"].map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Spot" htmlFor={`${formId}-spot`}>
                    <select id={`${formId}-spot`} name="spot" className={inputClass} defaultValue="Dining room">
                      <option>Dining room</option>
                      <option>Heated patio</option>
                      <option>Communal table</option>
                      <option>Saturday roastery tour</option>
                    </select>
                  </Field>
                </div>

                <Field label="Anything else" htmlFor={`${formId}-notes`}>
                  <textarea
                    id={`${formId}-notes`}
                    name="notes"
                    rows={3}
                    placeholder="Allergies, a birthday, the far window table…"
                    className={`${inputClass} resize-y`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="w-full rounded-full bg-ember py-2 pr-3 pl-3 text-base font-semibold text-[#131209] transition-all duration-700 ease-fluid hover:bg-ember-strong active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-56"
                >
                  {status === "sending" ? "Sending your request…" : "Send reservation request"}
                </button>
                <p className="text-xs text-muted">
                  No payment and no account. The desk simply confirms by mail.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-medium text-cream">
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-[#f0b983]">
          {error}
        </p>
      )}
    </div>
  );
}
