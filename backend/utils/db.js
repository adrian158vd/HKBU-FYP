const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = 'mongodb://adrian158vd:CtZtwlbIdebpFTUfNa6KRiIqGXUJthY4S9Xw2uZX2PJEAmxeGdmInKvMIqxjxgU5Xmqh4tFNXPr2ACDbYGnzrA==@adrian158vd.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@adrian158vd@';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('FYPDB');
    db.client = client;
    return db;
}

module.exports = { connectToDB, ObjectId };