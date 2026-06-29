import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
  type: String,
  enum: ["user", "admin"],
  default: "user",
},
  isVerified: {
    type: Boolean,
    default: false,
  },
  otp: String,
  otpExpire: Date,
  resetToken: String,
  resetTokenExpire: Date,
}, {
  timestamps: true,
});

const Auth = mongoose.model("Auth",authSchema)
export default Auth;