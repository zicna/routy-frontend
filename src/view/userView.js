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
        messageContainer.innerHTML = `${this._data.message}`
        credentials.innerHTML = `
        <p>
            ${this._data.user.email}
        </p>
        `
        this.#clearMsgContainer()
    }
    
    logOutUser(message){
        credentials.innerHTML= ``
        messageContainer.innerHTML = `${message}`
        this.#clearMsgContainer()
    }

    #clearMsgContainer(){
        setTimeout(()=>{
            messageContainer.innerHTML = ``
        }, 3000)
    }

}

export default new UserView();