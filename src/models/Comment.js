import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserdB',
      required: true
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TopPic',
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);
