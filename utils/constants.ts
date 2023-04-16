export const alphabet = 'abcdefghijklmnopqrstuvwxyz'

export const directions = ['right', 'left', 'up', 'down'] as const
export type direction = typeof directions[number]

/**
 * cords are x,y, but in matrixes normal acesses would be y,z, so atCord is provided
 */
export type cord = [number,number]