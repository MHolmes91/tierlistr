module.exports = ItemController

Item = require('../models/Item');

function ItemController(odm){
	this.itemModel = new Item(odm)
}

//Separate out into a base?
//Routes for this CRUD Type
//Redesign with success attribute
ItemController.prototype.routes = function(app, apiRoot){
	var self = this
	app.get(apiRoot + '/item', function(request,response){
		var query = request.query.query
		var fields = request.query.fields
		var offset = request.query.offset
		var limit = request.query.limit
		var sort = request.query.sort
		self.itemModel.getModels(query, fields, offset, limit, sort, function(result){
			response.json(result)
		})
	})

	app.post(apiRoot + '/item', function(request,response){
		self.itemModel.createModel(request.body, function(result){
			response.json(result)
		})
	})

	app.put(apiRoot + '/item/:id', function(request,response){
		self.itemModel.editModel(request.params.id, request.body, function(result){
			response.json(result)
		})
	})

	app.delete(apiRoot + '/item/:id', function(request,response){
		self.itemModel.deleteModel(request.params.id, function(result){
			response.json(result)
		})
	})

	//Interesting Routes
	app.get(apiRoot + '/item/byTierList/:tierListId', function(request, response){
		self.itemModel.getItemsFor(request.params.tierListId, function(result){
			response.json(result)
		})
	})
}