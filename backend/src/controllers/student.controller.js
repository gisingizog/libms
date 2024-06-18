const Student = require('../models/student.model');
const { hashPassword } = require('../utils/hash.utils');
const { validateStudent, validateLogin } = require('../utils/validate.utils');
const { generateAuthToken } = require('../middlewares/token.middleware');
const bcrypt = require('bcrypt');

/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         student_Fname:
 *           type: string
 *         student_Lname:
 *           type: string
 *         student_Email:
 *           type: string
 *           format: email
 *         student_Password:
 *           type: string
 *           format: password
 *       required:
 *         - student_Fname
 *         - student_Lname
 *         - student_Email
 *         - student_Password
 */

/**
 * @swagger
 * /students/signUp:
 *   post:
 *     summary: Create a new student
 *     description: Register a new student with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       '201':
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Success:
 *                   type: string
 *                   example: STUDENT_CREATED_SUCCESSFULLY
 *                 Data:
 *                   $ref: '#/components/schemas/Student'
 *       '406':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 VALIDATION_ERROR:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */

exports.createStudent = async (req, res) => {
    try {
        const { error } = await validateStudent(req.body);
        if (error) {
            return res.status(406).json({ message: error.message });
        }

        const existingUser = await Student.findOne({ where: { student_Email: req.body.email } });
        if (existingUser) {
            return res.status(409).json({ message: 'User with that email already exists' });
        }

        req.body.password = await hashPassword(req.body.password);
        
        const newStudent = await Student.create({
            student_Fname: req.body.firstName,
            student_Lname: req.body.lastName,
            student_Email: req.body.email,
            student_Password: req.body.password
        });
        return res.status(201).json({
            success: true,
            student: newStudent
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ERROR: error });
    }
};

/**
 * @swagger
 * /students/signIn:
 *   post:
 *     summary: Sign in to the system
 *     description: Validates student credentials and returns an authentication token upon successful sign-in.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               student_Email:
 *                 type: string
 *               student_Password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 SUCCESS:
 *                   type: string
 *       '404':
 *         description: Incorrect email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Warning:
 *                   type: string
 *       '406':
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 VALIDATION_ERROR:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */
exports.signIn = async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) {
            return res.status(406).send({ VALIDATION_ERROR: error.details[0].message });
        }

        const student = await Student.findOne({ where: { student_Email: req.body.email } });
        if (!student) {
            return res.status(400).json({ message: 'Incorrect email or password' });
        }

        const passwordMatches = await bcrypt.compare(req.body.password, student.student_Password);
        if (!passwordMatches) {
            return res.status(400).send({ message: 'Incorrect email or password' });
        }

        const token = generateAuthToken(student);
        return res.status(200).json({ success: true, token, student });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ ERROR: error });
    }
};
