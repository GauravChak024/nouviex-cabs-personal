const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
  mode: {
    type: String,
    enum: ['Outstation', 'One way trip', 'Round Trip', 'Local/Airport'],
    required: true
  },
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  // midJourneyStops: {
  //   type: [String],
  //   default: []
  // },
  // carType: {
  //   type: String,
  //   enum: ['Hatchback', 'Sedan', 'SUV', 'Innova'],
  //   required: true
  // },
  // carModel: {
  //   type: String,
  //   required: true
  // },
  selectedCarName: {
    type: String,
    required: true,
  },
  // tripDistance: {
  //   type: Number,
  //   required: true
  // },
  // baseTripFare: {
  //   type: Number,
  //   required: true
  // },
  // nightCharges: {
  //   type: Number,
  //   required: true
  // },
  // parkingCharges: {
  //   type: Number,
  //   required: true
  // },
  // luggageCharges: {
  //   type: Number,
  //   default: 0
  // },
  // sedanAssuranceCharges: {
  //   type: Number,
  //   default: 0
  // },
  totalPrice: {
    type: String,
    required: true
  },
  // userDetails: {
  //   mobileNumber: {
  //     type: Number,
  //     required: true
  //   },
  //   name: {
  //     type: String,
  //     required: true
  //   },
  //   email: {
  //     type: String,
  //     match: [
  //       /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  //       'Please provide a valid email',
  //     ],
  //     required: true
  //   },
  //   pickupAddress: {
  //     type: String,
  //     required: true
  //   }
  // }
  selectedDateTime: {
    type: Date,
    required: true,
  },
  pickupAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please provide a valid email',
    ],
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('Trip Details', tripSchema);