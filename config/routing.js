module.exports = function (app, TierListModel, publicDirs){
	//Can't go directly to root is a problem
	//RegEx creator for all publicDirs
	regString = "^"
	for(i in publicDirs){
		var path = publicDirs[i]
		regString += "(/" + path + "/.*)|"
	}
	regString = regString.slice(0,-1)
	regString += "$"
	console.log(regString)
	publicRegEx = new RegExp(regString,"g")
	
	apiRoot = '/api'
	
	//Handle api routes
	TierListModel.routes(app, apiRoot)
	
	//Don't do anything to a URL that is a public path
	app.get(publicRegEx, function(request, response){
	});
	
	//Everything else is an angular path
	app.get("*", function(request, response){
		return response.redirect("/#" + request.url)
	});
	
}



