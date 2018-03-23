import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';
import Button from '../components/Button';
import GroupSwipe from '../components/GroupSwipe';
import InfoRow from '../components/InfoRow';
import ItemInfo from '../components/ItemInfo';

let newGameButton;
let continueButton;
let leaderboardButton;

const titleTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "80px",
    fontWeight: "bold"
};

const outlineTextStyle = {
    "font": "Verdana",
    fill: "#FFF",
    stroke: "#222",
    strokeThickness: 10,
    fontSize: "80px",
    fontWeight: "bold"
};

const labelTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "70px"
};

const startTextStyle = {
    "font": "Verdana",
    fill: "#FFF",
    stroke: "#222",
    strokeThickness: 14,
    fontSize: "100px",
    fontWeight: "bold"
};

const SCROLL_BOX_WIDTH = Defs.GAME_WIDTH * 0.9;
const SCROLL_BOX_HEIGHT = Defs.GAME_HEIGHT * 0.275;

const STARTING_MONEY = 1000;

let equipmentGroupSwipe;
let skillsGroupSwipe;
let moneyText;
let remainingMoney;

export default {
    init: () => {
        var scrollBoxBmd = game.add.bitmapData(SCROLL_BOX_WIDTH * 1.02, SCROLL_BOX_HEIGHT * 1.02, 'scrollBoxBg', true);
        scrollBoxBmd.ctx.fillStyle = "#EEEEF0";
        scrollBoxBmd.ctx.strokeStyle = "#333";
        scrollBoxBmd.ctx.lineWidth = Defs.MSR;
        Utils.DrawRoundedRect(scrollBoxBmd.ctx, 0, 0, SCROLL_BOX_WIDTH * 1.02, SCROLL_BOX_HEIGHT * 1.02, 0);
    },

    create: () => {
        remainingMoney = STARTING_MONEY;

        game.stage.backgroundColor = "#F5F5F5";
        game.world.setBounds(0, 0, Defs.GAME_WIDTH * 100, Defs.GAME_HEIGHT);

        game.add.text(Defs.GAME_WIDTH / 2, 120, "Gear Up Your Character!", titleTextStyle).anchor.set(0.5);

        var startButton = new Button(Defs.GAME_WIDTH / 2, Defs.GAME_HEIGHT * 0.925, Defs.GAME_WIDTH * 0.925, 270);
        startButton.onChange = (pressed) => {
            if (pressed) {
                game.state.start("Main");
            }
        };

        startButton.sprite.addChild(new Phaser.Text(game, 0, 0, "START!!", startTextStyle)).anchor.set(0.5);

        // create equipment selector
        game.add.text(30, Defs.GAME_HEIGHT * 0.1, "EQUIPMENT", outlineTextStyle);
        moneyText = game.add.text(Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.1, remainingMoney + "g", labelTextStyle);
        moneyText.anchor.set(1, 0);
        let equipmentOptions = Object.values(Defs.ITEMS);
        let equipmentGroup = game.add.group();
        equipmentGroup.x = Defs.GAME_WIDTH / 2;
        equipmentGroup.y = Defs.GAME_HEIGHT * 0.175;
        equipmentGroup.add(new Phaser.Sprite(game, 0, -SCROLL_BOX_HEIGHT * 0.01, game.cache.getBitmapData('scrollBoxBg'))).anchor.set(0.5, 0);
        let equipmentScrollGroup = equipmentGroup.add(new Phaser.Group(game, null));

        let equipmentRows = [];
        for (var i = 0; i < equipmentOptions.length; i++) {
            var itemInfo = new ItemInfo(equipmentOptions[i]);
            equipmentRows.push(new InfoRow(equipmentScrollGroup, itemInfo.group, 0, i * InfoRow.HEIGHT));
        }

        equipmentGroupSwipe = new GroupSwipe(equipmentGroup, equipmentScrollGroup, SCROLL_BOX_WIDTH, SCROLL_BOX_HEIGHT, false, true,
            InfoRow.HEIGHT, equipmentOptions.length, (dist, incrementPressed) => {
                if (dist === 0 && incrementPressed < equipmentRows.length) {
                    let allowToggle = true;
                    if (!equipmentRows[incrementPressed].selected && remainingMoney < equipmentOptions[incrementPressed].cost) {
                        allowToggle = false;
                    }

                    if (allowToggle) {
                        equipmentRows[incrementPressed].onInputUp();
                        if (equipmentRows[incrementPressed].selected) {
                            remainingMoney -= equipmentOptions[incrementPressed].cost;
                        } else {
                            remainingMoney += equipmentOptions[incrementPressed].cost;
                        }

                        moneyText.text = remainingMoney + "g";
                    }
                }
            }
        );
        equipmentGroupSwipe.setSwipeBoxAnchor(0.5, 0);

        // create skill selector
        game.add.text(30, Defs.GAME_HEIGHT * 0.5, "SKILLS", outlineTextStyle);
        let skillOptions = [];
        let skillsGroup = game.add.group();
        skillsGroup.x = Defs.GAME_WIDTH / 2;
        skillsGroup.y = Defs.GAME_HEIGHT * 0.575;
        skillsGroup.add(new Phaser.Sprite(game, 0, -SCROLL_BOX_HEIGHT * 0.01, game.cache.getBitmapData('scrollBoxBg'))).anchor.set(0.5, 0);
        let skillsScrollGroup = skillsGroup.add(new Phaser.Group(game, null));

        let skillRows = [];
        for (var i = 0; i < skillOptions.length; i++) {
            skillRows.push(new InfoRow(skillsScrollGroup, 0, i * InfoRow.HEIGHT));
        }

        skillsGroupSwipe = new GroupSwipe(skillsGroup, skillsScrollGroup, SCROLL_BOX_WIDTH, SCROLL_BOX_HEIGHT, false, true,
            InfoRow.HEIGHT, skillOptions.length, (dist, incrementPressed) => {
                if (dist === 0 && incrementPressed < skillRows.length) {
                    skillRows[incrementPressed].onInputUp();
                }
            }
        );
        skillsGroupSwipe.setSwipeBoxAnchor(0.5, 0);
    },

    update: () => {
        equipmentGroupSwipe.update();
        skillsGroupSwipe.update();
    },
}