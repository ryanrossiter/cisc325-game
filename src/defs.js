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
    MSR,
    GAME_WIDTH,
    GAME_HEIGHT,
    SCALE_RATIO: window.devicePixelRatio / MSR, // 3.5 is the max scale ratio
    PIXEL_SIZE: 1, // Defines the size of pixels used to generate PIXEL_SPRITES

    INITIAL_STATE: 'Title',

    FLOOR_Y: GAME_HEIGHT * 0.5,
    FLOOR_HEIGHT: GAME_HEIGHT * 0.2,

    ITEMS: {
        WOODEN_SWORD: {
            name: "Wooden Sword",
            type: ITEM_TYPES.MELEE,
            sprite: 'item',
            cost: 150,
            damage: 30,
        },
        STEEL_SWORD: {
            name: "Steel Sword",
            type: ITEM_TYPES.MELEE,
            sprite: 'item',
            cost: 400,
            damage: 50,
        },
        WAND: {
            name: "Wand",
            type: ITEM_TYPES.MAGIC,
            sprite: 'item',
            damage: 50,
            cost: 500,
            mpCost: 10,
        }
    },

    ENEMIES: {
        NORMAL: { // maybe add other stats like def?
            sprite: 'enemy',
            health: 90,
            drop_rates: {
                // key: item key, value: % chance of dropping
                "STEEL_SWORD": 0.05,
                "WOODEN_SWORD": 0.33,
            }
        },
        STRONGER: { // maybe add other stats like def?
            sprite: 'enemy',
            health: 150,
            drop_rates: {
                "STEEL_SWORD": 0.25,
                "WAND": 0.1,
            }
        },
    },

    LEVEL_TYPES,
    LEVELS: [
        {
            type: LEVEL_TYPES.NORMAL,
            length: 1, // Whatever 1 default length is
            enemySpawns: [
                {
                    type: "NORMAL",
                    // or maybe location: {x: 0, y: 0}
                    quantity: 15,
                    healthMultiplier: 1,
                    //spawnMethod: SPAWN_METHODS.RANDOM
                }
            ]
        },
        {
            type: LEVEL_TYPES.NORMAL,
            length: 1.2,
            enemySpawns: [
                {
                    type: "NORMAL",
                    // or maybe location: {x: 0, y: 0}
                    quantity: 30,
                    healthMultiplier: 1,
                    //spawnMethod: SPAWN_METHODS.RANDOM
                },
                {
                    type: "STRONGER",
                    // or maybe location: {x: 0, y: 0}
                    quantity: 3,
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
        'title': 'assets/img/title.png',
    },

    PIXEL_SPRITES: {
        'test': [ '0123456789................', 'abcefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
        '_test_spritesheet': [ '0123456789................' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
    }
};