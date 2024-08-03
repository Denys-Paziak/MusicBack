const express = require('express');
const {
    createPromocode,
    getAllPromocodes,
    getPromocodeById,
    updatePromocode,
    deletePromocode
} = require('../controllers/promocodeController');

const router = express.Router();

router.post('/promocodes', createPromocode);
router.get('/promocodes', getAllPromocodes);
router.get('/promocodes/:id', getPromocodeById);
router.put('/promocodes/:id', updatePromocode);
router.delete('/promocodes/:id', deletePromocode);

module.exports = router;
