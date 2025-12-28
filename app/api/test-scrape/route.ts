import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

async function scrapeSinglePage(url: string) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            },
            signal: AbortSignal.timeout(5000) // 5 second timeout per page
        });

        if (!res.ok) return { text: '', links: [], title: '' };

        const html = await res.text();
        const $ = cheerio.load(html);

        // Remove scripts, styles, and other noise
        $('script, style, noscript, iframe, svg, header, footer, nav, button, form').remove();

        const title = $('title').text().trim();
        
        // Extract meaningful text
        let textPoints: string[] = [];
        
        // Strategy: Get text from standard block elements
        $('p, h1, h2, h3, h4, li, article, section, div.content, .text').each((_, el) => {
            const text = $(el).text().replace(/\s+/g, ' ').trim();
            // Relaxed length filter to 10 chars to catch addresses/emails/short facts
            // Also explicitly allow anything that looks like an email or phone
            if (text.length > 20 || text.includes('@') || text.match(/\d{3}/)) {
                 // Avoid duplicating exact strings
                 if (!textPoints.includes(text)) {
                     textPoints.push(text);
                 }
            }
        });

        // Extract internal links
        const links: string[] = [];
        $('a').each((_, el) => {
            const href = $(el).attr('href');
            if (href) {
                links.push(href);
            }
        });

        // Extract emails and phones using regex
        const textContent = textPoints.join('\n');
        const emails = textContent.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g) || [];
        const phones = textContent.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];

        return { 
            text: textPoints.join('\n'), 
            links,
            title,
            emails: [...new Set(emails)], // Unique
            phones: [...new Set(phones)]  // Unique
        };
    } catch (e) {
        console.error(`Error scraping ${url}:`, e);
        return { text: '', links: [], title: '', emails: [], phones: [] };
    }
}

function resolveUrl(base: string, relative: string) {
    try {
        return new URL(relative, base).href;
    } catch {
        return null;
    }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rootUrl = searchParams.get('url');

  if (!rootUrl) {
    return NextResponse.json({ error: 'Please provide a url parameter' }, { status: 400 });
  }

  try {
    // 1. Scrape Root Page
    const rootData = await scrapeSinglePage(rootUrl);
    
    // 2. Identify relevant sub-pages to crawl
    // Keywords we care about for a business bot
    const keywords = ['about', 'contact', 'story', 'mission', 'team', 'service', 'project', 'product', 'pricing', 'faq'];
    
    const candidateUrls = new Set<string>();
    
    rootData.links.forEach(link => {
        const fullUrl = resolveUrl(rootUrl, link);
        if (fullUrl) {
            const urlObj = new URL(fullUrl);
            const rootObj = new URL(rootUrl);
            
            // Must be same hostname
            if (urlObj.hostname === rootObj.hostname) {
                // Must not be the root page itself
                if (urlObj.pathname !== rootObj.pathname && urlObj.pathname.length > 1) {
                    // Check for keywords in the path
                    const lowerPath = urlObj.pathname.toLowerCase();
                    if (keywords.some(k => lowerPath.includes(k))) {
                        candidateUrls.add(fullUrl);
                    }
                }
            }
        }
    });

    // 3. Select top 3 candidates to keep it fast
    const pagesToScrape = Array.from(candidateUrls).slice(0, 3);
    
    // 4. Scrape sub-pages in parallel
    const extraPagesData = await Promise.all(pagesToScrape.map(url => scrapeSinglePage(url)));
    
    // 5. Aggregate Data
    let aggregatedText = `SOURCE: ${rootUrl} (Home)\n${rootData.text}\n\n`;
    const allEmails = new Set<string>(rootData.emails || []);
    const allPhones = new Set<string>(rootData.phones || []);

    extraPagesData.forEach((data, i) => {
        const pageUrl = pagesToScrape[i];
        
        // Collect contacts
        if (data.emails) data.emails.forEach(e => allEmails.add(e));
        if (data.phones) data.phones.forEach(p => allPhones.add(p));

        if (data.text.length > 50) { 
            let sectionHeader = `--- SOURCE: ${pageUrl} ---`;
            
            // Highlight Contact Info specifically
            if (pageUrl.toLowerCase().includes('contact')) {
                sectionHeader = `\n=====================\nCONTACT INFORMATION (${pageUrl})\n=====================\n`;
            }
            
            aggregatedText += `${sectionHeader}\n${data.text}\n\n`;
        }
    });

    return NextResponse.json({
      success: true,
      data: {
        url: rootUrl,
        title: rootData.title,
        contacts: {
            emails: Array.from(allEmails),
            phones: Array.from(allPhones)
        },
        extractedTextSnippet: aggregatedText.slice(0, 800) + '... (truncated)',
        fullTrainingDataLength: aggregatedText.length,
        visitedPages: [rootUrl, ...pagesToScrape]
      }
    });

  } catch (error: any) {
    return NextResponse.json({ error: 'Scraping failed', details: error.message }, { status: 500 });
  }
}
