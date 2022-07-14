import User from "./modules/user.js"

console.log("hello")

const user = new User("example@mail.com")

// console.log(user.email)
user.getEmail()

const maliKrug = user.addRoute("mali krug");

console.dir(maliKrug)
maliKrug.getName()
maliKrug.addPin(123, 123)
console.dir(maliKrug)
