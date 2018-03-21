import game from './game';
import State from './state';
import Defs from './defs';
import Mob from './mob';

const YSPEED = 1.5;
const XSPEED = 3;

export default class Player extends Mob {
    constructor(x, y) {
        super(10);

        this.sprite = game.add.sprite(x, y, 'player');
        this.sprite.anchor.set(0.5, 1); // set sprite anchor at feet
        game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        this.sprite.addChild(this.healthBar);

        this.keys = game.input.keyboard.createCursorKeys();
    }

    update() {
        if (!State.inCombat) {
            if (this.keys.up.isDown) {
                this.sprite.y -= YSPEED;
                if (this.sprite.y < Defs.FLOOR_Y) {
                    this.sprite.y = Defs.FLOOR_Y;
                }
            }

            if (this.keys.down.isDown) {
                this.sprite.y += YSPEED;
                if (this.sprite.y > Defs.FLOOR_Y + Defs.FLOOR_HEIGHT) {
                    this.sprite.y = Defs.FLOOR_Y + Defs.FLOOR_HEIGHT;
                }
            }

            if (this.keys.left.isDown) {
                this.sprite.x -= XSPEED;
            }

            if (this.keys.right.isDown) {
                this.sprite.x += XSPEED;
            }
        }
    }
}