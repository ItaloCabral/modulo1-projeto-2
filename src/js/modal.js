const burgerButton = document.getElementById("burgerButton")
const closeButton = document.getElementById("closeButton")

const menuButtons = [burgerButton, closeButton]

menuButtons.forEach( element => {
  element.addEventListener("click", toggleMenu)
})

function toggleMenu(){
  document.getElementById("sidemenu").classList.toggle("open")
}
