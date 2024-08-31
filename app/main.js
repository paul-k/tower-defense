define(function (require) {

	const canvas = document.querySelector('canvas');
	canvas.width = 1280;
	canvas.height = 768;

	const c = canvas.getContext('2d');

	const image = new Image();
	image.onload = () => {
		animate();
	}
	image.src = 'app/level1/map.png';

	const waypoints = require('app/level1/waypoints');
	const placements = require('app/level1/placements');

	function calculateVelocity(startX, endX, startY, endY) {

		const yDist = startY - endY;
		const xDist = startX - endX;

		const angle = Math.atan2(yDist, xDist);

		return {
			x: Math.cos(angle),
			y: Math.sin(angle)
		};
	}

	class Enemy {
		constructor({
			position = {
				x: 0,
				y: 0
			}
		}) {
			this.position = position;
			this.width = 100;
			this.height = 100;
			this.radius = 50;
			this.waypointIndex = 0;
			this.center = {
				x: position.x + (this.width / 2),
				y: position.y + (this.height / 2)
			}
		}

		draw() {
			c.fillStyle = 'red';

			c.beginPath();
			c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
			c.fill();

			//c.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
		}

		update() {
			this.draw();

			const waypoint = waypoints[this.waypointIndex];
			const velocity = calculateVelocity(waypoint.x, this.center.x, waypoint.y, this.center.y);

			this.position.x += velocity.x;
			this.position.y += velocity.y;

			this.center.x = this.position.x + (this.width / 2);
			this.center.y = this.position.y + (this.height / 2);

			if (Math.round(this.center.x) === waypoint.x
				&& Math.round(this.center.y) === waypoint.y
				&& this.waypointIndex < (waypoints.length - 1)) {
				this.waypointIndex++;
			}
		}
	}

	class PlacementTile {
		constructor({
			position = {
				x: 0,
				y: 0
			}
		}) {
			this.position = position;
			this.width = 128;
			this.height = 64;
			this.color = 'rgba(255, 255, 255, 0.15)';
			this.isOccupied = false;
		}

		draw() {
			c.fillStyle = this.color;
			c.fillRect(this.position.x, this.position.y, this.width, this.height);
		}

		update(mouse) {
			this.draw();

			if (
				mouse.x > this.position.x && mouse.x < this.position.x + this.width &&
				mouse.y > this.position.y && mouse.y < this.position.y + this.height) {
				this.color = 'white';
			} else {
				this.color = 'rgba(255, 255, 255, 0.15)';
			}
		}
	}

	class Building {
		constructor({
			position = {
				x: 0,
				y: 0
			}
		}) {
			this.position = position;
			this.width = 128;
			this.height = 64;
			this.radius = 250;
			this.center = {
				x: this.position.x + (this.width / 2),
				y: this.position.y + (this.height / 2)
			}
			this.target = undefined;
			this.frames = 0;
			this.projectiles = [];
		}

		draw() {
			c.fillStyle = 'blue';
			c.fillRect(this.position.x, this.position.y, this.width, this.height);

			c.fillStyle = 'rgba(0, 0, 255, 0.15)';
			c.beginPath();
			c.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
			c.fill();
		}

		update() {
			this.draw();

			if (this.target && this.frames % 100 === 0) {
				this.projectiles.push(
					new Projectile({
						position: {
							x: this.center.x,
							y: this.center.y
						},
						enemy: this.target
					})
				)
			}

			this.frames++;
		}
	}

	class Projectile {
		constructor({
			position = {
				x: 0,
				y: 0
			},
			enemy
		}) {
			this.position = position;
			this.radius = 10;
			this.enemy = enemy;
			this.power = 5;
		}

		draw() {
			c.beginPath();
			c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
			c.fillStyle = 'orange';
			c.fill();
		}

		update() {
			this.draw();

			const velocity = calculateVelocity(this.enemy.center.x, this.position.x, this.enemy.center.y, this.position.y);

			this.position.x += velocity.x * this.power;
			this.position.y += velocity.y * this.power;
		}
	}


	const enemies = [];
	const placementTiles = [];
	const buildings = [];

	let activePlacementTile = undefined;

	const mouse = {
		x: undefined,
		y: undefined
	};


	const { x, y } = waypoints[0];

	for (let i = 0; i < 10; i++) {
		enemies.push(
			new Enemy({ position: { x: x - (i * 150), y } })
		)
	}

	placements.forEach((row, y) => {
		row.forEach((canPlaceHere, x) => {
			if (canPlaceHere) {
				placementTiles.push(
					new PlacementTile({
						position: {
							x: x * 64,
							y: y * 64
						}
					})
				)
			}
		});
	})

	function animate() {
		requestAnimationFrame(animate);

		c.drawImage(image, 0, 0);

		enemies.forEach(e => e.update());
		placementTiles.forEach(t => t.update(mouse));
		buildings.forEach(b => {
			b.update();
			b.target = null;

			const validEnemies = enemies.filter(e => {
				const xDiff = e.center.x - b.center.x;
				const yDiff = e.center.y - b.center.y;
				const distance = Math.hypot(xDiff, yDiff);

				return (distance < e.radius + b.radius);
			});

			b.target = validEnemies[0];

			for (let i = b.projectiles.length - 1; i >= 0; i--) {
				const p = b.projectiles[i];
				p.update();

				const xDiff = p.enemy.center.x - p.position.x;
				const yDiff = p.enemy.center.y - p.position.y;
				const distance = Math.hypot(xDiff, yDiff);
				if (distance < p.enemy.radius) {
					b.projectiles.splice(i, 1);
				}
			}
		});
	}

	canvas.addEventListener('click', (event) => {
		if (activePlacementTile && !activePlacementTile.isOccupied) {
			buildings.push(
				new Building({
					position: {
						x: activePlacementTile.position.x,
						y: activePlacementTile.position.y
					}
				})
			);
			activePlacementTile.isOccupied = true;
		}
	});

	window.addEventListener('mousemove', (event) => {
		mouse.x = event.clientX;
		mouse.y = event.clientY;

		activePlacementTile = null;

		for (let i = 0; i < placementTiles.length; i++) {
			const tile = placementTiles[i];
			if (
				mouse.x > tile.position.x && mouse.x < tile.position.x + tile.width &&
				mouse.y > tile.position.y && mouse.y < tile.position.y + tile.height) {
				activePlacementTile = tile;
				break;
			}
		}
	})
});
