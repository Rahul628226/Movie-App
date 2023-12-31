const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Movie = require('./Models/Movie');
const cors = require('cors');
const app = express();
const path=require("path");
app.use(express.json());


app.use(cors({

  origin:["https://movie-app-frontend-five.vercel.app/"],
  methods:["POST","GET"],
  credentials:true
}));

const PORT = process.env.PORT || 4500;
const DB_CONNECT = process.env.DB_CONNECT;


app.use(express.static(path.join(__dirname,"/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"/build/index.html"))
});
// Connect to MongoDB
mongoose
  .connect(DB_CONNECT)
  .then(() => {
    console.log('Database connected');

   
  })
  .catch((err) => console.error(err));


//router
  
const MovieRouter=require('./Routes/Movie')

app.use('/', MovieRouter);





app.listen(PORT, () => {
    console.log('Server connected on port', PORT);
  });
