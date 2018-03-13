import game from './game';
import State from './state';
import Mob from './mob';

const YSPEED = 1.5;
const XSPEED = 3;

export default class Enemy extends Mob {
    constructor(x, y) {
        super(3)

        this.sprite = game.add.sprite(x, y, 'enemy');
        this.sprite.anchor.set(0.5, 1);
    }

    update() {
        if (!State.inCombat) {
            // random walk, add direction choice delay
            // let rd = ~~(Math.random() * 10);
            // if (rd == 0) {
            //     this.sprite.x -= XSPEED;
            // } else if (rd == 1) {
            //     this.sprite.x += XSPEED;
            // } else if (rd == 2) {
            //     this.sprite.y += YSPEED;
            // } else if (rd == 3) {
            //     this.sprite.y -= YSPEED;
            // }
        }
    }
}