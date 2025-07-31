const express = require('express');
const { receiveOmnidimData } = require('../controllers/userController');
const router = express.Router();

router.post('/omnidim-data', receiveOmnidimData);

module.exports = router;
