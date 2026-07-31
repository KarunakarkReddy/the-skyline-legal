import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getPartner, partners } from "@/lib/our-team";
import { Phone, Calendar } from "lucide-react";

export const Route = createFileRoute("/our-team/$slug")({
  loader: ({ params }) => {
    const partner = getPartner(params.slug);
    if (!partner) throw notFound();
    return { partner };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Advocate not found — Skyline Legal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.partner;
    return {
      meta: [
        { title: `${p.name} — Advocate in Bengaluru | Skyline Legal` },
        { name: "description", content: p.short },
        { name: "keywords", content: p.keywords },
        { property: "og:title", content: `${p.name} — ${p.title}, Skyline Legal` },
        { property: "og:description", content: p.short },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: `/our-team/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/our-team/${params.slug}` }],
    };
  },
  component: Profile,
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="container-luxe py-40 text-center text-foreground/70">
        {error.message}
      </div>
    </PageShell>
  ),
  notFoundComponent: () => (
    <PageShell>
      <div className="container-luxe py-40 text-center">
        <h1 className="font-display text-4xl text-gold">Team member not found</h1>
        <Link to="/our-team" className="btn-outline-gold mt-8 inline-flex">
          View all team members
        </Link>
      </div>
    </PageShell>
  ),
});

function Profile() {
  const { partner: p } = Route.useLoaderData();
  return (
    <PageShell>
      <section className="pt-36 md:pt-44 pb-20">
        <div className="container-luxe grid gap-16 lg:grid-cols-[380px_1fr] items-start">
          <div className="border border-gold/25 bg-navy/40 relative">
            <img
              src={p.photo}
              alt={`${p.name} — ${p.title}, Skyline Legal`}
              className="w-full aspect-[4/5] object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 px-4 py-3 bg-navy-deep/85 border-t border-gold/25 text-center">
              <div className="text-[0.65rem] tracking-[0.28em] uppercase text-gold-dim">
              </div>
            </div>
          </div>

          <div className="animate-fade-up">
            <div className="eyebrow">{p.title}</div>
            <h1 className="mt-2 font-display text-4xl md:text-5xl leading-tight tracking-wide text-gradient-gold">
              {p.name}
            </h1>
            <span className="gold-rule mt-5" />

            <div className="mt-12 max-w-3xl">
              {p.bio.map((para: string, i: number) => (
                <p
                  key={i}
                  className="mb-8 text-lg leading-9 text-foreground/80 text-justify"
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={`tel:${p.phone.replace(/\s/g, "")}`}
                className="btn-gold"
              >
                <Phone size={14} /> {p.phone}
              </a>
              <Link to="/book" className="btn-outline-gold">
                <Calendar size={14} /> Book Appointment
              </Link>
            </div>

            <div className="mt-16 grid gap-10 sm:grid-cols-2">
              <Section title="Practice Areas" items={p.practiceAreas} />
              <Section title="Courts & Tribunals" items={p.courts} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-gold/10 bg-navy/30">
        <div className="container-luxe">
          <div className="eyebrow">Other Partners</div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {partners
              .filter((x) => x.slug !== p.slug)
              .map((x) => (
                <Link
                  key={x.slug}
                  to="/our-team/$slug"
                  params={{ slug: x.slug }}
                  className="group flex items-center gap-4 border border-gold/20 p-4 hover:border-gold/60 transition"
                >
                  <img
                    src={x.photo}
                    alt={x.name}
                    className="h-16 w-16 object-cover grayscale-[30%] group-hover:grayscale-0 transition"
                  />
                  <div>
                    <div className="font-display text-lg text-gold">{x.name}</div>
                    <div className="text-[0.7rem] tracking-[0.22em] uppercase text-foreground/60">
                      {x.title}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Section({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="eyebrow">{title}</h3>
      <ul className="mt-3 space-y-2 text-sm text-foreground/75">
        {items.map((i) => (
          <li key={i} className="flex gap-2">
            <span className="text-gold">—</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
