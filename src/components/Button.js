import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';

const WIDTH = Defs.GAME_WIDTH * 0.22;
const HEIGHT = WIDTH;

export default class Button {
    constructor(x, y, w=WIDTH, h=HEIGHT, disabled=false, toggle=false, allowDepress=true) {
        this.toggle = toggle;
        this.allowDepress = allowDepress;
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

    set disabled(d) {
        this.isDisabled = d;
        this.sprite.tint = (this.isDisabled? (this.pressed? 0x777777 : 0x999999) : (this.pressed? 0xCCCCCC : 0xFFFFFF));
    }

    onChange(pressed) {} // override

    setPressed(pressed) {
        this.pressed = pressed;
        this.sprite.tint = (this.pressed? 0xCCCCCC : 0xFFFFFF);
        this.onChange(pressed);
    }

    onInputDown() {
        if (this.isDisabled) return;
        if (!this.pressed || this.allowDepress) this.setPressed(!this.pressed);
    }

    onInputUp() {
        if (this.isDisabled) return;
        if (!this.toggle) this.setPressed(false);
    }
}