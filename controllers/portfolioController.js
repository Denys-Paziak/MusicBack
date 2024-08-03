const { ObjectId } = require('mongodb');
const { connectToDatabase } = require('../config/db');

let collection;
connectToDatabase().then(db => {
    collection = db.collection('portfolios'); // Вказати ім'я колекції
}).catch(err => console.error('Failed to connect to database', err));

async function createPortfolio(req, res) {
    try {
        const portfolio = req.body;
        const result = await collection.insertOne(portfolio);
        res.status(201).send(result);
    } catch (error) {
        console.error('Failed to create a new portfolio:', error);
        res.status(500).json({ error: 'Failed to create a new portfolio' });
    }
}

async function getAllPortfolios(req, res) {
    try {
        const portfolios = await collection.find({}).toArray();
        res.status(200).send(portfolios);
    } catch (error) {
        console.error('Failed to fetch portfolios:', error);
        res.status(500).json({ error: 'Failed to fetch portfolios' });
    }
}

async function getPortfolioById(req, res) {
    try {
        const id = req.params.id;
        const portfolio = await collection.findOne({ _id: new ObjectId(id) });
        if (portfolio) {
            res.status(200).send(portfolio);
        } else {
            res.status(404).json({ error: 'Portfolio not found' });
        }
    } catch (error) {
        console.error('Failed to fetch the portfolio:', error);
        res.status(500).json({ error: 'Failed to fetch the portfolio' });
    }
}

async function updatePortfolio(req, res) {
    try {
        const id = req.params.id;
        const updatedPortfolio = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updatedPortfolio }
        );
        if (result.matchedCount > 0) {
            res.status(200).send(result);
        } else {
            res.status(404).json({ error: 'Portfolio not found' });
        }
    } catch (error) {
        console.error('Failed to update the portfolio:', error);
        res.status(500).json({ error: 'Failed to update the portfolio' });
    }
}

async function deletePortfolio(req, res) {
    try {
        const id = req.params.id;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Portfolio deleted successfully' });
        } else {
            res.status(404).json({ error: 'Portfolio not found' });
        }
    } catch (error) {
        console.error('Failed to delete the portfolio:', error);
        res.status(500).json({ error: 'Failed to delete the portfolio' });
    }
}

module.exports = {
    createPortfolio,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
};
