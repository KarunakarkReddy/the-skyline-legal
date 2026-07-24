import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions — Skyline Legal" }, { name: "description", content: "Terms of use for the Skyline Legal website." }] }),
  component: Terms,
});

function Terms() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Terms & Conditions" />
      <section className="py-16 md:py-24">
        <div className="container-luxe max-w-3xl space-y-5 text-foreground/75 leading-relaxed">
          <p>This website is a general information resource maintained by Skyline Legal. Nothing on this website constitutes legal advice, and no attorney-client relationship is created by your use of this site.</p>
          <h2 className="font-display text-2xl text-gold pt-6">No Solicitation</h2>
          <p>In accordance with the Rules of the Bar Council of India, Skyline Legal does not solicit work through this website. Any information you obtain is at your own initiative.</p>
          <h2 className="font-display text-2xl text-gold pt-6">Use of Content</h2>
          <p>All content, including the Skyline Legal name and logo, is the property of the firm and may not be reproduced without written consent.</p>
          <h2 className="font-display text-2xl text-gold pt-6">Governing Law</h2>
          <p>These terms are governed by the laws of India, with exclusive jurisdiction in the courts of Bengaluru.</p>
        </div>
      </section>
    </PageShell>
  );
}
