/*
    This script contains the canvas object as well as the player XY coordinates
    This script also contains helper functions that gets the canvas 2d drawing object
    to render shapes as well as calculating XY velocities
*/

//////////////////////
// Init Canvas
/////////////////////

const canvas = document.querySelector('canvas');

// set canvas width height same as windows
canvas.width = innerWidth - 10;
canvas.height = innerHeight - 10;

// get 2d drawing context
const c = canvas.getContext('2d');

// player position
const playerX = canvas.width / 2;
const playerY = canvas.height;

// friction
const friction = 0.97;
//////////////////////
// Helper Functions
/////////////////////

const drawCircle = (x, y, radius, color) => {
	c.beginPath();
	c.arc(x, y, radius, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
};

const drawParticle = (x, y, radius, color, alpha) => {
	c.save();
	c.beginPath();
	c.globalAlpha = alpha;
	c.arc(x, y, radius, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
	c.restore();
};

const drawRect = (x, y, width, height, color) => {
	c.fillStyle = color;
	c.fillRect(x, y, width, height);
};

const drawImage = (x, y, imageSource) => {
	const img = new Image();
	img.src = imageSource;
	c.drawImage(img, x, y, 100, 100);
};
const getVelocitiesXY = (x, y) => {
	// get angle of trajectory
	const angle = Math.atan2(x, y);
	// get velocities and return object
	return { x: Math.cos(angle), y: Math.sin(angle) };
};

//////////////////////
// AJAX Function
/////////////////////

const ajaxGetRandomChuckNorrisJoke = () => {
	$.ajax({
		url: 'https://api.icndb.com/jokes/random',
	}).then((data) => {
		$('.joke').text(data.value.joke);
	}),
		() => {
			console.log('bad request');
		};
};

//////////////////////
// Collision Detection
/////////////////////
const detectMissileEnemyCollision = (missile, enemy) => {
	//get distance between enemy and missile
	let dx = missile.x - enemy.x;
	let dy = missile.y - enemy.y;
	let distance = dx ** 2 + dy ** 2;

	// collision detected if distance is less than enemy and missile radiuses
	if (distance < missile.radius ** 2 + enemy.radius ** 2) {
		return true;
	}
};

const detectCityEnemyCollision = (city, enemy) => {
	//get distance between enemy and city
	let dx = Math.abs(enemy.x - city.x - city.width / 2) - city.width / 2;
	let dy = Math.abs(enemy.y - city.y - city.height / 2) - city.height / 2;

	// collision detected if enemy dist is more than city distance
	if (dx ** 2 + dy ** 2 <= enemy.radius * enemy.radius) {
		return true;
	}
};

const detectCanvasCollision = (object) => {
	// collision detected if object distance is greater than  canvas width and height
	if (object.x - object.radius > canvas.width || object.x + object.radius < 0) {
		return true;
	}
	if (
		object.y - object.radius > canvas.height ||
		object.y + object.radius < 0
	) {
		return true;
	}
};
