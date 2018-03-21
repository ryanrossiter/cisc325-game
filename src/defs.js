export default {
    GAME_WIDTH: window.innerWidth,
    GAME_HEIGHT: window.innerHeight,
    PIXEL_SIZE: 1, // Defines the size of pixels used to generate PIXEL_SPRITES

    FLOOR_Y: window.innerHeight * 0.50,
    FLOOR_HEIGHT: window.innerHeight * 0.3,

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
        //'player': '../img/player.png',
    },

    PIXEL_SPRITES: {
        'test': [ '0123456789................', 'abcefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
        '_test_spritesheet': [ '0123456789................' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
    }
};