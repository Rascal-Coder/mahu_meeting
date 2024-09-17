import { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Sitemap {
  return [
    {
      url: `${process.env.NEXT_PUBLIC_SEVER_URL!}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    }
  ]
}
