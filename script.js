import User from './modules/user.js'

console.log('hello')

const user = new User('example@mail.com')

// console.log(user.email)
user.getEmail()

const maliKrug = user.addRoute('mali krug')

console.dir(maliKrug)
maliKrug.getName()
maliKrug.addPin(123, 123)
console.dir(maliKrug)

// * Application Architecture
const form = document.querySelector('.form')
const formEmail = document.querySelector('#email')
const formPassword = document.querySelector('#password')
const formPasswordConfirmation = document.querySelector(
  '#password-confirmation'
)
const submitUser = document.getElementById('submit-user')

const handleUserSubmit = (event) => {
  event.preventDefault()
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
      'COntent-Type': 'application/json',
    },
    body: JSON.stringify(userObject),
  }).then((response) => response.json()).then(data => console.log(data))
}

form.addEventListener('submit', handleUserSubmit)
