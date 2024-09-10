import { c2d } from '../canvas.js';
import { createSprite } from './create-sprite.js';
import { calculateVelocity } from '../calculate-velocity.js';
import { waypoints } from '../level1/waypoints.js';
import { enemy } from '../images.js';

/**
 * @typedef {Object} CreateEnemyConfig
 * 
 * @property {Coord?} startPosition
 * @property {number} startHealth
 */

/**
 * @param {CreateEnemyConfig} config
 * @return {Enemy}
 */

export function createEnemy({ startPosition = { x: 0, y: 0 }, startHealth = 100 }) {
	/** @type {Coord} */
	const position = startPosition;

	/** @type {Sprite} */
	const sprite = createSprite({
		position: position,
		image: enemy
	})

	/** @type {number} */
	const width = 100;

	/** @type {number} */
	const height = 100;

	/** @type {number} */
	const radius = 50;

	/** @type {number} */
	let health = startHealth;

	/** @type {Coord} */
	const center = {
		x: position.x + (width / 2),
		y: position.y + (height / 2)
	}

	/** @type {number} */
	let waypointIndex = 0;


	function draw() {
		sprite.draw();

		c2d.fillStyle = 'red';
		c2d.fillRect(position.x, position.y - 15, width, 10);

		c2d.fillStyle = 'green';
		c2d.fillRect(position.x, position.y - 15, width * (health / 100), 10);
	}


	function update() {
		draw();
		sprite.update();

		const waypoint = waypoints[waypointIndex];
		const velocity = calculateVelocity(waypoint.x, center.x, waypoint.y, center.y);

		position.x += velocity.x;
		position.y += velocity.y;

		center.x = position.x + (width / 2);
		center.y = position.y + (height / 2);

		if (Math.round(center.x) === waypoint.x
			&& Math.round(center.y) === waypoint.y
			&& waypointIndex < (waypoints.length - 1)) {
			waypointIndex++;
		}
	}


	/**
	 * @param {number} amount 
	 */
	function takeHit(amount) {
		health -= amount;
	}


	function isDead() {
		return health <= 0;
	}


	return {
		center,
		health,
		radius,
		position,
		update,
		takeHit,
		isDead
	};
}
