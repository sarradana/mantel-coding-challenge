import { describe, it, expect, vi } from 'vitest';
import UniqueIpsAnalyzer from './uniqueIpsAnalyzer.js';

describe('UniqueIpsAnalyzer', () => {
  const mockLogs = [
    { ip: '192.168.1.1' },
    { ip: '192.168.1.1' },
    { ip: '192.168.1.2' },
    { ip: '192.168.1.2' },
    { ip: '192.168.1.3' },
    { ip: '192.168.1.4' },
  ];

  it('should correctly count and list unique IPs', () => {
    const analyzer = new UniqueIpsAnalyzer();

    // Process logs
    mockLogs.forEach((log) => analyzer.process(log));

    // Verify the output
    const result = analyzer.report();
    expect(result).toEqual({
      count: 4,
      ips: ['192.168.1.1', '192.168.1.2', '192.168.1.3', '192.168.1.4'],
    });
  });

  it('should log the count and list of unique IPs', () => {
    const analyzer = new UniqueIpsAnalyzer();

    // Process logs
    mockLogs.forEach((log) => analyzer.process(log));

    // Spy on console.log
    const consoleSpy = vi.spyOn(console, 'log');
    analyzer.logReport();

    // Verify the console output
    expect(consoleSpy).toHaveBeenCalledWith(
      'Unique IPs Logged In: 4 (192.168.1.1, 192.168.1.2, 192.168.1.3, 192.168.1.4)'
    );

    consoleSpy.mockRestore();
  });
});
