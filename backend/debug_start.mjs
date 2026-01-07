import fs from 'fs';
import path from 'path';

const logFile = 'debug_log.txt';
fs.writeFileSync(logFile, 'Starting debug script...\n');

try {
    // We can't easily import app.js if it starts the server as side effect and we want to catch errors,
    // but we can try.
    // However, if app.js fails, this script might fail.

    // Let's check if we can read .env
    const envPath = '.env';
    if (fs.existsSync(envPath)) {
        fs.appendFileSync(logFile, '.env found.\n');
        const envContent = fs.readFileSync(envPath, 'utf8');
        // Don't log full content for security, just check for MONGO_URI
        if (envContent.includes('MONGO_URI')) {
            fs.appendFileSync(logFile, 'MONGO_URI is present in .env\n');
        } else {
            fs.appendFileSync(logFile, 'MONGO_URI is MISSING in .env\n');
        }
    } else {
        fs.appendFileSync(logFile, '.env NOT found.\n');
    }

    // Dynamic import to catch load errors
    await import('./src/app.js');
    fs.appendFileSync(logFile, 'Imported src/app.js successfully (server should be starting)\n');

} catch (error) {
    fs.appendFileSync(logFile, `CRITICAL ERROR: ${error.message}\n${error.stack}\n`);
}
