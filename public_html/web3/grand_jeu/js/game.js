// Créer le canevas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
document.querySelector("#gameBox").appendChild(canvas);

//Charger les sprites
// Image d'arrière-plan
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function () {
    bgReady = true; 
};

// Estampe gagnant
var winReady = false;
var winImage = new Image(); 
winImage.src = "images/win.png"; 
winImage.onload = function () {
    winReady = true; 
};

// Image du joueur
var playerReady = false;
var playerImage = new Image(); 
playerImage.src = "images/player.png"; 
playerImage.onload = function () {
    playerReady = true; 
};

// Image des goodies
var goodyReady = false;
var goodyImage = new Image(); 
goodyImage.src = "images/goody.png"; 
goodyImage.onload = function () {
    goodyReady = true; 
};
// Image des baddies
var baddieReady = false;
var baddieImage = new Image(); 
baddieImage.src = "images/baddies.png"; 
baddieImage.onload = function () {
    baddieReady = true; 

};
// Image des baddies2
var waspReady = false;
var waspImage = new Image(); 
waspImage.src = "images/wasp.png"; 
waspImage.onload = function () {
    waspReady = true; 

};


// Créer des objets de jeu globaux 
var player = {
    speed : 5, // mouvement en pixels par tick 
    width: 32,
    height: 32
};

var goodies = [ // ceci est un tableau (array)
    { width: 32, height: 32 }, // un goody
    { width: 32, height: 32 }, // deux goodies

];


//shooters
var bullets = [];


var vX = 0;
var vY = 0;

var lose = false;

var win = false;

var canshoot = true;

var lvl = 1;


var baddies = [ // ceci est un tableau (array)
    { width: 32, height: 32 }, 
    { width: 32, height: 32 },
      { width: 32, height: 32 },

];
var wasp = [ // ceci est un tableau (array)
    { width: 32, height: 32 }, 
    { width: 32, height: 32 },
      { width: 32, height: 32 },

];
// La boucle de jeu principale

//Définir l'état initial
var init = function () {
    //Mettre le joueur au centre
    player.x = (canvas.width - player.width) / 2; 
    player.y = (canvas.height - player.height) / 2;

    //Placez des goodies à des endroits aléatoires 
    for (var i in goodies) {
        goodies[i].x = (Math.random() * (canvas.width - goodies[i].width));
        goodies[i].y = (Math.random() * (canvas.height - goodies[i].height));
    }
     for (var i in baddies) {
        baddies[i].x = (Math.random() * (canvas.width - baddies[i].width));
        baddies[i].y = (Math.random() * (canvas.height - baddies[i].height));
          baddies[i].x = (Math.random() * (canvas.width - baddies[i].width));
        baddies[i].y = (Math.random() * (canvas.height - baddies[i].height));
        
    }

};

// Variables de vitesse
var vX = 0;
var vY = 0;

// Gérer les commandes du clavier
addEventListener("keydown", function (e) {
    //Touches
    if (e.keyCode == 38) { // HAUT
        vX = 0;

    }
    if (e.keyCode == 40) { // BAS
        vX = 0;
      
    }
    if (e.keyCode == 37) { // GAUCHE
        vX = -player.speed;
      
    }
    if (e.keyCode == 39) { // DROITE
        vX = player.speed;
      
    }
    if (e.keyCode == 32) { // ARRÊT barre d’espace
        vX = 0;
      
    }
}, false);

//controles clavier
addEventListener( "keydown", function( e ) {
	
	if ( window.event.keyCode == 38 ) { 
		return false;
	}
	if ( window.event.keyCode == 40 ) { 
		return false;
	}
	if ( e.keyCode == 37 ) { 
		vX = -player.speed;
		vY = 0;
	}
	if ( e.keyCode == 39 ) {
		vX = player.speed;
		vY = 0;
	}
	if ( e.keyCode == 13 ) { // enter
		window.location.reload( false );
	}
	if ( e.keyCode == 32 ) { // 
		shoot(); //shooter avec bar espace
	}
	if ( e.keyCode == 32 ) {
		document.getElementById( 'bullets' ).play();
	}
}, false );

addEventListener( "keyup", function( e ) {
	vX = 0;
	vY = 0;
}, false );

//controles
addEventListener( "touchstart", function( e ) {
	if ( e.target.id == "uArrow" ) { 
		vX = 0;
		vY = -player.speed;
	} else if ( e.target.id == "dArrow" ) { 
		vX = 0;
		vY = player.speed;
	} else if ( e.target.id == "lArrow" ) { 
		vX = -player.speed;
		vY = 0;
	} else if ( e.target.id == "rArrow" ) { 
		vX = player.speed;
		vY = 0;
	} else { 
		vX = 0;
		vY = 0;
	}
} );



// La boucle de jeu principale
var main = function () {
    if (checkWin()) {
        //GAGNANT Afficher le cadre
        if (winReady) {
            ctx.drawImage(winImage, (canvas.width - winImage.width)/2, 
                (canvas.height - winImage.height)/2);
        }
    }
    else {
        //Pas encore gagné, jouer le jeu
        //déplacer le joueur
        if (player.x > 0 && player.x < canvas.width - player.width) {
            player.x += vX;
        }
        else {
            player.x -= vX;
            vX = -vX; //bounce
        }
        if (player.y > 0 && player.y < canvas.height - player.height) {
            player.y += vY
        }
        
        else {
            player.y -= vY;
            vY = -vY; //bounce
        }
        
        //vérifier les collisions
        for (var i in goodies) {
            if (checkCollision(player,goodies[i])) {
                goodies.splice(i,1);
               
					document.getElementById( 'enemy_hit' ).play();
					goodies.splice( i, 1 ); // remove the goody
					bullets.splice( c, 1 ); // remove the bullet	
            }
            
        }

        render();
        window.requestAnimationFrame(main);
    }
};

// Dessinez le tout
var render = function () {
    if (bgReady) {
        ctx.fillStyle = ctx.createPattern(bgImage, 'repeat');
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
   if (playerReady) {
    ctx.drawImage(playerImage, player.x, player.y);
}
if (goodyReady) {
    for (var i in goodies) {
        ctx.drawImage(goodyImage, goodies[i].x, goodies[i].y);
    }
        
}
if (baddieReady) {
    for (var i in baddies) {
        ctx.drawImage(baddieImage, baddies[i].x, baddies[i].y);
    }
    
}


    //Label
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.fillText("Goodies restants : "+goodies.length, 32, 32);
};
//Fonction générique pour vérifier les collisions 
var checkCollision = function (obj1,obj2) {
    if (obj1.x < (obj2.x + obj2.width) && 
        (obj1.x + obj1.width) > obj2.x && 
        obj1.y < (obj2.y + obj2.height) && 
        (obj1.y + obj1.height) > obj2.y
        ) {
            return true;
    }
};
//Vérifiez si nous avons gagné
var checkWin = function () {
    if (goodies.length > 0) { 
        return false;
    } else { 
        return true;
    }
};
init();
//Démarrer le jeu
window.requestAnimationFrame(main);