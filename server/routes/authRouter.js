import express from "express";
import {
  signUp,
  signIn,
  logOut,
  getUser,
} from "../controller/authController.js";
import { authUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/logout", logOut);
router.get("/getuser", authUser, getUser);

export default router;
