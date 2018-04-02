import game from '../game';
import Defs from '../defs';
import Utils from '../utils';
import GroupSwipe from './GroupSwipe';
import SmallInfoRow from './SmallInfoRow';

const WIDTH = SmallInfoRow.WIDTH;
const HEIGHT = SmallInfoRow.HEIGHT * 5;

export default class RowSelectPopup {
    constructor(parentGroup, items) {
        var scrollBoxBmd = game.add.bitmapData(WIDTH * 1.02, HEIGHT * 1.02, '', false);
        scrollBoxBmd.ctx.fillStyle = "#EEEEF0";
        scrollBoxBmd.ctx.strokeStyle = "#333";
        scrollBoxBmd.ctx.lineWidth = Defs.MSR;
        Utils.DrawRoundedRect(scrollBoxBmd.ctx, 0, 0, WIDTH * 1.02, HEIGHT * 1.02, 5);

        this.group = parentGroup.add(new Phaser.Group(game, null));

        this.group.add(new Phaser.Sprite(game, -WIDTH * 0.01, -HEIGHT * 0.01, scrollBoxBmd));
        let scrollGroup = this.group.add(new Phaser.Group(game, null));

        for (var i = 0; i < items.length; i++) {
            scrollGroup.add(new SmallInfoRow(items[i].label, items[i].value).group).y = i * SmallInfoRow.HEIGHT;
        }

        this.groupSwipe = new GroupSwipe(this.group, scrollGroup, WIDTH, HEIGHT, false, true,
            SmallInfoRow.HEIGHT, items.length, (dist, incrementPressed) => {
                if (dist === 0 && incrementPressed < items.length) {
                    this.onSelect(incrementPressed);
                }
            }
        );
    }

    onSelect(index) {} // override

    update() {
        this.groupSwipe.update();
    }
}