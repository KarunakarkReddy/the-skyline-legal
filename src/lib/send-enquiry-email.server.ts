// Server-only. Sends an admin notification for a contact-form enquiry.
// Fail-soft: submission must succeed even if email delivery fails.

import { Resend } from "resend";
import { CONTACT_NOTIFICATION_EMAIL } from "./enquiries";

export type EnquiryPayload = {
  name: string;
  phone: string;
  email: string;
  practiceArea: string;
  message: string;
  submittedAt: string; // ISO
  ipAddress: string;
};

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

function html(b: EnquiryPayload) {
  const rows = [
    ["Name", b.name],
    ["Phone", b.phone],
    ["Email", b.email],
    ["Practice Area", b.practiceArea || "—"],
    ["Message", b.message || "—"],
    ["Date & Time", new Date(b.submittedAt).toLocaleString()],
    ["IP Address", b.ipAddress || "—"],
  ]
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:160px;vertical-align:top">${esc(k)}</td><td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;white-space:pre-wrap">${esc(v)}</td></tr>`,
    )
    .join("");

  return `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#ffffff;margin:0;padding:24px"><div style="max-width:640px;margin:0 auto;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden"><div style="background:#081425;color:#D4AF37;padding:20px 24px;font-size:18px;font-weight:600">New Client Enquiry — Skyline Legal</div><table style="width:100%;border-collapse:collapse">${rows}</table></div></body></html>`;
}

function text(b: EnquiryPayload) {
  return `New Client Enquiry — Skyline Legal

Name: ${b.name}
Phone: ${b.phone}
Email: ${b.email}
Practice Area: ${b.practiceArea || "-"}
Message: ${b.message || "-"}
Date & Time: ${new Date(b.submittedAt).toLocaleString()}
IP Address: ${b.ipAddress || "-"}`;
}

function clientHtml(b: EnquiryPayload) {
  return `
  <html>
  <body style="font-family:Arial;padding:30px">
    <h2>Thank you for contacting Skyline Legal</h2>

    <p>Dear ${esc(b.name)},</p>

    <p>
      We have received your enquiry successfully.
    </p>

    <p>
      Our legal team will contact you shortly.
    </p>

    <br>

    <p>
      Regards,<br>
      Skyline Legal
    </p>

    <hr>

    <p>
      contact@theskylinelegal.in
    </p>

    <p>
      https://theskylinelegal.in
    </p>

  </body>
  </html>
  `;
}

function clientText(b: EnquiryPayload) {
  return `
Dear ${b.name},

Thank you for contacting Skyline Legal.

We have received your enquiry.

Our legal team will contact you shortly.

Regards,

Skyline Legal

contact@theskylinelegal.in

https://theskylinelegal.in
`;
}

export async function sendEnquiryEmail(b: EnquiryPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromAddress = process.env.EMAIL_FROM_ADDRESS || "Skyline Legal <contact@theskylinelegal.in>";

  if (!apiKey) {
    console.warn("[enquiry-email] RESEND_API_KEY missing. Skipping send.");
    return;
  }

  console.log("RESEND_API_KEY exists:", !!apiKey);
  console.log("FROM ADDRESS:", fromAddress);

  const resend = new Resend(apiKey);

  try {
  const results = await Promise.allSettled([
    resend.emails.send({
      from: fromAddress,
      to: CONTACT_NOTIFICATION_EMAIL,
      subject: "New Client Enquiry - Skyline Legal",
      html: html(b),
      text: text(b),
      replyTo: b.email,
    }),

    resend.emails.send({
      from: fromAddress,
      to: b.email,
      subject: "Thank you for contacting Skyline Legal",
      html: clientHtml(b),
      text: clientText(b),
    }),
  ]); 

  console.log("EMAIL RESULTS:", results);
} catch (e) {
  console.error("[enquiry-email] send failed:", e);
}
}