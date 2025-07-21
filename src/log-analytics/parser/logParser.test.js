import { describe, it, expect } from 'vitest';
import LogParser from './logParser.js';

describe('LogParser', () => {
  it('should correctly parse a valid log line', () => {
    const parser = new LogParser();
    const logLine =
      '177.71.128.21 - - [10/Jul/2018:22:21:28 +0200] "GET /intranet-analytics/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0"';
    const result = parser.parse(logLine);

    expect(result).toEqual({
      ip: '177.71.128.21',
      url: '/intranet-analytics/',
    });
  });

  it('should return null for an invalid log line', () => {
    const parser = new LogParser();
    const logLine = 'Invalid log line';
    const result = parser.parse(logLine);

    expect(result).toBeNull();
  });

  it('should handle log lines with junk content', () => {
    const parser = new LogParser();
    const logLine =
      '72.44.32.10 - - [09/Jul/2018:15:48:07 +0200] "GET / HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0" junk extra';
    const result = parser.parse(logLine);
    expect(result).toEqual({
      ip: '72.44.32.10',
      url: '/',
    });
  });
  it('should handle log lines with junk content', () => {
    const parser = new LogParser();
    const logLine =
      '168.41.191.9 - - [09/Jul/2018:22:56:45 +0200] "GET /docs/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (X11; Linux i686; rv:6.0) Gecko/20100101 Firefox/6.0" 456 789';
    const result = parser.parse(logLine);
    expect(result).toEqual({
      ip: '168.41.191.9',
      url: '/docs/',
    });
  });

  it('should handle log lines with admin', () => {
    const parser = new LogParser();
    const logLine =
      '50.112.00.11 - admin [11/Jul/2018:17:31:05 +0200] "GET /hosting/ HTTP/1.1" 200 3574 "-" "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.6 (KHTML, like Gecko) Chrome/20.0.1092.0 Safari/536.6"';
    const result = parser.parse(logLine);
    expect(result).toEqual({
      ip: '50.112.00.11',
      url: '/hosting/',
    });
  });
});
