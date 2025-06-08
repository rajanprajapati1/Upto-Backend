import mongoose from 'mongoose';

const topPicSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  imageUrl: { type: String, required: true },
  externalLink: String,
  reference: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'UserdB', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'UserdB' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

export default mongoose.models.TopPic || mongoose.model('TopPic', topPicSchema);
