const markerList = document.querySelector('.marker-list')
const markerMsgContainer = document.getElementById("marker-msg-container")


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
                <p>${marker.name}</p>
                Category: <span>${marker.category}</span>
                <p>Description: ${marker.description}</p> 
                <button class="btn btn-delete-marker">X</button>
                <button class="btn btn-load-marker">L</button>
            `
      markerList.appendChild(li)
    })
  }

  addNewMarker(marker) {
    const li = document.createElement('li')
    li.dataset.markerId = marker.id
    li.innerHTML = `
                <p>${marker.name}</p>
                Category: <span>${marker.category}</span>
                <p>Description: ${marker.description}</p> 
                <button class="btn btn-delete-marker">X</button>
                <button class="btn btn-load-marker">L</button>
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
