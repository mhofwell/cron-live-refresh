import dotenv from 'dotenv';
import fetch from 'node-fetch';
dotenv.config();

const BASE_URL = process.env.NEXT_CLIENT_PRIVATE_URL || 'fpl-mcp-chat.railway.internal';
const APP_URL = `http://${BASE_URL}`;
const API_ENDPOINT = `${APP_URL}/api/cron/sync-fpl/live-updates`; 
const CRON_SECRET = process.env.CRON_SECRET;

console.log(`Starting FPL live refresh job at ${new Date().toISOString()}`);
console.log(CRON_SECRET);
console.log(APP_URL);
console.log(API_ENDPOINT);
// Execute the refresh endpoint
(async () => {
    try {
        console.log(`Calling live refresh endpoint at ${API_ENDPOINT}`);

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${CRON_SECRET}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Live refresh job completed:', data);
    } catch (error) {
        console.error('Error running live refresh job:', error);
        process.exit(1); // Exit with error code
    }

    console.log('Live refresh job execution complete');
})();