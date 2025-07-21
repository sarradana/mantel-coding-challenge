/**
 * BaseIpAnalyzer class to analyze IP addresses from log entries.
 */
class BaseIpAnalyzer {
  constructor() {
    this.ipCounts = new Map();
  }

  process(log) {
    // Process each log entry to count IP occurrences
    if (log?.ip) {
      this.ipCounts.set(log.ip, (this.ipCounts.get(log.ip) || 0) + 1);
    }
  }

  report() {
    // Report the top 3 most active IP addresses
    return this.ipCounts
  }

  logReport() {
    // Log the top 3 most active IP addresses to the console
    const topIps = this.report();
    console.log('all IP Addresses:', topIps);
  }
}

export default BaseIpAnalyzer;
