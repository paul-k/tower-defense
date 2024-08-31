define(
	[
		'app/calculate-velocity',
		'app/level1/waypoints'
	],

	/**
	 * @typedef {Object} CreateEnemyConfig
	 * 
	 * @property {CanvasRenderingContext2D} canvas
	 * @property {Coord?} startPosition
	 */

	/**
	 * @callback CreateEnemyFunc
	 * @param {CreateEnemyConfig} config
	 * @return {Enemy}
	 */

	/**
	 * @param {CalculateVelocityFunc} calculateVelocity 
	 * @param {Coord[]} waypoints 
	 * @returns {CreateEnemyFunc}
	 */
	function (calculateVelocity, waypoints) {
		return function ({ canvas, startPosition = { x: 0, y: 0 } }) {
			/** @type {Coord} */
			const position = startPosition;

			/** @type {number} */
			const width = 100;

			/** @type {number} */
			const height = 100;

			/** @type {number} */
			const radius = 50;

			/** @type {number} */
			let health = 60;

			/** @type {Coord} */
			const center = {
				x: position.x + (width / 2),
				y: position.y + (height / 2)
			}

			/** @type {number} */
			let waypointIndex = 0;

			function draw() {
				canvas.fillStyle = 'red';

				canvas.beginPath();
				canvas.arc(center.x, center.y, radius, 0, Math.PI * 2);
				canvas.fill();

				canvas.fillRect(position.x, position.y - 15, width, 10);

				canvas.fillStyle = 'green';
				canvas.fillRect(position.x, position.y - 15, width * (health / 100), 10);
			}

			function update() {
				draw();

				const waypoint = waypoints[waypointIndex];
				const velocity = calculateVelocity(waypoint.x, center.x, waypoint.y, center.y);

				position.x += velocity.x;
				position.y += velocity.y;

				center.x = position.x + (width / 2);
				center.y = position.y + (height / 2);

				if (Math.round(center.x) === waypoint.x
					&& Math.round(center.y) === waypoint.y
					&& waypointIndex < (waypoints.length - 1)) {
					waypointIndex++;
				}
			}

			/**
			 * @param {number} amount 
			 */
			function takeHit(amount) {
				health -= amount;
			}

			function isDead() {
				return health <= 0;
			}


			return {
				center,
				health,
				radius,
				update,
				takeHit,
				isDead
			};
		}

	});