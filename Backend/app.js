const express = require('express');
const cors =  require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const connectToDb = require('./DB/db');
const userRoutes = require('./routes/user.routes');
const userPosts = require("./routes/post.routes"); 
    
connectToDb();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/',(req, res) => {
    res.send("hello world")
})

app.use('/users', userRoutes);
app.use("/posts", userPosts);


module.exports = app;
