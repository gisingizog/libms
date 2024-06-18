//Importing the needed packages
const app = require('express')();
const studentRoutes = require('./src/routes/student.routes')
const bookRoutes = require('./src/routes/book.routes');
const bodyParser = require('body-parser');


const cors = require('cors')
require('dotenv').config() //Allows us to access the variables in .env file

app.use(cors())
app.use(bodyParser.json());
app.use('/api/student',studentRoutes);
app.use('/api/book',bookRoutes);

//Test route
app.get('/',(req,res)=>{
    res.status(200).send('Welcome on our homepage');
})

//Setting up the server port
app.listen(process.env.PORT,()=>{
    console.log(`Server running on PORT 3000`)
});



