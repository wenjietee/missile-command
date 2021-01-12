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

	//iterate through enemies and missiles array to detect collision
	enemyMissileFactory.enemies.forEach((enemy, enemyIndex) => {
		player.missiles.forEach((missile, missileIndex) => {
			// check if missile and enemy hit
			if (detectMissileEnemyCollision(missile, enemy)) {
				player.missiles.splice(missileIndex, 1);
				enemyMissileFactory.enemies.splice(enemyIndex, 1);
			}

			// check if missile hits edges of canvas
			if (detectCanvasCollision(missile)) {
				player.missiles.splice(missileIndex, 1);
			}
		});
		// check if enemy hits the edges of the canvas
		if (detectCanvasCollision(enemy)) {
			enemyMissileFactory.enemies.splice(enemyIndex, 1);
		}
	});
};

gameStart();

/// To Note/fix:
// change enemy shape or overlay sprite and get orientation
