import game from '../game';
import Defs from '../defs';
import InfoRow from './InfoRow';

const labelTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "60px",
    boundsAlignV: 'middle',
    fontWeight: "bold",
    wordWrap: true,
    wordWrapWidth: InfoRow.WIDTH * 0.6
};

const valueTextStyle = {
    "font": "Verdana",
    fill: "#0A0A0A",
    fontSize: "55px",
    fontWeight: "bold"
};

const WIDTH = Defs.GAME_WIDTH * 0.4;
const HEIGHT = 100;

class SmallInfoRow {
    constructor(label, value) {
        this.group = new Phaser.Group(game, null);

        this.background = this.group.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        this.background.width = WIDTH;
        this.background.height = HEIGHT;
        this.background.tint = 0x000000;
        this.background.alpha = 0.05;

        let borderBottom = this.group.add(new Phaser.Sprite(game, 0, HEIGHT, 'blank'));
        borderBottom.width = WIDTH;
        borderBottom.height = Defs.MSR;
        borderBottom.tint = 0x777777;

        this.group.addChild(new Phaser.Text(game, 0, 0, label, labelTextStyle))
            .setTextBounds(WIDTH * 0.05, 0, WIDTH * 0.6, HEIGHT);
        this.group.addChild(new Phaser.Text(game, WIDTH * 0.95, HEIGHT / 2, value, valueTextStyle)).anchor.set(1, 0.5);
    }
}

SmallInfoRow.WIDTH = WIDTH;
SmallInfoRow.HEIGHT = HEIGHT;

export default SmallInfoRow;