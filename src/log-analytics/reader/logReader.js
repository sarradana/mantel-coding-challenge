import fs from 'fs';
import readline from 'readline';

/**
 * Reads log files line by line.
 * Provides an asynchronous generator to iterate through each line of the log file.
 * Useful for processing large log files efficiently without loading the entire file into memory.
 */
class LogReader {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async *readLines() {
        let fileStream;
        let rl;
        
        try {
            // Check if file exists before attempting to read
            await fs.promises.access(this.filePath, fs.constants.R_OK);
            
            fileStream = fs.createReadStream(this.filePath);
            rl = readline.createInterface({ input: fileStream });
            
            try {
                for await (const line of rl) {
                    yield line;
                }
            } catch (error) {
              console.error(`Error reading log file: ${error.message}`);
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
              console.error(`Log file not found: ${this.filePath}`);
            } else if (error.code === 'EACCES') {
              console.error(`Permission denied to read log file: ${this.filePath}`);
            } else {
              console.error(`Error accessing log file: ${error.message}`);
            }
        } finally {
            if (rl) {
                rl.close();
            }
            if (fileStream) {
                fileStream.destroy();
            }
        }
    }
}

export default LogReader;