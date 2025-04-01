import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    if (!decoded) {
      return res.status(401).json({ msg: "invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
