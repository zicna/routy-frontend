// ! HTML id's naming convention snake_case

import User from './modules/user.js'
import App from './modules/app.js'

// ! importing from MVC architecure
import * as model from './src/model.js'

// const user = new User('example@mail.com')
// user.getEmail()

// const maliKrug = user.addRoute('mali krug')

// console.dir(maliKrug)
// maliKrug.getName()
// maliKrug.addPin(123, 123)
// console.dir(maliKrug)

// * Application Architecture
// ***************************************************
// * buttons
const btnSignin = document.getElementById('btn_signin')
const btnAddRoute = document.getElementById('add_route')

const credentials = document.querySelector(".credentials")
const routesContainer = document.querySelector(".routes-container")

//* user form
const form = document.querySelector('.form')
const formEmail = document.querySelector('#email')
const formPassword = document.querySelector('#password')
const formPasswordConfirmation = document.querySelector(
  '#password_confirmation'
)
const submitUser = document.getElementById('submit_user')

//* route form
const routeForm = document.getElementById('route_form')
const routeName = document.getElementById('route_name')

// ***************************************************
const handleAddRouteClick = (event) => {
  btnAddRoute.style.display = 'none'
  routeForm.style.display = 'block'
}
const handleSigninClick = (event) => {
  console.log('hello world: ))))')
  btnSignin.style.display = 'none'
  form.style.display = 'block'
}

const handleUserSubmit = (event) => {
  event.preventDefault()
  // console.log(event)

  const userObject = {
    user: {
      email: formEmail.value,
      password: formPassword.value,
      password_confirmation: formPasswordConfirmation.value,
    },
  }

  model.loadUser(userObject)

  // fetch('http://localhost:3000/signup', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(userObject),
  // })
  //   .then((response) => {
  //     console.log(response)
  //     return response.json()
  //   })
  //   .then(({ data }) => {
  //     console.log(data)
  //     const userEmail = data.user.email
  //     const token = data.token
  //     const routes = data.user.routes || []

  //     const user = new User(userEmail, token, routes)
  //     console.log(user)

  //     const app = new App()
  //     app.setToken(token)
  //     credentials.innerHTML = `
  //     <p>
  //       email: ${user.getEmail()}
  //     </p>
  //     `
  //     //   debugger
  //   })
  //   .catch((error) => console.log(error))

  event.target.reset()
  btnAddRoute.style.display = "block"
  form.style.display = 'none'
}

const handleRouteSubmit = (event) => {
  // !hard code the token
  event.preventDefault()
  const token = localStorage.getItem("token")
  const dataObject = {
    user: { route_name: routeName.value },
  }

  // ! when sending body along with token headers must look as line 86. ans 87.
  fetch('http://localhost:3000/routes', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataObject),
  })
    .then((response) => response.json())
    .then(({ data }) => {
      console.log(data)
    //   debugger
      const routeLI = document.createElement("li")
      routeLI.innerHTML = `
      ${data.user.route_name}
      `
      routesContainer.appendChild(routeLI)
    })
    event.target.reset()
}

// * Event Listeners
// *****************************************************************
form.addEventListener('submit', handleUserSubmit)
routeForm.addEventListener('submit', handleRouteSubmit)
btnSignin.addEventListener('click', handleSigninClick)
btnAddRoute.addEventListener('click', handleAddRouteClick)

// *****************************************************************
