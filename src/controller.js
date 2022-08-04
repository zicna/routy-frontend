// * importing from MVC architecure
import * as model from './model.js'
import userView from './view/userView.js'
import mapView from './view/mapView.js'
import markerView from './view/markerView.js'

import * as helper from './helpers/viewHelper.js'

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
const markerList = document.querySelector('.marker-list')

const markerName = document.getElementById('marker_name')
const markerCategory = document.getElementById('marker_category')
const markerDescription = document.getElementById('marker_description')
// * hidden input fields
const markerLatitude = document.getElementById('marker_latitude')
const markerLongitude = document.getElementById('marker_longitude')
// * map
// ! architecture related to map is moved to mapView.js
const messageContainer = document.querySelector('.message-container')

// *********************** UI ****************************
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

const hideLogOutShowLogIn = () => {
  userCredentialsBtns.classList.toggle('hide')
  logOutBtn.classList.toggle('hide')
}

const handleCancelMarker = function () {
  markerForm.reset()
  markerForm.classList.toggle('hide')
}

// *************** AJAX requests ************************************
const handleUserSubmit = async function (event) {
  event.preventDefault()
  const userObject = {
    user: {
      email: formEmail.value,
      password: formPassword.value,
      password_confirmation: formPasswordConfirmation.value,
    },
  }
  try {
    // *call something to load map with current user navigation
    mapView.render()
    // *here we distinguish whether we are signing in or logging in
    const action = event.target.dataset.action
    await model.loadUser(userObject, action)
    if (model.state.token) {
      userView.render(model.state)

      event.target.reset()
      helper.addContentTo(model.state.message, messageContainer)
      helper.clearContainer(messageContainer)
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

const handleUserLogOut = async function () {
  try {
    // *log out user from model
    await model.logOutUser()
    // * log out user from view
    userView.logOutUser()
    // *clear markers
    markerView.clear()
    mapView.removeMap()
    // * display message
    helper.addContentTo(model.state.message, messageContainer)
    helper.clearContainer(messageContainer)
    //* UI
    hideLogOutShowLogIn()
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
      latitude: markerLatitude.value,
      longitude: markerLongitude.value,
    },
  }

  try {
    // * create marker
    await model.createMarker(markerObject)
    // * add marker to UI
    markerView.addNewMarker(model.state.userMarkers[0])
    // * display message
    helper.addContentTo(model.state.message, messageContainer)
    helper.clearContainer(messageContainer)
  } catch (error) {
    console.log(error)
  } finally {
    // * no matter what happens this will run
    markerForm.reset()
    markerForm.classList.toggle('hide')
  }
}

const handleMarkerListClick = async function (event) {
  try {
    if (!event.target.classList.contains('btn-small')) {
      const id = event.target.closest('li').dataset.markerId
      const markerObject = model.state.userMarkers.find(
        (marker) => marker.id == id
      )

      mapView.moveToPopup(markerObject)
    }
    if (event.target.classList.contains('btn-cancel')) {
      const li = event.target.closest('li')
      const markerId = li.dataset.markerId

      markerView.removeMarker(markerId)
      await model.deleteMarker(markerId)
    }
    if (event.target.classList.contains('btn-load-marker')) {
      const li = event.target.closest('li')
      const markerId = li.dataset.markerId
      //! 'filter' array method returns [], so we will use 'find' method
      const markerObject = model.state.userMarkers.find(
        (marker) => marker.id == markerId
      )

      // ! we need to reset state.message since this action is not sending AJAX request
      model.setStateMessage('loading marker ... ')
      mapView.loadMarker(markerObject)
    }
  } catch (error) {
    console.log(error)
  } finally {
    helper.addContentTo(model.state.message, messageContainer)
    helper.clearContainer(messageContainer)
  }
}

// * Event Listeners
// *****************************************************************
// * UI changes only, toggle 'hide' class
userCredentialsBtns.addEventListener('click', showUserForm)
cancelSubmitUser.addEventListener('click', hideUserForm)
// * AJAX requests with UI changes to follow
userForm.addEventListener('submit', handleUserSubmit)
logOutBtn.addEventListener('click', handleUserLogOut)
// * Events related with map and marker
// *AJAX + UI
markerForm.addEventListener('submit', handleMarkerSubmit)
// * UI only
markerBtnCancel.addEventListener('click', handleCancelMarker)
//* AJAX + UI => 1. deleting marker(AJAX + UI) 2. loading to map(UI) 3. centering map(UI)
markerList.addEventListener('click', handleMarkerListClick)
// *****************************************************************
