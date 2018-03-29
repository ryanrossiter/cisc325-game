import game from './game';
import State from './state';
import Defs from './defs';
import Utils from './utils';
import Player from './player';
import Enemy from './enemy';

const COMBAT_START_DELAY = 500;

const uiBarTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "70px",
    align: "center"
};

let combatTurn;
let player;
let enemies;
let combatDelayTimer;
let uiBarGroup;

export default {
    create: () => {
        combatTurn = -1;
        combatDelayTimer = COMBAT_START_DELAY;

        game.stage.backgroundColor = "#908077";
        game.world.setBounds(0, 0, Defs.GAME_WIDTH * 100, Defs.GAME_HEIGHT);

        //game.add.sprite(0, 0, 'test');

        player = new Player(Defs.GAME_WIDTH * 0.3, Defs.GAME_HEIGHT);
        enemies = [];

        let level = Defs.LEVELS[State.level];
        let xd = (Defs.GAME_WIDTH - Defs.LEFT_UI_BAR_WIDTH) / level.enemies.length;
        let yd = Defs.GAME_HEIGHT * 0.1 / level.enemies.length;
        for (var i = 0; i < level.enemies.length; i++) {
            enemies.push(new Enemy(Defs.LEFT_UI_BAR_WIDTH + xd * (i + 0.5), Defs.GAME_HEIGHT * 0.3 + yd * Math.pow(i, 1.8), level.enemies[i].type));
        }

        uiBarGroup = game.add.group();
        var uiBarBg = uiBarGroup.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        uiBarBg.height = Defs.GAME_HEIGHT;
        uiBarBg.width = Defs.LEFT_UI_BAR_WIDTH;
        uiBarBg.tint = 0x999999;

        uiBarGroup.add(player.healthBar);
        player.healthBar.x = Defs.LEFT_UI_BAR_WIDTH / 2;
        player.healthBar.y = Defs.GAME_HEIGHT * 0.97;

        uiBarGroup.add(new Phaser.Text(game,
            Defs.LEFT_UI_BAR_WIDTH / 2,
            Defs.GAME_HEIGHT * 0.53,
            "LV\n" + (State.level + 1),
            uiBarTextStyle,
        )).anchor.set(0.5, 0.5);

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

            let line = uiBarGroup.add(new Phaser.Sprite(game, 0, Defs.GAME_HEIGHT * 0.16 * (i + 1) + 23, 'blank'));
            line.width = Defs.LEFT_UI_BAR_WIDTH;
            line.height = 2 * Defs.MSR;
            line.tint = 0x555555;
        }
    },

    update: () => {
        if (combatDelayTimer <= 0) {
            let usedTurn = false;
            if (combatTurn === -1) {
                // player's turn
                let targetEnemy, targetEnemyPos;
                let combatOver = true;
                for (var p = 0; p < enemies.length; p++) {
                    if (enemies[p]) {
                        combatOver = false;
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

                    player.attack(targetEnemy, () => {
                        if (targetEnemy.health <= 0) {
                            // KILL IT
                            delete enemies[targetEnemyPos];
                            enemies.splice(targetEnemyPos, 1);
                            targetEnemy.sprite.destroy();
                        }
                    });
                } else if (combatOver) {
                    State.level++;
                    game.state.restart(); // restart state with new level
                }
            } else {
                // enemy's turn
                usedTurn = true;
                let enemy = enemies[combatTurn];
                if (enemy) {
                    combatDelayTimer = 1000; // delay next attack until animations are done
                    enemy.attack(player, () => {
                        if (player.health <= 0) {
                            console.log("LOSE");
                        }
                    });
                }
            }

            if (usedTurn) {
                combatTurn++;
                if (combatTurn == enemies.length) combatTurn = -1; // reset to player's turn
            }
        } else if (combatDelayTimer > 0) {
            combatDelayTimer -= game.time.elapsed;
        }
    },
}