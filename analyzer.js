const fs = require('fs');

// 1. Get the file dir
const filePath = process.argv[2] || './access.log';

try {
    // 2. Read file
    const text = fs.readFileSync(filePath, 'utf-8');
    const lines = text.split('\n');

    let notFoundCount = 0;
    let isFoundOk = 0;
    
    // Object for counting ip
    const ipCounts = {};

    console.log(`Analyzing file: ${filePath}`);
    console.log("Number of rows: ", lines.length);

    for (const row of lines) {
        if (!row.trim()) continue; // if empty row

        // 1. Split the string into words using spaces
        const wordsInRow = row.split(' ');
        
        // 2. The IP address is in the first position.
        const ip = wordsInRow[0];

        // 3. Add +1 to this IP address
        ipCounts[ip] = (ipCounts[ip] || 0) + 1;

        if (row.includes('404')) {
            notFoundCount++;
        }

        if (row.includes('200')) {
            isFoundOk++;
        }
    }

    // --- Results LOGS ---
    console.log("\n--- ANALYSIS REPORT ---");
    console.log("It was successfully analyzed!");
    console.log(`Total number of 404 errors: ${notFoundCount}`);
    console.log(`Total count of 200 OK: ${isFoundOk}`);
    console.log("Counting IP addresses: ", ipCounts);

} catch (error) {
    console.error("Error when reading a file!:", error.message);
}