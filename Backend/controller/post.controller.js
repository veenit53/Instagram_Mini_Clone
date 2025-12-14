const Post = require("../models/post.model");

module.exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const post = await Post.create({
      user: req.user._id,
      image: req.file.filename,
      caption: req.body.caption,
    });

    res.status(201).json({
      message: "Post created",
      post,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username fullname")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.toggleLike = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.user._id;

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      post.likes.pull(userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({
      isLiked: !isLiked,
      likesCount: post.likes.length,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};