define(

	/**
	 * @callback CalculateVelocityFunc
	 * 
	 * @param {number} startX
	 * @param {number} endX
	 * @param {number} startY
	 * @param {number} endY
	 * 
	 * @returns {Coord}
	 */

	/** @returns {CalculateVelocityFunc} */
	function () {
		return function (startX, endX, startY, endY) {

			const yDist = startY - endY;
			const xDist = startX - endX;

			const angle = Math.atan2(yDist, xDist);

			return {
				x: Math.cos(angle),
				y: Math.sin(angle)
			};
		}

	});