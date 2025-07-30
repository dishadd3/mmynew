const express = require('express');
const router = express.Router();
const { createUserFromOmnidim } = require('../controllers/userController');

// Omnidim will POST to this route
router.post('/omnidim-data', createUserFromOmnidim);

module.exports = router;
