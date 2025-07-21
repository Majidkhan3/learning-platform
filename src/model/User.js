  import mongoose from 'mongoose'

  const userSchema = new mongoose.Schema(
    {
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      pseudo: { type: String, required: true },
      creationDate: {
        type: Date,
        default: Date.now,
      },
      languages: {
      type: [String],
      default: []
    },
    image:{type: String},
    },
    { timestamps: true },
  )

  // Check if the model is already registered, otherwise define it
  const User = mongoose.models.User || mongoose.model('User', userSchema)

  export default User
