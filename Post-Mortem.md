## Project Post Mortem

---

## Approach and Process

---

- What in my process and approach to this project would I do differently next time?

  - My process is sketching out a base idea for the game and segmenting the elements into objects. What I would do differently next time is to refactor the main game loop into a Game object and break the functions called within the loop into smaller and shorter methods.
  - Not fully understanding the calculations of the trajectory. I might need to do more research as I've yet to properly control the enemy location spawn.

- What in my process and approach to this project went well that I would repeat next time?
  - Breaking the elements into Objects and split js into multiple js files. It decluttered my code and I can easily navigate throughout the code file.

## Code and Code Design

---

- What in my code and program design in the project would I do differently next time?
- To create a game object instead of calling everything within a god function

```javascript
const gameStart = () => {
	// init game loop
	const gameLoop = requestAnimationFrame(gameStart);

	// render elements
	// collision checks
	// lose condition check
	// scoring
};
```

- What in my code and program design in the project went well? Is there anything I would do the same next time?

- Using classes and factory to group my elements

```javascript

class City {
	constructor(x, y) {
		//city appearance
		this.x = x;
		this.y = y;

	}
	render() {
		drawRect(this.x, this.y, this.width, this.height, this.color);
        drawImage(this.x, this.y, this.imageSource);

class CityFactory {
constructor() {
    this.cities = [];
}

createCity() {
    let cityX = 50;
    for (let i = 0; i < 6; i++) {
        let cityY = canvas.height - 70;
        this.cities.push(new City(cityX, cityY, 50, 70, '#2B2D42'));
        cityX += canvas.width / 5.5;
    }
}
```

- Helper functions called by classes to render

```javascript
const drawCircle = (x, y, radius, color) => {
	c.beginPath();
	c.arc(x, y, radius, Math.PI * 2, false);
	c.fillStyle = color;
	c.fill();
};

class Missile {
	constructor(x, y, velocityX, velocityY, radius, color, imageSource) {
		//properties here
	}

	render() {
		drawCircle(this.x, this.y, this.radius, this.color);

	}
```

For each, please include code examples.

- Code snippet up to 20 lines.
- Code design documents or architecture drawings / diagrams.

## Unit 1 Post Mortem

---

- What habits did I use during this unit that helped me?
  - DRY
  - Frequent commits and branching
  - Object oriented programming
- What habits did I have during this unit that I can improve on?
  - Planning and more proper pseudocoding
  - Using AJAX
- How is the overall level of the course during this unit? (instruction, course materials, etc.)
  - Overrall materials is good so far with varying levels of challenges.
  - Some homework clashes with project 1, have to make some sacrifices.
