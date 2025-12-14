const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');

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
        return res.status(200).json({message: 'Login successful', token});

    }catch(err){
        return res.status(500).json({message: 'Server error', error: err.message});
    }
}