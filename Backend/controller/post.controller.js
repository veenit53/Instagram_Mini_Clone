const Post = require("../models/post.model");

module.exports.createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const post = await Post.create({
      user: req.user._id,
      image: req.file.filename, // save filename
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
