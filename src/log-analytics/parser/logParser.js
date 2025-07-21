/**
 * Parses individual log lines to extract relevant fields.
 * Extracts fields such as IP address, URL, and user information.
 * Handles log lines with extra fields gracefully by focusing on required data.
 */

class LogParser {
  parse(line) {
    // Updated regex for better readability
    const logRegex = new RegExp(
      `^(?<ip>\\d{1,3}(?:\\.\\d{1,3}){3})\\s+-\\s+(?<user>\\S+)\\s+` + // IP and user identifier
      `\\[(?<date>[^\\]]+)\\]\\s+"(?<method>[A-Z]+)\\s+(?<url>[^\\s]+)\\s+HTTP/[\\d.]+"\\s+` + // Date, method, and URL
      `(?<status>\\d{3})\\s+(?<size>\\d+)\\s+".*?"\\s+".*?".*$` // Status, size, and extra fields
    );
    const match = line.match(logRegex);

    if (!match) {
      console.warn(`Skipping line due to format mismatch: ${line}`);
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
