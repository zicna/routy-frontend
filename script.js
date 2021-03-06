// ! HTML id's naming convention snake_case
import User from './modules/user.js'
import App from './modules/app.js'

// ! importing from MVC architecure
import * as model from './src/model.js'
import userView from './src/view/userView.js'
import routeView from './src/view/routeView.js'
import mapView from './src/view/mapView.js'

// * Application Architecture
// ***************************************************
// * buttons
const btnSignin = document.getElementById('btn_signin')
const btnAddRoute = document.getElementById('add_route')
//* user form
const form = document.getElementById('user_form')
const formEmail = document.querySelector('#email')
const formPassword = document.querySelector('#password')
const formPasswordConfirmation = document.querySelector(
  '#password_confirmation'
)
const submitUser = document.getElementById('submit_user')
const cancelSubmitUser = document.getElementById("cancel_submit_user")
//* route form and buttons
const routeForm = document.getElementById('route_form')
const routeName = document.getElementById('route_name')
const routeList = document.querySelector('.route-list')

// ***************************************************
// * toggle hide class to handle clicks on page
const toggleHideOne = () => {
  btnAddRoute.classList.toggle('hide')
  routeForm.classList.toggle('hide')
}
const toggleHideTwo = () => {
  form.reset()
  btnSignin.classList.toggle('hide')
  form.classList.toggle('hide')
}

const toggleHideThree = () => {
  btnAddRoute.classList.toggle('hide')
  form.classList.toggle('hide')
}
// ***************************************************

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
    if (!model.state.token) throw new Error('something went wrong')

    userView.render(model.state.user)

    event.target.reset()
    // !call something to load map with current user navigation
    mapView.render()

    toggleHideThree()

  } catch (error) {
    alert(error)
    event.target.reset()
  }
}

const handleRouteSubmit = async function (event) {
  event.preventDefault()

  const dataObject = {
    user: { route_name: routeName.value },
  }
  try {
    // ! maybe here we can just render new route name (trusting backend will work)
    await model.createRoute(dataObject)
    routeView.render(model.state.userRoutes)
  } catch (error) {
    alert(error)
  } finally {
    toggleHideOne()
  }
  event.target.reset()
}

// * using event prapagation to handle clicking on delete btn
// ! not async callback because we will have positive approach=>
// !remove form UI and trust it will be removed from backend as well
const handleDeleteRouteClick = function (event) {
  event.preventDefault()
  // ! quard clause if click event happens on ul outside of button
  if (event.target.classList.contains('btn-delete')) {
    const route = {
      user: { route_id: event.target.parentElement.dataset.routeId },
    }

    try {
      event.target.parentElement.remove()
      model.deleteRoute(route)
    } catch (error) {
      alert(error)
    }
  } else if (event.target.classList.contains('btn-load-map')) {
    // mapView.render()

  }
}


// * Event Listeners
// *****************************************************************
form.addEventListener('submit', handleUserSubmit)
routeForm.addEventListener('submit', handleRouteSubmit)
btnSignin.addEventListener('click', toggleHideTwo)
cancelSubmitUser.addEventListener("click", toggleHideTwo)
btnAddRoute.addEventListener('click', toggleHideOne)
routeList.addEventListener('click', handleDeleteRouteClick)
// *****************************************************************
