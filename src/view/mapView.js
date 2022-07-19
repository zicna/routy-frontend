const mapContainer = document.querySelector(".map-container")

class MapView{
    _lat;
    _long;
render(){
    const success = (geolocationPosition) => {
        console.log("success")
        console.dir(geolocationPosition)
        this._lat = geolocationPosition.coords.latitude
        this._long = geolocationPosition.coords.longitude
        mapContainer.innerHTML = `
        <a target="_blank" href="https://www.google.com/maps/@${this._lat},${this._long}z">
            click here to go to your location 
        </a>
        `
        debugger
    }
    
    const error = () => {
        console.log("error")
    }
    navigator.geolocation.getCurrentPosition(success, error)
}
}

export default new MapView()