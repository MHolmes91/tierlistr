module.exports = TierListController

TierList = require('../models/tierList');

function TierListController(odm){
	this.tierListModel = new TierList(odm)
}

//Separate out into a base?
//Routes for this CRUD Type
//Redesign with success attribute
TierListController.prototype.routes = function(app, apiRoot){
	self = this
	app.get(apiRoot + '/tierlist', function(request,response){
		var query = request.query.query
		var fields = request.query.fields
		var offset = request.query.offset
		var limit = request.query.limit
		var sort = request.query.sort
		self.tierListModel.getModels(query, fields, offset, limit, sort, function(result){
			response.json(result)
		})
	})

	app.post(apiRoot + '/tierlist', function(request,response){
		self.tierListModel.createModel(request.body, function(result){
			response.json(result)
		})
	})

	app.put(apiRoot + '/tierlist/:id', function(request,response){
		self.tierListModel.editModel(request.params.id, request.body, function(result){
			response.json(result)
		})
	})

	app.delete(apiRoot + '/tierlist/:id', function(request,response){
		self.tierListModel.deleteModel(request.params.id, function(result){
			response.json(result)
		})
	})
}