import BaseIpAnalyzer from "./baseIpAnalyzer.js";

/**
 * Analyzer to identify the top 3 most active IP addresses from log data.
 * Processes log entries to count occurrences of each IP address.
 * Provides methods to retrieve and log the top 3 most active IPs.
 */
class MostActiveIpsAnalyzer extends BaseIpAnalyzer {
    constructor() {
        super();
    }

    report() {
        // Report the top 3 most active IP addresses
        const sortedIps = [...this.ipCounts.entries()].sort((a, b) => b[1] - a[1]);
        const topIps = sortedIps.slice(0, 3);
        return topIps.map(([ip, count]) => ({ ip, count }));
    }

    logReport() {
        // Log the top 3 most active IP addresses to the console
        const topIps = this.report();
        console.log('Top 3 Most Active IP Addresses:');
        topIps.forEach(({ ip, count }) => {
            console.log(`- ${ip}: ${count} requests`);
        });
    }
}

export default MostActiveIpsAnalyzer;
