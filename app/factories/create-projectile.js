import { calculateVelocity } from '../calculate-velocity.js';

/**
 * @typedef {Object} CreateProjectileConfig
 * 
 * @property {CanvasRenderingContext2D} canvas
 * @property {Coord?} startPosition
 * @property {Enemy} enemy
 */

/**
 * @param {CreateProjectileConfig} config
 * @return {Projectile}
 */

export function createProjectile({ canvas, startPosition = { x: 0, y: 0 }, enemy }) {

	/** @type {Coord} */
	const position = startPosition;

	/** @type {number} */
	const radius = 10;

	/** @type {number} */
	const power = 5;

	function draw() {
		canvas.beginPath();
		canvas.arc(position.x, position.y, radius, 0, Math.PI * 2);
		canvas.fillStyle = 'orange';
		canvas.fill();
	}

	function update() {
		draw();
		const velocity = calculateVelocity(enemy.center.x, position.x, enemy.center.y, position.y);

		position.x += velocity.x * power;
		position.y += velocity.y * power;
	}

	return {
		position,
		radius,
		enemy,
		update
	};
}
