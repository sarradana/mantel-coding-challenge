import LogReader from "./reader/logReader.js";
import LogParser from "./parser/logParser.js";
import AnalyticsEngine from "./engine/analyticsEngine.js";
import path from 'path';
import { fileURLToPath } from 'url';
import MostActiveIpsAnalyzer from "./analyzers/ip/mostActiveIpsAnalyzer.js";
import MostVisitedUrlsAnalyzer from "./analyzers/url/mostVisitedUrlsAnalyzer.js";
import UniqueIpsAnalyzer from "./analyzers/ip/uniqueIpsAnalyzer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    const reader = new LogReader(path.join(__dirname, '../logs/programming-task-example-data.log'));
    const parser = new LogParser();
    const analyzers = [new MostActiveIpsAnalyzer(), new MostVisitedUrlsAnalyzer(), new UniqueIpsAnalyzer()];
    const engine = new AnalyticsEngine(reader, parser, analyzers);
    await engine.run();
}

main();