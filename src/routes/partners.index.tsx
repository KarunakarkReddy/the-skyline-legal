import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { partners, associates } from "@/lib/partners";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partners/")({
  head: () => ({
    meta: [
      { title: "Partners — Skyline Legal" },
      { name: "description", content: "Meet the four advocates who lead Skyline Legal's practice across civil, criminal, corporate, and family matters." },
      { property: "og:title", content: "Meet Our Partners — Skyline Legal" },
      { property: "og:description", content: "A partnership of four advocates. One standard of practice." },
    ],
  }),
  component: Partners,
});

function Partners() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="The Chambers"
        title="Meet Our Partners"
        subtitle="Four advocates, each leading a distinct area of practice, united by a shared commitment to integrity and rigour."
      />
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((p) => (
            <article key={p.slug} className="group border border-gold/20 bg-navy-deep hover:border-gold/60 transition">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[35%] group-hover:grayscale-0 transition duration-700"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl text-gold">{p.name}</h3>
                <div className="mt-1 text-[0.7rem] tracking-[0.28em] uppercase text-gold-dim">{p.title}</div>
                <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{p.short}</p>
                <Link
                  to="/partners/$slug"
                  params={{ slug: p.slug }}
                  className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.28em] uppercase text-gold hover:text-gold-soft"
                >
                  View Profile <ArrowRight size={13} />
                </Link>
              </div>
            </article>
          ))}
                </div>
      </section>

      {/* Associates */}
      <section className="pb-20 md:pb-28">
        <div className="container-luxe">
          <div className="text-center mb-10">
            <p className="eyebrow">Our Team</p>

            <h2 className="font-display text-4xl text-gold mt-2">
              Associates
            </h2>

            <p className="mt-3 text-foreground/70 max-w-2xl mx-auto">
              Our associates work closely with the partners to provide timely,
              practical, and client-focused legal solutions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {associates.map((a) => (
              <article
                key={a.name}
                className="border border-gold/20 bg-navy-deep p-8 text-center hover:border-gold/60 transition"
              >
                <h3 className="font-display text-2xl text-gold">
                  {a.name}
                </h3>

                <p className="mt-2 text-[0.72rem] uppercase tracking-[0.28em] text-gold-dim">
                  {a.title}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
