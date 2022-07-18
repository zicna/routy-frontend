export const state = {
  user: {},
  userRoutes: [],
  token: '',
}

// ! loadUser is NOT a pure function since it is manipulating state
export const loadUser = async function (userObject) {
  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userObject),
    })

    const data = await response.json()

    if (!response.ok) throw new Error(`${data.message}, ${data.status}`)

    const { user } = data.data
    const { token } = data.data

    state.user = Object.assign({}, user)
    state.token = token
  } catch (error) {
    return
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
    
    state.userRoutes.push(user.route_name)
    debugger

    // .then(({ data }) => {
    //   console.log(data)
    //   //   debugger
    //   const routeLI = document.createElement('li')
    //   routeLI.innerHTML = `
    //   ${data.user.route_name}
    //   `
    //   routesContainer.appendChild(routeLI)
    // })
  } catch (error) {
    console.log(error)
  }
}
