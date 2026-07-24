import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Quote } from "lucide-react";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials — Skyline Legal" },
      { name: "description", content: "What clients say about working with Skyline Legal." },
      { property: "og:title", content: "Testimonials — Skyline Legal" },
      { property: "og:description", content: "Voices of clients we have had the privilege to represent." },
    ],
  }),
  component: Testimonials,
});

const items = [
  { quote: "Skyline Legal handled my property matter with remarkable diligence. Their advice was clear and their outcome exceeded expectations.", name: "R. Iyer", role: "Property Client" },
  { quote: "Composed, prepared, and utterly professional in court. I could not have asked for better representation.", name: "S. Menon", role: "Corporate Client" },
  { quote: "They treated a difficult family dispute with sensitivity and discretion. Genuinely a client-first firm.", name: "A. Kulkarni", role: "Family Matter" },
  { quote: "Excellent commercial judgment. The team saved us months of avoidable litigation.", name: "V. Rao", role: "Founder" },
  { quote: "Straightforward, ethical, and effective. I have referred several friends since.", name: "P. Shetty", role: "Individual Client" },
  { quote: "A rare combination of warmth and rigour. I felt heard at every stage.", name: "N. Deshpande", role: "Family Client" },
];

function Testimonials() {
  return (
    <PageShell>
      <PageHeader eyebrow="Clients" title="Testimonials" subtitle="Trust is built one matter at a time." />
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="relative border border-gold/25 bg-navy/40 p-8 pt-14">
              <Quote size={44} className="absolute -top-5 left-6 text-gold bg-navy-deep p-2" />
              <blockquote className="font-display text-lg italic leading-relaxed text-foreground/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-gold/15 pt-4">
                <div className="text-gold font-display text-lg">{t.name}</div>
                <div className="text-[0.7rem] tracking-[0.24em] uppercase text-foreground/55">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
