import { waypoints } from "./level1/waypoints.js";
import { createEnemy } from "./factories/create-enemy.js";

/**
 * @param {Enemy[]} enemies
 * @param {number} numberOfEnemies
 * @param {number} wave
 */
export function spawnEnemies(enemies, numberOfEnemies, wave) {

	const { x, y } = waypoints[0];

	for (let i = 0; i < numberOfEnemies; i++) {
		enemies.push(
			createEnemy({ startPosition: { x: x - (i * 150), y }, startHealth: 100, speedMultiplier: wave })
		)
	}
}
