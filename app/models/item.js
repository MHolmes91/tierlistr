module.exports = Item

var Model = require('./model');
var inherits = require('util').inherits

function Item(odm){
	Model.call(this, odm.conn, odm.Mongoose, odm.Schema);
	var schema = this.createSchema()
	this.model = Mongoose.model('Item',schema)
}

inherits(Item, Model)

Item.prototype.createSchema = function(){
	return new Schema({
		name: {type: String},
		description: {type: String},
		picture: {type: String},
		tierList: {type: String},	//Should be ID
		rank: {type: Number}
	});
}

Item.prototype.getItemsFor = function(tierListId, callback){
	var query = { tierList: tierListId }
	var sort = { rank: 1 }
	console.log(query)
	console.log(sort)
	var self = this
	this.connection(function(db){
		var Item = self.model
		Item.count(query, function(err, count){
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
			Item.find(query, null, {sort: sort}, function(err, items){
				if(err){
					console.log(err)
					return self.handleError(err)
				}
				console.log('Got items for tier list' + tierListId)
				console.log(JSON.stringify(items))
				result = {
					success: 1,
					count: count,
					result: items
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
