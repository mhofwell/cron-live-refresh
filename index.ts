// scripts/cron-live-refresh.js

require('dotenv').config();
import fetch from 'node-fetch';

const APP_URL =
    `https://${process.env.NEXT_CLIENT_PRIVATE_URL}` ||
    'https://fpl-mcp-chat.railway.internal';
    
const CRON_SECRET = process.env.CRON_SECRET;

console.log(`Starting FPL live refresh job at ${new Date().toISOString()}`);

// Execute the refresh endpoint
(async () => {
    try {
        console.log(
            `Calling live refresh endpoint at ${APP_URL}/api/cron/sync-fpl/live`
        );

        const response = await fetch(`${APP_URL}/api/cron/sync-fpl/live`, {
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
