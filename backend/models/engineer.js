import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  authority: String,
  obtainedAt: Date,
  licenseNumber: String
});

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
    default: 'user'
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
    type: [certificationSchema],
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
  userType: { type: String },
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
  this.userType = 'engineer';
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

const Engineer = mongoose.model('Engineer', engineerSchema);

export default Engineer;
