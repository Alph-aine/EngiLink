import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Model to store Employer's details
 */
const employerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4()
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  companyDescription: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Enter a password'],
    minLength: [8, 'password can not be less than 8 characters'],
    maxLength: [30, 'password can not be more than 30 characters'],
    select: false
  },
  website: String,
  location: {
    type: String,
    required: true
  },
  jobPosted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job' // Reference to Job model
    }
  ],
  phoneNumber: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date

});

// pre-save hook to hash password before saving
employerSchema.pre('save', async function (next) {
  if ((!this.isModified('password'))) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// validate password
employerSchema.methods.validatePassword = async function (insertedPassword) {
  return await bcrypt.compare(insertedPassword, this.password);
};

// Return jwt token after successful login
employerSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
