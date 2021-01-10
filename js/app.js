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
			// init player position at the bottom
			this.x = playerX;
			this.y = playerY;
			this.radius = radius;
			this.color = 'tomato';
		}
		render() {
			drawCircle(this.x, this.y, this.radius, this.color);
		}
	}

	//////////////////////
	// Missile Class
	/////////////////////
	class Missile {
		constructor(x, y, velocityX, velocityY) {
			this.x = x;
			this.y = y;
			this.velocityX = velocityX;
			this.velocityY = velocityY;
			this.radius = 5;
			this.color = 'blue';
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

	/////// test program /////////
	const player = new Player(30);
	player.render();

	const missile = new Missile(playerX, playerY, -1, -1);
	const missile2 = new Missile(playerX, playerY, -3, -2);
	const missileArray = [missile, missile2];

	// const animate = () => {
	// 	requestAnimationFrame(animate);
	// 	missileArray.forEach((missile) => {
	// 		missile.update();
	// 	});
	// };
	//////////////////////
	// Event Listeners
	/////////////////////

	addEventListener('click', (event) => {
		// velocity object
	});
	animate();
});
