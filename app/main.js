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
			this.waypointIndex = 0;
		}

		draw() {
			c.fillStyle = 'red';
			c.fillRect(this.position.x - (this.width / 2), this.position.y - (this.height / 2), this.width, this.height);
		}

		update() {
			this.draw();

			const waypoint = waypoints[this.waypointIndex];
			const velocity = calculateVelocity(waypoint.x, this.position.x, waypoint.y, this.position.y);

			this.position.x += velocity.x;
			this.position.y += velocity.y;

			if (Math.round(this.position.x) === waypoint.x
				&& Math.round(this.position.y) === waypoint.y
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
			this.size = 64;
			this.color = 'rgba(255, 255, 255, 0.15)'
		}

		draw() {
			c.fillStyle = this.color;
			c.fillRect(this.position.x, this.position.y, this.size, this.size);
		}

		update(mouse) {
			this.draw();

			if (
				mouse.x > this.position.x && mouse.x < this.position.x + this.size &&
				mouse.y > this.position.y && mouse.y < this.position.y + this.size) {
				this.color = 'white';
			} else {
				this.color = 'rgba(255, 255, 255, 0.15)';
			}
		}
	}

	const enemies = [];
	const placementTiles = [];

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

	console.log('placementTiles:', placementTiles)

	function animate() {
		requestAnimationFrame(animate);

		c.drawImage(image, 0, 0);

		enemies.forEach(e => e.update());
		placementTiles.forEach(t => t.update(mouse));
	}

	window.addEventListener('mousemove', (event) => {
		mouse.x = event.clientX;
		mouse.y = event.clientY;
	})
});
