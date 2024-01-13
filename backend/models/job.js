import mongoose from 'mongoose';

// set various values for enum used later on in the model
const enumExperienceLevel = {
  ENTRY_LEVEL: 'Entry Level',
  MID_LEVEL: 'Mid Level',
  SENIOR_LEVEL: 'Senior Level'
};

const enumEmploymentType = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  INTERNSHIP: 'Internship',
  REMOTE: 'Remote'
};

/**
 * Job Model
 */
const jobSchema = new mongoose.Schema({
  // removed _id as it is set by default
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  skillsRequired: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    enum: Object.values(enumExperienceLevel)
  },
  employmentType: {
    type: String,
    enum: Object.values(enumEmploymentType)
  },

  // I made a change here, using min and max salary and changed type to Number
  minSalary: {
    type: Number,
    required: true
  },
  maxSalary: {
    type: Number,
    required: true
  },
  location: String,
  postedAt: { type: Date, default: Date.now },
  deadline: Date,

  // added employer, applications(from applicants for each job
  employer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employer'
  }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
