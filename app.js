
require('express-async-errors');
const dotenv = require('dotenv')
const mongoose = require('mongoose')

const express = require('express');
const app = express();

app.use(express.json())

const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1/', mainRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);








// db & dotenv
dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const connect = async() =>{
    try {
        await mongoose.connect(MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        });

        console.log("Data Base connected succesfully!");
        app.listen(PORT, () =>{
            console.log(`App running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);
    }
}

connect()

