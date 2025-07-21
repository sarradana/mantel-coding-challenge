/**
 * Parses individual log lines to extract relevant fields.
 * Extracts fields such as IP address, URL, and user information.
 * Handles log lines with extra fields gracefully by focusing on required data.
 */

class LogParser {
  parse(line) {
    // Updated regex to ignore extra fields at the end of the log line
    const logRegex = /^(\d{1,3}(?:\.\d{1,3}){3})\s+-\s+(\S+)\s+\[([^\]]+)\]\s+"([A-Z]+)\s+([^\s]+)\s+HTTP\/[\d.]+"\s+(\d{3})\s+(\d+)\s+".*?"\s+".*?".*$/;
    const match = line.match(logRegex);

    if (!match) {
      return null; // Skip lines that do not match the expected format
    }

    // Split the log line by spaces
    const parts = line.split(' ');
    const ip = parts[0];
    const url = parts[6];

    return {
      ip,
      url,
    };
  }
}

export default LogParser;
