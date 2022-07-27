// * HTML id's naming convention snake_case
// import User from './modules/user.js'
// import App from './modules/app.js'

// * importing from MVC architecure
import * as model from './src/model.js'
import userView from './src/view/userView.js'
import routeView from './src/view/routeView.js'
import mapView from './src/view/mapView.js'

// * Application Architecture
// ***************************************************
// * buttons

const userCredentialsBtns = document.getElementById('user-credentials-btns')

const logOutBtn = document.getElementById("logout_user")


//* user form
const userForm = document.getElementById('user_form')
const formEmail = document.querySelector('#email')
const formPassword = document.querySelector('#password')
const formPasswordConfirmation = document.querySelector(
  '#password_confirmation'
)
const cancelSubmitUser = document.getElementById('cancel_submit_user')
const userLogout = document.getElementById('logout_user')
//* marker form and buttons

const mapContainer = document.querySelector(".map-container")

// ***************************************************
// * toggle hide class to handle clicks on page

const showUserForm = (event) => {
  if (event.target.id == 'user-credentials-btns') return

  if (event.target.id == 'btn_sign_up') {
    userForm.dataset.action = 'signup'
    userForm.classList.toggle('hide')
    userCredentialsBtns.classList.toggle('hide')
    return
  }

  if (event.target.id == 'btn_login') {
    userForm.dataset.action = 'login'
    userForm.classList.toggle('hide')
    userCredentialsBtns.classList.toggle('hide')
    return
  }
}

const hideUserForm = () => {
  userForm.reset()
  userForm.classList.toggle('hide')
  userCredentialsBtns.classList.toggle('hide')
}

const hideUserFormShowLogout = () => {
  userForm.reset()
  userForm.classList.toggle('hide')
  userLogout.classList.toggle('hide')
}
// ***************************************************
// * AJAX requests

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

    const action = event.target.dataset.action
    await model.loadUser(userObject, action)

    if (model.state.token) {
      userView.render(model.state)

      event.target.reset()
      // !call something to load map with current user navigation
      mapView.render()

      hideUserFormShowLogout()
      return
    }
    hideUserForm()
  } catch (error) {
    // ! temp erorr handeling
    console.log(`${error} 💥💥💥💥`)
  }
}

const handleUserLogOut = async function(event){
  try {
    // *log out user form model
    await model.logOutUser()
    // * log out user from view
    userView.logOutUser(model.state.message)

    mapView.removeMap()

    userCredentialsBtns.classList.toggle('hide')
    logOutBtn.classList.toggle('hide')

  } catch (error) {
    console.log(error)
  }
}

// * Event Listeners
// *****************************************************************
userCredentialsBtns.addEventListener('click', showUserForm)
cancelSubmitUser.addEventListener('click', hideUserForm)

userForm.addEventListener('submit', handleUserSubmit)

logOutBtn.addEventListener('click', handleUserLogOut)

// *****************************************************************

