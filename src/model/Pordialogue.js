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
   title: {
    type: String,
    required: false,
    maxlength: 50, // Limit title length
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

const Pordialogue = mongoose.models.Pordialogue || mongoose.model('Pordialogue', dialogueSchema)

export default Pordialogue
