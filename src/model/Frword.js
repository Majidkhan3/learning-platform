import mongoose from 'mongoose'

const wordSchema = new mongoose.Schema(
  {
    word: { type: String, required: true },
    tags: { type: [String], default: [] },
    summary: { type: String, required: true },
    image: { type: String, required: false },
    note: { type: Number, default: 0 },
    autoGenerateImage: { type: Boolean, default: false },
    autoGenerateSummary: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

const Frword = mongoose.models.Frword || mongoose.model('Frword', wordSchema)

export default Frword 
