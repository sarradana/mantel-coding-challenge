import { describe, it, expect, vi } from 'vitest';
import MostActiveIpsAnalyzer from './mostActiveIpsAnalyzer';

const mockLogs = [
  { ip: '192.168.1.1' },
  { ip: '192.168.1.1' },
  { ip: '192.168.1.1' },
  { ip: '192.168.1.2' },
  { ip: '192.168.1.2' },
  { ip: '192.168.1.3' },
  { ip: '192.168.1.4' },
];

describe('MostActiveIpsAnalyzer', () => {
  it('should correctly identify the top 3 most active IP addresses', () => {
    const analyzer = new MostActiveIpsAnalyzer();

    // Process logs
    mockLogs.forEach((log) => analyzer.process(log));

    // Verify the output
    const result = analyzer.report();
    expect(result).toEqual([
      { ip: '192.168.1.1', count: 3 },
      { ip: '192.168.1.2', count: 2 },
      { ip: '192.168.1.3', count: 1 },
    ]);
  });

  it('should log the top 3 most active IP addresses', () => {
    const analyzer = new MostActiveIpsAnalyzer();

    // Process logs
    mockLogs.forEach((log) => analyzer.process(log));

    // Spy on console.log
    const consoleSpy = vi.spyOn(console, 'log');
    analyzer.logReport();

    // Verify the console output
    expect(consoleSpy).toHaveBeenCalledWith('Top 3 Most Active IP Addresses:');
    expect(consoleSpy).toHaveBeenCalledWith('- 192.168.1.1: 3 requests');
    expect(consoleSpy).toHaveBeenCalledWith('- 192.168.1.2: 2 requests');
    expect(consoleSpy).toHaveBeenCalledWith('- 192.168.1.3: 1 requests');

    consoleSpy.mockRestore();
  });
});
