const {sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');

const Student = sequelize.define('Students',{
    student_ID:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    student_Fname:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    student_Lname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    student_Email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    student_Password:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

//Creating all the MySQL Tables
(async()=>{
    try {
        await Student.sync();
        console.log('Student model Created Successfully')
    } catch (error) {
        console.log(error);
    }
})()
module.exports = Student;