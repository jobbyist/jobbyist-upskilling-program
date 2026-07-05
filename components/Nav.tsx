"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

const LINKS = [
  { href: "#why-attend", label: "Why Attend" },
  { href: "#agenda", label: "Agenda" },
  { href: "#prizes", label: "Prizes" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-charcoal/85 backdrop-blur-xl border-b border-charcoal-line" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="font-heading font-extrabold text-lg tracking-tight text-ink">
          JOBBY<span className="text-electric-soft">IST</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-ink-mid hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button as="a" href="#rsvp" size="sm">
          Reserve My Seat
        </Button>
      </div>
    </nav>
  );
}
