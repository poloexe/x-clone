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
    if (!user) return res.status(404).json({ error: "User not found" });

    if (img) {
      const uploadResult = await cloudinary.uploader.upload(img);
      img = uploadResult.secure_url;
    }

    if (!text && !img)
      return res
        .status(400)
        .json({ error: "Post must include a text or an img" });

    const newPost = new Post({
      user: userId,
      text: text,
      img: img,
    });

    await newPost.save();
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  i;
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "No posts found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You are not allowed to delete this post" });
    }

    if (post.img) {
      const postImg = post.img.split("/").pop().split(".")[0];

      await cloudinary.uploader.destroy(postImg);
    }

    await Post.findByIdAndDelete(req.params.id);

    return res.status(200).json({ msg: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "No Post found" });

    if (!text) return res.status(400).json({ error: "Text field is required" });

    const newComment = { text, user: userId };

    post.comments.push(newComment);
    await post.save();

    const updatedPost = await Post.findById(postId).populate({
      path: "comments.user",
      select: "fullName username profileImg",
    });

    const updatedComments = updatedPost.comments;

    return res.status(200).json(updatedComments);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const likeUnlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ error: "No Post found" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const userLikedPost = post.likes.includes(userId);

    if (userLikedPost) {
      // Unlikes the post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );

      return res.status(200).json(updatedLikes);
    } else {
      // Likes the Post
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      const newNotification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });

      await newNotification.save();
      return res.status(200).json(post.likes);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "user",
          select: "fullName username",
        },
        {
          path: "comments.user",
          select: "fullName username",
        },
      ]);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getLikedPost = async (req, res) => {
  try {
    const userId = req.params.id;

    const posts = await Post.find();
    if (!posts || posts.length === 0)
      return res.status(404).json({ error: "No Posts available" });

    const likedPosts = posts.filter((post) => post.likes.includes(userId));

    if (!likedPosts || likedPosts.length === 0)
      return res.status(404).json({ error: "No Liked Posts available" });

    return res.status(200).json(likedPosts);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;
    if (!following || following.length === 0) {
      return res.status(404).json({ error: "No posts from following users" });
    }

    const followingPosts = await Post.find({ user: { $in: following } })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });
    return res.status(200).json(followingPosts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "comments.user",
        select: "-password",
      });

    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
