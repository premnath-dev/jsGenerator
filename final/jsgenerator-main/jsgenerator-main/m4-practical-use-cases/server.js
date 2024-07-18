// In your server.js or a specific route file
const express = require('express');
const createConnection = require('./database');
const path = require('path')
const WebSocket = require('ws');
const fs = require('fs');
const fastcsv = require('fast-csv');

require('dotenv').config({ path: path.resolve(__dirname, './.env') });


const app = express();
app.use(express.static(__dirname + '/public'));



// A generator function that simulates processing a large dataset
async function* processLargeDataset() {
    const totalRecords = 4000; // Simulate 1,000,000 records
    let processed = 0;
    const chunkSize = 100; // Process 1000 records at a time

    while (processed < totalRecords) {
        let chunk = [];
        for (let i = 0; i < chunkSize && processed < totalRecords; i++) {
            // Simulate data processing
            chunk.push(`Record ${processed + 1}`);
            processed++;
        }
        yield chunk; // Yield a chunk of processed data
    }
}

// end point that calls the generator function 
app.get('/api/large-dataset', async (req, res) => {
    const dataProcessor = processLargeDataset();

    res.setHeader('Content-Type', 'text/plain');

    for await (const chunk of dataProcessor) {
        res.write(chunk.join('\n') + '\n');
        // Optionally, introduce a delay to simulate processing time
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    res.end();
});



// Paginating large data sets 
async function paginateProducts(pageSize, pageNumber = 1) {
    const db = await createConnection();

    const offset = (pageNumber - 1) * pageSize;
    const [products] = await db.query('SELECT * FROM products LIMIT ? OFFSET ?', [pageSize, offset]);
    return products.length > 0 ? products : null; // Return the current set of products or null if no more products
}

app.get('/api/products', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const products = await paginateProducts(pageSize, page);

        if (!products) {
            res.status(404).send('No more products');
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});









// Generators with databases or external APIs
async function getFilteredProducts(db, filters, start, limit) {

    // Construct query based on filters
    let query = 'SELECT * FROM products WHERE 1=1';
    let queryParams = [];

    if (filters.category) {
        query += ' AND category = ?';
        queryParams.push(filters.category);
    }

    if (filters.minPrice) {
        query += ' AND price >= ?';
        queryParams.push(filters.minPrice);
    }

    // Add pagination
    query += ' LIMIT ?, ?';
    queryParams.push(start, limit);

    // Execute query
    const [products] = await db.query(query, queryParams);
    return products;
}

async function* fetchProductsInBatches(db, filters, batchSize = 100) {
    let start = 0;
    let hasMore = true;

    while (hasMore) {
        const products = await getFilteredProducts(db, filters, start, batchSize);
        if (products.length === 0) {
            hasMore = false;
        } else {
            start += products.length;
            yield products;
        }
    }
}

async function writeProductsToCSV(db, filters, outputFilePath) {
    const ws = fs.createWriteStream(outputFilePath);
    const csvStream = fastcsv.format({ headers: true });
    csvStream.pipe(ws);

    const productBatchGenerator = fetchProductsInBatches(db, filters);

    for await (const batch of productBatchGenerator) {
        for (const product of batch) {
            csvStream.write(product);
        }
    }

    csvStream.end();
}

app.get('/api/backup-products-csv', async (req, res) => {
    const db = await createConnection();

    // Example usage
    writeProductsToCSV(db, {}, 'output.csv')
        .then(() => console.log('Finished writing to CSV'))
        .catch(err => console.error(err));

    res.send();
});

// Advanced data streaming: realtime, data integrity
// Set up WebSocket server to mimic real-time communication
const wss = new WebSocket.Server({ port: 8080 });
async function* handleLargeDataset() {
    // Simulate processing a large dataset in chunks
    for (let i = 0; i < 1000; i++) {
        let chunk = `Data chunk ${i}`;
        // Simulate some processing delay
        await new Promise(resolve => setTimeout(resolve, 10));
        yield chunk;
    }
}

wss.on('connection', function connection(ws) {
    // Start processing and sending data when a client connects
    (async () => {
        for await (const dataChunk of handleLargeDataset()) {
            ws.send(dataChunk);
        }
    })();
});
console.log('WebSocket server started on ws://localhost:8080');


wss.on('close', () => {
    clearInterval(interval);
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));