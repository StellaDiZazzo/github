console.log('2d_transform.js loaded'); 

// create a selector 
let knuxwdidget = document.querySelector("#knuxwidget"); 

knuxwdidget.addEventListener('click', function(event){ 
    console.log(this.id);
    this.classList.add('move-right');
}
)