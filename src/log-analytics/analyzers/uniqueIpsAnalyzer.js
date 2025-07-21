/**
 * Analyzer to track unique IP addresses from log data.
 * Processes log entries to identify and count unique IPs.
 * Provides methods to retrieve and log the count and list of unique IPs.
 */
class UniqueIpsAnalyzer {
    constructor() {
        this.ips = new Set();
    }

    process(log) {
      // process each log entry to extract unique IPs
        if (log?.ip) {
            this.ips.add(log.ip);
        }
    }

    report() {
        // Return the count and list of unique IPs
        return {
            count: this.ips.size,
            ips: [...this.ips],
        };
    }

    logReport() {
        // Log the count and list of unique IPs to the console
        const { count, ips } = this.report();
        console.log(`Unique IPs Logged In: ${count} (${ips.join(', ')})`);
    }
}

export default UniqueIpsAnalyzer;
