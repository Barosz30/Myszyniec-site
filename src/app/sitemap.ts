import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { getAllNews } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/o-myszyncu",
    "/newsy",
    "/pogoda",
    "/wydarzenia",
    "/wazne",
    "/kontakt",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const newsRoutes = getAllNews().map((item) => ({
    url: `${base}/newsy/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...newsRoutes];
}
