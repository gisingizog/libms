//MiddleWare for validating user inputs
const Joi = require('joi');

exports.validateStudent = (body) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(body);
};


exports.validateLogin = (body) => {
    return Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }).validate(body);
}

exports.validateBook = (body) => {
    return Joi.object({
        book_name: Joi.string().required(),
        author: Joi.string().required(),
        publisher: Joi.string().required(),
        publication_Year: Joi.number().required(),
        subject: Joi.string().required(),
    }).validate(body);

}