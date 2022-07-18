export const state = {
    user: {},
    userRoutes: [],
    token: ''
}

export const loadUser = async function(userObject){
try {
    const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
      });

    const data = await response.json()

    if(!response.ok) throw new Error(`${data.message}, ${data.status}`)
    
    const {user} = data.data;
    const {token} = data.data;
    debugger

    state.user = Object.assign({}, user)
    state.token = token;
    
} catch (error) {
    alert(error)
}
}