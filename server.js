var express = require("express");
var socket = require("socket.io");

var app = express();
var server = app.listen(8000);

app.use(express.static("public"));

console.log("my socket server is running");

