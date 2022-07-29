export const clearContainer = (node) => {
    setTimeout(() => {
      node.innerHTML = ``
    }, 4000)
  }

  export const addContentTo = (message, node) => {
    node.innerHTML = message
  }