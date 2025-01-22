console.log("loaded🐯")
const stage = document.querySelector("body");
const roxieStreetpaint = document.getElementById("roxiestreetpaint"); 

const roxieSound = new Audio("sounds/goldrings.mp3")
roxieStreetpaint.onclick = function() {
    this.classList.toggle("moveroxie"); 
    roxieSound.play();

}


stage.addEventListener("click", function(event) {
    console.log(event.clientX + " : " + event.clientY);
   // old school way: roxieStreetpaint.style.transform = "translateX(" + event.clientX + "px) translateY(" + event.clientX + "px)"
   roxieStreetpaint.style.transform = `translateX(${event.clientX-100}px) translateY(${event.clientY-92}px)`;
})



// Keyboard input
document.onkeydown = checkKeys;

function checkKeys(event) {
    
    var style = window.getComputedStyle(roxieStreetpaint);
    var matrix = new WebKitCSSMatrix(style.transform);
    var xVal = matrix.m41;
    var yVal = matrix.m42;    
    var coords;

    //left arrow
    if(event.keyCode == "37") {
        coords = `translateX(${xVal-200}px) translateY(${yVal}px)`;
        roxieStreetpaint.style.transform = coords;
    }
    //right arrow
    if(event.keyCode == "39") {
        coords = `translateX(${xVal+200}px) translateY(${yVal}px)`;
        roxieStreetpaint.style.transform = coords;
    }
    //up arrow
    if(event.keyCode == "38") {
        coords = `translateX(${xVal}px) translateY(${yVal-200}px)`;
        roxieStreetpaint.style.transform = coords;
    }
    //down arrow
    if(event.keyCode == "40") {
        coords = `translateX(${xVal}px) translateY(${yVal+200}px)`;
        roxieStreetpaint.style.transform = coords;
    }



}

//ES6
// roxieStreetpaint.onclick = () => {
//     roxieStreetpaint.classList.toggle("move");
// }
function addMyObject() {
    let myObject = document.createElement("img");
    myObject.src = "img/paintcan.svg";
    myObject.style.width = "150px"
    stage.append(myObject);

    let w = window.innerWidth - 100;
    let randoX = Math.floor((Math.random() * w) + 1 );
    let h = window.innerHeight - 58;
    let randoY = Math.floor((Math.random() * h) + 1 );
    myObject.style.transform = `translateX(${randoX}px) translateY(${randoY}px)`;
    setTimeout(() => { myObject.remove(); addMyObject(); }, 3000);

}
addMyObject();
/* custom object */ 


   

   // let x = Math.random(); -> random coordinates
