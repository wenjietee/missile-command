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
			this.x = canvas.width / 2;
			this.y = canvas.height;
			this.radius = radius;
			this.color = 'tomato';

			drawCircle(this.x, this.y, this.radius, this.color);
		}
	}

	//////////////////////
	// Missile Class
	/////////////////////
	class Missile {
		constructor(x, y, velocity) {
			this.x = x;
			this.y = y;
			this.velocity = velocity;
			this.radius = 10;
			this.color = 'blue';

			drawCircle(this.x, this.y, this.radius, this.color);
		}
	}

	const player = new Player(30);
	player.render();
});
