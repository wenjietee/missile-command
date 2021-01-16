/* 
    This script contains the particle class and particle factory
*/

//////////////////////
// Particle Class
/////////////////////

class Particle extends Missile {
	constructor(x, y, velocityX, velocityY, radius, color, imageSource) {
		//enemy appearance
		super(x, y, velocityX, velocityY, radius, color, imageSource);
		this.alpha = 1;
		//enemy data
	}
	render() {
		drawParticle(this.x, this.y, this.radius, this.color, this.alpha);
	}
	update() {
		this.render();
		this.velocityX *= friction;
		this.velocityY *= friction;
		this.x = this.x + this.velocityX;
		this.y = this.y + this.velocityY;
		this.alpha -= 0.01;
	}
}

//////////////////////
// Particle Factory
/////////////////////
class ParticleFactory {
	constructor() {
		this.particles = [];
		this.speedFactor = 10;
	}

	createParticles(x, y, color, amount) {
		for (let i = 0; i <= amount; i++) {
			this.particles.push(
				new Particle(
					x,
					y,
					(Math.random() - 0.5) * this.speedFactor,
					(Math.random() - 0.5) * this.speedFactor,
					Math.random() * 10,
					color
				)
			);
		}
	}

	updateParticles() {
		this.particles.forEach((particle, particleIndex) => {
			if (particle.alpha <= 0) {
				this.particles.splice(particleIndex, 1);
			} else {
				particle.update();
			}
		});
	}
}
