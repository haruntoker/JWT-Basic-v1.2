
require('express-async-errors');
const express = require('express');
const app = express();

app.use(express.json())

const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware
app.use(express.static('./public'));
app.use(express.json());

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