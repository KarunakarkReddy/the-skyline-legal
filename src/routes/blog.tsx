import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Skyline Legal" },
      { name: "description", content: "Notes and articles on property, corporate, family, civil, and criminal law from Skyline Legal." },
      { property: "og:title", content: "Blog — Skyline Legal" },
      { property: "og:description", content: "Considered writing on law and practice." },
    ],
  }),
  component: Blog,
});

const posts = [
  { cat: "Property Law", title: "Understanding Title Diligence in Bengaluru Transactions", excerpt: "A practical checklist for buyers reviewing property documents in Karnataka." },
  { cat: "Corporate Law", title: "Shareholder Agreements: Clauses Founders Overlook", excerpt: "Key protections for founders in early-stage ventures." },
  { cat: "Family Law", title: "Mutual Consent Divorce: A Considered Guide", excerpt: "What to expect procedurally, financially, and emotionally." },
  { cat: "Civil Law", title: "Injunctions in Property Disputes", excerpt: "When to seek an interim relief and how courts evaluate the balance of convenience." },
  { cat: "Criminal Law", title: "Anticipatory Bail: A Primer", excerpt: "How Section 438 CrPC operates in practice." },
  { cat: "Corporate Law", title: "Commercial Contracts: Boilerplate That Matters", excerpt: "The clauses that surface only when things go wrong." },
];

function Blog() {
  return (
    <PageShell>
      <PageHeader eyebrow="Journal" title="Notes & Articles" subtitle="Writing from our chambers on developments in Indian law and practice." />
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article key={p.title} className="group border border-gold/20 bg-navy/40 p-7 hover:border-gold/60 transition flex flex-col">
              <div className="text-[0.68rem] tracking-[0.28em] uppercase text-gold-dim">{p.cat}</div>
              <h2 className="mt-3 font-display text-2xl text-gold group-hover:text-gold-soft transition">{p.title}</h2>
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed flex-1">{p.excerpt}</p>
              <a href="#" className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.28em] uppercase text-gold">
                Read More <ArrowRight size={13} />
              </a>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
