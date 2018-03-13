import game from './game';

export default class Mob {
    constructor(hp) {
        this.health = hp;
    }

    hit() {
        this.health--;
        this.sprite.tint = 0xFF9090;
        setTimeout(() => { // forgive me pls for using a timeout
            this.sprite.tint = 0xFFFFFF; // reset tint
        }, 100);
    }

    attack(mob, onHit) {
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

            mob.hit();
            onHit();
        });
    }
}