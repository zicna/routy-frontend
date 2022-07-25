export const state = {
  user: {},
  userRoutes: [],
  token: '',
  message: ''
}

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
    if (!response.ok) throw new Error(`${data.error}`)

    const { user } = data.data
    const { token } = data.data

    state.user = Object.assign({}, user)
    state.token = token
  } catch (error) {
    alert(error.message)
  }
}

export const logOutUser = async function(){
  const token = state.token
  try {
    const response = await fetch("http://localhost:3000/logout", {
      method: "DELETE",
      headers:{
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json()
    if(!response.ok) throw new Error(`${data.message}`)
  
    state["message"] = data.message
    // * debugger

    
  } catch (error) {
    console.log(error)
  }
}

export const createRoute = async function (dataObject) {
  try {
    const token = state.token

    // ! when sending body along with token headers must look as line 86. ans 87.
    const response = await fetch('http://localhost:3000/routes', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObject),
    })
    const data = await response.json()

    //! guard clause
    if (!response.ok) throw new Error(`${data.message}, ${data.status}`)
    const { user } = data.data

    state.userRoutes.push({ id: user.route_id, name: user.route_name })
  } catch (error) {
    console.log(error)
  }
}

export const deleteRoute = async function (dataObject) {
  try {
    const token = state.token
    const response = await fetch(
      `http://localhost:3000/routes/${dataObject.user.route_id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObject),
      }
    )

    const data = await response.json()
    // ! quard clause
    if (!response.ok) throw new Error(`${data.message}, ${data.status}`)

    const { user } = data.data

    state.userRoutes = state.userRoutes.filter(
      (route) => route.id != user.route_id
    )
  } catch (error) {
    alert(error)
  }
}
