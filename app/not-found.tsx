import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p aria-hidden className="mb-2 font-mono text-sm tracking-widest text-ember uppercase">
        Error 404 · page off the plan
      </p>
      <h1 className="max-w-xl text-4xl font-semibold tracking-tight md:text-6xl">
        This page went for a coffee and never came back
      </h1>
      <p className="mt-6 max-w-md text-base leading-7 text-muted">
        The door you tried to open is not on the plan. The coffee is still on, a short walk from
        here.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-ember py-2 pr-3 pl-3 text-base font-semibold text-[#131209] transition-all duration-700 ease-fluid hover:bg-ember-strong active:scale-[0.98]"
      >
        Back to the counter
      </Link>
    </main>
  );
}
