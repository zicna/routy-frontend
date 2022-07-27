const markerList = document.querySelector('.marker-list')

class MarkerView {
  #data
  render(data) {
    this.#data = data
    this.#generateMarkap()
  }

  #generateMarkap() {
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
                <button class="btn btn-delete">X</button>
                <button class="btn btn-load-marker">L</button>
            `
    markerList.appendChild(li)
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
