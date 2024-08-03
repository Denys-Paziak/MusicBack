const express = require('express');
const {
    createPortfolio,
    getAllPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio
} = require('../controllers/portfolioController');

const router = express.Router();

router.post('/portfolios', createPortfolio);
router.get('/portfolios', getAllPortfolios);
router.get('/portfolios/:id', getPortfolioById);
router.put('/portfolios/:id', updatePortfolio);
router.delete('/portfolios/:id', deletePortfolio);

module.exports = router;
