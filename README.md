This is a simple log analyzer that reads logs from a file, parses them, and analyzes them using different analyzers. The code is designed to be extensible and follows good software design principles.

## File Format
The log files are expected to follow a specific format, similar to the example below:
```
177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0"
```
### Fields in the Log File:
- **IP Address**: The first field represents the IP address of the client making the request (e.g., `177.71.128.21`).
- **User Identifier**: The second field is typically a placeholder (`-`) or a user identifier (e.g., `admin`).
- **Timestamp**: The third field, enclosed in square brackets, represents the date and time of the request (e.g., `[10/Jul/2018:22:21:28 +0200]`).
- **Request**: The fourth field, enclosed in double quotes, contains the HTTP method, URL, and protocol (e.g., `"GET /intranet-analytics/ HTTP/1.1"`).
- **Status Code**: The fifth field is the HTTP status code returned by the server (e.g., `200`).
- **Size**: The sixth field represents the size of the response in bytes (e.g., `3574`).
- **Referer and User Agent**: The remaining fields, enclosed in double quotes, represent the referer and user agent strings.

### Handling Variations
- **Extra Junk**: Some logs may include extra fields or "junk" at the end. The parser is designed to ignore these extra fields and focus on the required data.
- **Invalid Logs**: Logs that do not match the expected format are skipped during processing.

## How It Works
1. **LogReader**: Reads the log file line by line using an asynchronous generator. This ensures efficient memory usage, even for large files.
2. **LogParser**: Parses each log line to extract relevant fields such as IP address, URL, and timestamp. It handles variations in the log format gracefully.
3. **Analyzers**: Processes the parsed logs to generate insights. The following analyzers are included:
   - **MostActiveIpsAnalyzer**: Identifies the top 3 most active IP addresses.
   - **MostVisitedUrlsAnalyzer**: Identifies the top 3 most visited URLs.
   - **UniqueIpsAnalyzer**: Tracks and counts unique IP addresses.
4. **AnalyticsEngine**: Orchestrates the entire process by combining the reader, parser, and analyzers. It processes each log line, passes it through the parser, and feeds the parsed data to the analyzers.

The results are printed to the console and can be used to create dashboards or reports.

# Usage
To run the analyzer for the default log file, you can use the following command from the root directory of the project:
```bash
 node src/log-analytics/index.js
```

# Assumptions
- All logs follow the same format as the provided sample.
- Some logs include extra “junk” at the end. I’m assuming the logs aren’t always clean, so I’ve updated the regex to ignore that junk and still parse the log correctly.
- If multiple IPs or URLs have the same number of hits, the first one is returned.	
- Some URLs include the domain name while others do not. I’m assuming these are considered different URLs.

# Log Analysis Design
- **Composition Design Principle**: The analyzers, reader, and parser are pluggable, making it easy to extend the system with more analyzers (e.g., `ErrorFrequencyAnalyzer`).
- **Strategy Design Pattern**: Supports multiple analyzers (e.g., `TopIpAnalyzer`, `TopUrlAnalyzer`) by allowing them to be swapped or added dynamically at runtime.
- **Single Responsibility Principle**: Each component (`Reader`, `Parser`, `Analyzer`, `Engine`) has a single responsibility, ensuring modularity and maintainability.
- **Extensibility**: The system is designed to support future enhancements, such as:
   - Swapping input sources (e.g., file, network, etc.)
   - Supporting different log formats by adding new parsers
   - Outputting results in various formats (e.g., JSON, CSV) by implementing pluggable output handlers

# Future Improvements
- Add typing to the code to improve readability and maintainability.
- When multiple IPs or URLs have the same number of hits, return all of them, not just the first.
- Make the Analyzer customizable. For example, allow users to specify how many top items to return.
- Update the parser to extract all fields from each log entry (e.g., status code, date). Although regex can be used to extract all values, the current implementation keeps things simple and focused on just the IP and URL fields to maintain readability.
- Update the logReader to accept a list of files to read from, allowing the user to specify multiple log files for analysis.
- Add a LogParserFactory to create and return the appropriate parser based on the given log format.
- Add result visualizations, such as charts and graphs. This is straightforward as the analyzers return results in a consistent format.
- Add additional analyzers, such as an ErrorFrequencyAnalyzer.
- Add CLI options to specify the log file path, log format, and analyzer settings.
- Add a configuration file to specify the log file path, log format, and analyzer settings.
- Add more unit/e2e tests to ensure the correctness of the code and its components.
