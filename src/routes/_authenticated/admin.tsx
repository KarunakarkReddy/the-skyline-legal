import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PageShell, PageHeader } from "@/components/PageShell";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin, listBookings, updateBookingStatus } from "@/lib/bookings.functions";
import { BOOKING_STATUSES, type Booking, type BookingStatus } from "@/lib/bookings";
import { listEnquiries, updateEnquiryStatus } from "@/lib/enquiries.functions";
import { ENQUIRY_STATUSES, type Enquiry, type EnquiryStatus } from "@/lib/enquiries";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Skyline Legal" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminDashboard,
});

const bookingStatusClasses: Record<BookingStatus, string> = {
  pending: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  confirmed: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  completed: "bg-green-500/10 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/10 text-red-300 border-red-500/30",
};

const enquiryStatusClasses: Record<EnquiryStatus, string> = {
  new: "bg-yellow-500/10 text-yellow-300 border-yellow-500/30",
  contacted: "bg-blue-500/10 text-blue-300 border-blue-500/30",
  closed: "bg-green-500/10 text-green-300 border-green-500/30",
};

function csvEscape(v: unknown): string {
  const s = v == null ? "" : String(v);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCsv(filename: string, headers: string[], rows: (string | number | null | undefined)[][]) {
  const csv = [headers, ...rows].map((r) => r.map(csvEscape).join(",")).join("\r\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function AdminDashboard() {
  const nav = useNavigate();
  const checkAdmin = useServerFn(checkIsAdmin);
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"enquiries" | "bookings">("enquiries");

  useEffect(() => {
    checkAdmin()
      .then((r) => setAuthorized(r.isAdmin))
      .catch(() => setAuthorized(false));
  }, [checkAdmin]);

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/auth" });
  }

  if (authorized === null) {
    return (
      <PageShell>
        <div className="container-luxe py-24 text-center text-foreground/70">Loading…</div>
      </PageShell>
    );
  }

  if (!authorized) {
    return (
      <PageShell>
        <PageHeader eyebrow="Restricted" title="Access Denied" subtitle="Your account does not have administrator privileges." />
        <div className="container-luxe pb-24 text-center">
          <button onClick={signOut} className="btn-gold">Sign Out</button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader eyebrow="Admin" title="Client Requests" subtitle="Manage enquiries and consultation bookings received through the website." />
      <section className="py-8">
        <div className="container-luxe">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 border border-gold/25">
              <TabButton active={tab === "enquiries"} onClick={() => setTab("enquiries")}>Enquiries</TabButton>
              <TabButton active={tab === "bookings"} onClick={() => setTab("bookings")}>Bookings</TabButton>
            </div>
            <button onClick={signOut} className="text-xs uppercase tracking-widest text-foreground/60 hover:text-gold">Sign out</button>
          </div>
          {tab === "enquiries" ? <EnquiriesPanel /> : <BookingsPanel />}
        </div>
      </section>
    </PageShell>
  );
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 text-xs uppercase tracking-[0.22em] transition-colors ${
        active ? "bg-gold text-navy-deep" : "text-foreground/70 hover:text-gold"
      }`}
    >
      {children}
    </button>
  );
}

function EnquiriesPanel() {
  const qc = useQueryClient();
  const fetchEnquiries = useServerFn(listEnquiries);
  const updateStatus = useServerFn(updateEnquiryStatus);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<EnquiryStatus | "all">("all");

  const { data, isLoading, error } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => fetchEnquiries(),
  });

  const mutation = useMutation({
    mutationFn: (v: { id: string; status: EnquiryStatus }) => updateStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["enquiries"] }),
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const q = search.trim().toLowerCase();
    return data.filter((e) => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (!q) return true;
      return [e.name, e.email, e.phone, e.practice_area ?? "", e.message].some((v) =>
        v.toLowerCase().includes(q),
      );
    });
  }, [data, search, statusFilter]);

  function exportCsv() {
    downloadCsv(
      `skyline-enquiries-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Name", "Phone", "Email", "Practice Area", "Message", "IP Address", "Status", "Submitted"],
      filtered.map((e) => [e.name, e.phone, e.email, e.practice_area, e.message, e.ip_address, e.status, new Date(e.submitted_at).toLocaleString()]),
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <input
          type="text"
          placeholder="Search name, email, phone, message…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[240px] bg-transparent border border-gold/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as EnquiryStatus | "all")}
          className="bg-transparent border border-gold/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
        >
          <option value="all" className="bg-navy-deep">All statuses</option>
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-navy-deep">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button onClick={exportCsv} disabled={!filtered.length} className="btn-gold disabled:opacity-50">Export CSV</button>
      </div>

      {isLoading && <div className="text-center py-12 text-foreground/60">Loading enquiries…</div>}
      {error && <div className="text-center py-12 text-red-400">Failed to load: {(error as Error).message}</div>}
      {!isLoading && filtered.length === 0 && (
        <div className="border border-gold/20 py-16 text-center text-foreground/60">No enquiries found.</div>
      )}

      {filtered.length > 0 && (
        <div className="overflow-x-auto border border-gold/20">
          <table className="w-full text-sm">
            <thead className="bg-navy/60 text-gold uppercase tracking-wider text-xs">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3">Practice</th>
                <th className="text-left px-4 py-3">Message</th>
                <th className="text-left px-4 py-3">IP</th>
                <th className="text-left px-4 py-3">Submitted</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((e: Enquiry) => (
                <tr key={e.id} className="border-t border-gold/10 hover:bg-navy/30 align-top">
                  <td className="px-4 py-3 font-medium">{e.name}</td>
                  <td className="px-4 py-3 text-foreground/80">
                    <div>{e.email}</div>
                    <div className="text-foreground/60">{e.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-foreground/80">{e.practice_area || "—"}</td>
                  <td className="px-4 py-3 max-w-sm">
                    <div className="line-clamp-3 text-foreground/75 whitespace-pre-wrap">{e.message}</div>
                  </td>
                  <td className="px-4 py-3 text-foreground/60 text-xs">{e.ip_address || "—"}</td>
                  <td className="px-4 py-3 text-foreground/60 text-xs">{new Date(e.submitted_at).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={e.status}
                      disabled={mutation.isPending}
                      onChange={(ev) => mutation.mutate({ id: e.id, status: ev.target.value as EnquiryStatus })}
                      className={`border px-2 py-1 text-xs uppercase tracking-wider bg-transparent focus:outline-none ${enquiryStatusClasses[e.status]}`}
                    >
                      {ENQUIRY_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-navy-deep text-foreground">{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

function BookingsPanel() {
  const qc = useQueryClient();
  const fetchBookings = useServerFn(listBookings);
  const updateStatus = useServerFn(updateBookingStatus);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");

  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => fetchBookings(),
  });

  const mutation = useMutation({
    mutationFn: (v: { id: string; status: BookingStatus }) => updateStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["bookings"] }),
  });

  const filtered = useMemo(() => {
    if (!bookings) return [];
    const q = search.trim().toLowerCase();
    return bookings.filter((b) => {
      if (statusFilter !== "all" && b.status !== statusFilter) return false;
      if (!q) return true;
      return [b.name, b.email, b.phone, b.advocate, b.practice_area ?? ""].some((v) =>
        v.toLowerCase().includes(q),
      );
    });
  }, [bookings, search, statusFilter]);

  function exportCsv() {
    downloadCsv(
      `skyline-bookings-${new Date().toISOString().slice(0, 10)}.csv`,
      ["Name", "Phone", "Email", "Advocate", "Practice Area", "Date", "Time", "Message", "Status", "Submitted"],
      filtered.map((b) => [b.name, b.phone, b.email, b.advocate, b.practice_area, b.appointment_date, b.appointment_time, b.message, b.status, new Date(b.submitted_at).toLocaleString()]),
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-3 items-center mb-6">
        <input
          type="text"
          placeholder="Search name, email, phone, advocate…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 min-w-[240px] bg-transparent border border-gold/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as BookingStatus | "all")}
          className="bg-transparent border border-gold/30 px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
        >
          <option value="all" className="bg-navy-deep">All statuses</option>
          {BOOKING_STATUSES.map((s) => (
            <option key={s} value={s} className="bg-navy-deep">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
          ))}
        </select>
        <button onClick={exportCsv} disabled={!filtered.length} className="btn-gold disabled:opacity-50">Export CSV</button>
      </div>

      {isLoading && <div className="text-center py-12 text-foreground/60">Loading bookings…</div>}
      {error && <div className="text-center py-12 text-red-400">Failed to load: {(error as Error).message}</div>}
      {!isLoading && filtered.length === 0 && (
        <div className="border border-gold/20 py-16 text-center text-foreground/60">No bookings found.</div>
      )}

      {filtered.length > 0 && (
        <div className="overflow-x-auto border border-gold/20">
          <table className="w-full text-sm">
            <thead className="bg-navy/60 text-gold uppercase tracking-wider text-xs">
              <tr>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3">Advocate</th>
                <th className="text-left px-4 py-3">Practice</th>
                <th className="text-left px-4 py-3">Appointment</th>
                <th className="text-left px-4 py-3">Message</th>
                <th className="text-left px-4 py-3">Submitted</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b: Booking) => (
                <tr key={b.id} className="border-t border-gold/10 hover:bg-navy/30 align-top">
                  <td className="px-4 py-3 font-medium">{b.name}</td>
                  <td className="px-4 py-3 text-foreground/80">
                    <div>{b.email}</div>
                    <div className="text-foreground/60">{b.phone}</div>
                  </td>
                  <td className="px-4 py-3">{b.advocate}</td>
                  <td className="px-4 py-3 text-foreground/80">{b.practice_area || "—"}</td>
                  <td className="px-4 py-3">
                    <div>{b.appointment_date}</div>
                    <div className="text-foreground/60">{b.appointment_time}</div>
                  </td>
                  <td className="px-4 py-3 max-w-xs">
                    <div className="line-clamp-2 text-foreground/75">{b.message || "—"}</div>
                  </td>
                  <td className="px-4 py-3 text-foreground/60 text-xs">
                    {new Date(b.submitted_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={b.status}
                      disabled={mutation.isPending}
                      onChange={(e) => mutation.mutate({ id: b.id, status: e.target.value as BookingStatus })}
                      className={`border px-2 py-1 text-xs uppercase tracking-wider bg-transparent focus:outline-none ${bookingStatusClasses[b.status]}`}
                    >
                      {BOOKING_STATUSES.map((s) => (
                        <option key={s} value={s} className="bg-navy-deep text-foreground">{s}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
