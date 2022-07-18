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


