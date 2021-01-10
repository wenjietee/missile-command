// ////////////////////////
// // DOM Ready
// ////////////////////////

// function ready(callbackFunc) {
// 	if (document.readyState !== 'loading') {
// 		callbackFunc();
// 	} else if (document.addEventListener) {
// 		document.addEventListener('DOMContentLoaded', callbackFunc);
// 	}
// }

// ready(function () {

// });

//////////////////////
// Init Canvas
/////////////////////

const canvas = document.querySelector('canvas');

// set canvas width height same as windows
canvas.width = innerWidth;
canvas.height = innerHeight;

// get 2d drawing context
const c = canvas.getContext('2d');

// player position
const playerX = canvas.width / 2;
const playerY = canvas.height;

//////////////////////
// Helper Functions
/////////////////////

const drawCircle = (x, y, radius, color) => {
	c.beginPath();
	c.arc(x, y, radius, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
};

const getVelocitiesXY = (x, y) => {
	// get angle of trajectory
	const angle = Math.atan2(x, y);
	// get velocities and return object
	return { x: Math.cos(angle), y: Math.sin(angle) };
};

//////////////////////
// Player Class
/////////////////////
class Player {
	constructor(radius) {
		// player appearance
		this.x = playerX;
		this.y = playerY;
		this.radius = radius;
		this.color = 'gray';
		// player data
		this.missileCount = 20;
		this.missileArray = [];
		this.score = 0;
	}
	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
	}

	updateMissiles() {
		this.missileArray.forEach((missile) => {
			missile.update();
		});
	}
}

//////////////////////
// Missile Class
/////////////////////
class Missile {
	constructor(x, y, velocityX, velocityY, radius, color) {
		this.x = x;
		this.y = y;
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.radius = radius;
		this.color = color;
	}

	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
	}

	update() {
		this.render();
		this.x = this.x + this.velocityX;
		this.y = this.y + this.velocityY;
	}
}

//////////////////////
// Explosion Class
/////////////////////

class Explosion {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
	}
	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
	}
	update() {
		this.render();
		this.radius += 2;
	}
}

//////////////////////
// Enemy Class
/////////////////////

class EnemyMissile extends Missile {
	constructor(x, y, velocityX, velocityY, radius, color) {
		super(x, y, velocityX, velocityY, radius, color);
		this.points = 100;
	}
}

//////////////////////
// Enemy Factory Class
/////////////////////

class EnemyMissileFactory {
	constructor() {
		this.enemies = [];
	}

	createEnemy() {
		setInterval(() => {
			const velocities = getVelocitiesXY(50, 50);
			// generate Math.random()*canvas height/width to get random spawn point
			// make random function to generate random coordinates
			this.enemies.push(
				new EnemyMissile(1, 1, velocities.x, velocities.y, 15, 'red')
			);
		}, 2000);
	}

	updateEnemies() {
		this.enemies.forEach((enemy) => {
			enemy.update();
		});
	}
}

//////////////////////
// Event Listeners
/////////////////////

addEventListener('click', (event) => {
	// get velocities x y of missile
	const velocities = getVelocitiesXY(
		event.clientY - playerY,
		event.clientX - playerX
	);
	// on click create a new missile
	player.missileArray.push(
		new Missile(playerX, playerY, velocities.x, velocities.y, 5, 'blue')
	);
});

/////// test program /////////

// player obj
const player = new Player(30);
// enemy factory obj
const enemyMissileFactory = new EnemyMissileFactory();
enemyMissileFactory.createEnemy();

const explode = new Explosion(400, 400, 5, 'tomato');
// animate canvas
const animate = () => {
	requestAnimationFrame(animate);
	// refresh canvas
	c.clearRect(0, 0, canvas.width, canvas.height);

	// render and update elements
	player.render();
	player.updateMissiles();
	enemyMissileFactory.updateEnemies();
};

animate();

/// To Note/fix:
// make enemies spawn randomly from top and travel to the ground
// consider putting push missile on click into player object
// consider how to break it into multiple files
// change enemy shape or overlay sprite and get orientation
