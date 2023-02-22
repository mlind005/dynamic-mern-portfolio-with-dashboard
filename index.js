// import express from "express";
const path = require("path")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./routes.js");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const multer = require('multer');

 





dotenv.config({path:'./.env'})
require('./connect/conn.js')

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cors());
app.use("/public",express.static('public'))




const PORT = process.env.PORT || 6969;

// routes routes

app.use("/api/v1",router)

app.post("/Login",(req,res)=>{
   
        res.send({message:"yes i am here"})
    
});
 // serving the frontend
app.use(express.static(path.join(__dirname, "./milindportfolio/build")));

app.get("*", function (_, res) {
    res.sendFile(
      path.join(__dirname, "./milindportfolio/build/index.html"),
      function (err) {
        res.status(500).send(err);
      }
    );
  });

app.listen(PORT,()=>{
    console.log("started",PORT)
})