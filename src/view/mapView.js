const mapContainer = document.querySelector('.map-container')
const markerForm = document.getElementById('marker_form')
const markerLatitude = document.getElementById('marker_latitude')
const markerLongitude = document.getElementById('marker_longitude')
const markerMsgContainer = document.getElementById('marker-msg-container')

import * as helper from '../helpers/viewHelper.js'

class MapView {
  #long
  #lat
  #map
  #zoomLevel = 10

  // ***************** API of a MapView class ********************
  render() {
    this.#getLocation()
  }

  moveToPopup(markerObject) {
    const coors = [markerObject.latitude, markerObject.longitude]

    this.#map.setView(coors, this.#zoomLevel, {
      animate: true,
      pan: {
        duration: 1.5,
      },
    })
  }

  removeMap() {
    if (this.#map && this.#map.remove) {
      this.#map.off()
      this.#map.remove()
    }
  }

  loadMarker(markerObject) {
    const coors = [markerObject.latitude, markerObject.longitude]
    this.#map.setView(coors, this.#zoomLevel, {
      animate: true,
      pan: {
        duration: 1.5,
      },
    })

    const marker = L.marker(coors)
    const markerLayer = L.layerGroup().addTo(this.#map)

    marker
      .addTo(this.#map)
      .addTo(markerLayer)
      .bindPopup(
        L.popup({
          maxWidtht: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'popup',
        })
      )
      .setPopupContent(`${markerObject.name}`)
      .openPopup()

    marker.on('dblclick', function () {
      markerLayer.removeLayer(this._leaflet_id)
    })
  }

  // *************************************


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
    this.#map = L.map(mapContainer).setView(coors, this.#zoomLevel)

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map)

    this.#map.on('click', this.#showMarkerForm.bind(this))
  }

  #showMarkerForm(mapEvent) {
    helper.clearContainer(markerMsgContainer)
    markerForm.classList.toggle('hide')
    this.#setLatAndLong(mapEvent.latlng)
  }

  #setLatAndLong({ lat, lng }) {
    markerLatitude.value = lat
    markerLongitude.value = lng
  }
  
}

export default new MapView()
