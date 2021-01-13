/* 
    This script contains the city class
 */

//////////////////////
// City Class
/////////////////////
class City {
	constructor(x, y, width, height, color) {
		//city appearance
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
		//city data
		this.points = 300;
	}
	render() {
		drawRect(this.x, this.y, this.width, this.height, this.color);
	}
}
//////////////////////
// City Factory Class
/////////////////////

class CityFactory {
	constructor() {
		this.cities = [];
	}

	createCity() {
		let cityX = 50;
		for (let i = 0; i < 6; i++) {
			let cityY = canvas.height - 70;
			this.cities.push(new City(cityX, cityY, 50, 70, 'green'));
			cityX += canvas.width / 5.5;
		}
	}

	renderCities() {
		this.cities.forEach((city) => {
			city.render();
		});
	}

	getCities() {
		return this.cities.length;
	}
}
