import adv1 from "@/assets/chandansmalapur.jpg";
import adv2 from "@/assets/satishhkottalagi.png";
import adv3 from "@/assets/chandrakantpol.png";
import adv4 from "@/assets/madanpol.png";

export type Partner = {
  slug: string;
  name: string;
  title: string;
  phone: string;
  photo: string;
  short: string;
  practiceAreas: string[];
  bio: string[];
  courts: string[];
  languages: string[];
  keywords: string;
};

export const partners: Partner[] = [
  {
    slug: "chandan-s-malapur",
    name: "CHANDAN S MALAPUR",
    title: "Partner | Advocate",
    phone: "+91 94834 17396",
    photo: adv1,
    short:
      "Based in Bengaluru, appearing before the Supreme Court of India, High Court of Karnataka, Trial Courts, NCLT, and RERA on civil, commercial, and constitutional matters.",
    practiceAreas: [
      "Civil Law",
      "Commercial Law",
      "Property Law",
      "Constitutional Law",
      "Insolvency",
      "Consumer Law",
    ],
    bio: [
      "He is based in Bengaluru, and has represented clients in civil, commercial and property disputes before the Supreme Court, Karnataka High Court, and trial courts at Bengaluru.",
      "He also regularly appears before commissions and forums and has extensive experience before tribunals i.e., KSAT, CAT etc. as well. His main areas of expertise include service, civil, criminal, administrative, employment, contractual disputes, and consumer law at District and State commissions.",
      "He also represents clients in several high value commercial, contract disputes, money claims, partition, real estate actions, inheritance and succession suits and consumer briefs.",
      "He also represents both borrowers and lenders in debt restructuring actions, and has significant experience in handling complex petitions filed in relation to both private and public limited companies in the High Court of Karnataka.",
      "He is regularly involved in liaisoning work as well which includes, but is not limited to, drafting deeds, contracts, agreements, and bye-laws for educational institutions.",
      "He also renders title opinions for individuals and projects in Karnataka.",
      "He regularly briefs designated senior counsels of the High Court of Karnataka and the Supreme Court of India in high stake matters.",
    ],
    courts: [
      "Supreme Court of India",
      "High Court of Karnataka",
      "Trial Courts",
      "National Company Law Tribunal (NCLT)",
      "Real Estate Regulatory Authority (RERA)",
    ],
    languages: ["English", "Kannada", "Hindi"],
    keywords:
      "Advocate in Bengaluru, High Court Advocate, Supreme Court Advocate, Civil Lawyer, Commercial Lawyer, Constitutional Lawyer, NCLT Lawyer, RERA Advocate",
  },
  {
    slug: "sateesh-n-kottalagi",
    name: "SATEESH N KOTTALAGI",
    title: "Partner | Advocate",
    phone: "+91 95912 10997",
    photo: adv2,
    short:
      "Represents clients in high-value constitutional, commercial, corporate, service, and insolvency matters before the High Court of Karnataka and the NCLT.",
    practiceAreas: [
      "Service Law",
      "Writ Petitions",
      "Corporate Law",
      "Real Estate Litigation",
      "Insolvency",
      "Consumer Litigation",
    ],
    bio: [
      "He represents clients in several high value service, employee contract disputes and writ petitions pertaining to award of government contracts, real estate actions, inheritance and succession suits, civil and criminal cases at the district and state level, disciplinary cases and consumer briefs.",
      "He also represents both borrowers and lenders in restructuring actions, and has significant experience in handling complex petitions filed in relation to both private and public limited companies in the High Court of Karnataka.",
      "He handles education related matters before the Principal Secretary, Commissioner, and Director of the School Education and Literacy Department.",
      "He handles Lokayukta related matters before the Lokayukta Court at Bengaluru.",
    ],
    courts: [
      "High Court of Karnataka",
      "National Company Law Tribunal (NCLT)",
      "Trial Courts",
      "Consumer Commissions",
    ],
    languages: ["English", "Kannada", "Hindi", "Marathi"],
    keywords:
      "Advocate in Bengaluru, High Court Advocate, NCLT Lawyer, Corporate Lawyer, Service Law Advocate, Writ Petition Lawyer, Insolvency Advocate",
  },
  {
    slug: "chandrakant-pol",
    name: "CHANDRAKANT POL",
    title: "Partner | Advocate",
    phone: "+91 86602 92676",
    photo: adv3,
    short:
      "Extensive experience across civil and commercial litigation, arbitration, IPR, and corporate advisory before the High Courts of Karnataka and Delhi and the NCLT.",
    practiceAreas: [
      "Civil Litigation",
      "Commercial Litigation",
      "Arbitration",
      "Corporate Advisory",
      "Intellectual Property",
      "Insolvency",
    ],
    bio: [
      "He has wide ranging experience in civil and commercial disputes, having conducted litigation arising out of commercial contracts, individual disputes, real estate transactions and consumer disputes before the Trial Courts and the High Courts of Karnataka.",
      "He has advised and represented clients in criminal matters, arbitration proceedings as well as in associated proceedings before courts.",
      "He also deals exclusively with debt recovery tribunal matters and regularly handles cases at DRT.",
      "He also provides general corporate advice and contract drafting services to clients.",
    ],
    courts: [
      "High Court of Karnataka",
      "High Court of Delhi",
      "Trial Courts",
      "National Company Law Tribunal (NCLT)",
      "Arbitration Tribunals",
    ],
    languages: ["English", "Kannada", "Hindi", "Marathi"],
    keywords:
      "Advocate in Bengaluru, Corporate Lawyer, Commercial Lawyer, Arbitration Advocate, IPR Lawyer, NCLT Lawyer, High Court Advocate",
  },
  {
    slug: "madan-pol",
    name: "MADAN POL",
    title: "Partner | Advocate",
    phone: "+91 81237 17821",
    photo: adv4,
    short:
      "Multidisciplinary practice spanning civil and criminal litigation, real estate, consumer, administrative, and service law before the High Court, CAT, and KAT.",
    practiceAreas: [
      "Civil Litigation",
      "Criminal Litigation",
      "Real Estate",
      "Consumer Protection",
      "Administrative Law",
      "Service Law",
    ],
    bio: [
      "He regularly deals cases before several courts in Bengaluru, which include, but are not limited to, civil, commercial, arbitration, cooperative society, revenue courts, tribunals and forums, and the High Court of Karnataka, with a multi-disciplinary practice that addresses complex legal challenges across diverse sectors.",
      "He brings comprehensive expertise to the firm, specializing in civil and criminal litigation, real estate transactions and disputes, consumer protection, and debt recovery laws.",
      "In addition to standard trial litigation, he boasts extensive experience navigating administrative and service law.",
      "He also handles real estate deals for individuals and builders and has expertise in drafting Joint Development Agreements (JDAs) and agreements between individuals and builders.",
      "He regularly represents individuals, corporations, and government employees before both the Karnataka Administrative Tribunal (KAT) and the Central Administrative Tribunal (CAT), delivering favourable outcomes in intricate regulatory matters.",
      "He also renders title opinions for individuals and projects in Karnataka.",
    ],
    courts: [
      "High Court of Karnataka",
      "Karnataka Administrative Tribunal (KAT)",
      "Central Administrative Tribunal (CAT)",
      "Trial Courts",
    ],
    languages: ["English", "Kannada", "Hindi", "Marathi"],
    keywords:
      "Advocate in Bengaluru, High Court Advocate, Civil Lawyer, Criminal Lawyer, Administrative Law Expert, KAT Advocate, CAT Advocate, Property Lawyer",
  },
];

export const getPartner = (slug: string) => partners.find((p) => p.slug === slug);

export const associates = [
  {
    name: "SHARANAPPA KADUR",
    title: "Associate",
  },
  {
    name: "VISHAL M. V.",
    title: "Associate",
  },
  {
    name: "MUTTURAJ",
    title: "Associate",
  },
];
