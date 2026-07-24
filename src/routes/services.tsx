import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Skyline Legal" },
      { name: "description", content: "Advisory, drafting, court representation, and dispute resolution services from Skyline Legal advocates." },
      { property: "og:title", content: "Services — Skyline Legal" },
      { property: "og:description", content: "How Skyline Legal serves individuals, families, and companies." },
    ],
  }),
  component: Services,
});

const services = [
  { title: "Legal Advisory", desc: "Considered written and oral opinions on complex matters." },
  { title: "Drafting & Documentation", desc: "Agreements, deeds, wills, notices, and pleadings drafted with precision." },
  { title: "Court Representation", desc: "Trial and appellate advocacy across Karnataka's courts and tribunals." },
  { title: "Dispute Resolution", desc: "Negotiation, mediation, and settlement of civil and commercial disputes." },
  { title: "Corporate Retainer", desc: "Ongoing counsel for companies, start-ups, and family businesses." },
  { title: "Due Diligence", desc: "Title, contractual, and compliance reviews for transactions." },
];

function Services() {
  return (
    <PageShell>
      <PageHeader eyebrow="What We Do" title="Our Services" subtitle="End-to-end legal support delivered with discretion and rigour." />
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="border border-gold/25 p-7 bg-navy/40 hover:border-gold/60 transition">
              <h3 className="font-display text-2xl text-gold">{s.title}</h3>
              <span className="gold-rule mt-3" />
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
