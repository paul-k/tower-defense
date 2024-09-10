const waveElement = document.getElementById('wave');
const livesElement = document.getElementById('lives');
const coinsElement = document.getElementById('coins');
const gameOverElement = document.getElementById('gameOver');

/** @param {number} wave */
export function updateWaveDisplay(wave) {
	waveElement.innerHTML = wave.toString()
}

/** @param {number} lives */
export function updateLivesDisplay(lives) {
	livesElement.innerHTML = lives.toString()
}

export function showGameOver() {
	gameOverElement.style.display = 'flex';
}

/** @param {number} coins */
export function updateCoinsDisplay(coins) {
	coinsElement.innerHTML = coins.toString();
}