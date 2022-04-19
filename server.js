// import mongoose
const express = require('express');
const mongoose = require('mongoose');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(require('./routes'));

// set up mongoose to connect when we start the app.
// mongoose.connect tells us which databse to connect to. if the MONGODB_URI database exists, like on heroku it will use that. \
// otherwise, it will short circuit to the serves databases 'mongodb://localhost:27017/pizza-hunt'
// mongoose can find a database that exists or creates a new one.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use this to log mango queries being executed!
mongoose.set('debug', true)

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
