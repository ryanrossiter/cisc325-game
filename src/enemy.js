import game from './game';
import State from './state';
import Defs from './defs';
import Mob from './mob';

const YSPEED = 1;
const XSPEED = 2;
const DIR_CHANGE_DELAY = 500;

export default class Enemy extends Mob {
    constructor(x, y, type) {
        let DATA = Defs.ENEMIES[type];
        super(DATA.health)

        this.sprite = game.add.sprite(x, y, DATA.sprite);
        this.sprite.anchor.set(0.5, 1);

        this.sprite.addChild(this.healthBar);

        this.dir = 4;
        this.changeDirectionTimer = 0;
    }

    update() {
        if (!State.inCombat) {
            if (this.changeDirectionTimer <= 0) {
                this.changeDirectionTimer = DIR_CHANGE_DELAY * (1 + (Math.random() - 0.5) * 0.4);
                this.dir = ~~(Math.random() * 10);
            } else {
                this.changeDirectionTimer -= game.time.elapsed;
            }

            if (this.dir == 0) {
                this.sprite.x -= XSPEED;
            } else if (this.dir == 1) {
                this.sprite.x += XSPEED;
            } else if (this.dir == 2) {
                this.sprite.y += YSPEED;
                if (this.sprite.y > Defs.FLOOR_Y + Defs.FLOOR_HEIGHT) {
                    this.sprite.y = Defs.FLOOR_Y + Defs.FLOOR_HEIGHT;
                }
            } else if (this.dir == 3) {
                this.sprite.y -= YSPEED;
                if (this.sprite.y < Defs.FLOOR_Y) {
                    this.sprite.y = Defs.FLOOR_Y;
                }
            }
        }
    }
}