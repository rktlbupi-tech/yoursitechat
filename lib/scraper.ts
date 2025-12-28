import * as cheerio from 'cheerio';

export interface ScrapeResult {
    url: string;
    title: string;
    description: string;
    extractedTextSnippet: string;
    fullTrainingDataLength: number;
    visitedPages: string[];
    contacts: {
        emails: string[];
        phones: string[];
    };
    rawText: string;
}

async function scrapeSinglePage(url: string) {
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            },
            signal: AbortSignal.timeout(5000)
        });

        if (!res.ok) return { text: '', links: [], title: '', emails: [], phones: [], description: '' };

        const html = await res.text();
        const $ = cheerio.load(html);

        // Remove noise
        $('script, style, noscript, iframe, svg, header, footer, nav, button, form').remove();

        const title = $('title').text().trim();
        const description = $('meta[name="description"]').attr('content') || '';
        
        // Extract meaningful text
        let textPoints: string[] = [];
        $('p, h1, h2, h3, h4, li, article, section, div.content, .text').each((_, el) => {
            const text = $(el).text().replace(/\s+/g, ' ').trim();
            if (text.length > 15 || text.includes('@') || text.match(/\d{3}/)) {
                 if (!textPoints.includes(text)) {
                     textPoints.push(text);
                 }
            }
        });

        const textContent = textPoints.join('\n');
        
        // Regex for contacts
        // Improved email regex to be slightly stricter to avoid garbage
        const emails = textContent.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [];
        const phones = textContent.match(/(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g) || [];

        // Internal links
        const links: string[] = [];
        $('a').each((_, el) => {
            const href = $(el).attr('href');
            if (href) links.push(href);
        });

        return { 
            text: textContent, 
            links,
            title,
            description,
            emails: [...new Set(emails)],
            phones: [...new Set(phones)]
        };
    } catch (e) {
        console.error(`Error scraping ${url}:`, e);
        return { text: '', links: [], title: '', emails: [], phones: [], description: '' };
    }
}

function resolveUrl(base: string, relative: string) {
    try {
        return new URL(relative, base).href;
    } catch {
        return null;
    }
}

export async function scrapeWebsite(rootUrl: string): Promise<ScrapeResult> {
    // 1. Scrape Root
    const rootData = await scrapeSinglePage(rootUrl);
    
    // 2. Identify sub-pages
    const keywords = ['about', 'contact', 'story', 'mission', 'team', 'service', 'project', 'product', 'pricing', 'faq'];
    const candidateUrls = new Set<string>();
    
    rootData.links.forEach(link => {
        const fullUrl = resolveUrl(rootUrl, link);
        if (fullUrl) {
            try {
                const urlObj = new URL(fullUrl);
                const rootObj = new URL(rootUrl);
                if (urlObj.hostname === rootObj.hostname && urlObj.pathname !== rootObj.pathname && urlObj.pathname.length > 1) {
                    const lowerPath = urlObj.pathname.toLowerCase();
                    if (keywords.some(k => lowerPath.includes(k))) {
                        candidateUrls.add(fullUrl);
                    }
                }
            } catch {}
        }
    });

    const pagesToScrape = Array.from(candidateUrls).slice(0, 3);
    const extraPagesData = await Promise.all(pagesToScrape.map(url => scrapeSinglePage(url)));
    
    // 3. Aggregate
    let aggregatedText = `SOURCE: ${rootUrl} (Home)\nTITLE: ${rootData.title}\nDESCRIPTION: ${rootData.description}\n\n${rootData.text}\n\n`;
    const allEmails = new Set<string>(rootData.emails || []);
    const allPhones = new Set<string>(rootData.phones || []);

    extraPagesData.forEach((data, i) => {
        const pageUrl = pagesToScrape[i];
        
        if (data.emails) data.emails.forEach(e => allEmails.add(e));
        if (data.phones) data.phones.forEach(p => allPhones.add(p));

        if (data.text.length > 50) { 
            let sectionHeader = `--- SOURCE: ${pageUrl} ---`;
            const lowerUrl = pageUrl.toLowerCase();
            
            // Explicit Section labeling
            if (lowerUrl.includes('contact')) sectionHeader = `\n=====================\nCONTACT INFORMATION (${pageUrl})\n=====================\n`;
            else if (lowerUrl.includes('service')) sectionHeader = `\n=====================\nSERVICES (${pageUrl})\n=====================\n`;
            else if (lowerUrl.includes('about')) sectionHeader = `\n=====================\nABOUT US / STORY (${pageUrl})\n=====================\n`;
            else if (lowerUrl.includes('project') || lowerUrl.includes('portfolio')) sectionHeader = `\n=====================\nPROJECTS / WORKS (${pageUrl})\n=====================\n`;
            else if (lowerUrl.includes('pricing')) sectionHeader = `\n=====================\nPRICING (${pageUrl})\n=====================\n`;
            
            aggregatedText += `${sectionHeader}\n${data.text}\n\n`;
        }
    });

    return {
        url: rootUrl,
        title: rootData.title,
        description: rootData.description,
        extractedTextSnippet: aggregatedText.slice(0, 800) + '... (truncated)',
        fullTrainingDataLength: aggregatedText.length,
        visitedPages: [rootUrl, ...pagesToScrape],
        contacts: {
            emails: Array.from(allEmails),
            phones: Array.from(allPhones)
        },
        rawText: aggregatedText
    };
}
