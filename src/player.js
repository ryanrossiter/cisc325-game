import game from './game';
import State from './state';
import Defs from './defs';
import Mob from './mob';

const HEALTH_BAR_HEIGHT = Defs.GAME_HEIGHT * 0.4;

export default class Player extends Mob {
    constructor(x, y) {
        super(200);

        this.sprite = game.add.sprite(x, y, 'player');
        this.sprite.anchor.set(0.5, 1); // set sprite anchor at feet
        this.healthBar.scale.y = HEALTH_BAR_HEIGHT;
        //this.sprite.addChild(this.healthBar);
    }
}