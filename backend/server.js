//Importing the needed packages
const app = require('express')();
const studentRoutes = require('./src/routes/student.routes')
const bookRoutes = require('./src/routes/book.routes');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cors = require('cors');
const logger = require('./src/utils/logger');
require('dotenv').config() //Allows us to access the variables in .env file

app.use(cors())
app.use(bodyParser.json());
app.use((req, res, next) => {
    logger.info(`Request received: ${req.method} ${req.url}`);
    next();
});
app.use('/api/student', studentRoutes);
app.use('/api/book', bookRoutes);

//Test route
app.get('/', (req, res) => {
    res.status(200).send('Welcome on our homepage');
})

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'A simple Express Library API'
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {}
        }
    },
    apis: [
        "./src/controllers/*.js",
    ]
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Setting up the server port
app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT 3000`)
});



