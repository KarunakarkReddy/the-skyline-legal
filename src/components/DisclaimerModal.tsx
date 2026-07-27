import { useEffect, useState } from "react";
import logo from "@/assets/sllogohead.png";

const STORAGE_KEY = "skyline-legal-disclaimer-accepted-at";
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const acceptedAt = raw ? Number(raw) : 0;
      if (!acceptedAt || Date.now() - acceptedAt > THIRTY_DAYS_MS) {
        setOpen(true);
      }
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!mounted || !open) return null;

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md" />
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto border border-gold/40 bg-navy-deep shadow-2xl">
        <div className="border-b border-gold/20 px-6 py-5 flex items-center justify-center bg-navy/60">
          <img src={logo} alt="Skyline Legal" className="h-14 w-auto object-contain" />
        </div>
        <div className="px-6 sm:px-10 py-8">
          <div className="text-center">
            <h2
              id="disclaimer-title"
              className="mt-2 font-display text-2xl sm:text-3xl text-gradient-gold tracking-wide"
            >
              LEGAL DISCLAIMER &amp; TERMS FOR BROWSING
            </h2>
            <span className="gold-rule mx-auto mt-4" />
          </div>

          <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground/80">
            <p>
              As per the Rules of the Bar Council of India, advocates are prohibited from
              soliciting work or advertising. This website is intended solely to provide
              general information about Skyline Legal and its areas of practice.
            </p>
            <p className="text-foreground/90">
              By clicking <span className="text-gold">&ldquo;Accept &amp; Continue&rdquo;</span>, you acknowledge that:
            </p>
            <ul className="space-y-2.5 pl-1">
              {[
                "You are voluntarily seeking information about Skyline Legal.",
                "There has been no solicitation, advertisement, invitation or inducement by Skyline Legal or any of its advocates.",
                "The information available on this website is for informational purposes only.",
                "Nothing contained on this website constitutes legal advice.",
                "Viewing this website or communicating through it does not create an Advocate–Client relationship.",
                "Any information submitted through this website is subject to our Privacy Policy.",
              ].map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 rounded-full bg-gold shrink-0" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex justify-center">
            <button type="button" onClick={accept} className="btn-gold">
              Accept &amp; Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
