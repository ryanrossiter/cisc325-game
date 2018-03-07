
/**
 * Import Phaser dependencies using `expose-loader`.
 * This makes then available globally and it's something required by Phaser.
 * The order matters since Phaser needs them available before it is imported.
 */

import PIXI from 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js';
import p2 from 'expose-loader?p2!phaser-ce/build/custom/p2.js';
import Phaser from 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js';

import Preload from './preload';
import Main from './main';
import Defs from './defs';

const game = new Phaser.Game(Defs.GAME_WIDTH, Defs.GAME_HEIGHT, Phaser.AUTO, 'phaser-parent');
game.state.add("Preload", Preload);
game.state.add("Main", Main);
game.state.start("Preload");

export default game;
