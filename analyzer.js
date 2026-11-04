const fs = require('fs');
// Now we can show what file to scan || it will use by default
const filePath = process.argv[2] || './access.log'; //node analyzer.js diffrent.log
const text = fs.readFileSync(filePath, 'utf-8');

const split = text.split('\n');

let notFoundCount = 0;
let isFoundOk = 0;

// Created a objekt for saving IP adresess
const ipSummer = {};

console.log("Number of rows: ",split.length);

for(const row of split){

    if (!row.trim()) continue; // if the row in empty

    console.log("Current row:", row);

    // 1. Splited the specific lines into words/parts using spaces.
    const wordsInRow = row.split(' ');

    // 2. IP adress in the first index 0
    const ip = wordsInRow[0];

    // 3. For ip object we sum up one more +1
    ipSummer[ip] = (ipSummer[ip] || 0) + 1;

    if(row.includes('404')){
        console.log("404 error found on line: ",row);
        notFoundCount++;
    }

    if(row.includes('200')){
        console.log("'200 OK' successful requests found: ",row)
        isFoundOk++
    }

}

// LOGS //
console.log("It was successfully analyzed!");
console.log(`Total number of 404 errors: ${notFoundCount}`);
console.log(`Total count of 200 OK: ${isFoundOk}`);
console.log("Counting IP addresses: ", ipSummer);
