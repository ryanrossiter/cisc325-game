import game from './game';
import State from './state';
import Defs from './defs';
import Utils from './utils';

const TITLE_HEIGHT = 90;
const HEIGHT = 350;
const WIDTH = 550;

class LootSelector {
    constructor(lootNavigator) {
        this.lootNavigator = lootNavigator;
        var dialogBmd = game.add.bitmapData(1000, 800, null, false);
        dialogBmd.ctx.fillStyle = "#EEF";
        dialogBmd.ctx.strokeStyle = "#222";
        dialogBmd.ctx.lineWidth = 14;
        Utils.DrawRoundedRect(dialogBmd.ctx, 0, 0, 1000, 800, 20);
        this.dialog = game.add.sprite(Defs.GAME_WIDTH / 2 - 500, Defs.GAME_HEIGHT / 2 - 400, dialogBmd);
        this.dialog.visible = false;

        let xi = 0, yi = 0;
        for (var itemKey in Defs.ITEMS) {
            let item = Defs.ITEMS[itemKey];
            let itemSprite = this.dialog.addChild(new Phaser.Sprite(game, xi * 180 + 50, yi * 180 + 50, item.sprite));
            itemSprite.inputEnabled = true;
            itemSprite.events.onInputDown.add(() => this.onItemClicked(itemKey));
            xi++;
        }
    }

    onItemClicked(itemKey) {
        this.dialog.visible = false;
        this.lootNavigator.setSelectedItem(itemKey);
    }

    show() {
        this.dialog.visible = true;
    }
}

export default class LootNavigator {
    constructor(x, y) {
        var dialogBmd = game.add.bitmapData(WIDTH, HEIGHT, null, false);
        dialogBmd.ctx.fillStyle = "#666";
        dialogBmd.ctx.strokeStyle = "#333";
        dialogBmd.ctx.lineWidth = 14;
        Utils.DrawRoundedRect(dialogBmd.ctx, 0, 0, WIDTH, HEIGHT, 20, true, false); // fill
        dialogBmd.ctx.fillStyle = "#777";
        dialogBmd.ctx.clip();
        dialogBmd.ctx.fillRect(0, TITLE_HEIGHT, 200, 260);
        dialogBmd.ctx.fillRect(220, TITLE_HEIGHT, 330, 260);
        Utils.DrawRoundedRect(dialogBmd.ctx, 0, 0, WIDTH, HEIGHT, 20, false, true); // stroke
        this.dialog = game.add.sprite(x, y, dialogBmd);

        this.dialog.addChild(new Phaser.Text(game, 0, 0, "Item Progress", {
            "font": "Verdana",
            fill: "#FFF",
            fontSize: "44px",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        })).setTextBounds(0, 2, WIDTH, TITLE_HEIGHT);

        this.clickToSelectText = this.dialog.addChild(new Phaser.Text(game, 0, 0, "Click to\nSelect", {
            "font": "Verdana",
            fill: "#FFF",
            fontSize: "34px",
            align: "center",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        })).setTextBounds(0, TITLE_HEIGHT, 200, 260);

        this.itemSprite = this.dialog.addChild(new Phaser.Sprite(game, 100, 220));
        this.itemSprite.anchor.set(0.5);

        this.clickArea = this.dialog.addChild(new Phaser.Sprite(game, 0, TITLE_HEIGHT, 'blank'));
        this.clickArea.width = 180;
        this.clickArea.height = 200;
        this.clickArea.alpha = 0;
        this.clickArea.inputEnabled = true;
        this.clickArea.events.onInputDown.add(this.onClick, this);

        this.lootSelector = new LootSelector(this);
    }

    setSelectedItem(itemKey) {
        this.itemSprite.loadTexture(Defs.ITEMS[itemKey].sprite);
        this.clickToSelectText.visible = false;
    }

    onClick() {
        this.lootSelector.show();
    }
}