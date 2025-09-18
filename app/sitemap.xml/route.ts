import { NextResponse } from 'next/server';

/**
 * Dynamic XML Sitemap Generation for SEO
 *
 * Generates a comprehensive sitemap.xml that includes:
 * - Both English and Slovenian locales
 * - Section anchors for single-page architecture
 * - Proper priority and change frequency settings
 * - Alternative language links for international SEO
 */

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternates?: {
    languages: Record<string, string>;
  };
}

function generateSitemapXML(entries: SitemapEntry[]): string {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">';
  const urlsetClose = '</urlset>';

  const urls = entries.map(entry => {
    const alternateLinks = entry.alternates?.languages
      ? Object.entries(entry.alternates.languages)
          .map(([lang, href]) => `    <xhtml:link rel="alternate" hreflang="${lang}" href="${href}" />`)
          .join('\n')
      : '';

    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastModified}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>${alternateLinks ? '\n' + alternateLinks : ''}
  </url>`;
  }).join('\n');

  return `${xmlHeader}\n${urlsetOpen}\n${urls}\n${urlsetClose}`;
}

export async function GET(): Promise<NextResponse> {
  try {
    const baseUrl = 'https://flowko.io';
    const currentDate = new Date().toISOString();

    // Main pages with full locale support
    const mainPages: SitemapEntry[] = [
      {
        url: baseUrl,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1.0,
        alternates: {
          languages: {
            'en': `${baseUrl}/en`,
            'sl': `${baseUrl}/sl`,
            'x-default': `${baseUrl}/en`,
          },
        },
      },
      {
        url: `${baseUrl}/en`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1.0,
        alternates: {
          languages: {
            'en': `${baseUrl}/en`,
            'sl': `${baseUrl}/sl`,
          },
        },
      },
      {
        url: `${baseUrl}/sl`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1.0,
        alternates: {
          languages: {
            'en': `${baseUrl}/en`,
            'sl': `${baseUrl}/sl`,
          },
        },
      },
    ];

    // Section anchors for single-page architecture
    const sectionAnchors = ['ai-services', 'pricing', 'implementation', 'contact'];
    const sectionPages: SitemapEntry[] = [];

    ['en', 'sl'].forEach(locale => {
      const localeBase = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

      sectionAnchors.forEach(anchor => {
        sectionPages.push({
          url: `${localeBase}#${anchor}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.8,
          alternates: {
            languages: {
              'en': locale === 'en' ? `${baseUrl}#${anchor}` : `${baseUrl}/en#${anchor}`,
              'sl': `${baseUrl}/sl#${anchor}`,
            },
          },
        });
      });
    });

    // Legal and policy pages
    const legalPages: SitemapEntry[] = [];
    const legalPaths = ['privacy', 'terms', 'legal', 'cookies'];

    legalPaths.forEach(path => {
      ['en', 'sl'].forEach(locale => {
        const localeBase = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;

        legalPages.push({
          url: `${localeBase}/${path}`,
          lastModified: currentDate,
          changeFrequency: path === 'cookies' ? 'monthly' : 'yearly',
          priority: path === 'privacy' ? 0.4 : 0.3,
          alternates: {
            languages: {
              'en': locale === 'en' ? `${baseUrl}/${path}` : `${baseUrl}/en/${path}`,
              'sl': `${baseUrl}/sl/${path}`,
            },
          },
        });
      });
    });

    // Additional SEO-focused pages for Slovenia market - removed to fix 404 errors
    const seoPages: SitemapEntry[] = [];

    // Combine all entries
    const allEntries = [
      ...mainPages,
      ...sectionPages,
      ...legalPages,
      ...seoPages,
    ];

    // Generate XML sitemap
    const sitemapXML = generateSitemapXML(allEntries);

    // Return XML response with proper headers
    return new NextResponse(sitemapXML, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, stale-while-revalidate=43200', // 24h cache, 12h stale
        'X-Robots-Tag': 'index, follow',
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);

    return new NextResponse('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  }
}

// Handle HEAD requests for sitemap validation
export async function HEAD(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}