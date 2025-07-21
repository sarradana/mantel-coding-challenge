import { describe, it, expect } from 'vitest';
import LogReader from './logReader.js';
import fs from 'fs';
import path from 'path';

describe('LogReader', () => {
  it('should read lines from a log file', async () => {
    const logFilePath = path.resolve(
      __dirname,
      './mocks/programming-task-example-data.log'
    );
    const reader = new LogReader(logFilePath);

    const lines = [];
    for await (const line of reader.readLines()) {
      lines.push(line);
    }

    const fileContent = fs.readFileSync(logFilePath, 'utf-8');
    const expectedLines = fileContent.split('\n').filter((line) => line.trim() !== '');

    expect(lines).toEqual(expectedLines);
  });
});
