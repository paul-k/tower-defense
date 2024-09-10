/**
 * @typedef {Object} CreateImageConfig
 * 
 * @property {string} imageSrc
 * @property {number} [maxNumberOfFrames]
 */

/**
 * @param {CreateImageConfig} config
 * @return {Promise<LoadedImage>}
 */

export async function createImageAsync({
	imageSrc,
	maxNumberOfFrames = 1
}) {

	const image = new Image();
	image.src = imageSrc;

	await image.decode();

	return {
		image,
		frameCount: maxNumberOfFrames,
		frameWidth: image.width / maxNumberOfFrames,
		frameHeight: image.height
	};
}
