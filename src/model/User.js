  import mongoose from 'mongoose'

  const userSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      pseudo: { type: String, required: false },
      creationDate: {
        type: Date,
        default: Date.now,
      },
      languages: {
      type: [String],
      default: []
    },
    image:{type: String},
     customPrompts: {
      spanish: { type: String, default: '' },     // For Word (Spanish)
      english: { type: String, default: '' },     // For Enword (English)
      portuguese: { type: String, default: '' },  // For Portuguese
      french: { type: String, default: '' },      // For French
    },
    },
    { timestamps: true },
  )

  // Check if the model is already registered, otherwise define it
  const User = mongoose.models.User || mongoose.model('User', userSchema)

  export default User
