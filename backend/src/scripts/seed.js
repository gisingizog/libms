const Book = require("../models/book.model");

const books = [
    {
        book_name: "JavaScript: The Good Parts",
        author: "Douglas Crockford",
        publisher: "O'Reilly Media",
        publication_Year: 2008,
        subject: "JavaScript"
    },
    {
        book_name: "Clean Code: A Handbook of Agile Software Craftsmanship",
        author: "Robert C. Martin",
        publisher: "Prentice Hall",
        publication_Year: 2008,
        subject: "Software Engineering"
    },
    {
        book_name: "Design Patterns: Elements of Reusable Object-Oriented Software",
        author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        publisher: "Addison-Wesley Professional",
        publication_Year: 1994,
        subject: "Software Design"
    },
    {
        book_name: "The Pragmatic Programmer: Your Journey to Mastery",
        author: "Andrew Hunt, David Thomas",
        publisher: "Addison-Wesley Professional",
        publication_Year: 1999,
        subject: "Software Development"
    },
    {
        book_name: "Introduction to Algorithms",
        author: "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
        publisher: "The MIT Press",
        publication_Year: 2009,
        subject: "Algorithms"
    }
];


const populateBooks = async () => {
    await Book.destroy({ where: {} });
    const insertedRecords = await Book.bulkCreate(books);
    console.log("inserted records: ", insertedRecords);
}

populateBooks()