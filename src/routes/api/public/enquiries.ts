import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const EnquirySchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200),
  practiceArea: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(1).max(2000),
});

function extractIp(request: Request): string {
  const h = request.headers;
  const candidate =
    h.get("cf-connecting-ip") ||
    h.get("x-real-ip") ||
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "";
  return candidate.slice(0, 64);
}

export const Route = createFileRoute("/api/public/enquiries")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = EnquirySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 });
        }
        const b = parsed.data;
        const ip = extractIp(request);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await (supabaseAdmin as any).from("enquiries").insert({
          name: b.name,
          phone: b.phone,
          email: b.email,
          practice_area: b.practiceArea || null,
          message: b.message,
          ip_address: ip || null,
        });
        if (error) {
          console.error("[enquiries] insert failed:", error);
          return Response.json({ error: "Could not send your message" }, { status: 500 });
        }

        try {
          const { sendEnquiryEmail } = await import("@/lib/send-enquiry-email.server");
          await sendEnquiryEmail({
            name: b.name,
            phone: b.phone,
            email: b.email,
            practiceArea: b.practiceArea,
            message: b.message,
            submittedAt: new Date().toISOString(),
            ipAddress: ip,
          });
        } catch (e) {
          console.error("[enquiries] email send skipped:", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
