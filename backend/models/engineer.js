import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

/**
 * Model to store engineer data
 * select: false is used in some cases to prevent those fields from being returned accidentally
 */
const engineerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Enter your first name'],
    maxLength: [30, 'Name cannot be more than 30 characters'],
    minLength: [2, 'Name cannot be less than 2 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Enter your last name'],
    maxLength: [30, 'Name cannot be more than 30 characters'],
    minLength: [2, 'Name cannot be less than 2 characters']
  },
  userName: {
    type: String,
    required: [true, 'Enter username'],
    validate:
      {
        validator: (username) => !username.includes(' '),
        message: 'Username cannot contain spaces.'
      },
    lowercase: true,
    match: /^[a-z0-9_-]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
    default: 'engineer'
  },
  phoneNumber: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    default: []
  },
  certifications: {
    type: [String],
    default: []
  },
  experienceLevel: String,
  bio: String,
  resume: String,
  portfolio: String,
  desiredSalary: String,
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job' // Reference to the Job model
    }
  ],
  highestDegree: {
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
  fieldOfStudy: {
    type: String,
    required: [true, 'Enter your field of study']
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date

  // other fields
});

// pre-save hook to hash password before saving
engineerSchema.pre('save', async function (next) {
  if ((!this.isModified('password'))) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});

// validate password
engineerSchema.methods.validatePassword = async function (insertedPassword) {
  return await bcrypt.compare(insertedPassword, this.password);
};

const userType = 'engineer';

// Return jwt token after successful login
engineerSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id, userType }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
};

// Generate and return random password reset token
engineerSchema.methods.getResetPasswordToken = function () {
  // generate the reset token
  const resetToken = crypto.randomBytes(64).toString('hex');

  // hassh and save this token to the resetPasswordToken field
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return resetToken;
};

const Engineer = mongoose.model('Engineer', engineerSchema);

export default Engineer;
