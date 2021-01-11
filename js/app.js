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

const drawRect = (x, y, width, height, color) => {
	c.fillStyle = color;
	c.fillRect(x, y, width, height);
};

const getVelocitiesXY = (x, y) => {
	// get angle of trajectory
	const angle = Math.atan2(x, y);
	// get velocities and return object
	return { x: Math.cos(angle), y: Math.sin(angle) };
};

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
	// explode(x, y) {
	// 	this.render();
	// 	this.x = x;
	// 	this.y = y;
	// 	this.color = 'orange';
	// 	if (this.radius !== this.maxRadius) {
	// 		this.radius += 2;
	// 	}
	// }
}

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
	fire() {
		addEventListener('click', (event) => {
			// get velocities x y of missile
			const velocities = getVelocitiesXY(
				event.clientY - playerY,
				event.clientX - playerX
			);

			// on click create a new missile
			player.missileArray.push(
				new Missile(
					playerX,
					playerY,
					velocities.x * 6,
					velocities.y * 6,
					5,
					'blue'
				)
			);

			// on hit explode
		});
	}
}

//////////////////////
// City Class
/////////////////////
class City {
	constructor(x, y, width, height, color) {
		//city appearance
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		//city data
		this.points = 300;
	}
	render() {
		drawRect(this.x, this.y, this.width, this.height, this.color);
	}
}
//////////////////////
// City Factory Class
/////////////////////

class CityFactory {
	constructor() {
		this.cities = [];
	}

	createCity() {
		let cityX = 50;
		for (let i = 0; i < 6; i++) {
			let cityY = canvas.height - 70;
			this.cities.push(new City(cityX, cityY, 50, 70, 'green'));
			cityX += canvas.width / 6;
		}
	}

	renderCities() {
		this.cities.forEach((city) => {
			city.render();
		});
	}
}

//////////////////////
// Enemy Class
/////////////////////

class EnemyMissile extends Missile {
	constructor(x, y, velocityX, velocityY, radius, color) {
		//enemy appearance
		super(x, y, velocityX, velocityY, radius, color);
		//enemy data
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
			let enemyRadius = 15;
			// create random enemy location
			let enemyX = Math.random() * canvas.width;
			let enemyY = Math.random() < 0.5 ? -300 : 20;
			const velocities = getVelocitiesXY(enemyX, enemyY);
			this.enemies.push(
				new EnemyMissile(
					enemyX,
					enemyY,
					velocities.x * 3,
					velocities.y * 3,
					enemyRadius,
					'red'
				)
			);
		}, 1000);
	}

	updateEnemies() {
		this.enemies.forEach((enemy) => {
			enemy.update();
		});
	}
}

/////// test program /////////

// player
const player = new Player(30);
player.fire();

// enemy factory
const enemyMissileFactory = new EnemyMissileFactory();
enemyMissileFactory.createEnemy();

// city factory
const cities = new CityFactory();
cities.createCity();

// animate canvas
const animate = () => {
	requestAnimationFrame(animate);
	// refresh canvas
	c.clearRect(0, 0, canvas.width, canvas.height);
	// render and update elements
	player.render();
	player.updateMissiles();
	enemyMissileFactory.updateEnemies();
	cities.renderCities();
};

animate();

/// To Note/fix:
// consider putting push missile on click into player object
// consider how to break it into multiple files
// change enemy shape or overlay sprite and get orientation
