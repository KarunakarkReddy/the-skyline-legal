import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { partners } from "@/lib/our-team";
import { practiceAreas } from "@/lib/site";

const BASE_URL = "https://www.theskylinelegal.in";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = [
          "/",
          "/about",
          "/our-team",
          "/practice-areas",
          "/gallery",
          "/faqs",
          "/contact",
          "/book",
          "/privacy-policy",
          "/terms",

          ...partners.map((p) => `/our-team/${p.slug}`),

          ...practiceAreas.map((p) => `/practice-areas/${p.slug}`),
        ];

        const urls = paths
          .map(
            (p) => `
  <url>
    <loc>${BASE_URL}${p}</loc>
    <changefreq>monthly</changefreq>
  </url>`
          )
          .join("");

        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});