import mongoose from 'mongoose'

const storySchema = new mongoose.Schema({
  storyId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Foreign key referencing the User model
    ref: 'User', // Name of the referenced model
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  wordsUsed: {
    type: [String],
    default: [],
  },
  storyText: {
    type: String,
    required: true,
  },
})

const Story = mongoose.models.Story || mongoose.model('Story', storySchema)

export default Story
