import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  avatar: { type: String },
  bio: { type: String },
  password: { 
    type: String,
    default: "" 
  }
}, { timestamps: true });
export default mongoose.models.UserdB || mongoose.model('UserdB', userSchema);
