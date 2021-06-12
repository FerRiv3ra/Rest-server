const { Router } = require('express');
const { buscar } = require('../controllers/search');

const router = Router();

router.get('/:colection/:term', buscar);

module.exports = router;