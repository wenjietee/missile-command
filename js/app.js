////////////////////////
// DOM Ready
////////////////////////

function ready(callbackFunc) {
	if (document.readyState !== 'loading') {
		callbackFunc();
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', callbackFunc);
	}
}

ready(function () {
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
			this.missiles = 20;
			this.score = 0;
		}
		render() {
			drawCircle(this.x, this.y, this.radius, this.color);
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
		// setInterval((),2000)
		spawnEnemy() {
			this.enemies.push(new EnemyMissile(100, 100, 1, 1, 5, 'red'));
		}
	}

	/////// test program /////////
	const player = new Player(30);

	const missileArray = [];

	const animate = () => {
		requestAnimationFrame(animate);
		// refresh canvas
		c.clearRect(0, 0, canvas.width, canvas.height);
		// render and update elements
		player.render();
		missileArray.forEach((missile) => {
			missile.update();
		});
	};

	//////////////////////
	// Event Listeners
	/////////////////////

	addEventListener('click', (event) => {
		// get angle of trajectory
		const angle = Math.atan2(event.clientY - playerY, event.clientX - playerX);
		// get velocities
		let velocityX = Math.cos(angle);
		let velocityY = Math.sin(angle);

		// on click create a new missile
		missileArray.push(
			new Missile(playerX, playerY, velocityX, velocityY, 5, 'blue')
		);
	});
	animate();
});

/// To Note/fix:
// consider returning velocity X and Y as an object
// consider how to break it into multiple files
// consider breaking canvas into an object
// change enemy shape or overlay sprite and get orientation
