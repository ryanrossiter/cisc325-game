import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';

const WIDTH = Defs.GAME_WIDTH * 0.22;
const HEIGHT = WIDTH;

export default class Button {
    constructor(x, y, w=WIDTH, h=HEIGHT, toggle=false, allowDisable=true) {
        this.toggle = toggle;
        this.allowDisable = allowDisable;
        this.pressed = false;

        var buttonBmd = game.add.bitmapData(w, h, 'newGameButton', true);
        buttonBmd.ctx.fillStyle = "#CCCCD0";
        buttonBmd.ctx.strokeStyle = "#333";
        buttonBmd.ctx.lineWidth = 10;
        Utils.DrawRoundedRect(buttonBmd.ctx, 0, 0, w, h, 20);
        this.sprite = game.add.sprite(x, y, buttonBmd);
        this.sprite.anchor.set(0.5);
        this.sprite.inputEnabled = true;
        this.sprite.events.onInputDown.add(() => this.onInputDown());
        this.sprite.events.onInputUp.add(() => this.onInputUp());
    }

    onChange(pressed) {} // override

    setPressed(pressed) {
        this.pressed = pressed;
        this.sprite.tint = (this.pressed? 0xCCCCCC : 0xFFFFFF);
        this.onChange(pressed);
    }

    onInputDown() {
        if (!this.pressed || this.allowDisable) this.setPressed(!this.pressed);
    }

    onInputUp() {
        if (!this.toggle) this.setPressed(false);
    }
}