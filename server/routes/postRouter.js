import express from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPost,
  getUserPosts,
  likeUnlikePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/following", getFollowingPosts);
router.get("/user/:username", getUserPosts);
router.get("/likes/:id", getLikedPost);
router.post("/create", createPost);
router.post("/like/:id", likeUnlikePost);
router.post("/comment/:id", commentOnPost);
router.delete("/:id", deletePost);

export default router;
