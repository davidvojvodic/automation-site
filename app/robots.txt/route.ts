import { NextResponse } from 'next/server';

/**
 * Enhanced Robots.txt Generation for SEO
 *
 * Generates an optimized robots.txt file that:
 * - Allows search engine crawling of important content
 * - Blocks AI training bots and unwanted crawlers
 * - Includes sitemap reference for better indexing
 * - Optimizes crawl budget and frequency
 * - Supports international SEO best practices
 */

export async function GET(): Promise<NextResponse> {
  try {
    const baseUrl = 'https://flowko.io';

    // Generate robots.txt content
    const robotsContent = `# Robots.txt for Flowko - AI Business Process Automation
# Updated: ${new Date().toISOString().split('T')[0]}

# Main search engines - Allow all important content
User-agent: Googlebot
Allow: /
Allow: /en/
Allow: /sl/
Allow: /assets/
Allow: /*.css
Allow: /*.js
Allow: /*.png
Allow: /*.jpg
Allow: /*.jpeg
Allow: /*.webp
Allow: /*.svg
Allow: /*.ico
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*fbclid*
Disallow: /*?*gclid*
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Allow: /en/
Allow: /sl/
Allow: /assets/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*.json$
Crawl-delay: 2

User-agent: Slurp
Allow: /
Allow: /en/
Allow: /sl/
Allow: /assets/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*.json$
Crawl-delay: 3

User-agent: DuckDuckBot
Allow: /
Allow: /en/
Allow: /sl/
Allow: /assets/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*.json$
Crawl-delay: 2

# Yandex for potential Central/Eastern European reach
User-agent: YandexBot
Allow: /
Allow: /en/
Allow: /sl/
Allow: /assets/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*.json$
Crawl-delay: 3

# Social media crawlers for rich snippets
User-agent: facebookexternalhit
Allow: /
Allow: /assets/

User-agent: Twitterbot
Allow: /
Allow: /assets/

User-agent: LinkedInBot
Allow: /
Allow: /assets/

User-agent: WhatsApp
Allow: /
Allow: /assets/

# Block AI training bots to protect content
User-agent: GPTBot
Disallow: /

User-agent: ChatGPT-User
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: anthropic-ai
Disallow: /

User-agent: Claude-Web
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: PerplexityBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Meta-ExternalAgent
Disallow: /

# Block malicious and unwanted bots
User-agent: SemrushBot
Disallow: /

User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /

User-agent: DotBot
Disallow: /

User-agent: 008
Disallow: /

User-agent: 360Spider
Disallow: /

User-agent: archive.org_bot
Disallow: /

User-agent: CazoodleBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: DataForSeoBot
Disallow: /

User-agent: Exabot
Disallow: /

User-agent: FatBot
Disallow: /

User-agent: ia_archiver
Disallow: /

User-agent: MSIECrawler
Disallow: /

User-agent: PaperLiBot
Disallow: /

User-agent: ScoutJet
Disallow: /

User-agent: SnapBot
Disallow: /

User-agent: SurveyBot
Disallow: /

User-agent: TurnitinBot
Disallow: /

User-agent: Wayback
Disallow: /

User-agent: WBSearchBot
Disallow: /

User-agent: WebReaper
Disallow: /

User-agent: WebStripper
Disallow: /

User-agent: WebZip
Disallow: /

User-agent: Widow
Disallow: /

User-agent: WWWOFFLE
Disallow: /

User-agent: Xenu
Disallow: /

User-agent: ZyBorg
Disallow: /

# Generic fallback for other bots
User-agent: *
Allow: /
Allow: /en/
Allow: /sl/
Allow: /assets/
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /*.json$
Disallow: /*?*utm_*
Disallow: /*?*fbclid*
Disallow: /*?*gclid*
Disallow: /*?*ref=*
Disallow: /*?*source=*
Disallow: /tmp/
Disallow: /backup/
Disallow: /test/
Disallow: /staging/
Crawl-delay: 5

# Sitemap location for search engines
Sitemap: ${baseUrl}/sitemap.xml

# Host declaration for SEO
Host: ${baseUrl}

# Clean URLs preferred
# This helps search engines understand canonical structure
# for our single-page application with anchors

# Priority sections for crawlers
# Main sections: #ai-services, #pricing, #implementation, #contact
# These are important for single-page SEO strategy`;

    return new NextResponse(robotsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200', // 24h cache, 12h stale
        'X-Robots-Tag': 'noindex', // Robots.txt should not be indexed itself
      },
    });

  } catch (error) {
    console.error('Error generating robots.txt:', error);

    // Fallback robots.txt in case of error
    const fallbackRobots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Sitemap: https://flowko.io/sitemap.xml`;

    return new NextResponse(fallbackRobots, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Handle HEAD requests for robots.txt validation
export async function HEAD(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}