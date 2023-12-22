const express = require('express');
const router = express.Router();
const { initiatePayment, verifyPayment, addTrip } = require('../controllers/submitTripDetails');

router.post('/initiate-payment', initiatePayment);
router.post('/verify-payment', verifyPayment);
router.post('/submit', addTrip);

module.exports = router;