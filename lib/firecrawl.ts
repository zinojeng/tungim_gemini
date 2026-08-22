export class FirecrawlClient {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    async scrape(url: string) {
        console.log(`[Firecrawl] Scraping ${url}...`);
        // Mock response
        return {
            title: "Mock Scraped Title",
            content: "Mock scraped content...",
            links: ["https://example.com/lecture1", "https://example.com/lecture2"]
        };
    }

    async crawl(url: string) {
        console.log(`[Firecrawl] Crawling ${url}...`);
        return {
            jobId: "mock-job-id",
            status: "active"
        };
    }
}

export const firecrawl = new FirecrawlClient(process.env.FIRECRAWL_API_KEY || 'mock-key');
