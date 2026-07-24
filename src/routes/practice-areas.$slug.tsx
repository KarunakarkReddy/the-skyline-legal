import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { getPracticeArea, practiceAreas } from "@/lib/site";
import { ArrowLeft, ArrowRight, Calendar, Phone } from "lucide-react";
import { site } from "@/lib/site";

export const Route = createFileRoute("/practice-areas/$slug")({
  loader: ({ params }) => {
    const area = getPracticeArea(params.slug);
    if (!area) throw notFound();
    return { area };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Practice Area not found — Skyline Legal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.area;
    return {
      meta: [
        { title: `${a.title} — Advocates in Bengaluru | Skyline Legal` },
        { name: "description", content: a.desc },
        { name: "keywords", content: a.keywords ?? a.title },
        { property: "og:title", content: `${a.title} — Skyline Legal` },
        { property: "og:description", content: a.desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/practice-areas/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/practice-areas/${params.slug}` }],
    };
  },
  component: PracticeAreaDetail,
  notFoundComponent: () => (
    <PageShell>
      <div className="container-luxe py-40 text-center">
        <h1 className="font-display text-4xl text-gold">Practice area not found</h1>
        <Link to="/practice-areas" className="btn-outline-gold mt-8 inline-flex">
          View all practice areas
        </Link>
      </div>
    </PageShell>
  ),
  errorComponent: ({ error }) => (
    <PageShell>
      <div className="container-luxe py-40 text-center text-foreground/70">
        {error.message}
      </div>
    </PageShell>
  ),
});

function PracticeAreaDetail() {
  const { area } = Route.useLoaderData();
  const related = practiceAreas
    .filter((p) => p.category === area.category && p.slug !== area.slug)
    .slice(0, 4);

  return (
    <PageShell>
      <section className="pt-36 md:pt-44 pb-16 border-b border-gold/10">
        <div className="container-luxe">
          <Link
            to="/practice-areas"
            className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.28em] uppercase text-foreground/60 hover:text-gold transition"
          >
            <ArrowLeft size={13} /> All Practice Areas
          </Link>
          <div className="mt-6">
            <span className="eyebrow">{area.category}</span>
            <h1 className="mt-3 font-display text-4xl md:text-6xl text-gradient-gold">
              {area.title}
            </h1>
            <span className="gold-rule mt-6" />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="space-y-5 text-foreground/80 leading-relaxed">
            <p className="text-lg text-foreground/90">{area.desc}</p>
            <p>{area.long}</p>
            <p>
              Our advocates combine rigorous case preparation with courtroom experience across trial and appellate forums. Every {area.title.toLowerCase()} brief is handled personally by a partner, ensuring strategic clarity from first consultation to final resolution.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/book" className="btn-gold">
                <Calendar size={14} /> Book Consultation
              </Link>
              <a href={`tel:${site.phones[0].replace(/\s/g, "")}`} className="btn-outline-gold">
                <Phone size={14} /> {site.phones[0]}
              </a>
            </div>
          </div>

          <aside className="border border-gold/25 p-7 bg-navy/40 h-fit">
            <h3 className="eyebrow">Related Practice Areas</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    to="/practice-areas/$slug"
                    params={{ slug: r.slug }}
                    className="group flex items-center justify-between gap-3 py-2 border-b border-gold/10 hover:border-gold/40 transition"
                  >
                    <span className="text-foreground/85 group-hover:text-gold">
                      {r.title}
                    </span>
                    <ArrowRight
                      size={13}
                      className="text-gold-dim group-hover:text-gold"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
