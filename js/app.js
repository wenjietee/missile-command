/*
	Game loads here
*/

//////////////////////
// Init Game Objects
//////////////////////

// player object
const player = new Player(30);
player.fire();

// enemy factory
const enemyMissileFactory = new EnemyMissileFactory();
enemyMissileFactory.createEnemy();

// city factory
const cities = new CityFactory();
cities.createCity();

// game loop
const gameStart = () => {
	// init game loop
	const gameLoop = requestAnimationFrame(gameStart);

	//////////////////////
	// Check Win State
	//////////////////////

	if (cities.cities.length === -1 || player.missileAmmo === 0) {
		// stop game loop and show gameover modal
		cancelAnimationFrame(gameLoop);
		$('#modal-gameover').css('display', 'block');
	}

	//////////////////////
	// Refresh canvas
	//////////////////////

	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillStyle = 'rgb(255,255,255,0.3)';
	// c.fillRect(0, 0, canvas.width, canvas.height);

	//////////////////////
	// Render Elements
	//////////////////////

	player.render();
	player.updateMissiles();
	enemyMissileFactory.updateEnemies();
	cities.renderCities();

	//////////////////////
	// Collision handling
	//////////////////////

	//iterate through enemies,cities and missiles array to detect collision
	enemyMissileFactory.enemies.forEach((enemy, enemyIndex) => {
		player.missiles.forEach((missile, missileIndex) => {
			// check if missile and enemy collide
			if (detectMissileEnemyCollision(missile, enemy)) {
				player.missiles.splice(missileIndex, 1);
				enemyMissileFactory.enemies.splice(enemyIndex, 1);
			}

			// check if missile hits edges of canvas and remove missile
			if (detectCanvasCollision(missile)) {
				player.missiles.splice(missileIndex, 1);
			}
		});

		// check if enemy and city collide
		cities.cities.forEach((city, cityIndex) => {
			if (detectEnemyCityCollision(city, enemy)) {
				cities.cities.splice(cityIndex, 1);
				enemyMissileFactory.enemies.splice(enemyIndex, 1);
			}
		});
		// check if enemy hits the edges of the canvas and remove enemy
		if (detectCanvasCollision(enemy)) {
			enemyMissileFactory.enemies.splice(enemyIndex, 1);
		}
	});
};

// begin game
const openModal = () => {
	$('#modal-start').css('display', 'block');
};

const closeModal = () => {
	$('#modal-start').css('display', 'none');
	gameStart();
};

openModal();
$('#start').on('click', closeModal);

/// To Note/fix:
// change enemy shape or overlay sprite and get orientation
// put stuff here into game object?
