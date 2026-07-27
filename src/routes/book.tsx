  import { createFileRoute } from "@tanstack/react-router";
  import { useState } from "react";
  import { PageShell, PageHeader } from "@/components/PageShell";
  import { partners } from "@/lib/our-team";
  import { CheckCircle2 } from "lucide-react";

  export const Route = createFileRoute("/book")({
    head: () => ({
      meta: [
        { title: "Book Consultation — Skyline Legal" },
        { name: "description", content: "Schedule a consultation with an advocate at Skyline Legal, Bengaluru." },
        { property: "og:title", content: "Book Consultation — Skyline Legal" },
        { property: "og:description", content: "Choose an advocate and a time that suits you." },
      ],
    }),
    component: Book,
  });

  const times = ["10:00 AM", "11:30 AM", "01:00 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  const practiceAreaOptions = [
    "Civil Law", "Criminal Law", "Commercial Law",
    "Property Law", "Real Estate Law", "Consumer Protection", "Administrative Law",
    "Service Law", "Labour & Employment Law", "Tax Law", "SARFAESI (DRT)",
    "Company Law", "Intellectual Property Rights", "Contract Drafting",
    "RERA Matters", "NCLT Matters", "Other",
  ];

  function Book() {
    const [done, setDone] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      setError(null);
      setBusy(true);
      const fd = new FormData(e.currentTarget);
      const advocateSlug = String(fd.get("advocate") || "");
      const advocate = partners.find((p) => p.slug === advocateSlug)?.name || advocateSlug;

      const payload = {
        name: String(fd.get("name") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        email: String(fd.get("email") || "").trim(),
        advocate,
        practiceArea: String(fd.get("practiceArea") || "").trim(),
        appointmentDate: String(fd.get("date") || "").trim(),
        appointmentTime: String(fd.get("time") || "").trim(),
        message: String(fd.get("message") || "").trim(),
      };

      try {
        const res = await fetch("/api/public/bookings", {
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
        <PageHeader eyebrow="Appointment" title="Book a Consultation" subtitle="Choose an advocate, pick a time, and we will confirm within one working day." />
        <section className="py-16 md:py-24">
          <div className="container-luxe max-w-3xl">
            {done ? (
              <div className="border border-gold/40 p-10 text-center bg-navy/40 animate-fade-up">
                <CheckCircle2 size={48} className="mx-auto text-gold" />
                <h2 className="mt-5 font-display text-3xl text-gradient-gold">Request Received</h2>
                <p className="mt-3 text-foreground/75">
                  Thank you. A confirmation has been sent to your email. Our chambers will contact you shortly to confirm your appointment.
                </p>
              </div>
            ) : (
              <form className="border border-gold/25 p-8 md:p-10 bg-navy/40 space-y-6" onSubmit={handleSubmit}>
              

                <div>
                  <label className="eyebrow block mb-2">Practice Area</label>
                  <select name="practiceArea" className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold">
                    <option value="">Select an area…</option>
                    {practiceAreaOptions.map((a) => (
                      <option key={a} value={a} className="bg-navy-deep">{a}</option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="eyebrow block mb-2">Date</label>
                    <input name="date" type="date" required min={new Date().toISOString().slice(0, 10)}
                      className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="eyebrow block mb-2">Time</label>
                    <select name="time" required className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold">
                      <option value="">Select a time…</option>
                      {times.map((t) => (
                        <option key={t} value={t} className="bg-navy-deep">{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full Name" name="name" />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <Field label="Email" name="email" type="email" />

                <div>
                  <label className="eyebrow block mb-2">Brief Description of Matter</label>
                  <textarea name="message" rows={4} maxLength={2000}
                    className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <button className="btn-gold" type="submit" disabled={busy}>
                  {busy ? "Submitting…" : "Book Appointment"}
                </button>
              </form>
            )}
          </div>
        </section>
      </PageShell>
    );
  }

  function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
    return (
      <div>
        <label htmlFor={name} className="eyebrow block mb-2">{label}</label>
        <input id={name} name={name} type={type} required maxLength={200}
          className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
      </div>
    );
  }
