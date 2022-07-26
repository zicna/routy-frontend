// ! mistake view should nOT know anything about state (model)
// import { state } from './model.js'

const credentials = document.querySelector(".credentials")
const messageContainer = document.querySelector(".message-container")

class UserView{
    _data;

    render(data){
        this._data = data
        this.generateMarkup()
    }
    generateMarkup(){
        credentials.innerHTML = `
        <p>
            ${this._data.email}
        </p>
        `
    }

    logOutUser(message){
        credentials.innerHTML= ``
        messageContainer.innerHTML = `${message}`
    }

}

export default new UserView();