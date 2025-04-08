import User from "../model/userModel.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.jwt_secret);
    if (!decoded) {
      return res.status(401).json({ error: "invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
