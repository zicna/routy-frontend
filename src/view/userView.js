const credentials = document.querySelector('.credentials')
import { userName } from '../helpers/viewHelper.js'

class UserView {
  #data

  render(data) {
    this.#data = data
    this.#generateMarkup()
  }
  
  #generateMarkup() {
    credentials.innerHTML = `
            <div class="user">
                <ion-icon name="person-outline"></ion-icon>
                    ${userName(this._data.user.email)}
            </div>
        `
  }

  logOutUser() {
    credentials.innerHTML = ``
  }
}

export default new UserView()