const mapContainer = document.querySelector('.map-container')

class MapView {
  #long
  #lat
  #map
  render() {
    this.#getLocation()
  }

  #getLocation() {
    if (!navigator.geolocation)
      return alert('Sorry your browser does not support geolocation')
    navigator.geolocation.getCurrentPosition(
      this.#successCallback.bind(this),
      this.#errorCallback.bind(this)
    )
  }
  #successCallback(position) {
    this.#lat = position.coords.latitude
    this.#long = position.coords.longitude

   this.#loadMap()
  }
  #errorCallback(error) {
    if (error.code == 1) {
      mapContainer.innerHTML =
        "You've decided not to share your position, but it's OK. We won't ask you again."
    } else if (error.code == 2) {
      mapContainer.innerHTML =
        "The network is down or the positioning service can't be reached."
    } else if (error.code == 3) {
      mapContainer.innerHTML =
        'The attempt timed out before it could get the location data.'
    } else {
      mapContainer.innerHTML = 'Geolocation failed due to unknown error.'
    }
  }

  #loadMap() {
    const coors = [this.#lat, this.#long]
    const zoomLevel = 10
    this.#map = L.map(mapContainer).setView(coors, zoomLevel)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map)

    this.#map.on('click', this.#showPinForm.bind(this)
    // function (mapEvent) {
    //   const { lat, lng } = mapEvent.latlng
    //   L.marker([lat, lng])
    //     .addTo(map)
    //     .bindPopup(
    //       L.popup({
    //         maxWidtht: 250,
    //         minWidth: 100,
    //         autoClose: false,
    //         closeOnClick: false,
    //         className: 'popup',
    //       })
    //     )
    //     .setPopupContent('Workout')
    //     .openPopup()
    // }
    )
  }

  #showPinForm(mapEvent) {
    
  }
  removeMap(){
    if(this.#map && this.#map.remove){
      this.#map.off()
      this.#map.remove()
    }
  }
}

export default new MapView()
