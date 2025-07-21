class AnalyticsEngine {
    constructor(reader, parser, analyzers) {
        this.reader = reader;
        this.parser = parser;
        this.analyzers = analyzers;
        this.totalLogs = 0;
    }

    async run() {
        for await (const line of this.reader.readLines()) {
            this.totalLogs++;
            const log = this.parser.parse(line);
            this.analyzers.forEach(a => a.process(log));
        }

        console.log(`Total Logs: ${this.totalLogs}`);
        this.analyzers.forEach(a => a.logReport());
    }
}

export default AnalyticsEngine;
