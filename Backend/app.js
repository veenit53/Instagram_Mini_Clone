const express = require('express');
const cors =  require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./DB/db');
    
connectToDb();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/',(req, res) => {
    res.send("hello world")
})

module.exports = app;
