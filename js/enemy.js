/* 
    This script contains the enemy class and enemy factory
*/

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
	}

	createEnemy() {
		setInterval(() => {
			let enemyRadius = 25;
			// create random enemy location
			let enemyX = Math.random() * canvas.width;
			let enemyY = Math.random() < 0.5 ? -canvas.height : 0;
			const velocities = getVelocitiesXY(enemyX, enemyY);
			this.enemies.push(
				new EnemyMissile(
					enemyX,
					enemyY,
					velocities.x * this.speedFactor,
					velocities.y * this.speedFactor,
					enemyRadius,
					'red'
				)
			);
		}, 500);
	}

	updateEnemies() {
		this.enemies.forEach((enemy) => {
			enemy.update();
		});
	}
}
