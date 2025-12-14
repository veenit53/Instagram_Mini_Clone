const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstname, lastname, username, email, password
}) => {
    if(!firstname || !username || !email || !password){
        throw new Error('Missing required fields');
    }

    const user = new userModel({
        fullname: {
            firstname,
            lastname,
        },
        username,
        email,
        password
    });
    
    return user;
}