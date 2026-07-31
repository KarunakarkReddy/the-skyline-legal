import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { site, practiceAreas } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-gold/15 bg-navy-deep">
      <div className="container-luxe py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo size={44} />
          <p className="mt-5 text-sm leading-relaxed text-foreground/70 max-w-xs">
            A partnership of advocates providing trusted legal counsel with integrity, discretion, and unwavering commitment to justice.
          </p>
          <div className="mt-6 flex gap-3">
            {[Facebook, Instagram, Linkedin].map((I, i) => (
              <a
                key={i}
                href="#"
                aria-label="social"
                className="grid place-items-center h-9 w-9 border border-gold/30 text-gold hover:bg-gold hover:text-navy-deep transition"
              >
                <I size={15} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="eyebrow">Quick Links</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-foreground/75">
            {[
              ["/about", "About"],
              ["/our-team", "Our Team"],
              ["/practice-areas", "Practice Areas"],
              ["/Gallery", "Gallery"],
              ["/faqs", "FAQs"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Practice Areas</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-foreground/75">
            {practiceAreas.slice(0, 6).map((p) => (
              <li key={p.title}>
                <Link to="/practice-areas" className="hover:text-gold transition-colors">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="eyebrow">Contact</h4>
          <ul className="mt-5 space-y-3 text-sm text-foreground/75">
            <li className="flex gap-3">
              <Phone size={15} className="text-gold shrink-0 mt-0.5" />

              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {site.phones.map((p) => (
                  <div key={p} className="whitespace-nowrap">
                    {p}
                  </div>
                ))}
              </div>
            </li>
            <li className="flex gap-3">
              <Mail size={15} className="text-gold shrink-0 mt-0.5" />
              <span>{site.email}</span>
            </li>
            <li className="flex gap-3">
              <MapPin size={15} className="text-gold shrink-0 mt-0.5" />
              <div>
                <div>{site.address.line1}</div>
                <div>{site.address.line2}</div>
                <div>{site.address.line3}</div>
                <div>{site.address.line4}</div>
                <div>{site.address.line5}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10">
        <div className="container-luxe py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-foreground/55">
          <div>© {new Date().getFullYear()} Skyline Legal. All rights reserved.</div>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gold">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
