import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import bcrypt from 'bcrypt';

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
  _id: {
    type: String,
    default: uuidv4(),
    required: true
  },
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
    validate: [{
      validator: (value) => /^[a-z]+$/.test(value),
      message: 'Name must contain only lowercase letters.'
    },
    {
      validator: (username) => !username.includes(' '),
      message: 'Username cannot contain spaces.'
    }
    ]
  },
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
  skills: {
    type: [String],
    default: []
  },
  certifications: {
    type: [certificationSchema],
    default: []
  },
  experienceLevel: {
    type: Number,
    min: 1,
    max: 5,
    default: 1
  },
  appliedJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jobs' // Reference to the Job model
    }
  ],
  highestDegree: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  // other fields
});

// pre-save hook to hash password before saving
engineerSchema.pre('save', async function (next) {
  if ((!this.isModified('password'))) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
});
