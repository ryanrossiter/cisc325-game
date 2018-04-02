import game from './game';
import State from './state';
import Defs from './defs';
import Mob from './mob';

export default class Enemy extends Mob {
    constructor(x, y, type) {
        let DATA = Defs.ENEMIES[type];
        super(DATA.health)
        this.DATA = DATA;

        this.sprite = game.add.sprite(x, y, DATA.sprite);
        this.sprite.anchor.set(0.5, 1);
        this.sprite.inputEnabled = true;

        //this.sprite.addChild(this.healthBar);
    }

    attack(target, onHit) {
    	super.attack(target, this.DATA.damage, onHit);
    }
}