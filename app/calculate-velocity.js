/**
 * @param {number} startX
 * @param {number} endX
 * @param {number} startY
 * @param {number} endY
 * @param {number} [speedMultiplier]
 * 
 * @returns {Coord}
 */
export function calculateVelocity(startX, endX, startY, endY, speedMultiplier = 1) {

	const yDist = startY - endY;
	const xDist = startX - endX;

	const angle = Math.atan2(yDist, xDist);

	return {
		x: Math.cos(angle) * speedMultiplier,
		y: Math.sin(angle) * speedMultiplier
	};
}
