/* 
    This script contains the player and missile class
    and its methods to fire, update and render.
*/

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
