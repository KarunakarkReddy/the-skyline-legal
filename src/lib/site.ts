export const site = {
  name: "Skyline Legal",
  tagline: "Integrity | Progress",
  phones: ["+91 94834 17396", "+91 63620 26670"],
  email: "contact@theskylinelegal.in",
  address: {
    line1: "SKYLINE LEGAL Advocates & Solicitors",
    line2: "Devatha Mansions #26, 3rd Floor, 5th Main Road",
    line3: "Gandhinagar, Bengaluru — 560009"
  },
  hours: "Mon – Sat · 10:00 AM – 7:00 PM",
};

export type PracticeCategory =
  | "Constitutional & Public Law"
  | "Litigation & Disputes"
  | "Corporate & Commercial"
  | "Property & Real Estate"
  | "Regulatory & Tribunals"
  | "Advisory & Drafting";

export type PracticeArea = {
  slug: string;
  title: string;
  category: PracticeCategory;
  desc: string;
  long: string;
  featured?: boolean;
  keywords?: string;
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "constitution-law",
    title: "Constitution Law",
    category: "Constitutional & Public Law",
    featured: true,
    desc: "Constitutional advocacy on fundamental rights, writ petitions, and public interest matters before the High Court of Karnataka and the Supreme Court of India.",
    long: "Our constitutional practice covers Article 226 writ petitions, PILs, challenges to statutes and executive action, and appearances in matters involving fundamental and statutory rights. We assist individuals, companies, and public bodies with strategic constitutional litigation.",
    keywords: "Constitutional Lawyer Bengaluru, Writ Petition Advocate, High Court Advocate",
  },
  {
    slug: "civil-law",
    title: "Civil Law",
    category: "Litigation & Disputes",
    desc: "Civil suits, appeals, injunctions, and declaratory relief across trial and appellate courts in Karnataka.",
    long: "We appear in title suits, partition, specific performance, recovery, and appellate civil work with meticulous case preparation and calm, persuasive advocacy.",
    keywords: "Civil Lawyer Bengaluru, Civil Litigation Advocate",
  },
  {
    slug: "criminal-law",
    title: "Criminal Law",
    category: "Litigation & Disputes",
    desc: "Bail, trial defence, and criminal appeals before Magistrate, Sessions, and High Courts.",
    long: "Our criminal team handles bail applications, quashing petitions, trial defence, and appeals with rigorous cross-examination and strategic clarity.",
    keywords: "Criminal Lawyer Bengaluru, Criminal Defence Advocate",
  },
  {
    slug: "commercial-law",
    title: "Commercial Law",
    category: "Corporate & Commercial",
    desc: "Commercial disputes, contract enforcement, and litigation before Commercial Courts and High Courts.",
    long: "We represent businesses in commercial suits, injunctions, and appellate work, including cross-border and multi-jurisdictional matters.",
    keywords: "Commercial Lawyer Bengaluru, Commercial Court Advocate",
  },
  {
    slug: "corporate-law",
    title: "Corporate Law",
    category: "Corporate & Commercial",
    desc: "Corporate advisory, governance, transactions, and dispute resolution for founders, SMEs, and mid-market companies.",
    long: "From incorporation and shareholder agreements to M&A structuring and board advisory, we serve as long-term counsel to Indian and international businesses.",
    keywords: "Corporate Lawyer Bengaluru, Corporate Legal Advisor",
  },
  {
    slug: "property-law",
    title: "Property Law",
    category: "Property & Real Estate",
    desc: "Title diligence, conveyancing, partition, and land-record matters across Karnataka.",
    long: "We provide title reports, handle conveyancing, and litigate partition, injunction, and specific-performance suits involving immovable property.",
    keywords: "Property Lawyer Bengaluru, Title Verification Advocate",
  },
  {
    slug: "real-estate-law",
    title: "Real Estate Law",
    category: "Property & Real Estate",
    desc: "End-to-end real estate advisory and litigation for buyers, developers, and housing societies.",
    long: "We advise on JDAs, sale deeds, layout approvals, and represent parties in real-estate disputes before civil courts, RERA, and consumer forums.",
    keywords: "Real Estate Lawyer Bengaluru, Real Estate Litigation",
  },
  {
    slug: "consumer-protection",
    title: "Consumer Protection",
    category: "Litigation & Disputes",
    desc: "Representation before District, State, and National Consumer Commissions across a broad range of disputes.",
    long: "We handle deficiency-of-service, product-liability, real-estate, insurance, and banking consumer complaints, with a strong track record before commissions.",
    keywords: "Consumer Lawyer Bengaluru, Consumer Forum Advocate",
  },
  {
    slug: "administrative-law",
    title: "Administrative Law",
    category: "Regulatory & Tribunals",
    desc: "Judicial review of administrative action, service and regulatory matters before High Courts and tribunals.",
    long: "We challenge administrative orders, appear in service matters, and represent government employees and departments before CAT, KAT, and the High Court.",
    keywords: "Administrative Law Expert, CAT Advocate, KAT Advocate",
  },
  {
    slug: "service-law",
    title: "Service Law",
    category: "Regulatory & Tribunals",
    desc: "Employee service matters, disciplinary proceedings, promotions, seniority, and pension disputes.",
    long: "We represent central and state government employees, PSU staff, and officers in service-law disputes before CAT, KAT, and the High Court of Karnataka.",
    keywords: "Service Law Advocate, CAT Lawyer Bengaluru",
  },
  {
    slug: "education-law",
    title: "Education Law",
    category: "Regulatory & Tribunals",
    desc: "Regulatory advisory and litigation for schools, colleges, universities, students, and educators.",
    long: "We advise educational institutions on regulatory compliance and represent students and faculty in admissions, disciplinary, and recognition matters.",
    keywords: "Education Lawyer Bengaluru, Education Law Advocate",
  },
  {
    slug: "labour-employment-law",
    title: "Labour & Employment Law",
    category: "Regulatory & Tribunals",
    desc: "Workplace advisory, industrial disputes, and employment litigation for employers and employees.",
    long: "We advise on employment contracts, POSH compliance, terminations, and represent parties before labour courts and industrial tribunals.",
    keywords: "Labour & Employment Lawyer Bengaluru, Industrial Disputes Advocate",
  },
  {
    slug: "tax-law",
    title: "Tax Law",
    category: "Regulatory & Tribunals",
    desc: "Direct and indirect tax advisory and representation before tax authorities and tribunals.",
    long: "We handle income-tax, GST, and property-tax disputes, including scrutiny, appeals, and writ proceedings arising out of tax orders.",
    keywords: "Tax Lawyer Bengaluru, GST Advocate",
  },
  {
    slug: "sarfaesi-drt",
    title: "SARFAESI (DRT)",
    category: "Corporate & Commercial",
    desc: "Debt Recovery Tribunal proceedings, SARFAESI enforcement, and secured-creditor disputes.",
    long: "We represent borrowers, guarantors, and lenders in SARFAESI actions, DRT/DRAT proceedings, and related writ challenges.",
    keywords: "SARFAESI Lawyer Bengaluru, DRT Advocate",
  },
  {
    slug: "company-law",
    title: "Company Law",
    category: "Corporate & Commercial",
    desc: "Company Act compliance, oppression and mismanagement, and NCLT litigation.",
    long: "We advise on Companies Act compliance and appear before the NCLT and NCLAT in oppression, mismanagement, and restructuring matters.",
    keywords: "Company Law Advocate, NCLT Lawyer Bengaluru",
  },
  {
    slug: "insolvency-bankruptcy",
    title: "Insolvency & Bankruptcy",
    category: "Corporate & Commercial",
    desc: "IBC proceedings for operational creditors, financial creditors, corporate debtors, and personal guarantors.",
    long: "We handle Section 7, 9, and 10 petitions, resolution processes, and appeals under the Insolvency and Bankruptcy Code before the NCLT and NCLAT.",
    keywords: "Insolvency Lawyer Bengaluru, IBC Advocate, NCLT Lawyer",
  },
  {
    slug: "debt-recovery",
    title: "Debt Recovery",
    category: "Corporate & Commercial",
    desc: "Recovery suits, DRT proceedings, and enforcement of financial claims.",
    long: "We assist banks, NBFCs, and businesses in structured debt recovery through civil courts, commercial courts, DRTs, and IBC forums.",
    keywords: "Debt Recovery Advocate, DRT Lawyer Bengaluru",
  },
  {
    slug: "arbitration",
    title: "Arbitration",
    category: "Advisory & Drafting",
    desc: "Domestic and institutional arbitration, Section 9/11/34/37 proceedings, and enforcement of awards.",
    long: "We act as counsel in domestic and institutional arbitrations and handle interim measures, appointments, challenges, and enforcement before courts.",
    keywords: "Arbitration Lawyer Bengaluru, Arbitration Advocate",
  },
  {
    slug: "construction-arbitration",
    title: "Construction Arbitration",
    category: "Advisory & Drafting",
    desc: "EPC, infrastructure, and construction disputes under FIDIC and standard-form contracts.",
    long: "We represent employers and contractors in claims arising from delay, variation, defects, and termination under construction contracts.",
    keywords: "Construction Arbitration Lawyer, EPC Disputes Advocate",
  },
  {
    slug: "intellectual-property-rights",
    title: "Intellectual Property Rights",
    category: "Advisory & Drafting",
    desc: "Trademark, copyright, and design protection, licensing, and IP enforcement.",
    long: "We handle IP prosecution, oppositions, infringement suits, and licensing across trademarks, copyrights, and designs.",
    keywords: "IPR Lawyer Bengaluru, Trademark Advocate",
  },
  {
    slug: "contract-drafting",
    title: "Contract Drafting",
    category: "Advisory & Drafting",
    desc: "Bespoke drafting and vetting of commercial, employment, and property contracts.",
    long: "We draft and review agreements with a focus on risk allocation, enforceability, and commercial clarity — including MSAs, SHAs, JDAs, and NDAs.",
    keywords: "Contract Drafting Advocate, Legal Drafting Bengaluru",
  },
  {
    slug: "shareholder-disputes",
    title: "Shareholder Disputes",
    category: "Corporate & Commercial",
    desc: "Oppression, mismanagement, promoter deadlock, and buyout disputes before the NCLT.",
    long: "We advise founders, investors, and minority shareholders in disputes involving control, exits, and enforcement of shareholder agreements.",
    keywords: "Shareholder Disputes Lawyer, NCLT Advocate Bengaluru",
  },
  {
    slug: "government-contract-litigation",
    title: "Government Contract Litigation",
    category: "Litigation & Disputes",
    desc: "Tender disputes, blacklisting challenges, and contractual claims against government bodies.",
    long: "We appear in writ and arbitration matters arising from public procurement, tender awards, and disputes with public-sector undertakings.",
    keywords: "Government Contract Advocate, Tender Dispute Lawyer",
  },
  {
    slug: "employment-disputes",
    title: "Employment Disputes",
    category: "Regulatory & Tribunals",
    desc: "Wrongful termination, non-compete, and executive-severance disputes.",
    long: "We represent senior executives and employers in disputes over termination, restrictive covenants, ESOPs, and workplace investigations.",
    keywords: "Employment Disputes Lawyer, Employment Advocate Bengaluru",
  },
  {
    slug: "writ-petitions",
    title: "Writ Petitions",
    category: "Constitutional & Public Law",
    desc: "Article 226/227 writs before the High Court of Karnataka and Article 32 before the Supreme Court.",
    long: "We draft and argue writ petitions challenging state action, regulatory orders, and violations of fundamental and statutory rights.",
    keywords: "Writ Petition Advocate, High Court Writ Lawyer",
  },
  {
    slug: "electricity-law",
    title: "Electricity Law",
    category: "Regulatory & Tribunals",
    desc: "Tariff disputes, licensee matters, and appeals before electricity regulatory commissions.",
    long: "We advise consumers, generators, and licensees on matters under the Electricity Act, 2003 and appear before KERC and APTEL.",
    keywords: "Electricity Law Advocate, KERC Lawyer",
  },
  {
    slug: "rera-matters",
    title: "RERA Matters",
    category: "Property & Real Estate",
    desc: "Homebuyer complaints, developer compliance, and appellate proceedings under RERA.",
    long: "We represent allottees and developers before K-RERA and the Real Estate Appellate Tribunal in registration, refund, and compliance matters.",
    keywords: "RERA Lawyer Bengaluru, K-RERA Advocate",
  },
  {
    slug: "nclt-matters",
    title: "NCLT Matters",
    category: "Corporate & Commercial",
    desc: "Comprehensive representation before the NCLT in company-law and insolvency proceedings.",
    long: "We appear in oppression, mismanagement, mergers, schemes of arrangement, and IBC proceedings before the NCLT Bengaluru and NCLAT.",
    keywords: "NCLT Lawyer Bengaluru, NCLT Advocate",
  },
  {
    slug: "cat-matters",
    title: "CAT Matters",
    category: "Regulatory & Tribunals",
    desc: "Central government service matters before the Central Administrative Tribunal.",
    long: "We represent central government employees in service, promotion, disciplinary, and pension disputes before the CAT Bengaluru Bench.",
    keywords: "CAT Advocate Bengaluru, Central Administrative Tribunal Lawyer",
  },
  {
    slug: "kat-matters",
    title: "KAT Matters",
    category: "Regulatory & Tribunals",
    desc: "Karnataka state government service and administrative matters before the KAT.",
    long: "We represent state government employees and administrative litigants before the Karnataka Administrative Tribunal.",
    keywords: "KAT Advocate Bengaluru, Karnataka Administrative Tribunal Lawyer",
  },
];

export const practiceCategories: PracticeCategory[] = [
  "Constitutional & Public Law",
  "Litigation & Disputes",
  "Corporate & Commercial",
  "Property & Real Estate",
  "Regulatory & Tribunals",
  "Advisory & Drafting",
];

export const getPracticeArea = (slug: string) =>
  practiceAreas.find((p) => p.slug === slug);
