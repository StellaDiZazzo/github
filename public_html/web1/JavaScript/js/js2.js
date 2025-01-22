console.log("JS 2 in action")
// Step 1 - selecting the element 

const myShape = document.getElementById("pacman"); 

//Step 2 - adding a click event 
myShape.addEventListener("click", () =>  { 
//myShape.style.borderColor= "blue transparent"
myShape.classList.toggle("change-me");


})
