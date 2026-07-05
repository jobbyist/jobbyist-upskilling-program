import { EVENT } from "@/lib/constants";

const COLUMNS = [
  {
    title: "Jobbyist",
    links: [
      { label: "About", href: `${EVENT.host.url}/about` },
      { label: "Events", href: EVENT.host.eventsUrl },
      { label: "Jobbyist Pro", href: `${EVENT.host.url}/pro` },
      { label: "Careers", href: `${EVENT.host.url}/careers` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: `${EVENT.host.url}/privacy` },
      { label: "Terms of Service", href: `${EVENT.host.url}/terms` },
    ],
  },
];

const SOCIALS = ["LinkedIn", "X", "Instagram", "TikTok"];

export default function Footer() {
  return (
    <footer className="relative border-t border-charcoal-line bg-charcoal-soft pt-16 pb-8">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <span className="font-heading text-lg font-extrabold text-ink">
              JOBBY<span className="text-electric-soft">IST</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-ink-faint">{EVENT.host.tagline}</p>

            <form className="mt-6 flex max-w-sm gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full rounded-xl border border-charcoal-line-strong bg-charcoal-raised px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-electric focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-electric px-4 py-2.5 text-sm font-bold text-charcoal transition hover:brightness-110"
              >
                Subscribe
              </button>
            </form>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-ink-faint">
                {col.title}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-ink-mid hover:text-ink transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-charcoal-line pt-8 sm:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; {new Date().getFullYear()} Jobbyist. All rights reserved.
          </p>
          <div className="flex gap-5">
            {SOCIALS.map((s) => (
              <a key={s} href="#" className="text-xs text-ink-faint hover:text-ink transition-colors">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
