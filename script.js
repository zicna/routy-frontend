// ! HTML id's naming convention snake_case
import User from './modules/user.js'
import App from './modules/app.js'

// ! importing from MVC architecure
import * as model from './src/model.js'
import userView from './src/view/userView.js'
import routeView from './src/view/routeView.js'

// * Application Architecture
// ***************************************************
// * buttons
const btnSignin = document.getElementById('btn_signin')
const btnAddRoute = document.getElementById('add_route')

// const routesContainer = document.querySelector('.routes-container')

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

const handleUserSubmit = async function (event) {
  try {
    event.preventDefault()

    const userObject = {
      user: {
        email: formEmail.value,
        password: formPassword.value,
        password_confirmation: formPasswordConfirmation.value,
      },
    }

    await model.loadUser(userObject)
    if(!model.state.token) throw new Error("something went wrong")

    userView.render(model.state.user)

    event.target.reset()
    btnAddRoute.style.display = 'block'
    form.style.display = 'none'
    
  } catch (error) {
    alert(error)
    event.target.reset()
  }
}

const handleRouteSubmit = async function(event){
  event.preventDefault()


  const dataObject = {
    user: { route_name: routeName.value },
  }
try {
  await model.createRoute(dataObject)
  routeView.render(model.state.userRoutes)
} catch (error) {
  alert(error)
}
  event.target.reset()

}

// * Event Listeners
// *****************************************************************
form.addEventListener('submit', handleUserSubmit)
routeForm.addEventListener('submit', handleRouteSubmit)
btnSignin.addEventListener('click', handleSigninClick)
btnAddRoute.addEventListener('click', handleAddRouteClick)

// *****************************************************************
