// Server-only. Sends admin + client emails via Resend.
// Fail-soft: booking must succeed even if email delivery fails.
import { Resend } from "resend";
import { CONTACT_NOTIFICATION_EMAIL as ADMIN_NOTIFICATION_EMAIL } from "./enquiries";

type BookingPayload = {
  name: string;
  phone: string;
  email: string;
  advocate: string;
  practiceArea: string;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

function adminHtml(b: BookingPayload) {
  const rows = [
    ["Name", b.name],
    ["Phone", b.phone],
    ["Email", b.email],
    ["Advocate", b.advocate],
    ["Practice Area", b.practiceArea || "—"],
    ["Preferred Date", b.appointmentDate],
    ["Preferred Time", b.appointmentTime],
    ["Message", b.message || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:160px">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px">${esc(v)}</td></tr>`,
    )
    .join("");
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:24px"><div style="max-width:640px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:#081425;color:#D4AF37;padding:20px 24px;font-size:18px;font-weight:600">Skyline Legal — New Consultation Request</div><table style="width:100%;border-collapse:collapse">${rows}</table></div></body></html>`;
}

function adminText(b: BookingPayload) {
  return `New consultation request

Name: ${b.name}
Phone: ${b.phone}
Email: ${b.email}
Advocate: ${b.advocate}
Practice Area: ${b.practiceArea || "-"}
Date: ${b.appointmentDate}
Time: ${b.appointmentTime}
Message: ${b.message || "-"}`;
}

function clientHtml(b: BookingPayload) {
  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:24px"><div style="max-width:600px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:#081425;color:#D4AF37;padding:24px;text-align:center;font-size:20px;font-weight:600;letter-spacing:1px">SKYLINE LEGAL</div><div style="padding:28px 24px;color:#111827;font-size:15px;line-height:1.6"><p>Dear ${esc(b.name)},</p><p>Thank you for reaching out to Skyline Legal. We have received your consultation request and our chambers will contact you shortly to confirm your appointment.</p><div style="border:1px solid #e5e7eb;border-radius:6px;padding:16px;margin:20px 0;background:#f9fafb"><div style="font-size:12px;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Your Request</div><div><strong>Advocate:</strong> ${esc(b.advocate)}</div><div><strong>Date:</strong> ${esc(b.appointmentDate)}</div><div><strong>Time:</strong> ${esc(b.appointmentTime)}</div></div><p>If your matter is urgent, please call us directly.</p><p style="margin-top:28px">Warm regards,<br/><strong>Skyline Legal</strong><br/>Advocates &amp; Legal Consultants</p></div></div></body></html>`;
}

function clientText(b: BookingPayload) {
  return `Dear ${b.name},

Thank you for reaching out to Skyline Legal. We have received your consultation request and our chambers will contact you shortly.

Advocate: ${b.advocate}
Date: ${b.appointmentDate}
Time: ${b.appointmentTime}

Warm regards,
Skyline Legal`;
}

export async function sendBookingEmails(b: BookingPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM_ADDRESS || "Skyline Legal <contact@theskylinelegal.in>";

  if (!apiKey) {
    console.warn("[booking-email] RESEND_API_KEY missing. Skipping send.");
    return;
  }

  const resend = new Resend(apiKey);

  console.log("========== CLIENT EMAIL DEBUG ==========");
console.log("Client Email:", b.email);
console.log("Booking Payload:", b);

const sends: Array<Promise<unknown>> = [
  resend.emails.send({
    from: fromAddress,
    to: ADMIN_NOTIFICATION_EMAIL,
    subject: `New consultation request — ${b.name}`,
    html: adminHtml(b),
    text: adminText(b),
    replyTo: b.email,
  }),

  (async () => {
    try {
      const result = await resend.emails.send({
        from: fromAddress,
        to: b.email,
        subject: "We've received your consultation request — Skyline Legal",
        html: clientHtml(b),
        text: clientText(b),
      });

      console.log("CLIENT EMAIL RESULT:", result);
      return result;
    } catch (err) {
      console.error("CLIENT EMAIL ERROR:", err);
      throw err;
    }
  })(),
];

  const results = await Promise.allSettled(sends);
  results.forEach((r, i) => {
    if (r.status === "rejected") {
      const label = i === 0 ? "admin" : "client";
      console.error(`[booking-email] ${label} send failed:`, r.reason);
    }
  });
}