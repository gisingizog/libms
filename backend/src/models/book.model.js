const {sequelize} = require('../config/db.config');
const {DataTypes} = require('sequelize');

const Book = sequelize.define('Books',{
    book_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    book_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    author:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publisher:{
        type: DataTypes.STRING,
        allowNull: false
    },
    publication_Year:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    subject:{
        type: DataTypes.STRING,
        allowNull: true
    }
});

//Creating all the MySQL Tables
(async()=>{
    try {
        await Book.sync();
        console.log('SQL Entities Created Successfully')
    } catch (error) {
        console.log(error);
    }
})()
module.exports = Book;