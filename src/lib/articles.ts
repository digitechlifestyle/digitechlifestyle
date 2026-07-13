import { site } from "./site";

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string;
  updated: string;
  author: string;
  readingTime: string;
  featured: boolean;
  content: string;
  image?: string;
};

const WP_API = "https://digitechlifestyle.com/wp-json/wp/v2";

/** WP host occasionally resets connections during build; retry transient failures before giving up. */
async function fetchWithRetry(url: string, init: RequestInit, attempts = 3): Promise<Response> {
  let lastErr: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fetch(url, init);
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await new Promise((r) => setTimeout(r, 500 * 2 ** i));
    }
  }
  throw lastErr;
}

type WPPost = {
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified?: string;
  categories: number[];
  sticky: boolean;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
};

type WPCategory = {
  id: number;
  name: string;
};

async function getCategories(): Promise<Record<number, string>> {
  try {
    const res = await fetchWithRetry(`${WP_API}/categories?per_page=50`, {
      cache: "force-cache",
    });
    const cats: WPCategory[] = await res.json();
    return Object.fromEntries(cats.map((c) => [c.id, c.name]));
  } catch {
    return {};
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘")
    .replace(/&#8220;/g, "“")
    .replace(/&#8221;/g, "”")
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(parseInt(code, 10)))
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function estimateReadingTime(html: string): string {
  const words = stripHtml(html).split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

/** Deterministic reading time from slug when content isn't available in listing fetch */
function readingTimeFromSlug(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  }
  const mins = 7 + (h % 8); // range 7–14 min
  return `${mins} min read`;
}

// Unique fallback per article: picsum.photos uses slug as seed → deterministic, never duplicates
function getFallbackImage(slug: string): string {
  return `https://picsum.photos/seed/${encodeURIComponent(slug)}/800/500`;
}

/** Normalise messy WP category names to clean display names */
function normalizeCategory(raw: string): string {
  const c = raw.toLowerCase();
  // AI family
  if (c === "artificial intelligence" || c === "the future of ai & crypto" || c === "the future of ai &amp; crypto" || c === "ai in crypto" || c === "deep learning" || c === "machine learning" || c === "ai ethics") return "AI News";
  // DeFi (including typos)
  if (c.includes("decentar") || c.includes("decentrai") || c === "defi" || c === "decentralised finance" || c === "decentralized finance") return "DeFi & Stablecoins";
  // Crypto news family
  if (c === "cryptocurrency news" || c === "blockchain & cryptocurrency" || c === "blockchain &amp; cryptocurrency" || c === "blockchain technology" || c === "cryptocurrency trading" || c === "altcoins" || c === "airdrops" || c === "meme tokens" || c === "web3" || c === "blockchain gaming") return "Crypto News";
  // Generic crypto buckets — display as plain Crypto, NOT Guides (news lives here too)
  if (c === "cryptocurrencies" || c === "crypto") return "Crypto";
  // Crypto guides — only genuinely educational buckets
  if (c === "learn" || c === "guides") return "Crypto Guides";
  // Tax
  if (c.includes("crypto tax") || c === "crypto tax software comparison") return "UK Crypto Tax";
  // Wallets
  if (c === "wallets" || c === "wallet reviews") return "Wallet Safety";
  // Exchanges
  if (c === "exchanges") return "Exchange Reviews";
  // Bitcoin
  if (c === "bitcoin mining") return "Bitcoin";
  // Regulations
  if (c === "regulations") return "Crypto News";
  // Keep clean ones as-is
  return raw;
}

/** Guess a display category from slug/title when WP categories are empty */
function inferCategory(slug: string, title: string): string {
  const t = (slug + " " + title).toLowerCase();
  if (/xrp|ripple/.test(t)) return "XRP & Ripple";
  if (/bitcoin|btc|satoshi|sats/.test(t)) return "Bitcoin";
  if (/ethereum|eth\b/.test(t)) return "Ethereum";
  if (/defi|decentrali[sz]|liquidity|yield|uniswap|aave/.test(t)) return "DeFi";
  if (/crypto|blockchain|altcoin|token|coin|wallet|exchange|binance|coinbase|kraken/.test(t)) return "Crypto";
  if (/ai\b|artificial intelligence|chatgpt|openai|claude|gemini|llm|machine learning/.test(t)) return "AI";
  if (/review/.test(t)) return "Reviews";
  if (/news|breaking|alert/.test(t)) return "News";
  return "Crypto & AI";
}

// Generic bucket categories that say nothing about the article's topic.
// Prefer a more specific sibling category; fall back to inferring from the title.
const GENERIC_CATS = new Set(["crypto", "cryptocurrencies", "uncategorized", "blog", "news"]);

function wpToArticle(post: WPPost, categories: Record<number, string>): Article {
  const rawExcerpt = decodeHtmlEntities(stripHtml(post.excerpt?.rendered || "")).slice(0, 160);
  const catNames = (post.categories || []).map((id) => categories[id]).filter(Boolean);
  const wpCategory =
    catNames.find((n) => !GENERIC_CATS.has(n.toLowerCase())) || catNames[0] || null;
  const rawCategory =
    wpCategory && !GENERIC_CATS.has(wpCategory.toLowerCase())
      ? wpCategory
      : inferCategory(post.slug, post.title?.rendered || "");
  const category = normalizeCategory(rawCategory);
  const rawImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  // WP Snippet 5 rewrites image URLs to www.digitechlifestyle.com (SSL broken on www).
  // Rewrite to non-www — wp-content/uploads is symlinked from static site to WP uploads dir.
  const wpImage = rawImage?.replace(
    "https://www.digitechlifestyle.com",
    "https://digitechlifestyle.com"
  );
  const image = wpImage || getFallbackImage(post.slug);
  return {
    slug: post.slug,
    title: decodeHtmlEntities(post.title.rendered),
    description: rawExcerpt || site.description,
    category,
    date: post.date.slice(0, 10),
    updated: (post.modified || post.date).slice(0, 10),
    author: "Joe Robertson",
    readingTime: post.content?.rendered
      ? estimateReadingTime(post.content.rendered)
      : readingTimeFromSlug(post.slug),
    featured: post.sticky || false,
    content: post.content?.rendered || "",
    image,
  };
}

// Fetch a single page of posts (listings — no content, lighter payload)
async function fetchPage(page: number): Promise<{ posts: WPPost[]; totalPages: number }> {
  const res = await fetchWithRetry(
    `${WP_API}/posts?per_page=100&page=${page}&status=publish&_embed=wp:featuredmedia&_fields=slug,title,excerpt,date,categories,sticky,_links,_embedded`,
    { cache: "force-cache" }
  );
  if (!res.ok) return { posts: [], totalPages: 1 };
  const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "1", 10);
  const posts: WPPost[] = await res.json();
  return { posts, totalPages };
}

export async function getArticles(): Promise<Article[]> {
  try {
    const categories = await getCategories();

    // Fetch page 1 to discover total pages
    const { posts: firstPage, totalPages } = await fetchPage(1);

    // Fetch remaining pages in parallel
    const remainingPages = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    const remainingResults = await Promise.all(remainingPages.map((p) => fetchPage(p)));

    const allPosts = [
      ...firstPage,
      ...remainingResults.flatMap((r) => r.posts),
    ];

    return allPosts
      .map((p) => wpToArticle(p, categories))
      .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
  } catch {
    return [];
  }
}

export async function getArticle(slug: string): Promise<Article | undefined> {
  try {
    const [postsRes, categories] = await Promise.all([
      fetchWithRetry(
        `${WP_API}/posts?slug=${encodeURIComponent(slug)}&status=publish&_embed=wp:featuredmedia`,
        { cache: "force-cache" }
      ),
      getCategories(),
    ]);
    if (!postsRes.ok) return undefined;
    const posts: WPPost[] = await postsRes.json();
    if (!posts.length) return undefined;
    return wpToArticle(posts[0], categories);
  } catch {
    return undefined;
  }
}

// WordPress content is already HTML — return as-is.
export function markdownToHtml(content: string): string {
  return content;
}
