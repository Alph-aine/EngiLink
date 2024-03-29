import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Model to store Employer's details
 */
const employerSchema = new mongoose.Schema({
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
  // role is to assign level of authorization
  role: {
    type: String,
    default: 'employer'
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

const userType = 'employer';

// Return jwt token after successful login
employerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, userType }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Generate and return random password reset token
employerSchema.methods.getResetPasswordToken = function () {
  // generate the reset token
  const resetToken = crypto.randomBytes(64).toString('hex');

  // hassh and save this token to the resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return resetToken;
};

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
