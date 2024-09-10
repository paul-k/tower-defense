import { c2d } from '../canvas.js';

/**
 * @typedef {Object} CreateSpriteConfig
 * 
 * @property {Coord} [position]
 * @property {LoadedImage} image
 * @property {Coord} [offset]
 */

/**
 * @param {CreateSpriteConfig} config
 * @return {Sprite}
 */

export function createSprite({
	position = { x: 0, y: 0 },
	image,
	offset = { x: 0, y: 0 }
}) {

	/** @type {Frames} */
	const frames = {
		max: image.frameCount,
		current: 0,
		elapsed: 0,
		hold: 3
	}

	function draw() {
		const crop = {
			position: {
				x: image.frameWidth * frames.current,
				y: 0
			},
			width: image.frameWidth,
			height: image.frameHeight
		}
		c2d.drawImage(
			image.image,
			crop.position.x,
			crop.position.y,
			crop.width,
			crop.height,
			position.x + offset.x,
			position.y + offset.y,
			crop.width,
			crop.height
		)
	}

	function update() {
		frames.elapsed++
		if (frames.elapsed % frames.hold === 0) {
			frames.current++
			if (frames.current >= frames.max) {
				frames.current = 0
			}
		}
	}

	return {
		frames,
		draw,
		update
	};
}
