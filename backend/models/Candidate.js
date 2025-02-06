import mongoose from 'mongoose';

const CandidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: false },
  resumeUrl: { type: String, required: false }, // Optional file upload
  status: { type: String, enum: ['Active', 'Interviewing', 'Hired', 'Rejected'], default: 'Active' },
  createdAt: { type: Date, default: Date.now },
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } }); 

const Candidate = mongoose.model('Candidate', CandidateSchema);
export default Candidate;