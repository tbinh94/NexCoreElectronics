import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const reportFile = 'env_report.txt';
let report = 'Environment Report:\n';

if (process.env.MONGO_URI) {
    report += `MONGO_URI is set. Starts with: ${process.env.MONGO_URI.substring(0, 15)}...\n`;
} else {
    report += 'MONGO_URI is MISSING.\n';
}

if (process.env.PORT) {
    report += `PORT is set to ${process.env.PORT}\n`;
} else {
    report += 'PORT is default (undefined).\n';
}

fs.writeFileSync(reportFile, report);
console.log('Report written to ' + reportFile);
