import game from './game';
import State from './state';
import Defs from './defs';
import Utils from './utils';
import Player from './player';
import Enemy from './enemy';
import Button from './components/Button';
import RowSelectPopup from './components/RowSelectPopup';
import ItemInfo from './components/ItemInfo';
import SystemMessage from './components/SystemMessage';

const COMBAT_START_DELAY = 500;

const uiBarTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "70px",
    align: "center"
};

const labelTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "70px"
};

let systemMessage;
let combatTurn;
let player;
let enemies;
let remainingEnemies;
let combatDelayTimer;
let uiBarGroup;
let actionButtonGroup;
let attackButton, skillButton, itemButton, pressedButton = null;
let attackSelect, skillSelect, itemSelect, openedSelect = null;
let selectGroup;
let selectedItem = null;

export default {
    create: () => {
        combatTurn = -1;
        combatDelayTimer = COMBAT_START_DELAY;

        game.stage.backgroundColor = "#908077";
        game.add.sprite(0, 0, 'background');

        //game.add.sprite(0, 0, 'test');

        player = new Player(Defs.GAME_WIDTH * 0.3, Defs.GAME_HEIGHT);
        enemies = [];

        let level = Defs.LEVELS[State.level];
        let xd = (Defs.GAME_WIDTH - Defs.LEFT_UI_BAR_WIDTH) / level.enemies.length;
        let yd = Defs.GAME_HEIGHT * 0.1 / level.enemies.length;
        for (var i = 0; i < level.enemies.length; i++) {
            enemies.push(new Enemy(Defs.LEFT_UI_BAR_WIDTH + xd * (i + 0.5), Defs.GAME_HEIGHT * 0.3 + yd * Math.pow(i, 1.8), level.enemies[i].type));
        }
        remainingEnemies = enemies.length;

        uiBarGroup = game.add.group();
        var uiBarBg = uiBarGroup.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        uiBarBg.height = Defs.GAME_HEIGHT;
        uiBarBg.width = Defs.LEFT_UI_BAR_WIDTH;
        uiBarBg.tint = 0x999999;

        uiBarGroup.add(player.healthBar);
        uiBarGroup.add(player.manaBar);
        player.healthBar.x = Defs.LEFT_UI_BAR_WIDTH / 3;
        player.manaBar.x = Defs.LEFT_UI_BAR_WIDTH / 3 * 2;
        player.healthBar.y = player.manaBar.y = Defs.GAME_HEIGHT * 0.97;

        uiBarGroup.add(new Phaser.Text(game,
            Defs.LEFT_UI_BAR_WIDTH / 2,
            Defs.GAME_HEIGHT * 0.53,
            "LV\n" + (State.level + 1),
            uiBarTextStyle,
        )).anchor.set(0.5, 0.5);

        let line = uiBarGroup.add(new Phaser.Sprite(game, 0, Defs.GAME_HEIGHT * 0.16 * 3 + 23, 'blank'));
        line.width = Defs.LEFT_UI_BAR_WIDTH;
        line.height = 2 * Defs.MSR;
        line.tint = 0x555555;

        for (var i = 0; i < enemies.length; i++) {
            let enemy = enemies[i];
            uiBarGroup.add(new Phaser.Text(game,
                Defs.LEFT_UI_BAR_WIDTH / 2,
                Defs.GAME_HEIGHT * 0.16 * i + Defs.GAME_HEIGHT * 0.03,
                "M" + (i+1),
                uiBarTextStyle,
            )).anchor.set(0.5, 0.5);
            uiBarGroup.add(enemy.healthBar);
            enemy.healthBar.x = Defs.LEFT_UI_BAR_WIDTH / 2;
            enemy.healthBar.y = Defs.GAME_HEIGHT * 0.16 * (i + 1);

            if (i < 2) {
                let line = uiBarGroup.add(new Phaser.Sprite(game, 0, Defs.GAME_HEIGHT * 0.16 * (i + 1) + 23, 'blank'));
                line.width = Defs.LEFT_UI_BAR_WIDTH;
                line.height = 2 * Defs.MSR;
                line.tint = 0x555555;
            }
        }

        actionButtonGroup = game.add.group()
        itemButton = new Button(Defs.GAME_WIDTH * 0.85, Defs.GAME_HEIGHT - Defs.GAME_WIDTH * 0.15);
        itemButton.sprite.loadTexture('item');
        // itemButton.sprite.addChild(new Phaser.Sprite(game, 0, -itemButton.sprite.height * 0.2, 'blank')).anchor.set(0.5);
        // itemButton.sprite.addChild(new Phaser.Text(game, 0, itemButton.sprite.height * 0.3, 'Item', labelTextStyle)).anchor.set(0.5);
        skillButton = new Button(Defs.GAME_WIDTH * 0.85, itemButton.sprite.y - itemButton.sprite.height / 2 - Defs.GAME_WIDTH * 0.15);
        skillButton.sprite.loadTexture('magic');
        // skillButton.sprite.addChild(new Phaser.Sprite(game, 0, -skillButton.sprite.height * 0.2, 'blank')).anchor.set(0.5);
        // skillButton.sprite.addChild(new Phaser.Text(game, 0, skillButton.sprite.height * 0.3, 'Skill', labelTextStyle)).anchor.set(0.5);
        attackButton = new Button(Defs.GAME_WIDTH * 0.85, skillButton.sprite.y - skillButton.sprite.height / 2 - Defs.GAME_WIDTH * 0.15);
        attackButton.sprite.loadTexture('attack');
        // attackButton.sprite.addChild(new Phaser.Sprite(game, 0, -attackButton.sprite.height * 0.2, 'blank')).anchor.set(0.5);
        // attackButton.sprite.addChild(new Phaser.Text(game, 0, attackButton.sprite.height * 0.3, 'Attack', labelTextStyle)).anchor.set(0.5);
        itemButton.toggle = skillButton.toggle = attackButton.toggle = true;
        itemButton.allowDepress = skillButton.allowDepress = attackButton.allowDepress = false;

        selectGroup = game.add.group();
        selectGroup.x = Defs.GAME_WIDTH * 0.3;
        selectGroup.y = Defs.GAME_HEIGHT * 0.67;
        var onChangeCallback = (select, button) => (pressed) => {
            if (pressed) {
                if (openedSelect) openedSelect.group.visible = false;
                if (pressedButton) pressedButton.setPressed(false);
                openedSelect = select;
                openedSelect.group.visible = true;
                pressedButton = button;
            }
        };

        let weapons = State.items.filter((i) => i.type !== Defs.ITEM_TYPES.CONSUMABLE);
        attackSelect = new RowSelectPopup(selectGroup, weapons.map((i) => ({
            label: i.name, value: i.damage
        })));
        attackSelect.onSelect = (index) => {
            selectedItem = weapons[index];
            if (selectedItem.hasOwnProperty("mpCost") && selectedItem.mpCost > player.mana) {
                systemMessage.showText("You do not have enough mana to use this skill");
            } else {
                systemMessage.showText("Select a target");
            }
            openedSelect.group.visible = false;
            pressedButton.setPressed(false);
        };
        attackSelect.group.visible = false;
        attackButton.onChange = onChangeCallback(attackSelect, attackButton);

        let skills = State.skills;
        skillSelect = new RowSelectPopup(selectGroup, skills.map((s) => ({
            label: s.name, value: s.mpCost
        })));
        skillSelect.onSelect = (index) => {
            selectedItem = skills[index];
            if (selectedItem.mpCost > player.mana) {
                systemMessage.showText("You do not have enough mana to use this skill");
            } else {
                systemMessage.showText("Select a target");
            }
            openedSelect.group.visible = false;
            pressedButton.setPressed(false);
        };
        skillSelect.group.visible = false;
        skillButton.onChange = onChangeCallback(skillSelect, skillButton);

        let items = State.items.filter((i) => i.type === Defs.ITEM_TYPES.CONSUMABLE);
        itemSelect = new RowSelectPopup(selectGroup, items.map((i) => ({
            label: i.name, value: ''
        })));
        itemSelect.onSelect = (index) => {
            selectedItem = items[index];
            openedSelect.group.visible = false;
            pressedButton.setPressed(false);
        };
        itemSelect.group.visible = false;
        itemButton.onChange = onChangeCallback(itemSelect, itemButton);

        systemMessage = new SystemMessage();
        let levelText = (State.level + 1) + (State.level % 10 === 0 && State.level !== 10? 'st': (State.level === 1? 'nd': (State.level === 2? 'rd':'th')));
        systemMessage.showText(['You have reached the ' + levelText + ' floor.', 'Your turn!']);
    },

    update: () => {
        attackSelect.update();
        skillSelect.update();
        itemSelect.update();

        if (combatDelayTimer <= 0) {
            let usedTurn = false;
            if (remainingEnemies <= 0) {
                systemMessage.showText("Floor complete!");
                State.level++;
                game.state.restart(); // restart state with new level
            } else if (combatTurn === -1) {
                // player's turn
                if (selectedItem !== null && (selectedItem.type === Defs.ITEM_TYPES.CONSUMABLE
                    || (selectedItem.type === Defs.ITEM_TYPES.SKILL && !selectedItem.hasOwnProperty("damage")))) {
                    // use consumable or non-attack skill
                    if (selectedItem.hasOwnProperty("hpBuff")) {
                        player.addHealth(selectedItem.hpBuff);
                    }
                    usedTurn = true;
                    selectedItem = null;
                } else if (selectedItem !== null
                    && selectedItem.hasOwnProperty("damage")
                    && (!selectedItem.hasOwnProperty("mpCost") || player.mana >= selectedItem.mpCost)) {

                    let targetEnemy, targetEnemyPos;
                    for (var p = 0; p < enemies.length; p++) {
                        if (enemies[p]) {
                            if (enemies[p].sprite.input.justPressed()) {
                                targetEnemyPos = p;
                                targetEnemy = enemies[p];
                                break;
                            }
                        }
                    }

                    if (targetEnemy) {
                        usedTurn = true;
                        combatDelayTimer = 1000; // delay next attack until animations are done

                        if (selectedItem.hasOwnProperty("mpCost")) {
                            player.addMana(-selectedItem.mpCost);
                        }

                        player.attack(targetEnemy, selectedItem.damage, () => {
                            if (targetEnemy.health <= 0) {
                                // KILL IT
                                delete enemies[targetEnemyPos];
                                enemies.splice(targetEnemyPos, 1);
                                targetEnemy.sprite.destroy();
                                remainingEnemies--;

                                systemMessage.showText("Killed monster!");
                            } else {
                                systemMessage.showText("Attacked monster for " + selectedItem.damage + "hp!");
                            }
                        });
                    }
                }
            } else {
                // enemy's turn
                usedTurn = true;
                let enemy = enemies[combatTurn];
                if (enemy) {
                    combatDelayTimer = 1000; // delay next attack until animations are done
                    enemy.attack(player, () => {
                        if (player.health <= 0) {
                            systemMessage.showText("You lose!");
                        }
                    });
                }
            }

            if (usedTurn) {
                combatTurn++;
                if (combatTurn >= enemies.length) {
                    combatTurn = -1; // reset to player's turn
                    systemMessage.queueText("Your turn!");
                }
            }
        } else if (combatDelayTimer > 0) {
            combatDelayTimer -= game.time.elapsed;
        }
    },
}