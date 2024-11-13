const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'myDatabase';

// Create a new MongoClient
const client = new MongoClient(uri);

async function performQueries() {
    try {
        // Connect to MongoDB
        await client.connect();
        console.log('Connected to MongoDB');

        // Get database and collection
        const db = client.db(dbName);
        const collection = db.collection('users');

        // Find all documents
        const findAll = await collection.find({}).toArray();
        console.log('All documents:', findAll);

        // Find documents with specific criteria
        const findFiltered = await collection.find({ 
            age: { $gt: 25 },
            city: 'New York'
        }).toArray();
        console.log('Filtered documents:', findFiltered);

        // Find one document
        const findOne = await collection.findOne({ email: 'john@example.com' });
        console.log('Single document:', findOne);

        // Find with projection (selected fields)
        const findProjection = await collection.find(
            { age: { $gt: 25 } },
            { projection: { name: 1, email: 1, _id: 0 } }
        ).toArray();
        console.log('Projected documents:', findProjection);

        // Find with sort and limit
        const findSorted = await collection.find({})
            .sort({ age: -1 })
            .limit(5)
            .toArray();
        console.log('Sorted and limited documents:', findSorted);

        // Aggregation pipeline
        const aggregate = await collection.aggregate([
            { $match: { age: { $gt: 25 } } },
            { $group: { 
                _id: '$city',
                avgAge: { $avg: '$age' },
                count: { $sum: 1 }
            }}
        ]).toArray();
        console.log('Aggregation results:', aggregate);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}