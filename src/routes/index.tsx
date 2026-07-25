import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ShieldCheck, Award, Users, CheckCircle2, ArrowRight, Quote,
  Phone, Mail, MapPin, Clock, Sparkles, Search,
} from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { CourtsSection } from "@/components/CourtsSection";
import { partners } from "@/lib/partners";
import { practiceAreas, site } from "@/lib/site";
import teamGroup from "@/assets/groupimage.png";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/sllogohead.png";
import lawSymbol from "@/assets/law-symbol.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skyline Legal — Advocates in Bengaluru | High Court, NCLT, CAT, KAT, RERA" },
      {
        name: "description",
        content:
          "Skyline Legal is a Bengaluru partnership of advocates practising constitutional, civil, criminal, corporate, property, RERA, NCLT, CAT, KAT, SARFAESI, arbitration, and IPR law.",
      },
      {
        name: "keywords",
        content:
          "Advocate in Bengaluru, High Court Advocate, Corporate Lawyer, Civil Lawyer, Criminal Lawyer, Constitutional Lawyer, NCLT Lawyer, Property Lawyer, Consumer Lawyer, Administrative Law Expert, Labour & Employment Lawyer, Tax Lawyer, SARFAESI Lawyer, RERA Advocate",
      },
      { property: "og:title", content: "Skyline Legal — Advocates in Bengaluru" },
      {
        property: "og:description",
        content:
          "A partnership of advocates providing trusted counsel across the High Court of Karnataka, Supreme Court, NCLT, CAT, KAT, and RERA.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});


const values = [
  { icon: ShieldCheck, label: "Integrity" },
  { icon: Award, label: "Progress" },
];

const whyUs = [
  { title: "Experienced Lawyers", desc: "Decades of collective courtroom and advisory experience." },
  { title: "Transparent Advice", desc: "Clear opinions, honest timelines, no hidden costs." },
  { title: "Personal Attention", desc: "Every brief is handled by a partner, not passed down." },
  { title: "Timely Legal Support", desc: "Responsive to hearings, filings, and client updates." },
  { title: "Strong Court Representation", desc: "Composed, prepared, and persuasive advocacy." },
  { title: "Ethical Practice", desc: "Uncompromising standards in conduct and confidentiality." },
];

const process = [
  { n: "01", title: "Consultation", desc: "Understand your matter, objectives, and constraints." },
  { n: "02", title: "Legal Analysis", desc: "Review facts, documents, and applicable law." },
  { n: "03", title: "Strategy", desc: "Chart a considered course — negotiate or litigate." },
  { n: "04", title: "Resolution", desc: "Execute with rigour to a durable outcome." },
];

const testimonials = [
  {
    quote:
      "Skyline Legal handled my property matter with remarkable diligence. Their advice was clear, and the outcome exceeded expectations.",
    name: "R. Iyer",
    role: "Property Client",
  },
  {
    quote:
      "Composed, prepared, and utterly professional in court. I could not have asked for better representation.",
    name: "S. Menon",
    role: "Corporate Client",
  },
  {
    quote:
      "They treated a difficult family dispute with sensitivity and discretion. Genuinely a client-first firm.",
    name: "A. Kulkarni",
    role: "Family Matter",
  },
];

function Home() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleContactSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setBusy(true);
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      practiceArea: "",
      message: String(fd.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/public/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Submission failed");
      }

      alert("Thank you. We will be in touch shortly.");

      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }
  return (
    <PageShell>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-navy-deep"
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(8,20,37,0.85), rgba(8,20,37,0.96)), url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container-luxe pt-40 pb-28 md:pt-52 md:pb-40 text-center animate-fade-up">
          <img
            src={logo}
            alt="Skyline Legal"
            width={140}
            height={140}
            className="mx-auto h-24 w-24 md:h-32 md:w-32 object-contain"
          />
          <h1 className="mt-8 font-display text-[2.75rem] sm:text-6xl md:text-7xl tracking-[0.14em] text-gradient-gold">
            SKYLINE LEGAL
          </h1>

          <div className="mt-6 flex justify-center">
            <img
              src={lawSymbol}
              alt="Law Symbol"
              className="w-16 h-16 md:w-24 md:h-24 object-contain"
            />
          </div>
          
          <div className="mt-6">
            <p className="text-lg md:text-2xl tracking-[0.35em] uppercase text-gold font-medium">
              Advocates &amp; Solicitors
            </p>
          </div>
          <p className="mt-6 text-xs sm:text-sm tracking-[0.42em] uppercase text-gold-dim">
            Integrity &nbsp;|&nbsp; Progress
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-foreground/75">
            Providing trusted legal solutions with integrity, professionalism, and unwavering commitment to justice.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/book" className="btn-gold">Book Consultation</Link>
            <Link to="/practice-areas" className="btn-outline-gold">Practice Areas</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 border-t border-gold/10">
        <div className="container-luxe grid gap-14 lg:grid-cols-2 lg:gap-20 items-center">
          <div className="animate-fade-up">
            <div className="eyebrow">About</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              About Skyline Legal
            </h2>
            <span className="gold-rule mt-6 block w-16"></span>

              <p className="mt-8 text-lg leading-9 text-foreground/75 text-justify">
                Skyline Legal is a partnership of experienced advocates committed to
                providing legal excellence across civil, criminal, corporate, property,
                family, consumer, and commercial matters.
              </p>

              <p className="mt-6 text-lg leading-9 text-foreground/75 text-justify">
                We believe in <span className="text-gold">integrity</span>, transparency,
                a client-first approach, and ethical legal practice—the values that have
                defined our chambers from the outset.
              </p>
            <Link to="/about" className="btn-outline-gold mt-8">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {values.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="group border border-gold/25 p-8 text-center bg-navy/40 hover:bg-navy/70 hover:border-gold/60 transition-all"
              >
                <Icon size={30} className="mx-auto text-gold" />
                <div className="mt-4 font-display text-xl text-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="py-24 md:py-32 bg-navy/30 border-y border-gold/10">
        <div className="container-luxe">
          <div className="text-center">
            <div className="eyebrow">The Chambers</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              Meet Our Partners
            </h2>
            <span className="gold-rule mx-auto mt-5" />
            <p className="mx-auto mt-6 max-w-2xl text-foreground/70">
              Four advocates. One standard of practice.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <article
                key={p.slug}
                className="group flex flex-col border border-gold/20 bg-navy-deep hover:border-gold/60 transition-all"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={p.photo}
                    alt={`${p.name} — ${p.title}`}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-deep to-transparent" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-gold">{p.name}</h3>
                  <div className="mt-1 text-[0.7rem] tracking-[0.28em] uppercase text-gold-dim">
                    {p.title}
                  </div>
                  <p className="mt-4 text-sm leading-7 text-foreground/70 min-h-[180px]">
                    {p.short}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.practiceAreas.slice(0, 4).map((a) => (
                      <span
                        key={a}
                        className="text-[0.6rem] tracking-[0.14em] uppercase px-2 py-1 border border-gold/25 text-foreground/70"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <Link
                    to="/partners/$slug"
                    params={{ slug: p.slug }}
                    className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.28em] uppercase text-gold hover:text-gold-soft"
                  >
                    View Full Profile <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="py-24 md:py-32 bg-navy/30 border-y border-gold/10">
        <div className="container-luxe">
          <div className="text-center">
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              Practice Areas
            </h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>

          {(() => {
            const featured = practiceAreas.find((p) => p.featured);
            const rest = practiceAreas.filter((p) => !p.featured).slice(0, 8);
            return (
              <>
                {featured && (
                  <Link
                    to="/practice-areas/$slug"
                    params={{ slug: featured.slug }}
                    className="group mt-14 block relative overflow-hidden border border-gold/50 bg-navy-deep p-8 md:p-12 hover:border-gold transition-all"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
                    <div className="flex items-center gap-3 text-gold">
                      <Sparkles size={16} />
                      <span className="eyebrow">Featured Practice</span>
                    </div>
                    <h3 className="mt-4 font-display text-3xl md:text-4xl text-gradient-gold">
                      {featured.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-foreground/80 leading-relaxed">
                      {featured.desc}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.28em] uppercase text-gold group-hover:text-gold-soft">
                      Learn More <ArrowRight size={13} />
                    </span>
                  </Link>
                )}

                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {rest.map((p) => (
                    <Link
                      key={p.slug}
                      to="/practice-areas/$slug"
                      params={{ slug: p.slug }}
                      className="group flex flex-col border border-gold/25 p-6 bg-navy-deep hover:border-gold/60 hover:-translate-y-1 transition-all duration-500"
                    >
                      <span className="text-[0.58rem] tracking-[0.24em] uppercase text-gold-dim">
                        {p.category}
                      </span>
                      <h3 className="mt-3 font-display text-xl text-foreground">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-xs text-foreground/65 leading-relaxed flex-1">
                        {p.desc}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 text-[0.65rem] tracking-[0.24em] uppercase text-gold group-hover:text-gold-soft">
                        Learn More <ArrowRight size={12} />
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="mt-12 text-center">
                  <Link to="/practice-areas" className="btn-outline-gold">
                    <Search size={14} /> Explore All {practiceAreas.length} Practice Areas
                  </Link>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* COURTS & TRIBUNALS */}
      <CourtsSection />


      {/* WHY CHOOSE */}
      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="text-center">
            <div className="eyebrow">The Skyline Difference</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              Why Choose Skyline Legal
            </h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyUs.map((w, i) => (
              <div key={w.title} className="flex gap-5 border border-gold/20 p-7 bg-navy/40">
                <div className="text-gold font-display text-2xl leading-none">0{i + 1}</div>
                <div>
                  <h3 className="font-display text-xl text-gold">{w.title}</h3>
                  <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 md:py-32 bg-navy/30 border-y border-gold/10">
        <div className="container-luxe">
          <div className="text-center">
            <div className="eyebrow">Method</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              Our Process
            </h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {process.map((s, i) => (
              <div key={s.n} className="relative text-center">
                <div className="mx-auto grid place-items-center h-20 w-20 border border-gold/40 rounded-full text-gold font-display text-2xl">
                  {s.n}
                </div>
                <h3 className="mt-5 font-display text-2xl text-gold">{s.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed max-w-[16rem] mx-auto">
                  {s.desc}
                </p>
                {i < process.length - 1 && (
                  <div className="hidden md:block absolute top-10 -right-4 w-8 h-px bg-gold/40" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-32">
        <div className="container-luxe">
          <div className="text-center">
            <div className="eyebrow">Clients</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              What Clients Say
            </h2>
            <span className="gold-rule mx-auto mt-5" />
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="relative border border-gold/25 bg-navy/40 p-8 pt-14"
              >
                <Quote size={44} className="absolute -top-5 left-6 text-gold bg-navy-deep p-2" />
                <blockquote className="font-display text-lg leading-relaxed text-foreground/85 italic">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-gold/15 pt-4">
                  <div className="text-gold font-display text-lg">{t.name}</div>
                  <div className="text-[0.7rem] tracking-[0.24em] uppercase text-foreground/55">
                    {t.role}
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 md:py-32 bg-navy/30 border-t border-gold/10">
        <div className="container-luxe grid gap-14 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Get in Touch</div>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
              Book a Consultation
            </h2>
            <span className="gold-rule mt-5" />
            <p className="mt-5 text-foreground/70 leading-relaxed">
              Share a few details and we will get back within one working day.
            </p>
            <form
              className="mt-8 space-y-5"
              onSubmit={handleContactSubmit}
            >
              <FormField label="Name" name="name" required />
              <FormField label="Phone" name="phone" required type="tel" />
              <FormField label="Email" name="email" required type="email" />
              <div>
                <label className="eyebrow block mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="btn-gold"
              >
                {busy ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="lg:pl-8">
            <div className="border border-gold/25 p-8 bg-navy-deep">
              <h3 className="font-display text-2xl text-gold">Our Chambers</h3>
              <span className="gold-rule mt-4" />
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex gap-4">
                  <Phone size={18} className="text-gold shrink-0 mt-0.5" />
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 min-w-[340px]">
                    {site.phones.map((p) => (
                      <div key={p} className="whitespace-nowrap">
                        {p}
                      </div>
                    ))}
                  </div>
                </li>
                <li className="flex gap-4">
                  <Mail size={18} className="text-gold shrink-0 mt-0.5" />
                  <span>{site.email}</span>
                </li>
                <li className="flex gap-4">
                  <MapPin size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <div>{site.address.line1}</div>
                    <div>{site.address.line2}</div>
                    <div>{site.address.line3}</div>
                    <div>{site.address.line4}</div>
                    <div>{site.address.line5}</div>
                  </div>
                </li>
                <li className="flex gap-4">
                  <Clock size={18} className="text-gold shrink-0 mt-0.5" />
                  <span>{site.hours}</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 border border-gold/25 overflow-hidden">
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

function FormField({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow block mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        maxLength={200}
        className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition"
      />
    </div>
  );
}
