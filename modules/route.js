import Pin from "./pin.js"

export default class Route{
    _pins=[];
    constructor(name){
        this._name = name;
    }

    getName(){
        console.log(this._name)
    }

    addPin(lat, long){
        const pin = new Pin(lat, long)
        this._pins.push(pin)
    }
}