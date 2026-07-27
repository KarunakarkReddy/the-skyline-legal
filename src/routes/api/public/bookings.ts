import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const BookingSchema = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(200),
  advocate: z.string().trim().max(120).optional().default(""),
  practiceArea: z.string().trim().max(120).optional().default(""),
  appointmentDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/),
  appointmentTime: z.string().trim().min(1).max(30),
  message: z.string().trim().max(2000).optional().default(""),
});

export const Route = createFileRoute("/api/public/bookings")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = BookingSchema.safeParse(body);
        if (!parsed.success) {
          console.log(parsed.error.flatten());

          return Response.json(
            {
              error: parsed.error.flatten(),
            },
            { status: 400 }
          );
        }
        const b = parsed.data;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { error } = await supabaseAdmin.from("bookings").insert({
          name: b.name,
          phone: b.phone,
          email: b.email,
          advocate: b.advocate,
          practice_area: b.practiceArea || null,
          appointment_date: b.appointmentDate,
          appointment_time: b.appointmentTime,
          message: b.message || null,
        });
        if (error) {
          console.error("[bookings] insert failed:", error);
          return Response.json({ error: "Could not save your request" }, { status: 500 });
        }

        // Send emails (fail-soft)
        try {
          const { sendBookingEmails } = await import("@/lib/send-booking-emails.server");
          await sendBookingEmails(b);
        } catch (e) {
          console.error("[bookings] email send skipped:", e);
        }

        return Response.json({ ok: true });
      },
    },
  },
});
