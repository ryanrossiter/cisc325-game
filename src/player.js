import game from './game';
import State from './state';
import Defs from './defs';
import Mob from './mob';

const HEALTH_BAR_HEIGHT = Defs.GAME_HEIGHT * 0.4;

export default class Player extends Mob {
    constructor(x, y) {
        super(200 * Math.pow(1.1, State.level));
        this.maxMana = this.mana = 100 * Math.pow(1.05, State.level);

        this.sprite = game.add.sprite(x, y, 'player');
        this.sprite.anchor.set(0.5, 1); // set sprite anchor at feet
        this.healthBar.scale.y = HEALTH_BAR_HEIGHT;
        //this.sprite.addChild(this.healthBar);

        this.manaBar = game.add.group(null);
        this._manaBar = this.manaBar.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        this._manaBar.height = 1;
        this._manaBar.width = 40;
        this._manaBar.tint = 0x0000FF;
        this._manaBar.anchor.set(0.5, 1);
        this.manaBar.scale.y = HEALTH_BAR_HEIGHT;
    }

    addMana(m) {
        this.mana = Math.max(Math.min(this.mana + m, this.maxMana), 0);
        this._manaBar.scale.y = 0.1 * this.mana / this.maxMana;
    }
}