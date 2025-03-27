import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    fullName: {
      type: String,
      required: [true, "FullName is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [7, "Minimum of 7 characters"],
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], //User has 0 followers after signing up
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [], //User has 0 following after signing up
      },
    ],
    profileImg: {
      type: String,
      default: "", // No profile img
    },
    coverImg: {
      type: String,
      default: "", //No Cover Img
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.generateTokenAndSetCookie = function (res) {
  const token = jwt.sign({ userId: this._id }, process.env.jwt_secret, {
    expiresIn: "1d",
  });

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000, // Expiration date in milliseconds
    httpOnly: true, // Prevents xss attacks
    sameSite: "strict", // Prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development",
  });
};

userSchema.methods.comparePassword = async function (userPassword) {
  const isCorrect = await bcrypt.compare(userPassword, this.password);
  return isCorrect;
};

const User = mongoose.model("User", userSchema);
export default User;
