// ! mistake view should nOT know anything about state (model)
// import { state } from './model.js'

const credentials = document.querySelector(".credentials")

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

}

export default new UserView();