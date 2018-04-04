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
    CONSUMABLE: 4,
    SKILL: 5,
};

export default {
    MSR,
    GAME_WIDTH,
    GAME_HEIGHT,
    SCALE_RATIO: window.devicePixelRatio / MSR, // 3.5 is the max scale ratio
    PIXEL_SIZE: 1, // Defines the size of pixels used to generate PIXEL_SPRITES

    INITIAL_STATE: 'Title',

    LEFT_UI_BAR_WIDTH: GAME_WIDTH * 0.12,

    ITEM_TYPES,
    ITEMS: {
        HEALTH_POTION: {
            name: "Health Potion",
            type: ITEM_TYPES.CONSUMABLE,
            sprite: '_item',
            cost: 200,
            hpBuff: 75,
        },
        WOODEN_SWORD: {
            name: "Wooden Sword",
            type: ITEM_TYPES.MELEE,
            sprite: '_item',
            cost: 150,
            damage: 30,
        },
        STEEL_SWORD: {
            name: "Steel Sword",
            type: ITEM_TYPES.MELEE,
            sprite: '_item',
            cost: 400,
            damage: 50,
        },
        WAND: {
            name: "Wand",
            type: ITEM_TYPES.MAGIC,
            sprite: '_item',
            damage: 50,
            cost: 500,
            mpCost: 10,
        },
        HEAL_BUFF: {
            name: "Heal Buff",
            type: ITEM_TYPES.SKILL,
            desc: "Gain HP",
            sprite: '_item',
            cost: 10,
            mpCost: 10,
            hpBuff: 50,
        },
        FLAME_THROW: {
            name: "Flamethrow Spell",
            type: ITEM_TYPES.SKILL,
            desc: "Fire type magic atk",
            sprite: '_item',
            cost: 50,
            mpCost: 50,
            damage: 90,
        }
    },

    ENEMIES: {
        NORMAL: { // maybe add other stats like def?
            sprite: 'monster1',
            health: 90,
            damage: 10,
            drop_rates: {
                // key: item key, value: % chance of dropping
                "STEEL_SWORD": 0.05,
                "WOODEN_SWORD": 0.33,
            }
        },
        STRONGER: { // maybe add other stats like def?
            sprite: 'monster2',
            health: 150,
            damage: 25,
            drop_rates: {
                "STEEL_SWORD": 0.25,
                "WAND": 0.1,
            }
        },
        STRONGEST: { // maybe add other stats like def?
            sprite: 'monster3',
            health: 220,
            damage: 33,
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
            enemies: [
                { type: "NORMAL" },
                { type: "NORMAL" },
                { type: "NORMAL" },
            ]
        },
        {
            type: LEVEL_TYPES.NORMAL,
            enemies: [
                { type: "NORMAL" },
                { type: "STRONGER" },
            ]
        },
        {
            type: LEVEL_TYPES.NORMAL,
            enemies: [
                { type: "NORMAL" },
                { type: "STRONGER" },
                { type: "NORMAL" },
            ]
        },
        {
            type: LEVEL_TYPES.NORMAL,
            enemies: [
                { type: "STRONGEST" },
            ]
        },
        {
            type: LEVEL_TYPES.NORMAL,
            enemies: [
                { type: "STRONGER" },
                { type: "STRONGER" },
            ]
        },
        {
            type: LEVEL_TYPES.NORMAL,
            enemies: [
                { type: "STRONGER" },
                { type: "NORMAL" },
                { type: "STRONGER" },
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
        'player': 'assets/img/player.png',
        'monster1': 'assets/img/monster1.png',
        'monster2': 'assets/img/monster2.png',
        'monster3': 'assets/img/monster3.png',
        'background': 'assets/img/background.png',
        'newgame': 'assets/img/newgame.png',
        'continue': 'assets/img/continue.png',
        'leaderboard': 'assets/img/leaderboard.png',
        'difficulty_ez': 'assets/img/journey_select/difficulty_ez.png',
        'difficulty_soso': 'assets/img/journey_select/difficulty_soso.png',
        'difficulty_crazy': 'assets/img/journey_select/difficulty_crazy.png',
        'class_warrior': 'assets/img/journey_select/class_warrior.png',
        'class_mage': 'assets/img/journey_select/class_mage.png',
        'class_archer': 'assets/img/journey_select/class_archer.png',
        'type_fire': 'assets/img/journey_select/type_fire.png',
        'type_water': 'assets/img/journey_select/type_water.png',
        'type_elec': 'assets/img/journey_select/type_elec.png',
        'type_earth': 'assets/img/journey_select/type_earth.png',
        'focus_attack': 'assets/img/journey_select/focus_attack.png',
        'focus_buff': 'assets/img/journey_select/focus_buff.png',
        'focus_skill': 'assets/img/journey_select/focus_skill.png',
        'focus_util': 'assets/img/journey_select/focus_util.png',
        'attack': 'assets/img/attack.png',
        'magic': 'assets/img/magic.png',
        'item': 'assets/img/item.png',
    },

    PIXEL_SPRITES: {
        'test': [ '0123456789................', 'abcefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
        '_test_spritesheet': [ '0123456789................' + 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' ],
    }
};