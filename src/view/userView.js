// ! mistake view should nOT know anything about state (model)
// import { state } from './model.js'

const credentials = document.querySelector('.credentials')
const messageContainer = document.querySelector('.message-container')
import { userName } from '../helpers/viewHelper.js'

class UserView {
  _data

  render(data) {
    this._data = data
    this.generateMarkup()
  }
  generateMarkup() {
    credentials.innerHTML = `
            <div class="user">
                <ion-icon name="person-outline"></ion-icon>
                    ${userName(this._data.user.email)}
            </div>
            <button class="btn-small btn-logout" id="logout_user">Log Out</button>
        `
  }

  logOutUser() {
    credentials.innerHTML = ``
  }
}

export default new UserView()
