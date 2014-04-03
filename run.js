var fs = require('fs')
var path = require('path')
var http = require('http');
var express = require("express")
var passport = require('passport')
var bcrypt = require('bcrypt')

var app = express()
var server = http.createServer(app);

if(process.env.NODE_ENV == 'development'){
	console.log("development\n")
}

var parametersFile = 'config/parameters.json'

var parametersJson = JSON.parse(fs.readFileSync(parametersFile))
console.log("Parameters:\n" + JSON.stringify(parametersJson, null, "\t"))

LocalStrategy = require('passport-local').Strategy
Conn = require('./config/connection')
Mongoose = require('mongoose')
Schema = Mongoose.Schema

//Require models
TierList = require('./app/models/tierlist')

//Mongoose Stuff
var connectionParams = parametersJson.parameters.connection
var conn = new Conn(connectionParams.username,
	connectionParams.password,
	connectionParams.host,
	connectionParams.port,
	connectionParams.database,
	connectionParams.options
)
conn.connect(Mongoose)

//Setting Up Custom Stuff
var TierListModel = new TierList(conn, Mongoose, Schema)

app.configure(function(){
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.session({ secret: 'tierlistr' }));
	app.use(express.logger())
	//Use Angular Dir
	app.use(express.static(__dirname + '/public'))
})

//Get public folder dirs
var publicPath = 'public'
var publicDir = fs.readdirSync(publicPath)
var publicDirs = []
for(var i in publicDir){
	var path = publicDir[i]
	console.log(path)
	if(fs.lstatSync(publicPath + '/' + path).isDirectory()){
		publicDirs.push(path)
	}
	
}
console.log(JSON.stringify(publicDirs))

var routes = require('./config/routing')(app, TierListModel, publicDirs)
var port = process.env.PORT || 5000;
server.listen(port, function() {
	console.log("Listening on " + port);
});


