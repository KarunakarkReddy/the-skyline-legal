import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy — Skyline Legal" }, { name: "description", content: "How Skyline Legal collects, uses, and safeguards your information." }] }),
  component: Privacy,
});

function Privacy() {
  return (
    <PageShell>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16 md:py-24">
        <div className="container-luxe max-w-3xl prose-invert space-y-5 text-foreground/75 leading-relaxed">
          <p>Skyline Legal respects the privacy of every visitor and client. This policy describes how we handle personal information you share with us through this website or in the course of an engagement.</p>
          <h2 className="font-display text-2xl text-gold pt-6">Information We Collect</h2>
          <p>We collect only the information you voluntarily provide — your name, contact details, and the details of your matter — to respond to enquiries and to provide legal services.</p>
          <h2 className="font-display text-2xl text-gold pt-6">Use of Information</h2>
          <p>Information is used solely to provide legal counsel, communicate with you, and comply with applicable law. It is never sold or shared with third parties for marketing purposes.</p>
          <h2 className="font-display text-2xl text-gold pt-6">Confidentiality</h2>
          <p>All communications between you and the firm are protected by professional privilege and handled with the utmost discretion.</p>
          <h2 className="font-display text-2xl text-gold pt-6">Contact</h2>
          <p>For any questions about this policy, please write to contact@theskylinelegal.in.</p>
        </div>
      </section>
    </PageShell>
  );
}
