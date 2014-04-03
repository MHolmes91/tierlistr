module.exports = Model
function Model(conn, Mongoose, Schema){
	this.conn = conn
	var mongoose = Mongoose
	//var schema = this.createSchema()
	this.db = mongoose.connection
	//this.model = mongoose.model('Model',schema)
}

Model.prototype.connection = function(callback){
	var db = this.db
	
	console.log('connecting...')
	db.on('error', console.error.bind(console, 'connection error:'))
	db.on('disconnected', function(){console.log('disconnected')})
	//db.on('connected', function() {
	if(db.readyState == 1){
		console.log('connected!')
		if(callback){
			callback(db)
		}
		console.log('call complete')
	}
}

Model.prototype.createSchema;

Model.prototype.handleError = function(err){
	return err
}