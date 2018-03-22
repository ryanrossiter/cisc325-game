import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';

const WIDTH = Defs.GAME_WIDTH * 0.6;
const HEIGHT = Defs.GAME_HEIGHT * 0.25;

export default class NameDialog {
    constructor(onDone) {
        this.name = "";

        var dialogBmd = game.add.bitmapData(WIDTH, HEIGHT, 'nameDialog', false);
        dialogBmd.ctx.fillStyle = "#FFF";
        dialogBmd.ctx.strokeStyle = "#222";
        dialogBmd.ctx.lineWidth = 10;
        Utils.DrawRoundedRect(dialogBmd.ctx, 0, 0, WIDTH, HEIGHT, 30);
        dialogBmd.ctx.beginPath();
        dialogBmd.ctx.moveTo(50, HEIGHT * 0.57);
        dialogBmd.ctx.lineTo(WIDTH - 50, HEIGHT * 0.57);
        dialogBmd.ctx.stroke();

        this.dialog = game.add.sprite(Defs.GAME_WIDTH / 2, Defs.GAME_HEIGHT / 2, dialogBmd);
        this.dialog.anchor.set(0.5);
        this.dialog.addChild(new Phaser.Text(game, 0, -HEIGHT / 2 + 110, "Enter your name:", {
            "font": "Verdana",
            fill: "#111",
            fontSize: "70px"
        })).anchor.set(0.5);

        this.nameText = this.dialog.addChild(new Phaser.Text(game, 0, -20, this.name, {
            "font": "Verdana",
            fill: "#111",
            fontSize: "70px",
            fontWeight: "bold"
        }));
        this.nameText.anchor.set(0.5);

        var buttonBmd = game.add.bitmapData(WIDTH * 0.9, HEIGHT * 0.3, 'nameDialog', false);
        buttonBmd.ctx.fillStyle = "#DDD";
        buttonBmd.ctx.strokeStyle = "#222";
        buttonBmd.ctx.lineWidth = 7;
        Utils.DrawRoundedRect(buttonBmd.ctx, 0, 0, WIDTH * 0.9, HEIGHT * 0.3, 30);
        this.continueButton = this.dialog.addChild(new Phaser.Sprite(game, 0, (HEIGHT / 2) * 0.6, buttonBmd));
        this.continueButton.anchor.set(0.5);
        this.continueButton.inputEnabled = true;
        this.continueButton.events.onInputDown.add(() => {
            onDone(this.name);
        });

        this.continueButton.addChild(new Phaser.Text(game, 0, 0, "Continue", {
            "font": "Verdana",
            fill: "#222",
            fontSize: "70px",
            fontWeight: "bold"
        })).anchor.set(0.5);

        game.input.keyboard.addCallbacks(this, this.onDownCallback);
    }

    onDownCallback(evt) {
        if (this.dialog.visible) {
            if (evt.keyCode >= 65 && evt.keyCode <= 90) { // A-Z
                this.name += String.fromCharCode(evt.keyCode);
            } else if (evt.keyCode == 8) { // backspace
                this.name = this.name.slice(0, this.name.length-1);
            }
            this.nameText.text = this.name;
        }
    }
}