const crypto = require('crypto');
const tripSchema = require('../models/tripDetails'); 

const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const initiatePayment = async (req, res) => {
  try {
    const { totalPrice } = req.body;

    const orderOptions = {
      amount: totalPrice * 100, // Razorpay accepts amount in paise
      currency: 'INR',
      receipt: 'receipt_order_1',
      payment_capture: 1, // Automatically capture the payment when it's successful
    };

    const order = await razorpay.orders.create(orderOptions);
    res.json({ orderId: order.id, orderAmount: order.amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const text = `${orderId}|${paymentId}`;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(text)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid Signature' });
    }

    // Verify the payment
    const payment = await razorpay.payments.fetch(paymentId);

    if (payment.status === 'captured') {
      return res.json({ success: true, message: 'Payment successful' });
    } else {
      return res.json({ success: false, message: 'Payment failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addTrip = async (req, res) => {
  try {
    const {
      mode,
      source,
      destination,
      // midJourneyStops,
      // carType,
      // carModel,
      selectedCarName,
      // tripDistance,
      // baseTripFare,
      // nightCharges,
      // parkingCharges,
      // luggageCharges,
      // sedanAssuranceCharges,
      totalPrice,
      selectedDateTime,
      pickupAddress,
      phoneNumber,
      name,
      email,
      orderId,
      razorpayPaymentId,
      // userDetails
    } = req.body;

    const newTrip = new tripSchema({
      mode,
      source,
      destination,
      // midJourneyStops,
      // carType,
      // carModel,
      selectedCarName,
      // tripDistance,
      // baseTripFare,
      // nightCharges,
      // parkingCharges,
      // luggageCharges,
      // sedanAssuranceCharges,
      totalPrice,
      selectedDateTime,
      pickupAddress,
      phoneNumber,
      name,
      email,
      orderId,
      razorpayPaymentId,
      // userDetails
    });

    await newTrip.save();
    res.status(201).json({ message: 'Trip added successfully!' });
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal Server Error! Cannot create the trip. Check all the parameters again' });
  }
};

module.exports = {
  initiatePayment,
  verifyPayment,
  addTrip,
};