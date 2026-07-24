import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  Gavel,
  Building2,
  Scale,
  Briefcase,
  ShieldCheck,
  Home,
  FileText,
} from "lucide-react";

export type Court = {
  name: string;
  short: string;
  desc: string;
  icon: LucideIcon;
};

export const courts: Court[] = [
  {
    name: "Supreme Court of India",
    short: "Apex",
    desc: "Appearances in special leave petitions, appeals, and constitutional matters before the highest court.",
    icon: Landmark,
  },
  {
    name: "High Court of Karnataka",
    short: "HC",
    desc: "Writs, appeals, company matters, and commercial litigation before the principal and appellate bench.",
    icon: Scale,
  },
  {
    name: "Trial Courts",
    short: "Trial",
    desc: "Civil, criminal, and commercial trials before District, City Civil, and Magistrate Courts.",
    icon: Gavel,
  },
  {
    name: "Karnataka Administrative Tribunal (KAT)",
    short: "KAT",
    desc: "State-service disputes, disciplinary matters, and administrative reviews for Karnataka employees.",
    icon: FileText,
  },
  {
    name: "Central Administrative Tribunal (CAT)",
    short: "CAT",
    desc: "Central government service matters and administrative disputes before the CAT Bengaluru Bench.",
    icon: ShieldCheck,
  },
  {
    name: "National Company Law Tribunal (NCLT)",
    short: "NCLT",
    desc: "Company law, oppression, mismanagement, mergers, and IBC proceedings before NCLT and NCLAT.",
    icon: Building2,
  },
  {
    name: "Real Estate Regulatory Authority (RERA)",
    short: "RERA",
    desc: "Homebuyer complaints, developer compliance, and appellate proceedings before K-RERA and REAT.",
    icon: Home,
  },
  {
    name: "Arbitration Tribunals",
    short: "Arb.",
    desc: "Domestic and institutional arbitration proceedings, including construction and commercial disputes.",
    icon: Briefcase,
  },
];
