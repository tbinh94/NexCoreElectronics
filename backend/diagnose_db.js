import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

console.log('Testing MongoDB Connection...');

if (!uri) {
    console.error('ERROR: MONGO_URI is not defined in .env');
    process.exit(1);
}

// Mask the URI for security in logs, show only protocol and host if possible
console.log(`MONGO_URI is set (length: ${uri.length})`);

mongoose.connect(uri)
    .then(() => {
        console.log('SUCCESS: Connected to MongoDB!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('FAILURE: Could not connect to MongoDB.');
        console.error(err);
        process.exit(1);
    });
