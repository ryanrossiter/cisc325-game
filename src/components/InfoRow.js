import game from '../game';
import Defs from '../defs';

const DESELECTED_BG_ALPHA = 0.05;
const SELECTED_BG_ALPHA = 0.2;
const WIDTH = Defs.GAME_WIDTH * 0.9;
const HEIGHT = 200;

class InfoRow {
    constructor(parentGroup, group, x, y) {
        this.selected = false;

        this.group = parentGroup.add(new Phaser.Group(game, null));
        this.group.x = x;
        this.group.y = y;
        this.innerGroup = group;
        this.group.add(this.innerGroup);
        this.innerGroup.x = -WIDTH / 2;

        this.background = this.innerGroup.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        this.background.width = WIDTH;
        this.background.height = HEIGHT;
        this.background.tint = 0x000000;
        this.background.alpha = 0.05;

        let borderBottom = this.innerGroup.add(new Phaser.Sprite(game, 0, HEIGHT, 'blank'));
        borderBottom.width = WIDTH;
        borderBottom.height = Defs.MSR;
        borderBottom.tint = 0x777777
    }

    setSelected(s) {
        this.selected = s;
        this.background.alpha = (this.selected? SELECTED_BG_ALPHA : DESELECTED_BG_ALPHA);
    }

    onInputUp() {
        this.setSelected(!this.selected);
    }
}

InfoRow.WIDTH = WIDTH;
InfoRow.HEIGHT = HEIGHT;

export default InfoRow;