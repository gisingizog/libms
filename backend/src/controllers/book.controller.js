const Book = require('../models/book.model');
const { validateBook } = require('../utils/validate.utils');

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - book_name
 *         - author
 *         - publisher
 *         - publication_Year
 *         - subject
 *       properties:
 *         book_name:
 *           type: string
 *           description: The name of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         publisher:
 *           type: string
 *           description: The publisher of the book
 *         publication_Year:
 *           type: integer
 *           description: The year the book was published
 *         subject:
 *           type: string
 *           description: The subject of the book
 *       example:
 *         book_name: Moby Dick
 *         author: Herman Melville
 *         publisher: Harper & Brothers
 *         publication_Year: 1851
 *         subject: Novel
 */
/**
 * @swagger
 * /book/create:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
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

/**
 * @swagger
 * /book/getAll:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).send(books);
    } catch (error) {
        console.log(error)
    }
}