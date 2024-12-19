import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
    associaton: {
      type: String,
    },

    expire: {
      type: Date,
      required: true,
      default: new Date(Date.now() + 3600000),
      expires: 0,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Session", SessionSchema);
