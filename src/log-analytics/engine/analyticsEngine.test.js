import { describe, it, expect, vi } from 'vitest';
import AnalyticsEngine from './analyticsEngine';
import LogReader from '../reader/logReader';
import LogParser from '../parser/logParser';
import MostActiveIpsAnalyzer from '../analyzers/ip/mostActiveIpsAnalyzer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('AnalyticsEngine', () => {
  it('should process logs and invoke analyzers correctly', async () => {
    const logFilePath = path.resolve(
      __dirname,
      './mocks/programming-task-example-data.log'
    );
    const reader = new LogReader(logFilePath);
    const parser = new LogParser();
    const mostActiveIpsAnalyzer = new MostActiveIpsAnalyzer();

    const engine = new AnalyticsEngine(reader, parser, [mostActiveIpsAnalyzer]);

    const consoleSpy = vi.spyOn(console, 'log');

    await engine.run();

    // Verify total logs processed
    expect(consoleSpy).toHaveBeenCalledWith('Total Logs: 6');

    // Verify analyzer logReport is called
    expect(consoleSpy).toHaveBeenCalledWith('Top 3 Most Active IP Addresses:');
    expect(consoleSpy).toHaveBeenCalledWith('- 168.41.191.40: 2 requests');
    expect(consoleSpy).toHaveBeenCalledWith('- 177.71.128.21: 1 requests');
    expect(consoleSpy).toHaveBeenCalledWith('- 168.41.191.41: 1 requests');

    consoleSpy.mockRestore();
  });
});
