const router = require('express').Router();
const {createBook, getAllBooks} = require('../controllers/book.controller');
router.post('/create', createBook);
router.get('/getAll', getAllBooks);

module.exports = router;