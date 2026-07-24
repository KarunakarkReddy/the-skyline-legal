export const ENQUIRY_STATUSES = ["new", "contacted", "closed"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export type Enquiry = {
  id: string;
  name: string;
  phone: string;
  email: string;
  practice_area: string | null;
  message: string;
  ip_address: string | null;
  status: EnquiryStatus;
  submitted_at: string;
  updated_at: string;
};

export const CONTACT_NOTIFICATION_EMAIL = "contact@theskylinelegal.in";
