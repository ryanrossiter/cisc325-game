import game from '../game';
import Defs from '../defs';

const messageTextStyle = {
    font: "Verdana",
    fill: "#E5E5E5",
    fontSize: "80px",
    fontWeight: "bold",
    boundsAlignH: 'center',
    wordWrap: true,
    wordWrapWidth: Defs.GAME_WIDTH - Defs.LEFT_UI_BAR_WIDTH
};

export default class SystemMessage {
    constructor(item) {
        this.text = game.add.text(Defs.LEFT_UI_BAR_WIDTH, 0, '', messageTextStyle)
            .setTextBounds(0, Defs.GAME_HEIGHT * 0.1, messageTextStyle.wordWrapWidth, 300);
        this.text.alpha = 0;

        this.textQueue = [];
    }

    showNextText() {
        var t = this.textQueue.pop();
        if (t) {
            this.text.text = t; // hmmmmmm
            // 2nd .to(...) is just to delay the onComplete
            let tween = game.add.tween(this.text).to({ alpha: 1 }).to({ alpha: 1 }, 0, "Linear", false, 1500);
            tween.onComplete.add(this.showNextText, this);
            tween.start();
        }
    }

    queueText(text) {
        this.textQueue.reverse().push(text);
        this.textQueue.reverse();
    }

    showText(text) {
        if (typeof(text) === typeof([])) {
            // put in reverse order so strings can be popped off
            this.textQueue = text.reverse();
        } else {
            this.textQueue = [text];
        }

        this.showNextText();
    }

    hideText() {
        game.add.tween(this.text).to({ alpha: 0 });
    }
}