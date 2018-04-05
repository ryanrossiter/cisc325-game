import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';
import NameDialog from '../components/NameDialog';

let newGameButton;
let continueButton;
let leaderboardButton;

const outlineTextStyle = {
    "font": "Verdana",
    fill: "#FFF",
    stroke: "#222",
    strokeThickness: 10,
    fontSize: "80px",
    fontWeight: "bold"
};

export default {
    init: () => {
        var newGameBmd = game.add.bitmapData(Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.4, 'newGameButton', true);
        newGameBmd.ctx.fillStyle = "#AAC";
        newGameBmd.ctx.strokeStyle = "#333";
        newGameBmd.ctx.lineWidth = 10;
        Utils.DrawRoundedRect(newGameBmd.ctx, 0, 0, Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.4, 20);

        var continueBmd = game.add.bitmapData(Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.4, 'continueButton', true);
        continueBmd.ctx.fillStyle = "#AAC";
        continueBmd.ctx.strokeStyle = "#333";
        continueBmd.ctx.lineWidth = 10;
        Utils.DrawRoundedRect(continueBmd.ctx, 0, 0, Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.4, 20);

        var leaderboardBmd = game.add.bitmapData(Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.1, 'leaderboardButton', true);
        leaderboardBmd.ctx.fillStyle = "#AAC";
        leaderboardBmd.ctx.strokeStyle = "#333";
        leaderboardBmd.ctx.lineWidth = 10;
        Utils.DrawRoundedRect(leaderboardBmd.ctx, 0, 0, Defs.GAME_WIDTH * 0.9, Defs.GAME_HEIGHT * 0.1, 20);
    },

    preload: () => {
    },

    create: () => {
        game.stage.backgroundColor = "#E5E5E5";
        game.world.setBounds(0, 0, Defs.GAME_WIDTH * 100, Defs.GAME_HEIGHT);

        newGameButton = game.add.sprite(0, 0, 'newgame');
        continueButton = game.add.sprite(0, Defs.GAME_HEIGHT * 0.5, 'continue');
        leaderboardButton = game.add.sprite(0, Defs.GAME_HEIGHT * 0.95, 'leaderboard');

        // newGameButton.addChild(new Phaser.Text(game, 50, 50, "New Game", outlineTextStyle));
        // continueButton.addChild(new Phaser.Text(game, 50, 50, "Continue", outlineTextStyle));
        // leaderboardButton.addChild(new Phaser.Text(game, 50, 50, "Leaderboard", outlineTextStyle));

        newGameButton.inputEnabled = continueButton.inputEnabled = leaderboardButton.inputEnabled = true;
        newGameButton.events.onInputDown.add(() => {
            new NameDialog((name) => {
                State.name = name;
                game.state.start("JourneySelect");
            });
        });

        continueButton.events.onInputDown.add(() => {
        });

        leaderboardButton.events.onInputDown.add(() => {
        });
    },

    update: () => {
    },
}