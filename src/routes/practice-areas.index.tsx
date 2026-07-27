import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import {
  practiceAreas,
  practiceCategories,
  type PracticeCategory,
} from "@/lib/site";
import { ArrowRight, Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/practice-areas/")({
  head: () => ({
    meta: [
      { title: "Practice Areas — Advocates in Bengaluru | Skyline Legal" },
      {
        name: "description",
        content:
          "Constitutional, civil, criminal, commercial, corporate, property, RERA, NCLT, CAT, KSAT, SARFAESI, arbitration, and IPR practice by Skyline Legal advocates in Bengaluru.",
      },
      { property: "og:title", content: "Practice Areas — Skyline Legal" },
      {
        property: "og:description",
        content:
          "Thirty areas of legal practice covering litigation, corporate, property, regulatory, and advisory work — led by advocates in Bengaluru.",
      },
    ],
    links: [{ rel: "canonical", href: "/practice-areas" }],
  }),
  component: PracticeAreasPage,
});

type Filter = "All" | PracticeCategory;

function PracticeAreasPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return practiceAreas.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.keywords ?? "").toLowerCase().includes(q)
      );
    });
  }, [query, filter]);

  const featured = filtered.find((p) => p.featured);
  const rest = filtered.filter((p) => !p.featured);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Expertise"
        title="Practice Areas"
        subtitle="A broad practice grounded in specialist knowledge — search, filter, and explore each area of law we handle."
      />

      <section className="pt-12 pb-6">
        <div className="container-luxe">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] items-start">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gold"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search legal services (e.g. writ, NCLT, RERA, arbitration)"
                className="w-full bg-transparent border border-gold/30 pl-11 pr-4 py-3.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-gold transition"
              />
            </div>
            <div className="flex items-center gap-3 text-[0.7rem] tracking-[0.24em] uppercase text-foreground/60">
              <span>{filtered.length} of {practiceAreas.length}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {(["All", ...practiceCategories] as Filter[]).map((c) => {
              const active = filter === c;
              return (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`text-[0.68rem] tracking-[0.22em] uppercase px-4 py-2 border transition-all ${
                    active
                      ? "border-gold bg-gold text-navy-deep"
                      : "border-gold/30 text-foreground/75 hover:border-gold/70 hover:text-gold"
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-luxe">
          {featured && (
            <Link
              to="/practice-areas/$slug"
              params={{ slug: featured.slug }}
              className="group block mb-10 relative overflow-hidden border border-gold/50 bg-navy/60 p-8 md:p-12 hover:border-gold transition-all"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="flex items-center gap-3 text-gold">
                <Sparkles size={16} />
                <span className="eyebrow">Featured Practice</span>
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-5xl text-gradient-gold">
                {featured.title}
              </h2>
              <span className="gold-rule mt-5" />
              <p className="mt-5 max-w-3xl text-foreground/80 leading-relaxed">
                {featured.long}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.28em] uppercase text-gold group-hover:text-gold-soft">
                Learn More <ArrowRight size={13} />
              </span>
            </Link>
          )}

          {rest.length === 0 && !featured ? (
            <div className="text-center py-24 text-foreground/60">
              No practice areas match your search.
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p) => (
                <article
                  key={p.slug}
                  className="group flex flex-col border border-gold/25 p-7 bg-navy/40 hover:border-gold/60 hover:-translate-y-1 transition-all duration-500"
                >
                  <span className="text-[0.6rem] tracking-[0.24em] uppercase text-gold-dim">
                    {p.category}
                  </span>
                  <h3 className="mt-3 font-display text-2xl text-foreground">
                    {p.title}
                  </h3>
                  <span className="gold-rule mt-3" />
                  <p className="mt-4 text-sm text-foreground/70 leading-relaxed flex-1">
                    {p.desc}
                  </p>
                  <Link
                    to="/practice-areas/$slug"
                    params={{ slug: p.slug }}
                    className="mt-6 inline-flex items-center gap-2 text-[0.7rem] tracking-[0.28em] uppercase text-gold hover:text-gold-soft"
                  >
                    Learn More <ArrowRight size={13} />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
