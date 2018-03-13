import game from './game';
import State from './state';
import Mob from './mob';

const YSPEED = 1.5;
const XSPEED = 3;

export default class Player extends Mob {
    constructor(x, y) {
        super(10);

        this.sprite = game.add.sprite(x, y, 'player');
        this.sprite.anchor.set(0.5, 1); // set sprite anchor at feet
        game.camera.follow(this.sprite, Phaser.Camera.FOLLOW_PLATFORMER);

        this.keys = game.input.keyboard.createCursorKeys();
    }

    update() {
        if (!State.inCombat) {
            if (this.keys.up.isDown) {
                this.sprite.y -= YSPEED;
            }

            if (this.keys.down.isDown) {
                this.sprite.y += YSPEED;
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