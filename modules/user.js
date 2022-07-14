export default class User{
    _email;
    constructor(email){
        this._email = email
    }

    getEmail(){
        console.log(this._email)
    }
}