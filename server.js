var express = require('express');

var app = express('');
var http = require('http');
var port = process.env.PORT || 3337;


app.configure(function () {
    app.use(
        "/", 
        express.static(__dirname) 
    );
   
});



app.get('/', function(req, res) {
    res.render('index');
  });

app.listen(port);
