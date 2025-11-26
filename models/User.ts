import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  role: {
    type: String,
    enum: ["USER", "ADMIN",], 
    default: "USER",
  },
  family: { type: String },
  password: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
