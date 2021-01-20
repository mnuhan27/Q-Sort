var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(8000);

app.use(express.static("public"));

console.log("Go to localhost:8000/researcher to access Tool setup");
console.log("Go to localhost:8000/start to access Tool");




