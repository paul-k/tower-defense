const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 768;

const c = canvas.getContext('2d');

const image = new Image();
image.onload = () => {
	animate();
}
image.src = 'level1/map.png';


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
		const yDist = waypoint.y - this.position.y;
		const xDist = waypoint.x - this.position.x;

		const angle = Math.atan2(yDist, xDist);

		this.position.x += Math.cos(angle);
		this.position.y += Math.sin(angle);

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


