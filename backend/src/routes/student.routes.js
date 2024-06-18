const router = require('express').Router();
const {createStudent,signIn} = require('../controllers/student.controller')

router.post('/signup',createStudent);
router.post('/login',signIn);
module.exports = router;