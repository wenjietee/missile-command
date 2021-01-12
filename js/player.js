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
		this.explodeRadius = 50;
	}

	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
	}

	update() {
		this.render();
		this.x = this.x + this.velocityX;
		this.y = this.y + this.velocityY;
	}
	explode() {
		this.render();
		this.color = 'orange';
		if (this.radius !== this.explodeRadius) {
			this.radius += 2;
		}
	}
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
		this.missileAmmo = 20;
		this.missiles = [];
		this.score = 0;
	}
	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
	}

	updateMissiles() {
		this.missiles.forEach((missile) => {
			missile.update();
		});
	}

	fire() {
		addEventListener('click', (event) => {
			let mouseY = event.clientY;
			let mouseX = event.clientX;

			// get velocities x y of missile
			const velocities = getVelocitiesXY(mouseY - playerY, mouseX - playerX);

			// if ammo is not 0 fire missile
			if (this.missileAmmo !== 0) {
				// on click create a new missile and push to missile Array
				player.missiles.push(
					new Missile(
						playerX,
						playerY,
						velocities.x * 5,
						velocities.y * 5,
						5,
						'blue'
					)
				);

				// reduce missile ammo
				this.missileAmmo--;
			}
		});
	}
}
