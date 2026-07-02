import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { pillarPages } from "@/lib/pages";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "blog", "news", "reviews", "resources", "free-tools", "free-ai-tools", "tool-directory", "newsletter", "about", "contact", "explore", "legal", "privacy-policy", "affiliate-disclosure", "terms", "scam-watch", "best-crypto-exchanges-uk", "best-hardware-wallets-uk", "best-crypto-tax-software-uk", "best-ai-tools-bloggers", "best-crypto-wallets-beginners", "best-web-hosting-crypto-blog", "crypto-scam-checker", "beginner-crypto-toolkit"];
  const moneyPages = ["reviews/best-crypto-exchanges-uk", "reviews/ledger-wallet-review", "reviews/koinly-uk-review", "reviews/trezor-wallet-review", "reviews/coinbase-uk-review", "reviews/kraken-uk-review", "reviews/binance-uk-review", "reviews/bybit-uk-review", "reviews/best-hardware-wallets-uk", "reviews/best-crypto-tax-tools-uk", "reviews/writesonic-review", "reviews/best-ai-tools-bloggers", "reviews/best-crypto-resources-beginners", "reviews/best-ai-tools-small-business", "reviews/best-tools-faceless-youtube"];
  const pageRoutes = pillarPages.map((page) => page.slug);
  const articles = await getArticles();
  const articleRoutes = articles.map((article) => `blog/${article.slug}`);

  return [...staticRoutes, ...moneyPages, ...pageRoutes, ...articleRoutes].map((route) => ({
    url: `${site.url}/${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("blog") ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
