import { c2d } from "../canvas.js";

/**
 * @typedef {Object} CreatePlacementTileConfig
 * 
 * @property {Coord?} position
 */

/**
 * @param {CreatePlacementTileConfig} config
 * @return {PlacementTile}
 */

export function createPlacementTile({ position = { x: 0, y: 0 } }) {

	/** @type {number} */
	const width = 128;

	/** @type {number} */
	const height = 64;

	/** @type {'white' | 'rgba(255, 255, 255, 0.15)'} */
	let color = 'rgba(255, 255, 255, 0.15)';

	/** @type {boolean} */
	let isOccupied = false;


	function draw() {
		c2d.fillStyle = color;
		c2d.fillRect(position.x, position.y, width, height);
	}

	/**
	 * @param {Coord} mouse 
	 */
	function update(mouse) {
		draw();
		if (
			mouse.x > position.x && mouse.x < position.x + width &&
			mouse.y > position.y && mouse.y < position.y + height) {
			color = 'white';
		} else {
			color = 'rgba(255, 255, 255, 0.15)';
		}
	}

	return {
		height,
		isOccupied,
		position,
		width,
		update
	};
}
