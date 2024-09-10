import { canvas, c2d } from './canvas.js';
import { explosion, map, preloadImages } from './images.js';

import { createBuilding } from './factories/create-building.js';
import { createPlacementTile } from './factories/create-placement-tile.js';
import { createSprite } from './factories/create-sprite.js';

import { placements } from './level1/placements.js';
import { spawnEnemies } from './spawn-enemies.js';

async function main() {

	await preloadImages();

	/** @type {Enemy[]} */
	const enemies = [];

	/** @type {PlacementTile[]} */
	const placementTiles = [];

	/** @type {Building[]} */
	const buildings = [];

	/** @type {Sprite[]} */
	const explosions = [];

	/** @type {PlacementTile} */
	let activePlacementTile = undefined;

	/** @type {number} */
	let enemyCount = 3;

	/** @type {Coord} */
	const mouse = {
		x: undefined,
		y: undefined
	};


	placements.forEach((row, y) => {
		row.forEach((canPlaceHere, x) => {
			if (canPlaceHere) {
				placementTiles.push(
					createPlacementTile({
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

		c2d.drawImage(map.image, 0, 0);

		for (let i = enemies.length - 1; i >= 0; i--) {
			const e = enemies[i];
			e.update();
		}

		for (let i = explosions.length - 1; i >= 0; i--) {
			const explosion = explosions[i]
			explosion.draw()
			explosion.update()

			if (explosion.frames.current >= explosion.frames.max - 1) {
				explosions.splice(i, 1)
			}
		}

		if (enemies.length === 0) {
			enemyCount += 2
			spawnEnemies(enemies, enemyCount)
		}

		placementTiles.forEach(t => t.update(mouse));

		buildings.forEach(b => {
			b.update(enemies);

			for (let i = b.projectiles.length - 1; i >= 0; i--) {
				const p = b.projectiles[i];
				p.update();

				const xDiff = p.enemy.center.x - p.position.x;
				const yDiff = p.enemy.center.y - p.position.y;
				const distance = Math.hypot(xDiff, yDiff);
				if (distance < p.enemy.radius) {
					p.enemy.takeHit(20);
					if (p.enemy.isDead()) {
						const eIdx = enemies.indexOf(p.enemy);
						if (eIdx > -1) {
							enemies.splice(eIdx, 1);
						}
					}

					explosions.push(
						createSprite({
							position: p.position,
							image: explosion
						})
					)

					b.projectiles.splice(i, 1);
				}
			}
		});
	}

	animate();


	canvas.addEventListener('click', () => {
		if (activePlacementTile && !activePlacementTile.isOccupied) {
			const building = createBuilding({
				position: { ...activePlacementTile.position },
			});
			activePlacementTile.isOccupied = true;
			buildings.push(building);
			buildings.sort((a, b) => {
				return a.position.y - b.position.y;
			});
		}
	});

	window.addEventListener('mousemove', (event) => {
		mouse.x = event.clientX;
		mouse.y = event.clientY;

		activePlacementTile = placementTiles.find(tile =>
			mouse.x > tile.position.x && mouse.x < tile.position.x + tile.width &&
			mouse.y > tile.position.y && mouse.y < tile.position.y + tile.height
		);
	})
}

main();