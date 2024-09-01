define(
	[
		'app/factories/create-projectile'
	],

	/**
	 * @typedef {Object} CreateBuildingConfig
	 * 
	 * @property {CanvasRenderingContext2D} canvas
	 * @property {Coord?} position
	 */

	/**
	 * @callback CreateBuildingFunc
	 * @param {CreateBuildingConfig} config
	 * @return {Building}
	 */

	/**
	 * @param {CreateProjectileFunc} createProjectile 
	 * @returns {CreateBuildingFunc}
	 */
	function (createProjectile) {

		return function ({ canvas, position = { x: 0, y: 0 } }) {

			/** @type {number} */
			const width = 128;

			/** @type {number} */
			const height = 64;

			/** @type {number} */
			const radius = 250;

			/** @type {Coord} */
			const center = {
				x: position.x + (width / 2),
				y: position.y + (height / 2)
			};

			/** @type {number} */
			let frames = 0;

			/** @type {Enemy} */
			let target = undefined;

			/** @type {Projectile[]} */
			const projectiles = [];

			function draw() {
				canvas.fillStyle = 'blue';
				canvas.fillRect(position.x, position.y, width, height);

				canvas.fillStyle = 'rgba(0, 0, 255, 0.15)';
				canvas.beginPath();
				canvas.arc(center.x, center.y, radius, 0, Math.PI * 2);
				canvas.fill();

			}

			/** @param {Enemy[]} enemies */
			function update(enemies) {
				draw();
				if (target && frames % 100 === 0) {
					projectiles.push(
						createProjectile({
							canvas,
							startPosition: {
								x: center.x,
								y: center.y
							},
							enemy: target
						})
					)
				}

				frames++;

				setTarget(enemies);
			}

			/** @param {Enemy[]} enemies */
			function setTarget(enemies) {

				const newTarget = enemies.find(e => {
					const xDiff = e.center.x - center.x;
					const yDiff = e.center.y - center.y;
					const distance = Math.hypot(xDiff, yDiff);

					return (distance < e.radius + radius);
				});

				target = newTarget;
			}

			return {
				projectiles,
				update
			};
		}

	});