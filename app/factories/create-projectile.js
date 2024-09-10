import { createSprite } from './create-sprite.js';
import { calculateVelocity } from '../calculate-velocity.js';

/**
 * @typedef {Object} CreateProjectileConfig
 * @property {Coord?} startPosition
 * @property {Enemy} enemy
 */

/**
 * @param {CreateProjectileConfig} config
 * @return {Projectile}
 */

export function createProjectile({ startPosition = { x: 0, y: 0 }, enemy }) {

	/** @type {Coord} */
	const position = startPosition;

	/** @type {Sprite} */
	const sprite = createSprite({
		position,
		imageSrc: './app/sprites/projectile.png'
	})

	/** @type {number} */
	const radius = 10;

	/** @type {number} */
	const power = 5;

	function update() {
		sprite.draw();
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
