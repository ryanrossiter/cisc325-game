import game from './game';
import State from './state';
import Defs from './defs';
import Utils from './utils';

const HEIGHT = 130;
const WIDTH = 220;
function createDialog() {
    let dialog = [];
    for (var y = 0; y < HEIGHT; y++) {
        let line = '';
        for (var x = 0; x < WIDTH; x++) {
            if (x == 0 || y == 0 || x == WIDTH-1 || y == HEIGHT-1)
                line += '0';
            else if (y < 30 || (x > 90 && x < 100)) line += 'C';
            else line += 'F'; 
        }
        dialog.push(line);
    }

    return game.create.texture(null, dialog, 1, 1, Phaser.Create.PALETTE_C64, false);
}

class LootSelector {
    constructor(lootNavigator) {
        this.lootNavigator = lootNavigator;
        this.dialog = game.add.sprite(Defs.GAME_WIDTH / 2 - 250, Defs.GAME_HEIGHT / 2 - 200, Utils.CreateDialog(500, 400, 5));
        this.dialog.visible = false;

        let xi = 0, yi = 0;
        for (var itemKey in Defs.ITEMS) {
            let item = Defs.ITEMS[itemKey];
            let itemSprite = this.dialog.addChild(new Phaser.Sprite(game, xi * 90 + 20, yi * 90 + 20, item.sprite));
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
        this.dialog = game.add.sprite(x, y, createDialog());
        this.dialog.addChild(new Phaser.Text(game, 0, 0, "Item Progress", {
            "font": "Verdana",
            fill: "#FFF",
            fontSize: "22px",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        })).setTextBounds(0, 0, WIDTH, 30);

        this.clickToSelectText = this.dialog.addChild(new Phaser.Text(game, 0, 0, "Click to\nSelect", {
            "font": "Verdana",
            fill: "#FFF",
            fontSize: "17px",
            align: "center",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        })).setTextBounds(0, 30, 90, 100);

        this.itemSprite = this.dialog.addChild(new Phaser.Sprite(game, 45, 80));
        this.itemSprite.anchor.set(0.5);

        this.clickArea = this.dialog.addChild(new Phaser.Sprite(game, 0, 30, 'blank'));
        this.clickArea.width = 90;
        this.clickArea.height = 100;
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