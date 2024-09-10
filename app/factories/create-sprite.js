import { c2d } from '../canvas.js';

/**
 * @typedef {Object} CreateSpriteConfig
 * 
 * @property {Coord} [position]
 * @property {string} imageSrc
 * @property {number} [maxNumberOfFrames]
 * @property {Coord} [offset]
 */

/**
 * @param {CreateSpriteConfig} config
 * @return {Sprite}
 */

export function createSprite({
	position = { x: 0, y: 0 },
	imageSrc,
	maxNumberOfFrames = 1,
	offset = { x: 0, y: 0 }
}) {

	/** @type {Frames} */
	const frames = {
		max: maxNumberOfFrames,
		current: 0,
		elapsed: 0,
		hold: 3,
		width: 0
	}

	const image = new Image();
	image.src = imageSrc;
	image.onload = () => {
		frames.width = image.width / frames.max
	}

	function draw() {
		const crop = {
			position: {
				x: frames.width * frames.current,
				y: 0
			},
			width: frames.width,
			height: image.height
		}
		c2d.drawImage(
			image,
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
