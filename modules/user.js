import Route from "./route.js";

export default class User{
    _email;
    _routes = []
    constructor(email){
        this._email = email
    }

    getEmail(){
        console.log(this._email)
    }

    addRoute(routeName){
        const route = new Route(routeName)
        this._routes.push(route)
        return route
    }
}