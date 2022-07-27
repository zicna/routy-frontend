// * HTML id's naming convention snake_case
// import User from './modules/user.js'
// import App from './modules/app.js'

// * importing from MVC architecure
import * as model from './src/model.js'
import userView from './src/view/userView.js'
import mapView from './src/view/mapView.js'
import markerView from './src/view/markerView.js'

// * Application Architecture
// ***************************************************
// * buttons

const userCredentialsBtns = document.getElementById('user-credentials-btns')

const logOutBtn = document.getElementById('logout_user')

//* user form
const userForm = document.getElementById('user_form')
const formEmail = document.querySelector('#email')
const formPassword = document.querySelector('#password')
const formPasswordConfirmation = document.querySelector(
  '#password_confirmation'
)
const cancelSubmitUser = document.getElementById('cancel_submit_user')
const userLogout = document.getElementById('logout_user')
//* marker form, inputs, and button
const markerForm = document.getElementById('marker_form')
const markerBtnCancel = document.getElementById('marker_cancel')
const markerList = document.querySelector(".marker-list")

const markerName = document.getElementById('marker_name')
const markerCategory = document.getElementById('marker_category')
const markerDescription = document.getElementById('marker_description')
const markerColor = document.getElementById('marker_color')
const markerLatitude = document.getElementById('marker_latitude')
const markerLongitude = document.getElementById('marker_longitude')
// * map
const mapContainer = document.querySelector('.map-container')

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

      markerView.render(model.state.userMarkers)

      hideUserFormShowLogout()
      return
    }
    hideUserForm()
  } catch (error) {
    // ! temp erorr handeling
    console.log(`${error} 💥💥💥💥`)
  }
}

const handleUserLogOut = async function (event) {
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

const handleMarkerSubmit = async function (event) {
  event.preventDefault()
  const markerObject = {
    marker: {
      name: markerName.value,
      category: markerCategory.value,
      description: markerDescription.value,
      color: markerColor.value,
      latitude: markerLatitude.value,
      longitude: markerLongitude.value,
    },
  }

  try {
      await model.createMarker(markerObject)
      markerView.addNewMarker(model.state.userMarkers.slice(-1)[0])
  } catch (error) {
    console.log(error)
  } finally {
    markerForm.reset()
    markerColor.value = '#000000'
    markerForm.classList.toggle('hide')
  }
}

const handleCancelMarker = function(){
  markerForm.reset()
  markerColor.value = '#000000'
  markerForm.classList.toggle('hide')
}

const handleMarkerListClick = async function(event){
  // console.log("hellooooo")
  if(!event.target.classList.contains("btn")) return 
  if(event.target.classList.contains("btn-delete-marker")){
    const markerId = event.target.parentElement.dataset.markerId
    markerView.removeMarker(markerId)
    await model.deleteMarker(markerId)
    return 
  }
  if(event.target.classList.contains("btn-load-marker")){
    const markerId = event.target.parentElement.dataset.markerId
    const markerObject = model.state.userMarkers.filter(marker => marker.id == markerId)[0]

    mapView.loadMarker(markerObject)
  }

}

// * Event Listeners
// *****************************************************************
userCredentialsBtns.addEventListener('click', showUserForm)
cancelSubmitUser.addEventListener('click', hideUserForm)

userForm.addEventListener('submit', handleUserSubmit)

logOutBtn.addEventListener('click', handleUserLogOut)

markerForm.addEventListener('submit', handleMarkerSubmit)
markerBtnCancel.addEventListener('click', handleCancelMarker)
markerList.addEventListener('click', handleMarkerListClick)
// *****************************************************************
