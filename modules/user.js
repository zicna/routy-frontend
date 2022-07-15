import Route from "./route.js";

export default class User{
    _email;
    _routes;
    _token;
    constructor(email, token, routes){
        this._email = email
        this._routes = routes
        this._token = token
    }

    getEmail(){
        return this._email
    }

    addRoute(routeName){
        const route = new Route(routeName)
        this._routes.push(route)
        return route
    }
}