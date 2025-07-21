import LogReader from "./reader/logReader.js";
import LogParser from "./parser/logParser.js";
import AnalyticsEngine from "./engine/analyticsEngine.js";

import MostActiveIpsAnalyzer from "./analyzers/mostActiveIpsAnalyzer.js";
import MostVisitedUrlsAnalyzer from "./analyzers/mostVisitedUrlsAnalyzer.js";
import UniqueIpsAnalyzer from "./analyzers/uniqueIpsAnalyzer.js";



async function main() {
    const reader = new LogReader('programming-task-example-data.log');
    const parser = new LogParser();
    const analyzers = [new MostActiveIpsAnalyzer(), new MostVisitedUrlsAnalyzer(), new UniqueIpsAnalyzer()];
    const engine = new AnalyticsEngine(reader, parser, analyzers);
    await engine.run();
}

main();