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
	// Player Class
	/////////////////////
	class Player {
		constructor(radius) {
			// init player position at the bottom
			this.x = canvas.width / 2;
			this.y = canvas.height;
			this.radius = radius;
			this.color = 'tomato';
		}

		render() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
		}
	}

	const player = new Player(30);

	player.render();
});
