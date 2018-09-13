const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/routes');


mongoose.connect('mongodb://localhost:27017/todolist');

mongoose.connection.on('connected',()=>{
    console.log("Connected");
    
});
mongoose.connection.on('error',()=>{
    console.log('error connecting to db');
    
})

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/todo',router);
app.listen(8080,()=>{
    console.log("Listening on 8080");
})