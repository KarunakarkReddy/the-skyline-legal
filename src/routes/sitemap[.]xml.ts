import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { partners } from "@/lib/our-team";
import { practiceAreas } from "@/lib/site";

const BASE_URL = "";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/", "/about", "/partners", "/practice-areas", "/services",
          "/testimonials", "/gallery", "/faqs", "/contact", "/book",
          "/privacy-policy", "/terms",
          ...partners.map((p) => `/partners/${p.slug}`),
          ...practiceAreas.map((p) => `/practice-areas/${p.slug}`),
        ];
        const urls = paths.map((p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>monthly</changefreq></url>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
