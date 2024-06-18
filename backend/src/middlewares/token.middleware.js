const jwt = require('jsonwebtoken');
const Student = require('../models/student.model');
require('dotenv').config();

exports.generateAuthToken = (student)=>{
    const timeInSec = parseInt(process.env.JWT_EXPIRES_IN) /1000;
    console.log(timeInSec);
    const token = jwt.sign({id:student.student_ID},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES_IN});
    return token;
}