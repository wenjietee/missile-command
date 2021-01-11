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
canvas.width = innerWidth;
canvas.height = innerHeight;

// get 2d drawing context
const c = canvas.getContext('2d');

// player position
const playerX = canvas.width / 2;
const playerY = canvas.height;

//////////////////////
// Helper Functions
/////////////////////

const drawCircle = (x, y, radius, color) => {
	c.beginPath();
	c.arc(x, y, radius, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
};

const drawRect = (x, y, width, height, color) => {
	c.fillStyle = color;
	c.fillRect(x, y, width, height);
};

const getVelocitiesXY = (x, y) => {
	// get angle of trajectory
	const angle = Math.atan2(x, y);
	// get velocities and return object
	return { x: Math.cos(angle), y: Math.sin(angle) };
};
