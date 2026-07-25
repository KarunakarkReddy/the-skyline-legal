import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader } from "@/components/PageShell";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
  meta: [
    { title: "gallery — Skyline Legal" },
    {
      name: "description",
      content:
        "Explore our office, legal team, court appearances, events, and professional journey at Skyline Legal.",
    },
    { property: "og:title", content: "gallery — Skyline Legal" },
    {
      property: "og:description",
      content:
        "Photo gallery showcasing Skyline Legal's office, advocates, events, and achievements.",
    },
  ],
}),
  component: Gallery,
});

const galleryImages = [
  {
    image: "/gallery/pic9.jpg",
    title: "Waiting Area",
  },
  {
    image: "/gallery/pic6.jpg",
    title: "Waiting Area",
  },
  {
    image: "/gallery/pic3.jpg",
    title: "Corridor",
  },
  {
    image: "/gallery/pic1.jpg",
    title: "Conference Hall",
  },
  {
    image: "/gallery/pic8.jpg",
    title: "Rapid Conference Room",
  },
  {
    image: "/gallery/pic4.jpg",
    title: "File Room",
  },
  {
    image: "/gallery/pic5.jpg",
    title: "Work Station",
  },
  {
    image: "/gallery/pic7.jpg",
    title: "Conference Hall",
  },
];
function Gallery() {
  return (
    <PageShell>
      <PageHeader eyebrow="gallery" title="Our gallery" subtitle="A glimpse into Skyline Legal's office, team, events, and professional journey." />
      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((photo) => (
  <div
    key={photo.title}
    className="group overflow-hidden border border-gold/20 bg-navy/40"
  >
    <div className="overflow-hidden">
      <img
        src={photo.image}
        alt={photo.title}
        className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
      />
    </div>

    <div className="p-5">
      <h3 className="font-display text-xl text-gold">
        {photo.title}
      </h3>
    </div>
  </div>
))}
        </div>
      </section>
    </PageShell>
  );
}
