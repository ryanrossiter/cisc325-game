import game from './game';
import Defs from './defs';

const HEALTH_BAR_HEIGHT = Defs.GAME_HEIGHT * 0.1;

export default class Mob {
    constructor(hp, ) {
        this.maxHealth = this.health = hp;

        this.healthBar = game.add.group(null);
        this._healthBar = this.healthBar.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        this._healthBar.height = 1;
        this._healthBar.width = 40;
        this._healthBar.tint = 0xFF0000;
        this._healthBar.anchor.set(0.5, 1);
        this.healthBar.scale.y = HEALTH_BAR_HEIGHT;
    }

    hit(dmg=1) {
        this.addHealth(-dmg);
        this.sprite.tint = 0xFF9090;
        setTimeout(() => { // forgive me pls for using a timeout
            this.sprite.tint = 0xFFFFFF; // reset tint
        }, 100);
    }

    addHealth(hp) {
        this.health = Math.min(Math.max(this.health + hp, 0), this.maxHealth);
        this._healthBar.scale.y = 0.1 * this.health / this.maxHealth;
    }

    attack(mob, dmg, onHit) {
        let targetHealth = mob.health;

        game.add.tween(this.sprite).to({
            x: mob.sprite.x - 100,
            y: mob.sprite.y
        }, 500).chain(
            game.add.tween(this.sprite).to({
                x: this.sprite.x,
                y: this.sprite.y,
            }, 500)
        ).start().onComplete.addOnce(() => {
            // phaser is being dumb and firing this event multiple times so don't do anything if the target enemy's health has changed
            if (mob.health !== targetHealth) return;

            mob.hit(dmg);
            onHit();
        });
    }
}