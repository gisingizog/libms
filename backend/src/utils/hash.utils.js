const bcrypt = require('bcrypt');
require('dotenv').config();
exports.hashPassword =async (password)=>{
    try {
        const salt= await bcrypt.genSalt(10);
        const hashedPassword  =await bcrypt.hash(password,salt);
        return hashedPassword;
    } catch (error) {
        console.log("Error hashing the password",error)
    }
}