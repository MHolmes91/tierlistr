module.exports = Conn
function Conn(){
	
	this.username = encodeURIComponent('')
	this.password = encodeURIComponent('')
	this.host = encodeURIComponent('')
	this.port = encodeURIComponent('')
	this.database = encodeURIComponent('')
	this.options = encodeURIComponent('')
}

function Conn(username, password, host, port, database, options){
	this.username = encodeURIComponent(username)
	this.password = encodeURIComponent(password)
	this.host = encodeURIComponent(host)
	this.port = encodeURIComponent(port)
	this.database = encodeURIComponent(database)
	this.options = encodeURIComponent(options)
}

Conn.prototype.createConnection = function(mongoose){
	return mongoose.createConnection('mongodb://' + this.username + 
		':' + this.password +
		'@' + this.host +
		':' + this.port +
		'/' + this.database
	)
}

Conn.prototype.connect = function(mongoose){
	console.log('mongodb://' + this.username + 
		':' + this.password +
		'@' + this.host +
		':' + this.port +
		'/' + this.database
	)
	return mongoose.connect('mongodb://' + this.username + 
		':' + this.password +
		'@' + this.host +
		':' + this.port +
		'/' + this.database
	)
}