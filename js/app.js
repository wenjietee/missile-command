////////////////////////
// DOM Ready
////////////////////////

function ready(callbackFunc) {
	if (document.readyState !== 'loading') {
		callbackFunc();
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', callbackFunc);
	}
}

ready(function () {
	//////////////////////
	// Init Canvas
	/////////////////////

	const canvas = document.querySelector('canvas');

	// set canvas width height same as windows
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	// get 2d drawing context
	const c = canvas.getContext('2d');
});
