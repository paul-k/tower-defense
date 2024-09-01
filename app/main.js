import { createEnemy } from './factories/create-enemy.js';
import { createBuilding } from './factories/create-building.js';
import { createPlacementTile } from './factories/create-placement-tile.js';
import { waypoints } from './level1/waypoints.js';
import { placements } from './level1/placements.js';


const canvas = document.querySelector('canvas');
canvas.width = 1280;
canvas.height = 768;

const c2d = canvas.getContext('2d');

const image = new Image();
image.onload = () => {
	animate();
}
image.src = 'app/level1/map.png';

/** @type {Enemy[]} */
const enemies = [];

/** @type {PlacementTile[]} */
const placementTiles = [];

/** @type {Building[]} */
const buildings = [];

/** @type {PlacementTile} */
let activePlacementTile = undefined;

/** @type {Coord} */
const mouse = {
	x: undefined,
	y: undefined
};


const { x, y } = waypoints[0];

for (let i = 0; i < 10; i++) {
	enemies.push(
		createEnemy({ canvas: c2d, startPosition: { x: x - (i * 150), y } })
	)
}

placements.forEach((row, y) => {
	row.forEach((canPlaceHere, x) => {
		if (canPlaceHere) {
			placementTiles.push(
				createPlacementTile({
					canvas: c2d,
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

	c2d.drawImage(image, 0, 0);

	for (let i = enemies.length - 1; i >= 0; i--) {
		const e = enemies[i];
		e.update();
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
				b.projectiles.splice(i, 1);
			}
		}
	});
}

canvas.addEventListener('click', () => {
	if (activePlacementTile && !activePlacementTile.isOccupied) {
		const building = createBuilding({
			canvas: c2d,
			position: { ...activePlacementTile.position },
		});
		buildings.push(building);
		activePlacementTile.isOccupied = true;
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
//	});
