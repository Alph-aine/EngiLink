import mongoose from 'mongoose';
const proposalSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  engineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Engineer',
    required: true
  },
  coverLetter: {
    type: String,
    required: true
  },
  price: { type: Number },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
});

const Proposal = mongoose.model('Proposal', proposalSchema);

export default Proposal;
