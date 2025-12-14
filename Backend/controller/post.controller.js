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