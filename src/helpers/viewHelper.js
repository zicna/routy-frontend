export const clearContainer = (node) => {
  setTimeout(() => {
    node.innerHTML = ``
  }, 3000)
}

export const addContentTo = (message, node) => {
  node.innerHTML = message
}

export const userName = (email) => {
    return email.slice(0,email.indexOf("@"))
}
