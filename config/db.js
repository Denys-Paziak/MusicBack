const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://sommericompany:GWFfrR32ThK8ii9X@music.uuxqwus.mongodb.net/?retryWrites=true&w=majority&appName=Music";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB!");
        return client.db('blogDB'); // Вказати ім'я бази даних
    } catch (err) {
        console.error(err);
        throw err;
    }
}

module.exports = { connectToDatabase, client };
