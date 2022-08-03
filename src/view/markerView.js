const markerList = document.querySelector('.marker-list')
const markerMsgContainer = document.getElementById('marker-msg-container')

class MarkerView {
  #data
  render(data) {
    this.#data = data
    this.#generateMarkap()
  }

  

  #generateMarkap() {
    if (this.#data.length == 0) {
      markerMsgContainer.innerHTML = `
      <p>
      Please wait for the map to be loaded. Click on the map to display the new marker form.
      </p>
      `
      return
    }
    this.#data.forEach((marker) => {
      const li = document.createElement('li')
      li.dataset.markerId = marker.id
      li.innerHTML = `
        <div class="card marker-${marker.category}">
          <div class="card-main">
            <div class="name-display">${marker.name}</div>
            <div class="text-display">${marker.description}</div> 
          </div>
          <div card="card-btns">
            <button class="btn-marker btn-small btn-cancel">del</button>
            <button class="btn-marker btn-small btn-load-marker">load</button>
          </div>
        </div>
      `
      markerList.appendChild(li)
    })
  }

  addNewMarker(marker) {
    const li = document.createElement('li')
    li.dataset.markerId = marker.id
    li.innerHTML = `
    <div class="card marker-${marker.category}">
    <div class="card-main">
      <div class="name-display">${marker.name}</div>
      <div class="text-display">${marker.description}</div> 
    </div>
    <div card="card-btns">
      <button class="btn-marker btn-small btn-cancel">del</button>
      <button class="btn-marker btn-small btn-load-marker">load</button>
    </div>
  </div>
    `
    markerList.prepend(li)
  }

  removeMarker(id) {
    markerList.childNodes.forEach((li) => {
      if (li.dataset.markerId == id) li.remove()
    })
  }

  clear() {
    markerList.innerHTML = ''
  }
}

export default new MarkerView()
