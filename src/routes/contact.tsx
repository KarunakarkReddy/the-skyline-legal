import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHeader } from "@/components/PageShell";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";
import { site } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Skyline Legal" },
      { name: "description", content: "Get in touch with Skyline Legal at our chambers in Gandhinagar, Bengaluru." },
      { property: "og:title", content: "Contact Skyline Legal" },
      { property: "og:description", content: "Our chambers, phones, and directions." },
    ],
  }),
  component: Contact,
});

const practiceAreaOptions = [
  "Constitutional Law", "Civil Law", "Criminal Law", "Commercial Law", "Corporate Law",
  "Property Law", "Real Estate Law", "Consumer Protection", "Administrative Law",
  "Service Law", "Labour & Employment Law", "Tax Law", "SARFAESI (DRT)",
  "Company Law", "Arbitration", "Intellectual Property Rights", "Contract Drafting",
  "Writ Petitions", "RERA Matters", "NCLT Matters", "Other",
];

function Contact() {
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      practiceArea: String(fd.get("practiceArea") || "").trim(),
      message: String(fd.get("message") || "").trim(),
    };
    try {
      const res = await fetch("/api/public/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Submission failed");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Get in Touch" title="Contact Us" subtitle="We would be glad to hear from you." />
      <section className="py-16 md:py-24">
        <div className="container-luxe grid gap-12 lg:grid-cols-2">
          {done ? (
            <div className="border border-gold/40 p-10 text-center bg-navy/40 animate-fade-up">
              <CheckCircle2 size={48} className="mx-auto text-gold" />
              <h2 className="mt-5 font-display text-3xl text-gradient-gold">Message Received</h2>
              <p className="mt-3 text-foreground/75">
                Thank you for reaching out. Our chambers will get back to you shortly.
              </p>
            </div>
          ) : (
            <form className="space-y-5 border border-gold/25 p-8 bg-navy/40" onSubmit={handleSubmit}>
              <h2 className="font-display text-2xl text-gold">Send a Message</h2>
              <span className="gold-rule" />
              <Field label="Name" name="name" />
              <Field label="Phone" name="phone" type="tel" />
              <Field label="Email" name="email" type="email" />
              <div>
                <label className="eyebrow block mb-2">Practice Area</label>
                <select name="practiceArea" className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold">
                  <option value="">Select an area…</option>
                  {practiceAreaOptions.map((a) => (
                    <option key={a} value={a} className="bg-navy-deep">{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="eyebrow block mb-2">Message</label>
                <textarea name="message" rows={5} required maxLength={2000} className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button className="btn-gold" type="submit" disabled={busy}>
                {busy ? "Submitting…" : "Submit"}
              </button>
            </form>
          )}

          <div className="space-y-6">
            <div className="border border-gold/25 p-8 bg-navy-deep">
              <h2 className="font-display text-2xl text-gold">Our Chambers</h2>
              <span className="gold-rule mt-3" />
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-4 items-start">
                  <Phone size={18} className="text-gold shrink-0 mt-1" />

                  <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                    {site.phones.map((p) => (
                      <div key={p} className="whitespace-nowrap">
                        {p}
                      </div>
                    ))}
                  </div>
                </li>
                <li className="flex gap-4"><Mail size={18} className="text-gold shrink-0 mt-0.5" />{site.email}</li>
                <li className="flex gap-4"><MapPin size={18} className="text-gold shrink-0 mt-0.5" /><div><div>{site.address.line1}</div><div>{site.address.line2}</div><div>{site.address.line3}</div><div>{site.address.line4}</div><div>{site.address.line5}</div></div></li>
                <li className="flex gap-4"><Clock size={18} className="text-gold shrink-0 mt-0.5" />{site.hours}</li>
              </ul>
            </div>
            <div className="border border-gold/25 overflow-hidden">
              <iframe
                title="Skyline Legal Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8924231106726!2d77.5770881!3d12.978731899999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17007f88e1e9%3A0x62b3823e6ff6d328!2sSKYLINE%20LEGAL%20Advocates%20%26%20Solicitors!5e0!3m2!1sen!2sin!4v1784877437923!5m2!1sen!2sin"
                className="w-full h-64 grayscale-[40%] contrast-110"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">{label}</label>
      <input id={name} name={name} type={type} required maxLength={200} className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
    </div>
  );
}
