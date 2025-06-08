import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true }, // e.g. "tech", "ai"
  description: { type: String },
}, { timestamps: true });

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
