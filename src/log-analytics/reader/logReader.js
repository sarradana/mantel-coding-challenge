import fs from 'fs';
import readline from 'readline';

export default class LogReader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    // This is a generator function that reads lines from a file one by one.
    // It uses async iteration to handle large files efficiently without loading the entire file into memory.
    async *readLines() {
        const fileStream = fs.createReadStream(this.filePath);
        const rl = readline.createInterface({ input: fileStream });
        for await (const line of rl) {
            yield line;
        }
    }
}
