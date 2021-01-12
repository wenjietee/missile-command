/*
	Game loads here
	** Testing **
*/

// player
const player = new Player(30);
player.fire();

// enemy factory
const enemyMissileFactory = new EnemyMissileFactory();
enemyMissileFactory.createEnemy();

// city factory
const cities = new CityFactory();
cities.createCity();

// animate canvas
const gameStart = () => {
	requestAnimationFrame(gameStart);
	// refresh canvas
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillStyle = 'rgb(255,255,255,0.5)';
	// c.fillRect(0, 0, canvas.width, canvas.height);

	// render and update elements
	player.render();
	player.updateMissiles();
	enemyMissileFactory.updateEnemies();
	cities.renderCities();

	//collision detection
	player.missiles.forEach((missile, missileIndex) => {
		enemyMissileFactory.enemies.forEach((enemy, enemyIndex) => {
			if (detectBulletEnemyCollision(missile, enemy)) {
				player.missiles.splice(missileIndex, 1);
				enemyMissileFactory.enemies.splice(enemyIndex, 1);
			}
		});
	});
};

gameStart();

/// To Note/fix:
// change enemy shape or overlay sprite and get orientation
