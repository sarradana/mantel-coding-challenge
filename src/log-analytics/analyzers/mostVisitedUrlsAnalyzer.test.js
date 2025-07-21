import { describe, it, expect, vi } from 'vitest';
import MostVisitedUrlsAnalyzer from './mostVisitedUrlsAnalyzer';

describe('MostVisitedUrlsAnalyzer', () => {
  const mockLogs = [
    { url: '/home' },
    { url: '/home' },
    { url: '/home' },
    { url: '/about' },
    { url: '/about' },
    { url: '/contact' },
    { url: '/blog' },
  ];

  it('should correctly identify the top 3 most visited URLs', () => {
    const analyzer = new MostVisitedUrlsAnalyzer();

    // Process logs
    mockLogs.forEach((log) => analyzer.process(log));

    // Verify the output
    const result = analyzer.report();
    expect(result).toEqual([
      { url: '/home', count: 3 },
      { url: '/about', count: 2 },
      { url: '/contact', count: 1 },
    ]);
  });

  it('should log the top 3 most visited URLs', () => {
    const analyzer = new MostVisitedUrlsAnalyzer();

    // Process logs
    mockLogs.forEach((log) => analyzer.process(log));

    // Spy on console.log
    const consoleSpy = vi.spyOn(console, 'log');
    analyzer.logReport();

    // Verify the console output
    expect(consoleSpy).toHaveBeenCalledWith('Top 3 Most Visited URLs:');
    expect(consoleSpy).toHaveBeenCalledWith('- /home: 3 visits');
    expect(consoleSpy).toHaveBeenCalledWith('- /about: 2 visits');
    expect(consoleSpy).toHaveBeenCalledWith('- /contact: 1 visits');

    consoleSpy.mockRestore();
  });
});
