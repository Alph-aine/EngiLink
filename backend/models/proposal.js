import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const proposalSchema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    engineer: { type: mongoose.Schema.Types.ObjectId, ref: 'Engineer', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    coverLetter: { type: String },
    price: { type: Number },
});

const Proposal = mongoose.model('Proposal', proposalSchema);

module.exports = Proposal;
