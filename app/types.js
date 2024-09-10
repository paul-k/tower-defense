/**
 * @typedef {Object} Coord
 * 
 * @property {number} x
 * @property {number} y
 */

/**
 * @typedef {Object} Frames
 * 
 * @property {number} max
 * @property {number} current
 * @property {number} elapsed
 * @property {number} hold
 */

/**
 * @typedef {Object} LoadedImage
 * 
 * @property {CanvasImageSource} image
 * @property {number} frameCount
 * @property {number} frameWidth
 * @property {number} frameHeight
 */


/**
 * @typedef {Object} Sprite
 * 
 * @property {Frames} frames
 * 
 * @property {() => void} draw
 * @property {() => void} update
 */


/**
 * @typedef {Object} Enemy
 * 
 * @property {Coord} center
 * @property {number} health
 * @property {number} radius
 * @property {Coord} position
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
 * @property {Coord} position
 * @property {Projectile[]} projectiles
 * 
 * @property {(enemies: Enemy[]) => void} update
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

