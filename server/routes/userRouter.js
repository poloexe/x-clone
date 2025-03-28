import express from "express";
import {
  followAndUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  updateUser,
} from "../controller/userController.js";
const router = express.Router();

router.get("/profile/:username", getUserProfile);
router.post("/follow/:id", followAndUnfollowUser);
router.get("/suggested", getSuggestedUsers);
router.post("/update", updateUser);

export default router;
