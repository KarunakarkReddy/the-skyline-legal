import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ShieldCheck, Award, Users, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Skyline Legal" },
      { name: "description", content: "A Bengaluru partnership of advocates built on integrity, experience, trust, and results." },
      { property: "og:title", content: "About Skyline Legal" },
      { property: "og:description", content: "A partnership of advocates built on integrity and progress." },
    ],
  }),
  component: About,
});

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "We advise honestly, even when it is not the easier answer." },
  { icon: Award, title: "Experience", desc: "Decades of collective courtroom and advisory experience." },
  { icon: Users, title: "Client-First", desc: "Your objectives shape every strategic decision we take." },
  { icon: CheckCircle2, title: "Ethical Practice", desc: "Discretion, confidentiality, and professional standards without compromise." },
];

function About() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Our Firm"
        title="About Skyline Legal"
        subtitle="A partnership of advocates providing considered legal counsel to individuals, families, and companies across Karnataka."
      />
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-12 lg:grid-cols-2">
          <div className="space-y-5 text-foreground/75 leading-relaxed">
            <p>
              Skyline Legal was founded on a simple conviction: that clients deserve counsel that is prepared, principled, and personally attentive to their matter — from first consultation to final resolution.
            </p>
            <p>
              Our advocates practise across civil, criminal, corporate, property, family, consumer, and commercial matters, appearing before trial courts, tribunals, and the High Court of Karnataka.
            </p>
            <p>
              We hold ourselves to a high standard of preparation and courtroom conduct, and to an even higher standard of client care.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-gold/25 p-6 bg-navy/40">
                <Icon size={26} className="text-gold" />
                <h3 className="mt-4 font-display text-xl text-gold">{title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
