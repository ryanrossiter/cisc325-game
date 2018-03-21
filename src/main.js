import game from './game';
import State from './state';
import Defs from './defs';
import Utils from './utils';
import Player from './player';
import Enemy from './enemy';
import LootNavigator from './lootnavigator';

const ENEMY_COMBAT_POSITIONS = 3; // number of enemies that can be fought at once
const COMBAT_ENTRY_RANGE = Defs.GAME_WIDTH * 0.4;
const COMBAT_START_DELAY = 500;

let floorTileSprite;
let player;
let enemies;
let enemiesInCombat;
let combatDelayTimer;
let combatKeys;
let combatKeyTexts;

export default {
    preload: () => {
        // TODO: replace dummy sprites with actual sprites
        Utils.CreateDummySprite('player', 60, 130, "#99CF9A");
        Utils.CreateDummySprite('enemy', 100, 70, "#D5999A");
        Utils.CreateDummySprite('floor', 10, 10, "#604744");
        Utils.CreateDummySprite('item', 70, 70, "#44764A");

        Utils.CreateDummySprite('blank', 10, 10, "#FFFFFF");
    },

    create: () => {
        State.reset();
        
        game.stage.backgroundColor = "#908077";
        game.world.setBounds(0, 0, Defs.GAME_WIDTH * 100, Defs.GAME_HEIGHT);
        floorTileSprite = game.add.tileSprite(-50, Defs.FLOOR_Y, Defs.GAME_WIDTH + 100, Defs.FLOOR_HEIGHT, 'floor');

        //game.add.sprite(0, 0, 'test');

        combatKeys = [
            game.input.keyboard.addKey(Phaser.KeyCode.ONE),
            game.input.keyboard.addKey(Phaser.KeyCode.TWO),
            game.input.keyboard.addKey(Phaser.KeyCode.THREE),
            game.input.keyboard.addKey(Phaser.KeyCode.FOUR),
            game.input.keyboard.addKey(Phaser.KeyCode.FIVE),
        ];

        player = new Player(100, Defs.GAME_HEIGHT * 0.7);
        enemies = [];
        enemiesInCombat = new Array(ENEMY_COMBAT_POSITIONS);

        enemies.push(new Enemy(Defs.GAME_WIDTH - 500, Defs.GAME_HEIGHT * 0.7, 0));
        enemies.push(new Enemy(Defs.GAME_WIDTH - 600, Defs.GAME_HEIGHT * 0.7 + 50, 0));
        enemies.push(new Enemy(Defs.GAME_WIDTH - 550, Defs.GAME_HEIGHT * 0.7 - 100, 0));

        // add after enemies to keep on top, alternatively create a UI group that appears over top
        combatKeyTexts = [];
        for (var i = 0; i < ENEMY_COMBAT_POSITIONS; i++) {
            var t = game.add.text(0, Defs.FLOOR_Y + (i + 0.5) / ENEMY_COMBAT_POSITIONS * Defs.FLOOR_HEIGHT - 100, i + 1);
            t.visible = false;
            combatKeyTexts[i] = t;
        }

        new LootNavigator(Defs.GAME_WIDTH - 300, 100);
    },

    update: () => {
        player.update();

        floorTileSprite.x = game.camera.x - 50;
        floorTileSprite.tilePosition.x = -(game.camera.x - 50);

        let enteringCombat = State.inCombat;
        for (var i = 0; i < enemies.length; i++) {
            enemies[i].update();

            if (!enteringCombat && Math.abs(enemies[i].sprite.x - player.sprite.x) <= COMBAT_ENTRY_RANGE) {
                enteringCombat = true;
            }
        }

        if (enteringCombat && !State.inCombat) {
            State.inCombat = true;
            State.combatTurn = -1; // player's turn
            combatDelayTimer = COMBAT_START_DELAY;
            game.camera.unfollow();

            // move player to center y
            game.add.tween(player.sprite).to({
                y: Defs.FLOOR_Y + Defs.FLOOR_HEIGHT / 2 + player.sprite.height * 0.4
            }, COMBAT_START_DELAY).start();

            // move all on screen enemies into combat positions
            for (var i = 0; i < enemies.length; i++) {
                if (enemies[i].sprite.inCamera) {
                    let combatPos = -1;
                    for (var p = 0; p < ENEMY_COMBAT_POSITIONS; p++) {
                        if (!enemiesInCombat[p]) {
                            combatPos = p;
                            enemiesInCombat[p] = enemies[i];
                            combatKeyTexts[p].position.x = player.sprite.x + COMBAT_ENTRY_RANGE - 50 + p % 2 * 120;
                            combatKeyTexts[p].visible = true;
                            break;
                        }
                    }

                    if (combatPos === -1) {
                        // couldn't find an available combat position so move the sprite offscreen
                        game.add.tween(enemies[i].sprite).to({
                            x: game.camera.x + Defs.GAME_WIDTH + 200
                        }, COMBAT_START_DELAY).start();
                    } else {
                        // move the sprite into it's combat position
                        game.add.tween(enemies[i].sprite).to({
                            x: player.sprite.x + COMBAT_ENTRY_RANGE - 50 + combatPos % 2 * 120,
                            y: Defs.FLOOR_Y + (combatPos + 0.5) / ENEMY_COMBAT_POSITIONS * Defs.FLOOR_HEIGHT
                        }, COMBAT_START_DELAY).start();
                    }
                }
            }
        } else if (State.inCombat && combatDelayTimer <= 0) {
            let usedTurn = false;
            if (State.combatTurn === -1) {
                // player's turn
                let targetEnemy, targetEnemyPos;
                let combatOver = true;
                for (var p = 0; p < ENEMY_COMBAT_POSITIONS; p++) {
                    if (enemiesInCombat[p]) {
                        combatOver = false;
                        if (combatKeys[p].isDown) {
                            targetEnemyPos = p;
                            targetEnemy = enemiesInCombat[p];
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
                            delete enemiesInCombat[enemiesInCombat.indexOf(targetEnemy)];
                            enemies.splice(enemies.indexOf(targetEnemy), 1);
                            targetEnemy.sprite.destroy();

                            // hide combat key text
                            combatKeyTexts[targetEnemyPos].visible = false;
                        }
                    });
                } else if (combatOver) {
                    game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
                    State.inCombat = false;
                }
            } else {
                // enemy's turn
                usedTurn = true;
                let enemy = enemiesInCombat[State.combatTurn];
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
                State.combatTurn++;
                if (State.combatTurn == ENEMY_COMBAT_POSITIONS) State.combatTurn = -1; // reset to player's turn
            }
        } else if (combatDelayTimer > 0) {
            combatDelayTimer -= game.time.elapsed;
        }
    },

    render: () => {
        game.debug.text( "InCombat: " + State.inCombat, 100, 100 );
        game.debug.text( "Combat Turn: " + State.combatTurn, 100, 120 );
    }
}