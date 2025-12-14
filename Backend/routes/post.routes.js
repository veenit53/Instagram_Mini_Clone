const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const postController = require("../controller/post.controller");
const upload = require("../middleware/multer.middleware");


router.post(
  "/create",
  upload.single("image"),
  authMiddleware.authUser,
  postController.createPost
);

module.exports = router;
