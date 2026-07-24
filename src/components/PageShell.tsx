import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col bg-navy-deep">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="pt-36 pb-16 md:pt-44 md:pb-24 border-b border-gold/10">
      <div className="container-luxe text-center animate-fade-up">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1 className="mt-4 font-display text-4xl md:text-6xl text-gradient-gold">
          {title}
        </h1>
        <span className="gold-rule mx-auto mt-6" />
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-foreground/70 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
