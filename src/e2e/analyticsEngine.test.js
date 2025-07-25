import { describe, it, expect, vi } from 'vitest';
import AnalyticsEngine from '../log-analytics/engine/analyticsEngine.js';
import LogReader from '../log-analytics/reader/logReader.js';
import LogParser from '../log-analytics/parser/logParser.js';
import MostActiveIpsAnalyzer from '../log-analytics/analyzers/ip/mostActiveIpsAnalyzer.js';
import MostVisitedUrlsAnalyzer from '../log-analytics/analyzers/url/mostVisitedUrlsAnalyzer.js';
import UniqueIpsAnalyzer from '../log-analytics/analyzers/ip/uniqueIpsAnalyzer.js';
import path from 'path';
import { fileURLToPath } from 'url';
import main from '../log-analytics/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('AnalyticsEngine E2E Test', () => {
  it('should process the log file and log correct analytics results', async () => {
    const consoleSpy = vi.spyOn(console, 'log');

    await main();

    // Validate console output for Most Active IPs
    expect(consoleSpy).toHaveBeenCalledWith('Top 3 Most Active IP Addresses:');
    expect(consoleSpy).toHaveBeenCalledWith('- 168.41.191.40: 4 requests');
    expect(consoleSpy).toHaveBeenCalledWith('- 177.71.128.21: 3 requests');
    expect(consoleSpy).toHaveBeenCalledWith('- 50.112.00.11: 3 requests');

    // Validate console output for Most Visited URLs
    expect(consoleSpy).toHaveBeenCalledWith('Top 3 Most Visited URLs:');
    expect(consoleSpy).toHaveBeenCalledWith('- /docs/manage-websites/: 2 visits');
    expect(consoleSpy).toHaveBeenCalledWith('- /intranet-analytics/: 1 visits');
    expect(consoleSpy).toHaveBeenCalledWith('- http://example.net/faq/: 1 visits');

    // Validate console output for Unique IPs
    expect(consoleSpy).toHaveBeenCalledWith('Unique IPs Logged In: 11 (177.71.128.21, 168.41.191.40, 168.41.191.41, 168.41.191.9, 168.41.191.34, 50.112.00.28, 50.112.00.11, 72.44.32.11, 72.44.32.10, 168.41.191.43, 79.125.00.21)');

    consoleSpy.mockRestore();
  });
  it('should process the log file and return correct analytics results', async () => {
    const logFilePath = path.resolve(
        __dirname,
        './mocks/programming-task-example-data.log'
    );
    const reader = new LogReader(logFilePath);
    const parser = new LogParser();
    const mostActiveIpsAnalyzer = new MostActiveIpsAnalyzer();
    const mostVisitedUrlsAnalyzer = new MostVisitedUrlsAnalyzer();
    const uniqueIpsAnalyzer = new UniqueIpsAnalyzer();

    const engine = new AnalyticsEngine(reader, parser, [
      mostActiveIpsAnalyzer,
      mostVisitedUrlsAnalyzer,
      uniqueIpsAnalyzer,
    ]);

    await engine.run();

    // Validate Most Active IPs
    const mostActiveIps = mostActiveIpsAnalyzer.report();
    expect(mostActiveIps).toEqual([
      { ip: '168.41.191.40', count: 4 },
      { ip: '177.71.128.21', count: 3 },
      { ip: '50.112.00.11', count: 3 },
    ]);

    // Validate Most Visited URLs
    const mostVisitedUrls = mostVisitedUrlsAnalyzer.report();
    expect(mostVisitedUrls).toEqual([
      { url: '/docs/manage-websites/', count: 2 },
      { url: '/intranet-analytics/', count: 1 },
      { url: 'http://example.net/faq/', count: 1 },
    ]);

    // Validate Unique IPs
    const uniqueIps = uniqueIpsAnalyzer.report();
    expect(uniqueIps).toEqual({
      count: 11,
      ips: [
        '177.71.128.21',
        '168.41.191.40',
        '168.41.191.41',
        '168.41.191.9',
        '168.41.191.34',
        '50.112.00.28',
        '50.112.00.11',
        '72.44.32.11',
        '72.44.32.10',
        '168.41.191.43',
        '79.125.00.21',
      ],
    });
  });
  it('should handle an empty log file gracefully', async () => {
    const logFilePath = path.resolve(__dirname, './mocks/empty-logs-file.log');
    const reader = new LogReader(logFilePath);
    const parser = new LogParser();
    const mostActiveIpsAnalyzer = new MostActiveIpsAnalyzer();
    const mostVisitedUrlsAnalyzer = new MostVisitedUrlsAnalyzer();
    const uniqueIpsAnalyzer = new UniqueIpsAnalyzer();

    const engine = new AnalyticsEngine(reader, parser, [
      mostActiveIpsAnalyzer,
      mostVisitedUrlsAnalyzer,
      uniqueIpsAnalyzer,
    ]);

    await engine.run();

    // Validate Most Active IPs
    expect(mostActiveIpsAnalyzer.report()).toEqual([]);

    // Validate Most Visited URLs
    expect(mostVisitedUrlsAnalyzer.report()).toEqual([]);

    // Validate Unique IPs
    expect(uniqueIpsAnalyzer.report()).toEqual({
      count: 0,
      ips: [],
    });
  });

  it('should handle a log file with invalid entries', async () => {
    const logFilePath = path.resolve(
      __dirname,
      './mocks/not-supported-log-file-format.log'
    );
    const reader = new LogReader(logFilePath);
    const parser = new LogParser();
    const mostActiveIpsAnalyzer = new MostActiveIpsAnalyzer();
    const mostVisitedUrlsAnalyzer = new MostVisitedUrlsAnalyzer();
    const uniqueIpsAnalyzer = new UniqueIpsAnalyzer();

    const engine = new AnalyticsEngine(reader, parser, [
      mostActiveIpsAnalyzer,
      mostVisitedUrlsAnalyzer,
      uniqueIpsAnalyzer,
    ]);

    await engine.run();

    // should return empty results for all analyzers
    expect(mostActiveIpsAnalyzer.report()).toEqual([]);
    expect(mostVisitedUrlsAnalyzer.report()).toEqual([]);
    expect(uniqueIpsAnalyzer.report()).toEqual({
      count: 0,
      ips: [],
    });
  });
});
