export let state = {
  user: {},
  userMarkers: [],
  token: '',
  message: '',
}

export const resetState = () => {
  state = {
    user: {},
    userMarkers: [],
    token: '',
    message: '',
  }
}
// * creating deep copy of state
export const copyState = () => JSON.parse(JSON.stringify(state))

// ! loadUser is NOT a pure function since it is manipulating state
export const loadUser = async function (userObject, action) {
  try {
    const response = await fetch(`http://localhost:3000/${action}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
    })

    const data = await response.json()
    if (!response.ok) throw new Error(`${data.message}`)
    
    const { user } = data.data
    const { token } = data.data
    const { message } = data.data
    const { userMarkers } = data.data

    state = {
      user: user,
      userMarkers: userMarkers,
      token: token,
      message: message,
    }
  } catch (error) {
    alert(error.message)
  }
}

export const logOutUser = async function () {
  const token = state.token
  try {
    const response = await fetch('http://localhost:3000/logout', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (!response.ok) throw new Error(`${data.message}`)
    resetState()
    state['message'] = data.message
  } catch (error) {
    console.log(error)
  }
}

export const createMarker = async function (object) {
  try {
    const token = state.token
    const response = await fetch('http://localhost:3000/markers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`${data.message}, ${data.status}`)
    }
    const { marker } = data.data.user
    // ! ERROR returned value after pushing into array => new array length
    // const userMarkers = [...state.userMarkers].push(marker)

    state = copyState()
    state.userMarkers.push(marker)
  } catch (error) {
    console.log(error)
  }
}

export const deleteMarker = async function (markerId) {
  try {
    const response = await fetch(`http://localhost:3000/markers/${markerId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${state.token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
    if (!response.ok) throw new Error(`${data.message}`)
    const delMarkerId = data.data.marker.id
    state = copyState()
    state.userMarkers = state.userMarkers.filter(
      (marker) => marker.id != delMarkerId
    )
  } catch (error) {
    console.log(error)
  }
}
