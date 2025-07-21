import BaseIpAnalyzer from "./baseIpAnalyzer.js";

/**
 * Analyzer to track unique IP addresses from log data.
 * Processes log entries to identify and count unique IPs.
 * Provides methods to retrieve and log the count and list of unique IPs.
 */
class UniqueIpsAnalyzer extends BaseIpAnalyzer {
    constructor() {
        super();
    }

    report() {
        // Return the count and list of unique IPs
        return {
            count: this.ipCounts.size,
            ips: [...this.ipCounts.keys()],
        };
    }

    logReport() {
        // Log the count and list of unique IPs to the console
        const { count, ips } = this.report();
        console.log(`Unique IPs Logged In: ${count} (${ips.join(', ')})`);
    }
}

export default UniqueIpsAnalyzer;
