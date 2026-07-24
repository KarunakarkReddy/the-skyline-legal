import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Skyline Legal" },
      { name: "description", content: "Answers to frequently asked questions about scheduling consultations, fees, and Skyline Legal's practice." },
      { property: "og:title", content: "FAQs — Skyline Legal" },
      { property: "og:description", content: "Common questions, considered answers." },
    ],
  }),
  component: FAQs,
});

const faqs = [
  { q: "How do I schedule a consultation?", a: "You may book an appointment through the Book Consultation page or call the chambers directly. We aim to respond the same working day." },
  { q: "Which courts do you practise in?", a: "Our advocates appear before the Supreme Court of India, the High Court of Karnataka, City Civil, Sessions and Family Courts, and consumer commissions." },
  { q: "What documents are required for a first meeting?", a: "Please carry a photo ID and any documents relevant to your matter — agreements, notices, or correspondence. We will guide you if anything further is needed." },
  { q: "How are consultation fees charged?", a: "Consultation fees depend on the matter and the partner engaged. We will share a clear estimate before your appointment." },
  { q: "Do you handle matters outside Bengaluru?", a: "Yes, we take up matters across Karnataka and, in select cases, in other jurisdictions with local counsel." },
  { q: "Is my information kept confidential?", a: "Absolutely. All communications with the firm are covered by professional privilege and are treated with the utmost discretion." },
];

function FAQs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <PageShell>
      <PageHeader eyebrow="Answers" title="Frequently Asked Questions" />
      <section className="py-20 md:py-28">
        <div className="container-luxe max-w-3xl">
          <div className="divide-y divide-gold/15 border-y border-gold/15">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    className="w-full flex items-center justify-between gap-6 py-6 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-lg md:text-xl text-foreground">{f.q}</span>
                    <span className="text-gold shrink-0">{isOpen ? <Minus size={18} /> : <Plus size={18} />}</span>
                  </button>
                  {isOpen && (
                    <p className="pb-6 text-sm text-foreground/70 leading-relaxed max-w-2xl">{f.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
