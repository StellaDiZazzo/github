//creer le canvas
var canvas = document.createElement("canvas"); 
var ctx = canvas.getContext("2d"); 
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
canvas.setAttribute('width', window.innerWidth);
canvas.setAttribute('height', window.innerHeight);
document.querySelector( "#gameBox" ).appendChild( canvas );

//generer arriere plan
//arriere plan 
var bgReady = false;
var bgImage = new Image();
bgImage.src = "images/background.png";
bgImage.onload = function() {
	bgReady = true;
};
//image gagnante
var winReady = false;
var winImage = new Image();
winImage.src = "images/win.png";
winImage.onload = function() {
	winReady = true;
};
//image perdante
var winReady = false;
var winImage = new Image();
winImage.src = "images/lose.png";
winImage.onload = function() {
	winReady = true;
};
//generer les sprites
//personnage principal//joueur 
var playerReady = false;
var playerImage = new Image();
playerImage.src = "images/player.png";
playerImage.onload = function() {
	playerReady = true;
};
//araignee 
var goodyReady = false;
var goodyImage = new Image();
goodyImage.src = "images/spider.png";
goodyImage.onload = function() {
	goodyReady = true;
};
//moustique
var moustiqueReady = false 
var moustiqueImage = new Image(); 
moustiqueImage.src = "images/moustique.png"; 
moustiqueImage.onload = function() { 
    moustiqueReady = true;
}
//guepe 
var waspReady = false 
var waspImage = new Image(); 
waspImage.src = "images/wasp.png"; 
waspImage.onload = function() { 
    waspReady = true;
}

//OBJETS
var player = {
	speed: 7,
	width: 82,
	height: 150
};

function spider() {
	this.width = 126;
	this.height = 108;
	this.speed = 1;
	this.img = goodyImage;
}

function moustique() {
	this.width = 108;
	this.height = 144;
	this.speed = 1.2;
	this.img = moustiqueImage;
}

function wasp() {
	this.width = 108;
	this.height = 153;
	this.speed = 1.4;
	this.img = waspImage;
}
var goodies = [
	new spider(), new spider(), new spider(), new spider(), new spider()
];


//creer les BALLES
var bullets = []; 
//velocite 
var vX = 0;
var vY = 0;

var lose = false;

var win = false;

var canshoot = true;

var lvl = 1;

//controles clavier 
addEventListener( "keydown", function( e ) {
	//Keystrokes
	if ( window.event.keyCode == 38 ) { // haut
		return false;
	}
	if ( window.event.keyCode == 40 ) { // bas
		return false;
	}
	if ( e.keyCode == 37 ) { // gauche
		vX = -player.speed;
        console.log("left");
        console.log(vX);
		//vY = 0;
	}
	if ( e.keyCode == 39 ) { // droite
		vX = player.speed;
		vY = 0;
	}
	if ( e.keyCode == 13 ) { //entrer = nouveau jeu 
		window.location.reload( false );
	}
	if ( e.keyCode == 32 ) { // barre espace = arrets
		shoot(); // barre espace = balles
	}
	if ( e.keyCode == 32 ) {
		//document.getElementById( 'bullets' ).play();
	}
}, false );

addEventListener( "keyup", function( e ) {
	vX = 0;
	vY = 0;
}, false );

//controles touche 
addEventListener( "touchstart", function( e ) {
	if ( e.target.id == "uArrow" ) { // haut
		vX = 0;
		vY = -player.speed;
	} else if ( e.target.id == "dArrow" ) { // bas
		vX = 0;
		vY = player.speed;
	} else if ( e.target.id == "lArrow" ) { // gauche
		vX = -player.speed;
		vY = 0;
	} else if ( e.target.id == "rArrow" ) { //droite
		vX = player.speed;
		vY = 0;
	} else { // arret
		vX = 0;
		vY = 0;
	}
} );

//etat initial 
var init = function() {
	// put the player in the center
	player.x = ( canvas.width - player.width ) / 2
	player.y = ( canvas.height - player.height - 10 )
	//place goodies 
	for ( var i in goodies ) {
		goodies[ i ].x = ( Math.random() * ( canvas.width - goodies[ i ].width ) );
		goodies[ i ].y = 10;
	}
};

//boucle du jeu principal 
var main = function() {
	console.log( goodies.length );
	if ( lose ) {
		//when you lose this happens
		if ( loseReady ) {
			ctx.drawImage( loseImage, ( canvas.width - winImage.width ) / 2, ( canvas.height - loseImage.height ) / 2 );
		}
		if ( loseAudioReady ) {
			loseAudio.play();
		}
	} else if ( checkLvl() ) {
		//WIN display win frame
		if ( winReady ) {
			ctx.drawImage( winImage, ( canvas.width - winImage.width ) / 2, ( canvas.height - winImage.height ) / 2 );
		}
		if ( winAudioReady ) {
				winAudio.play();
			}
	} else {
		//Not yet won, continue game
		//Move player
		if ( player.x > 0 && player.x < canvas.width - player.width ) {
			player.x += vX;
		} else {
			player.x -= vX;
			vX = -vX; //bounce
		}
		if ( player.y > 0 && player.y < canvas.height - player.height ) {
			player.y += vY;
		} else {
			player.y -= vY;
			vY = -vY; //bounce
		}
	
		//verifier collisions
		for ( var i in goodies ) {
			//les goodies vont en bas
			goodies[ i ].y += Math.random() * goodies[ i ].speed;
			if ( checkCollision( player, goodies[ i ] ) || goodies[ i ].y > canvas.height ) {
				lose = true;
			}
			
			for ( var c in bullets) { 
				bullets[ c ].y = bullets[ c ].y - 2; 
				if ( checkCollision( goodies[ i ], bullets[ c ] ) ) { //verifier si elles collisionnent avec les objets
					//document.getElementById( 'enemy_hit' ).play();
					goodies.splice( i, 1 ); //  tuer l'objet
					bullets.splice( c, 1 ); // enlever le goodie	
				}
			}
		}  
	}

    render();
    window.requestAnimationFrame( main );
};
//dessiner le tout 
var render = function() {
	if ( bgReady ) {
		ctx.fillStyle = ctx.createPattern( bgImage, 'repeat' );
		ctx.fillRect( 0, 0, canvas.width, canvas.height );
	}
	for ( var c in bullets ) {
		ctx.fillStyle = "rgb(255,255,255)"; //les balles
		ctx.fillRect( bullets[ c ].x, bullets[ c ].y, bullets[ c ].width, bullets[ c ].height );
	}
	if ( playerReady ) {
		ctx.drawImage( playerImage, player.x, player.y );
	}
	if ( goodyReady ) {
		for ( var i in goodies ) {
			ctx.drawImage( goodies[i].img, goodies[ i ].x, goodies[ i ].y );
		}
	}
	
	ctx.fillStyle = "rgb(250, 250, 250)";
};

//verifier collisions
var checkCollision = function( obj1, obj2 ) {
	if ( obj1.x < ( obj2.x + obj2.width ) && ( obj1.x + obj1.width ) > obj2.x && obj1.y < ( obj2.y + obj2.height ) && ( obj1.y + obj1.height ) > obj2.y ) {
		return true;
	}
};
//verifier si on gagne 
var checkLvl = function() {
	if ( goodies.length > 0 ) {
		return false;
	} else {
		lvl++;
        for ( var c = 0; c < lvl * 5; c++ ) {
			if ( lvl == 2 ) {
				var n = goodies.push( new moustique() );
				goodies[ n - 1 ].x = ( Math.random() * ( canvas.width - goodies[ n - 1 ].width ) );
				goodies[ n - 1 ].y = 0;
			} else if ( lvl == 3 ) {
                var n = goodies.push( new wasp() );
				goodies[ n - 1 ].x = ( Math.random() * ( canvas.width - goodies[ n - 1 ].width ) );
				goodies[ n - 1 ].y = 0; 
            }
        }
    }
}
//creer les balles 
var shoot = function() {
	if ( canshoot ) {
		var newB = bullets.push( {
			width: 2,
			height: 20
		} ) - 1; //add bullet to object array
		bullets[ newB ].x = player.x + player.width / 2; //place it horizontally at the playerâ€™s position
		bullets[ newB ].y = player.y; // place it vertically at the tip of the player
		canshoot = false;
		setTimeout( function() {
			canshoot = true;
		}, 200 );
	}
};

//commencer le jeu 
//Game Start
init();
window.requestAnimationFrame( main );