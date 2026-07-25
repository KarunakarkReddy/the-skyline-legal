import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/partners", label: "Partners" },
  { to: "/practice-areas", label: "Practice Areas" },
  { to: "/gallery", label: "gallery" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] satisfies readonly { to: string; label: string }[];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-navy-deep/85 border-b border-gold/15"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" aria-label="Skyline Legal home">
          <Logo size={60} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[0.78rem] tracking-[0.22em] uppercase text-foreground/85 hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/book" className="btn-gold">
            Book Consultation
          </Link>
        </div>

        <button
          className="lg:hidden text-gold p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-navy-deep/98 backdrop-blur border-t border-gold/15">
          <div className="container-luxe flex flex-col py-6 gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.22em] uppercase text-foreground/85 hover:text-gold"
                activeProps={{ className: "text-gold" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/book"
              onClick={() => setOpen(false)}
              className="btn-gold mt-2 self-start"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
