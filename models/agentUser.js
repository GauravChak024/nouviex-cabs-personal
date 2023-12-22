const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const agentUserSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, 'Please provide a valid Phone Number'],
    maxlength: 12,
    minlength: 0,
  },
  username: {
    type: String,
    required: [true, 'Please provide name'],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  bankAccountNumber: {
    type: Number,
    required: [true, 'Please provide a valid Bank Account Number'],
    maxlength: 50,
    minlength: 3,
  },
  ifscCode: {
    type: String,
    required: [true, 'Please provide a valid IFSC Code'],
    maxlength: 50,
    minlength: 3,
  },
  adderess: {
    type: String,
    required: [true, 'Please provide adderess'],
    maxlength: 100,
    minlength: 3,
  },
  aadharCard: {
    type: String,
    required: true
  },
  rcBook: {
    type: String,
    required: true
  },
  carImageFront: {
    type: String,
    required: true
  },
  carImageBack: {
    type: String,
    required: true
  },
  carImageLeft: {
    type: String,
    required: true
  },
  carImageRight: {
    type: String,
    required: true
  },
  characterCertificate: {
    type: String,
    required: true
  },
  bankPassbook: {
    type: String,
    required: true
  }
})

agentUserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

agentUserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.username },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
}

agentUserSchema.methods.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('Agent User', agentUserSchema)
