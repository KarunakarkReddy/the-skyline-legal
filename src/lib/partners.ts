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
      "Based in Bengaluru, Chandan S Malapur has represented clients before the Supreme Court of India, High Court of Karnataka, Trial Courts, National Company Law Tribunal (NCLT), and RERA Authorities.",
      "His areas of expertise include Civil Law, Commercial Law, Property Law, Service Law, Administrative Law, Constitutional Law, Contractual Disputes, Insolvency, Electricity Law, Intellectual Property, Employment Law, and Consumer Law.",
      "He also advises and represents clients in Government Contract Litigation, Techno-Commercial Disputes, Shareholder Disputes, Writ Petitions, Debt Recovery, Insolvency Proceedings, and Real Estate Litigation.",
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
      "Sateesh N Kottalagi represents clients in several high-value legal disputes involving constitutional, commercial, corporate, and service matters.",
      "His expertise includes Service Law, Employee Contract Disputes, Writ Petitions, Government Contract Litigation, Real Estate Litigation, Inheritance, Succession, Intellectual Property, Shareholder Disputes, Consumer Litigation, Insolvency, and Debt Restructuring.",
      "He regularly represents borrowers, lenders, companies, and corporate entities before the High Court of Karnataka and the National Company Law Tribunal (NCLT) in complex corporate and insolvency matters.",
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
      "Chandrakant Pol has extensive experience handling complex civil and commercial litigation across multiple jurisdictions.",
      "Areas of practice include Civil Litigation, Commercial Litigation, Commercial Contracts, Real Estate Litigation, Intellectual Property Rights, Consumer Disputes, Arbitration, Construction Arbitration, Company Law, Insolvency, Corporate Advisory, and Contract Drafting.",
      "Regularly appears before Trial Courts, High Court of Karnataka, High Court of Delhi, National Company Law Tribunal (NCLT), and Arbitration Tribunals — advising businesses on corporate governance, commercial transactions, insolvency proceedings, and legal documentation.",
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
      "Madan Pol is a practicing Advocate before the High Court of Karnataka with a multidisciplinary legal practice focused on resolving complex legal challenges across diverse sectors.",
      "He possesses extensive experience in Civil Litigation, Criminal Litigation, Real Estate Transactions, Property Disputes, Consumer Protection, Debt Recovery, Administrative Law, and Service Law.",
      "His professional journey within Skyline Legal is a testament to excellence and commitment. Beginning as an intern, his outstanding legal acumen, dedication, and strategic handling of complex litigation led to his rapid elevation as a Partner.",
      "Beyond conventional litigation, he regularly appears before the High Court of Karnataka, Karnataka Administrative Tribunal (KAT), and Central Administrative Tribunal (CAT), representing individuals, corporations, and government employees in administrative and service law matters.",
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
