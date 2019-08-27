
// https://nodejs.org/en/download/
// https://swf.com.tw/?p=1023
// https://dotblogs.com.tw/justtong/2017/11/28/181013

// npm install mqtt --save
// npm install mqtt -g 
// npm install socket.io
// npm install express



var mqtt = require('mqtt');

var args= {
	username: "DK0SFX4T1FTMCFKRGS",
	password: "DK0SFX4T1FTMCFKRGS"
};
//
var io = require("socket.io");
var express = require("express");
var app = express();
app.use(express.static('www'));
var server = app.listen(80);
//
// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
// app.listen(80);
//var client  = mqtt.connect('tcp://iot.cht.com.tw:1883',args);
var client  = mqtt.connect('mqtt://iot.cht.com.tw',args);
//
var sio = io.listen(server);

var deviceID = "18330497711";
var sensorID = "user_information";
var TOPIC_temp = "/v1/device/"+deviceID+"/sensor/"+sensorID+"/rawdata";


client.on('connect', function () {
    console.log("connected!");
    client.subscribe(TOPIC_temp);
  });
  
sio.on('connection', function(socket){
    client.on('message', function (TOPIC_temp, msg) { 
        console.log('msg: ' + msg.toString());
        socket.emit('mqtt', { 'msg': msg.toString() });
        console.log("send!");
    });
  });