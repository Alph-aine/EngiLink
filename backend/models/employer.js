import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

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
  }

});

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
