module.exports = TierList

var Model = require('./model.js');
var inherits = require('util').inherits

function TierList(conn, Mongoose, Schema){
	Model.call(this, conn, Mongoose, Schema);
	var schema = this.createSchema()
	this.model = Mongoose.model('TierList',schema)
}

inherits(TierList, Model)

TierList.prototype.createSchema = function(){
	var TierSchema = new Schema({
		rank: {type:Number},
		name: {type: String},
		description: {type: String},
		picture: {type: String}
	});
	return new Schema({
		name: {type: String},
		description: {type: String},
		picture: {type: String},
		tiers: {type: [TierSchema]}
	});
}

TierList.prototype.getTierLists = function(callback){
	var self = this
	this.connection(function(db){
		var TierListModel = self.model
		TierListModel.find({}, function(err,tierLists){
			console.log('Got tier lists')
			console.log(JSON.stringify(tierLists))
			result = tierLists
			//Hollaback
			if(callback){
				callback(result)
			}
			else{
				return result
			}
		})
	})
}

//Create a new blog
TierList.prototype.createTierList = function(tierList, callback){
	var self = this
	this.connection(function(db){
		var TierListModel = self.model
		var created = new TierListModel(tierList)
		created.save(function (err) {
  			if (err) {
  				console.log(err)
  				return self.handleError(err)
  			}
  			else{
  				console.log('saved tier list')
  				result = {success:1}
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

//Routes for this CRUD Type
//Redesign with success attribute
TierList.prototype.routes = function(app, apiRoot){
	tierList = this

	app.get(apiRoot + '/tierlist', function(request,response){
		tierList.getTierLists(function(result){
			response.json(result)
		})
	})

	app.post(apiRoot + '/tierlist', function(request,response){
		tierList.createTierList(request.body, function(result){
			response.json(result)
		})
	})
}
