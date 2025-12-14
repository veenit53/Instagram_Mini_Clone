const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const Post = require("../models/post.model");
const blacklistTokenModel = require("../models/blacklistToken.model")

module.exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname ,username , email, password} =  req.body;

    const isUserAlreadyExist = await userModel.findOne({email});
    if(isUserAlreadyExist){
        return  res.status(400).json({error: 'User with this email already exists'});
    }

    const hashedPassword = await userModel.hashPassword(password);

    try{
        
        const { fullname , username, email, password } = req.body;
        const user = await userService.createUser({
                firstname: fullname.firstname,
                lastname: fullname.lastname,
                username,
                email,
                password: hashedPassword
        });

        await user.save();
        return res.status(201).json({message: 'User registered successfully'});

    }catch(err){
        return res.status(500).json({message: 'Server error', error: err.message});
    }
}

module.exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});

        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = user.generateAuthToken();

        res.cookie('token', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({message: 'Login successful', token, user});

    }catch(err){
        return res.status(500).json({message: 'Server error', error: err.message});
    }
}

module.exports.getUserProfile = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            user: req.user,
            posts
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to load profile",
            error: err.message
        });
    }
};

module.exports.logoutUser = async(req, res ) => {
    
    const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

    await blacklistTokenModel.create({ token });

    await blacklistTokenModel.updateOne(
        { token },
        { token },
        { upsert: true }
    );

    res.clearCookie('token');

    res.status(200).json({message: 'Logged out successfully'});
}

module.exports.followUnfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const targetUserId = req.params.id;

    if (currentUserId.toString() === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await userModel.findById(currentUserId);
    const targetUser = await userModel.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      currentUser.following.pull(targetUserId);
      targetUser.followers.pull(currentUserId);
    } else {
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    return res.status(200).json({
      message: isFollowing ? "Unfollowed" : "Followed",
      isFollowing: !isFollowing,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
