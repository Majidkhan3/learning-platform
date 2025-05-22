import mongoose from 'mongoose'

const dialogueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  dialogue: {
    // Single dialogue string
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Endialogue = mongoose.models.Endialogue || mongoose.model('Endialogue', dialogueSchema)

export default Endialogue
