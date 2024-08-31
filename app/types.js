/**
 * @typedef {Object} Coord
 * 
 * @property {number} x
 * @property {number} y
 */


/**
 * @typedef {Object} Enemy
 * 
 * @property {Coord} center
 * @property {number} health
 * @property {number} radius
 * 
 * @property {() => void} update
 * @property {(amount: number) => void} takeHit
 * @property {() => boolean} isDead
 */


/**
 * @typedef {Object} PlacementTile
 * 
 * @property {number} height
 * @property {boolean} isOccupied
 * @property {Coord} position
 * @property {number} width
 * 
 * @property {(mouse: Coord) => void} update
 */

/**
 * @typedef {Object} Building
 * 
 * @property {Coord} center
 * @property {Coord} position
 * @property {Projectile[]} projectiles
 * @property {number} radius
 * 
 * @property {() => void} update
 * @property {() => void} unsetTarget
 * @property {(enemy: Enemy) => void} setTarget
 */


/**
 * @typedef {Object} Projectile
 * 
 * @property {Coord} position
 * @property {number} radius
 * @property {Enemy} enemy
 * 
 * @property {() => void} update
 */

