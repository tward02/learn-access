const express = require('express');
const dotenv = require("dotenv").config();
const https = require("https");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const app = express();
const HTTP_PORT = process.env.HTTP_PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 4500;

app.use(morgan("dev"));

//Endpoints

app.get('/', (req, res)=>{
    res.status(200);
    res.send("Welcome to root URL of Server");
});

//SSL

const options = {

    key: fs.readFileSync(path.join("ssl", "localhost-key.pem")),

    cert: fs.readFileSync(path.join("ssl", "localhost.pem")),

};

//Create servers

const server = https.createServer(options, app);

server.listen(HTTPS_PORT, () => {

    console.log("HTTPS server is now running on port " + HTTPS_PORT);

});

app.listen(HTTP_PORT, (error) =>{
    if(!error)
        console.log("HTTP server is now running on port " + HTTP_PORT)
    else
        console.log("Error occurred, server can't start", error);
    }
);

