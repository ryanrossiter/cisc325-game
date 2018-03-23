const MSR = 4; // max scale ratio
const GAME_WIDTH = 360 * MSR;
const GAME_HEIGHT = 640 * MSR;

const LEVEL_TYPES = { // flag to indicate theme ex.
    NORMAL: 0,
    TOWER: 1,
    OUTSIDE: 2,
};

const ITEM_TYPES = {
    MAGIC: 0,
    RANGED: 1,
    MELEE: 2,
    ABILITY: 3,
};

export default {
    GAME_WIDTH,
    GAME_HEIGHT,
    SCALE_RATIO: window.devicePixelRatio / MSR, // 3.5 is the max scale ratio
    PIXEL_SIZE: 1, // Defines the size of pixels used to generate PIXEL_SPRITES

    INITIAL_STATE: 'Title',

    FLOOR_Y: GAME_HEIGHT * 0.5,
    FLOOR_HEIGHT: GAME_HEIGHT * 0.2,

    ITEM_TYPES,
    ITEMS: {
        0: {
            name: "Good Ol' Bow",
            type: ITEM_TYPES.RANGED,
            sprite: 'item',
            damage: 3,
            //accuracy: 0.8,
        },
        // can also use names for items:
        DEV_SWORD: {
            name: "NO",
            type: ITEM_TYPES.MELEE,
            sprite: 'item',
            damage: 99,
            //speed: 1, // maybe number of enemy turns until can attack again
        }
    },

    ENEMIES: {
        NORMAL: { // maybe add other stats like def?
            sprite: 'enemy',
            health: 10,
            drop_rates: {
                // key: item key, value: % chance of dropping
                0: 0.1
            }
        },
    },

    LEVEL_TYPES,
    LEVELS: [
        {
            type: LEVEL_TYPES.NORMAL,
            enemySpawns: [
                {
                    type: ENEMIES.NORMAL,
                    quantity: 15,
                    healthMultiplier: 1,
                    //spawnMethod: SPAWN_METHODS.RANDOM
                }
            ]
        }
    ],

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