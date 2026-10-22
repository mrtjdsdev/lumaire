import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lumaire.io/",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://lumaire.io/architecture",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://lumaire.io/founders",
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
