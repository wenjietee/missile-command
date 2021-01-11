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
