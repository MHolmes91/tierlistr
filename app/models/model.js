module.exports = Model
function Model(conn, Mongoose, Schema){
	this.conn = conn
	var mongoose = Mongoose
	//var schema = this.createSchema()
	this.db = mongoose.connection
	this.model;
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
	return {
		success: 0,
		result: err
	}
}

//No parameters yet
Model.prototype.getModels = function(query, fields, offset, limit, sort, callback){
	if(!query){
		query = {}
	}
	else{
		if(typeof query !== 'object'){
			query = JSON.parse(query)
		}
	}
	if(!fields){
		fields = null
	}
	else{
		if(typeof field !== 'object'){
			fields = JSON.parse(fields)
		}
	}
	if(!offset){
		offset = 0
	}
	if(!limit || limit > 100){
		limit = 10
	}
	if(!sort){
		sort = {}
	}
	else{
		if(typeof sort !== 'object'){
			sort = JSON.parse(sort)
		}
	}
	console.log(query)
	console.log(fields)
	console.log(sort)
	var self = this
	this.connection(function(db){
		var Model = self.model
		Model.count(query, function(err, count){
			if(err){
				console.log(err)
				return self.handleError(err)
			}
			if(!count || count < 1){
				result = {
					success: 1,
					count: 0,
					result: []
				}
				//Hollaback
				if(callback){
					callback(result)
				}
				else{
					return result
				}
			}
			Model.find(query, fields, {skip: offset, limit: limit, sort: sort}, function(err, models){
				if(err){
					console.log(err)
					return self.handleError(err)
				}
				console.log('Got models')
				console.log(JSON.stringify(models))
				result = {
					success: 1,
					count: count,
					result: models
				}
				//Hollaback
				if(callback){
					callback(result)
				}
				else{
					return result
				}
			})
		})
	})
}

//Create a new model
Model.prototype.createModel = function(model, callback){
	var self = this
	this.connection(function(db){
		var Model = self.model
		var created = new Model(model)
		created.save(function (err) {
  			if (err) {
  				console.log(err)
  				return self.handleError(err)
  			}
  			else{
  				console.log('saved model')
  				result = {
  					success:1,
  					result: model
  				}
  				//Hollaback
  				if(callback){
  					callback(result)
  				}
  				else{
  					return result
  				}
  			}
		})
	})
}

//Update a model
Model.prototype.editModel = function(modelId, model, callback){
	delete model._id
	var self = this
	this.connection(function(db){
		console.log("updating..."  + modelId)
		var Model = self.model
		Model.findOneAndUpdate({_id: modelId}, model, function (err) {
			console.log('saving...')
  			if (err) {
  				console.log(err)
  				return self.handleError(err)
  			}
  			else{
  				console.log('updated model!' + modelId)
  				result = {
  					success: 1,
  					result: model
  				}
  				//Hollaback
  				if(callback){
  					callback(result)
  				}
  				else{
  					return result
  				}
  			}
		})
	})
}

//Delete a model
Model.prototype.deleteModel = function(modelId, callback){
	var self = this
	this.connection(function(db){
		var Model = self.model
		console.log("finding to delete...")
		Model.findByIdAndRemove(modelId, function (err, model) {
			console.log('deleting...')
  			if (err) {
  				console.log(err)
  				return self.handleError(err)
  			}
  			else{
  				console.log('deleted model!' + modelId)
  				result = {
  					success:1,
  					result: model}
  				//Hollaback
  				if(callback){
  					callback(result)
  				}
  				else{
  					return result
  				}
  			}
		})
	})
}