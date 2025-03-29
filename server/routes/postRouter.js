import express from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  getLikedPost,
  likeUnlikePost,
} from "../controller/postController.js";

const router = express.Router();

router.get("/all", getAllPosts);
router.get("/likes/:id", getLikedPost);
router.post("/create", createPost);
router.post("/like/:id", likeUnlikePost);
router.post("/comment/:id", commentOnPost);
router.delete("/:id", deletePost);

export default router;
