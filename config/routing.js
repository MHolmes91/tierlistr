module.exports = Router

function Router(app, controllers, publicDirs){
	this.app = app
	this.controllers = controllers
	this.publicDirs = publicDirs
}

Router.prototype.routeListeners = function (){
	//Can't go directly to root is a problem
	//RegEx creator for all publicDirs
	var regString = "^"
	for(i in this.publicDirs){
		var path = this.publicDirs[i]
		regString += "(/" + path + "/.*)|"
	}
	regString = regString.slice(0,-1)
	regString += "$"
	//console.log(regString)
	var publicRegEx = new RegExp(regString,"g")
	
	var apiRoot = '/api'

	//Handle api routes
	for(var i = 0; i < this.controllers.length; i++){
		this.controllers[i].routes(this.app, apiRoot)
	}
	
	//Don't do anything to a URL that is a public path
	this.app.get(publicRegEx, function(request, response){
	});
	
	//Everything else is an angular path
	this.app.get("*", function(request, response){
		return response.redirect("/#" + request.url)
	});
	
}



