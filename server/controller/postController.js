import Notification from "../model/notificationModel.js";
import Post from "../model/postModel.js";
import User from "../model/userModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { text } = req.body;
    let { img } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (img) {
      const uploadResult = await cloudinary.uploader.upload(img);
      img = uploadResult.secure_url;
    }

    if (!text && !img)
      return res
        .status(400)
        .json({ msg: "Post must include a text or an img" });

    const newPost = new Post({
      user: userId,
      text: text,
      img: img,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error at createPost" });
  }

  i;
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "No posts found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ msg: "You are not allowed to delete this post" });
    }

    if (post.img) {
      const deleteImg = post.img
        .destroy(post.img)
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(deleteImg);
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: "No Post found" });

    if (!text) return res.status(400).json({ msg: "Text field is required" });

    const newComment = { text, user: userId };

    post.comments.push(newComment);
    await post.save();

    return res.status(200).json(post);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ msg: "No Post found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      return res.status(200).json({ msg: "Post unlike successfully" });
    } else {
      // Like post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const newNotification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await newNotification.save();
      return res.status(200).json({ msg: "Post liked successfully" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdBy: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    if (posts.length == 0)
      return res.status(200).json({ msg: "No posts available" });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

export const getLikedPost = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const likedPosts = await Post.find({
      _id: { $in: user.likedPosts },
    })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    return res.status(200).json(likedPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
