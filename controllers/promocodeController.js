const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../config/db');

let collection;
connectToDatabase().then(db => {
    collection = db.collection('promocodes'); // Вказати ім'я колекції
}).catch(err => console.error('Failed to connect to database', err));

async function createPromocode(req, res) {
    try {
        const promocode = req.body;
        const result = await collection.insertOne(promocode);
        res.status(201).send(result);
    } catch (error) {
        console.error('Failed to create a new promocode:', error);
        res.status(500).json({ error: 'Failed to create a new promocode' });
    }
}

async function getAllPromocodes(req, res) {
    try {
        const promocodes = await collection.find({}).toArray();
        res.status(200).send(promocodes);
    } catch (error) {
        console.error('Failed to fetch promocodes:', error);
        res.status(500).json({ error: 'Failed to fetch promocodes' });
    }
}

async function getPromocodeById(req, res) {
    try {
        const id = req.params.id;
        const promocode = await collection.findOne({ _id: new ObjectId(id) });
        if (promocode) {
            res.status(200).send(promocode);
        } else {
            res.status(404).json({ error: 'Promocode not found' });
        }
    } catch (error) {
        console.error('Failed to fetch the promocode:', error);
        res.status(500).json({ error: 'Failed to fetch the promocode' });
    }
}

async function updatePromocode(req, res) {
    try {
        const id = req.params.id;
        const updatedPromocode = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedPromocode }
        );
        if (result.matchedCount > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).json({ error: 'Promocode not found' });
        }
    } catch (error) {
        console.error('Failed to update the promocode:', error);
        res.status(500).json({ error: 'Failed to update the promocode' });
    }
}

async function deletePromocode(req, res) {
    try {
        const id = req.params.id;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Promocode deleted successfully' });
        } else {
            res.status(404).json({ error: 'Promocode not found' });
        }
    } catch (error) {
        console.error('Failed to delete the promocode:', error);
        res.status(500).json({ error: 'Failed to delete the promocode' });
    }
}

module.exports = {
    createPromocode,
    getAllPromocodes,
    getPromocodeById,
    updatePromocode,
    deletePromocode
};
