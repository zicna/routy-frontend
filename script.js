import User from './modules/user.js'
import App from './modules/app.js'

// const user = new User('example@mail.com')
// user.getEmail()

// const maliKrug = user.addRoute('mali krug')

// console.dir(maliKrug)
// maliKrug.getName()
// maliKrug.addPin(123, 123)
// console.dir(maliKrug)

// * Application Architecture
// ***************************************************
const form = document.querySelector('.form')
const formEmail = document.querySelector('#email')
const formPassword = document.querySelector('#password')
const formPasswordConfirmation = document.querySelector(
  '#password-confirmation'
)
const submitUser = document.getElementById('submit-user')

// ***************************************************

const handleUserSubmit = (event) => {
  event.preventDefault()
  console.log(event)
  const userObject = {
    user: {
      email: formEmail.value,
      password: formPassword.value,
      password_confirmation: formPasswordConfirmation.value,
    },
  }

  fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObject),
  })
    .then((response) => {
      console.log(response)
      return response.json()
    })
    .then(({data}) => {
      console.log(data)
      const userEmail = data.user.email
      const token = data.token
      const routes = data.routes || []

      const user = new User(userEmail, token, routes)
      console.log(user)
    })
    .catch((error) => console.log(error))
}

form.addEventListener('submit', handleUserSubmit)
