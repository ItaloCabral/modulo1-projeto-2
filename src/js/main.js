const burgerButton = document.getElementById("burgerButton")
const closeButton = document.getElementById("closeButton")

burgerButton.addEventListener("click", toggleMenu)
closeButton.addEventListener("click", toggleMenu)

function toggleMenu(){
  document.getElementById("sidemenu").classList.toggle("open")
}
