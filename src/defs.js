const MSR = 4; // max scale ratio
const GAME_WIDTH = 360 * MSR;
const GAME_HEIGHT = 640 * MSR;

export default {
    GAME_WIDTH,
    GAME_HEIGHT,
    SCALE_RATIO: window.devicePixelRatio / MSR, // 3.5 is the max scale ratio
    PIXEL_SIZE: 1, // Defines the size of pixels used to generate PIXEL_SPRITES

    INITIAL_STATE: 'Title',

    FLOOR_Y: GAME_HEIGHT * 0.5,
    FLOOR_HEIGHT: GAME_HEIGHT * 0.2,

    ITEMS: {
        0: {
            sprite: 'item'
        },
        1: {
            sprite: 'item'
        }
    },

    ENEMIES: {
        0: {
            sprite: 'enemy',
            health: 10,
            drop_rates: {
                0: 0.1
            }
        }
    },

    SPRITESHEETS: {
        '_test_spritesheet': {
            key: 'test_spritesheet',
            frameWidth: 26,
            frameHeight: 1
        },
    },

    SPRITES: {
        'title': '/assets/img/title.png',
    },

    PIXEL_SPRITES: {
        'test': [ '0123456789................', 'abcefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
        '_test_spritesheet': [ '0123456789................' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
    }
};