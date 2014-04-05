module.exports = TierList

var Model = require('./model');
var inherits = require('util').inherits

function TierList(odm){
	Model.call(this, odm.conn, odm.Mongoose, odm.Schema);
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
