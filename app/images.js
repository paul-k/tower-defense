import { createImageAsync } from "./factories/create-image.js";


/** @type {LoadedImage} */
export let building = null;

/** @type {LoadedImage} */
export let enemy = null;

/** @type {LoadedImage} */
export let explosion = null;

/** @type {LoadedImage} */
export let map = null;

/** @type {LoadedImage} */
export let projectile = null;

export async function preloadImages() {
	building = await createImageAsync({
		imageSrc: './app/sprites/tower.png',
		maxNumberOfFrames: 19
	});

	enemy = await createImageAsync({
		imageSrc: './app/sprites/orc.png',
		maxNumberOfFrames: 7
	});

	explosion = await createImageAsync({
		imageSrc: './app/sprites/explosion.png',
		maxNumberOfFrames: 4
	});

	map = await createImageAsync({
		imageSrc: './app/level1/map.png',
	});

	projectile = await createImageAsync({
		imageSrc: './app/sprites/projectile.png',
	});
}
