import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
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
      minlength: 7,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [], //User has 0 followers after signing up
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
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
    likedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
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

const User = model("User", userSchema);
export default User;
