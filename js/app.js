/*
	Game loads here
*/

//////////////////////
// Init Game Objects
//////////////////////

// player object
const player = new Player(30);
player.fire();

// player2 object
const player2 = new Player2(playerX, playerY - 300, 150, 30, '#2739e3');

// enemy factory
const enemyMissileFactory = new EnemyMissileFactory();
enemyMissileFactory.createEnemy();

//particle factory
const particleFactory = new ParticleFactory();

// city factory
const cities = new CityFactory();
cities.createCity();

// game loop
const gameStart = () => {
	// init game loop
	const gameLoop = requestAnimationFrame(gameStart);

	//////////////////////
	// Game Conditions
	//////////////////////

	// check lose state
	if (cities.cities.length === 0) {
		// stop game loop
		cancelAnimationFrame(gameLoop);
		// get a Chuck Norris joke
		ajaxGetRandomChuckNorrisJoke();
		// and show game over modal
		$('#modal-gameover').css('display', 'block');
		$('#restart').on('click', () => {
			// reloads the page
			location.reload();
		});
	}

	// update score
	$('.score').html(`Score: ${player.getScore()}`);

	//////////////////////
	// Refresh canvas
	//////////////////////
	c.clearRect(0, 0, canvas.width, canvas.height);
	// c.fillStyle = 'rgb(245,245,245,0.4)';
	// c.fillRect(0, 0, canvas.width, canvas.height);

	//////////////////////
	// Render Elements
	//////////////////////

	cities.renderCities();
	player.updateMissiles();
	player.render();
	player2.update();

	particleFactory.updateParticles();
	enemyMissileFactory.updateEnemies();

	//////////////////////
	// Collision handling
	//////////////////////

	//iterate through enemies,cities and missiles array to detect collision
	enemyMissileFactory.enemies.forEach((enemy, enemyIndex) => {
		player.missiles.forEach((missile, missileIndex) => {
			// check if missile and enemy collide
			if (detectMissileEnemyCollision(missile, enemy)) {
				// make particles
				particleFactory.createParticles(enemy.x, enemy.y, '#f55d16', 30);
				// remove enemy and missile
				enemyMissileFactory.enemies.splice(enemyIndex, 1);
				player.missiles.splice(missileIndex, 1);
				// add to player score

				player.updateScore(enemy.getPoints());
			}

			// check if missile hits edges of canvas and remove missile
			if (detectCanvasCollision(missile)) {
				player.missiles.splice(missileIndex, 1);
			}
		});
		// check if enemy and player2 collide
		if (detectCityEnemyCollision(player2, enemy) && player2.isCoOp) {
			enemyMissileFactory.enemies.splice(enemyIndex, 1);
			particleFactory.createParticles(enemy.x, enemy.y, player2.color, 50);
			player.updateScore(enemy.getPoints());
		}
		// check if enemy and city collide
		cities.cities.forEach((city, cityIndex) => {
			if (detectCityEnemyCollision(city, enemy)) {
				particleFactory.createParticles(enemy.x, enemy.y, enemy.color, 50);
				particleFactory.createParticles(city.x, city.y, city.color, 30);
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
//init solo game
$('#start').on('click', closeModal);
// init co-op game
$('#start-coop').on('click', () => {
	player2.isCoOp = true;
	player2.movement();
	closeModal();
});
/// To Note/fix:
// change enemy shape or overlay sprite and get orientation
