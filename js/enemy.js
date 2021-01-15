/* 
    This script contains the enemy class and enemy factory
*/

//////////////////////
// Enemy Class
/////////////////////

class EnemyMissile extends Missile {
	constructor(x, y, velocityX, velocityY, radius, color, imageSource) {
		//enemy appearance
		super(x, y, velocityX, velocityY, radius, color, imageSource);
		//enemy data
		this.points = 100;
	}

	getPoints() {
		return this.points;
	}
}

//////////////////////
// Enemy Factory Class
/////////////////////

class EnemyMissileFactory {
	constructor() {
		this.enemies = [];
		this.speedFactor = 3;
		this.imageSource = '';
		// this.spawnFactor = 1;
		// this.maxEnemies = 10;
	}

	createEnemy() {
		setInterval(() => {
			let enemyRadius = 25;
			// create random enemy location
			let enemyX = Math.random() * canvas.width;
			let enemyY = Math.random() < 0.5 ? -enemyRadius : enemyRadius;

			const velocities = getVelocitiesXY(enemyX, enemyY);
			this.enemies.push(
				new EnemyMissile(
					enemyX,
					enemyY,
					velocities.x * this.speedFactor,
					velocities.y * this.speedFactor,
					enemyRadius,
					'red',
					this.imageSource
				)
			);
		}, 1000);
	}

	// increaseDiffculty() {
	// 	this.spawnFactor -= 0.1;
	// 	this.maxEnemies += 10;
	// }

	updateEnemies() {
		this.enemies.forEach((enemy) => {
			enemy.update();
		});
	}
}
