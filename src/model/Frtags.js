import mongoose from 'mongoose'

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    count: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Foreign key
  },
  { timestamps: true },
)

// Check if the model is already registered, otherwise define it
const Frtag = mongoose.models.Frtag || mongoose.model('Frtag', tagSchema)

export default Frtag
