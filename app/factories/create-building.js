import { createSprite } from './create-sprite.js';
import { createProjectile } from './create-projectile.js';
import { building } from '../images.js';

/**
 * @typedef {Object} CreateBuildingConfig
 * 
 * @property {Coord?} position
 */

/**
 * @param {CreateBuildingConfig} config
 * @return {Building}
 */

export function createBuilding({ position = { x: 0, y: 0 } }) {

	/** @type {Sprite} */
	const sprite = createSprite({
		position,
		image: building,
		offset: {
			x: 0,
			y: -80
		}
	})

	/** @type {number} */
	const width = 128;

	/** @type {number} */
	const height = 64;

	/** @type {number} */
	const radius = 250;

	/** @type {Coord} */
	const center = {
		x: position.x + (width / 2),
		y: position.y + (height / 2)
	};

	/** @type {Enemy} */
	let target = undefined;

	/** @type {Projectile[]} */
	const projectiles = [];

	/** @param {Enemy[]} enemies */
	function update(enemies) {
		sprite.draw();

		if (target || (!target && sprite.frames.current !== 0)) {
			sprite.update();
		}

		if (target &&
			sprite.frames.current === 6 &&
			sprite.frames.elapsed % sprite.frames.hold === 0) {
			shoot();
		}

		setTarget(enemies);
	}

	function shoot() {
		projectiles.push(
			createProjectile({
				startPosition: {
					x: center.x,
					y: center.y
				},
				enemy: target
			})
		)
	}

	/** @param {Enemy[]} enemies */
	function setTarget(enemies) {

		const newTarget = enemies.find(e => {
			const xDiff = e.center.x - center.x;
			const yDiff = e.center.y - center.y;
			const distance = Math.hypot(xDiff, yDiff);

			return (distance < e.radius + radius);
		});

		target = newTarget;
	}

	return {
		position,
		projectiles,
		update
	};
}
