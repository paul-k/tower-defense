define(function (require) {

	const canvas = document.querySelector('canvas');
	canvas.width = 1280;
	canvas.height = 768;

	const c = canvas.getContext('2d');

	const image = new Image();
	image.onload = () => {
		animate();
	}
	image.src = 'level1/map.png';

	const waypoints = require('level1/waypoints');

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

	const enemies = [];
	const { x, y } = waypoints[0];

	for (let i = 0; i < 10; i++) {
		enemies.push(
			new Enemy({ position: { x: x - (i * 150), y } })
		)
	}

	function animate() {
		requestAnimationFrame(animate);

		c.drawImage(image, 0, 0);

		enemies.forEach(e => e.update());
	}
});
