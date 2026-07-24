import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell, PageHeader } from "@/components/PageShell";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign In — Skyline Legal" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg("Check your email to confirm your account, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        nav({ to: "/admin" });
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Admin" title={mode === "signin" ? "Sign In" : "Create Account"} subtitle="Restricted access. For firm administrators only." />
      <section className="py-16">
        <div className="container-luxe max-w-md">
          <form onSubmit={submit} className="border border-gold/25 p-8 bg-navy/40 space-y-5">
            <div>
              <label className="eyebrow block mb-2">Email</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
            </div>
            <div>
              <label className="eyebrow block mb-2">Password</label>
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent border border-gold/30 px-4 py-3 text-sm focus:outline-none focus:border-gold" />
            </div>
            {msg && <p className="text-sm text-gold/90">{msg}</p>}
            <button className="btn-gold w-full" type="submit" disabled={busy}>
              {busy ? "Please wait…" : mode === "signin" ? "Sign In" : "Create Account"}
            </button>
            <button type="button" onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setMsg(null); }}
              className="w-full text-xs uppercase tracking-widest text-foreground/60 hover:text-gold">
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
