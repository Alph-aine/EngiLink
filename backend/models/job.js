import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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

const jobSchema = new mongoose.Schema({
  _id: { type: String, default: uuidv4() },
  title: { type: String, required: true },
  description: { type: String, required: true },
  skillsRequired: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: Object.values(enumExperienceLevel)
  },
  employmentType: {
    type: String,
    enum: Object.values(enumEmploymentType)
  },
  salaryRange: { type: String, required: true },
  location: String,
  postedAt: { type: Date, default: Date.now },
  deadline: Date
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
