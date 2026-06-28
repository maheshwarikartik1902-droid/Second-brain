const axios = require("axios");
const cheerio = require("cheerio");

async function decodeSecretMessage(url) {
    try {
        // Fetch the Google Doc HTML
        const { data } = await axios.get(url);

        // Load HTML
        const $ = cheerio.load(data);

        const points = [];
        let maxX = 0;
        let maxY = 0;

        // Skip the header row
        $("table tr").slice(1).each((_, row) => {
            const cols = $(row).find("td");

            if (cols.length !== 3) return;

            const x = parseInt($(cols[0]).text().trim());
            const char = $(cols[1]).text();
            const y = parseInt($(cols[2]).text().trim());

            if (isNaN(x) || isNaN(y)) return;

            points.push({ x, y, char });

            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
        });

        // Create empty grid
        const grid = Array.from(
            { length: maxY + 1 },
            () => Array(maxX + 1).fill(" ")
        );

        // Fill characters
        for (const { x, y, char } of points) {
            grid[y][x] = char;
        }

        // Print the message
        for (const row of grid) {
            console.log(row.join(""));
        }

    } catch (err) {
        console.error("Error:", err.message);
    }
}

// Example
decodeSecretMessage(
    "https://docs.google.com/document/d/e/2PACX-1vTMOmshQe8YvaRXi6gEPKKlsC6UpFJSMAk4mQjLm_u1gmHdVVTaeh7nBNFBRlui0sTZ-snGwZM4DBCT/pub"
);