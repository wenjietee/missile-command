/* 
    This script contains the player and missile class
    and its methods to fire, update and render.
*/

//////////////////////
// Missile Class
/////////////////////

class Missile {
	constructor(x, y, velocityX, velocityY, radius, color, imageSource) {
		this.x = x;
		this.y = y;
		this.velocityX = velocityX;
		this.velocityY = velocityY;
		this.radius = radius;
		this.color = color;
		this.explodeRadius = 50;
		this.imageSource = imageSource || '';
	}

	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
		drawImage(this.x, this.y, this.imageSource);
	}

	update() {
		this.render();
		this.x = this.x + this.velocityX;
		this.y = this.y + this.velocityY;
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
		this.color = '#EE8B98';
		this.imageSource = '';
		// player data
		// this.missileAmmo = 20;
		this.missiles = [];
		this.speedFactor = 6;
		this.score = 0;
	}
	render() {
		drawCircle(this.x, this.y, this.radius, this.color);
		drawImage(this.x, this.y, this.imageSource);
	}

	updateMissiles() {
		this.missiles.forEach((missile) => {
			missile.update();
		});
	}

	getScore() {
		return this.score;
	}
	updateScore(points) {
		this.score += points;
	}

	fire() {
		addEventListener('click', (event) => {
			let mouseY = event.clientY;
			let mouseX = event.clientX;

			// get velocities x y of missile
			const velocities = getVelocitiesXY(mouseY - playerY, mouseX - playerX);

			// if ammo is not 0 fire missile
			// if (this.missileAmmo !== 0) {
			// on click create a new missile and push to missile Array
			player.missiles.push(
				new Missile(
					playerX,
					playerY,
					velocities.x * this.speedFactor,
					velocities.y * this.speedFactor,
					5,
					'#D90429'
				)
			);

			// reduce missile ammo
			// this.missileAmmo--;
			// }
		});
	}
}

//////////////////////
// Player2 Class
/////////////////////

class Player2 {
	constructor(x, y, width, height, color) {
		//city appearance
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color || 'gray';
		this.imageSource = '';
		this.isCoOp = false;
	}
	render() {
		drawRect(this.x, this.y, this.width, this.height, this.color);
		drawImage(this.x, this.y, this.imageSource);
	}

	update() {
		if (this.isCoOp) {
			this.render();
		}
	}

	movement() {
		// move left event
		addEventListener('keydown', (event) => {
			if (event.code === 'KeyA') {
				console.log('asdasd');
				this.x -= 20;
			}
			event.preventDefault();
		});
		// move right event
		addEventListener('keydown', (event) => {
			if (event.code === 'KeyD') {
				this.x += 20;
			}
			event.preventDefault();
		});
	}
}
