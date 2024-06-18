const { sequelize } = require("../config/db.config");
const { faker } = require("@faker-js/faker");
const Book = require("../models/book.model");

const books = Array(24).fill(0).map(book => {
    return {
        book_name: faker.commerce.productName(),
        author: faker.person.fullName(),
        publisher: faker.company.name(),
        publication_Year: faker.number.int({
            min: 1000,
            max: new Date().getFullYear()
        }),
        subject: faker.internet.displayName()
    }
});


const populateBooks = async () => {
    await Book.destroy({ where: {} });
    const insertedRecords = await Book.bulkCreate(books);
    console.log("inserted records: ", insertedRecords);
}

populateBooks()