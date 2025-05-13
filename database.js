const { MongoClient } = require('mongodb');
const { DB_USER, DB_PASS } = require('./config');
let database = null;

async function mongoConnect(callback) {
    const url = "mongodb+srv://Alex:123@lab7.jxiqsrr.mongodb.net/?retryWrites=true&w=majority&appName=Lab7";

    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log("Connection to the database has been established.");
        database = client.db("shop");
        callback();
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
}

function getDatabase() {
    if (!database) {
        throw new Error("No database found.");
    }
    return database;
}

module.exports = { mongoConnect, getDatabase };
