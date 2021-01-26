'use strict';
const express = require('express');
const router = express.Router();
const indicators = require('../services/indicators.service');

router.post('/getLast', indicators.getLast);
router.post('/getValues/', indicators.getValues);
router.post('/getValuesByDate/', indicators.getValuesByDate);

module.exports = router;