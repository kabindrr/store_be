import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      default: "User",
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: String,
      default: false,
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", UserSchema);
