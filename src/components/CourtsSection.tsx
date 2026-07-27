import { courts } from "@/lib/courts";

export function CourtsSection() {
  return (
    <section className="py-24 md:py-32 border-y border-gold/10">
      <div className="container-luxe">
        <div className="text-center">
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-gradient-gold">
            Courts &amp; Tribunals We Represent Before
          </h2>
          <span className="gold-rule mx-auto mt-5" />
          <p className="mx-auto mt-6 max-w-2xl text-foreground/70 leading-relaxed">
          From Trial Courts to the Supreme Court of India, our advocates appear across the all judicial courts most relevant to our clients.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {courts.map(({ name, short, desc, icon: Icon }) => (
            <div
              key={name}
              className="group relative border border-gold/25 p-7 bg-navy/40 hover:border-gold/60 hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-start justify-between">
                <Icon size={26} className="text-gold" />
                <span className="text-[0.65rem] tracking-[0.28em] uppercase text-gold-dim">
                  {short}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl text-foreground leading-tight">
                {name}
              </h3>
              <p className="mt-3 text-xs text-foreground/65 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
