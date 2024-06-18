const Book = require('../models/book.model');
const { validateBook } = require('../utils/validate.utils');

exports.createBook = async (req, res) => {
    try {
        const { error } = validateBook(req.body);
        if (error) return res.status(406).send(error.details[0].message);

        const book = await Book.create(req.body);
        res.status(201).send(book);
    } catch (error) {
        console.log(error)
    }
}

exports.getAllBooks = async (req, res) => {
    console.log("controller reached");
    try {
        const books = await Book.findAll();
        // if(books.length===0){
        //     return res.status(404).send('No books found')}
        res.status(200).send(books);
    } catch (error) {
        console.log(error)
    }
}