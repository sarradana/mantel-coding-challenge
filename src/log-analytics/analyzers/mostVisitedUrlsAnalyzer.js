class MostVisitedUrlsAnalyzer {
    constructor() {
        this.urls = new Map();
    }

    process(log) {
      // process each log entry to extract unique IPs
        if (log?.url) {
            this.urls.set(log.url, this.urls.get(log.url) + 1 || 1);
        }
    }

    report() {
        // Report the top 3 most visited URLs
        const sortedUrls = [...this.urls.entries()].sort((a, b) => b[1] - a[1]);
        const topUrls = sortedUrls.slice(0, 3);
        return topUrls.map(([url, count]) => ({ url, count }));
    }

    logReport() {
        // Log the top 3 most visited URLs to the console
        const topUrls = this.report();
        console.log('Top 3 Most Visited URLs:');
        topUrls.forEach(({ url, count }) => {
            console.log(`- ${url}: ${count} visits`);
        });
    }
}

export default MostVisitedUrlsAnalyzer;
