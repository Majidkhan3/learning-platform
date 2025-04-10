import mongoose from 'mongoose'

const wordSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    tags: { type: [String], default: [] },
    summary: { type: String, required: true },
    image: { type: String, required: true },
    note: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

const Word = mongoose.models.Word || mongoose.model('Word', wordSchema)

export default Word
