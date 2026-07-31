import { useEffect, useState } from "react";
import logo from "@/assets/sllogohead.png";

export function DisclaimerModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setOpen(true);
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

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="disclaimer-title"
    >
      <div className="w-full max-w-xl rounded-lg border border-gold/30 bg-navy-deep shadow-2xl overflow-hidden animate-fade-up">

        {/* Header */}
        <div className="flex justify-center border-b border-gold/20 bg-navy/60 py-5">
          <img
            src={logo}
            alt="Skyline Legal"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Body */}
        <div className="px-8 py-7">

          <h2
            id="disclaimer-title"
            className="text-center font-display text-2xl text-gradient-gold tracking-wide"
          >
            DISCLAIMER
          </h2>

          <span className="gold-rule mx-auto mt-4" />

          <div className="mt-6 space-y-4 text-sm leading-7 text-foreground/80">

            <p>
              As required under the Rules of the Bar Council of India,
              advocates are prohibited from advertising or soliciting work.
              This website is intended solely to provide general information
              about Skyline Legal and its legal services.
            </p>

            <p>
              The information contained on this website does not constitute
              legal advice or create an Advocate–Client relationship.
            </p>

            <p>
              By clicking{" "}
              <span className="text-gold font-medium">
                "Accept & Continue"
              </span>
              , you acknowledge that you have read, understood and accepted
              this disclaimer.
            </p>

          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btn-gold px-8 py-2"
            >
              Accept & Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}