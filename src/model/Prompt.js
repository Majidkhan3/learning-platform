import mongoose from 'mongoose'

const promptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: {
    type: String,
    required: true,
  },
  promptText: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Prompt = mongoose.models.Prompt || mongoose.model('Prompt', promptSchema)
export default Prompt
