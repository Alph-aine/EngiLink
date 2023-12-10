import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';

const employerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4(),
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  industry: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Enter a valid email address']
  },
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
  }

});

const Employer = mongoose.model('Employer', employerSchema);

export default Employer;
