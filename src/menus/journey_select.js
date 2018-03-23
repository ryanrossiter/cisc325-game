import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';
import Button from '../components/Button';

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

const continueTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "120px",
    fontWeight: "bold"
};

export default {
    create: () => {
        game.stage.backgroundColor = "#E5E5E5";
        game.world.setBounds(0, 0, Defs.GAME_WIDTH * 100, Defs.GAME_HEIGHT);

        game.add.text(Defs.GAME_WIDTH / 2, 120, "Start A New Journey!", titleTextStyle).anchor.set(0.5);

        var continueButton = new Button(Defs.GAME_WIDTH / 2, Defs.GAME_HEIGHT * 0.925, Defs.GAME_WIDTH * 0.925, 270);
        continueButton.disabled = true;
        continueButton.onChange = (pressed) => {
            if (pressed) {
                game.state.start("Main");
            }
        };

        continueButton.sprite.addChild(new Phaser.Text(game, 0, 0, "CONTINUE", continueTextStyle)).anchor.set(0.5);

        let numSelected = 0;
        let data = [
            {
                label: 'DIFFICULTY',
                prop: 'difficulty',
                options: ['easy', 'medium', 'hard'],
                labels: ['EZ', 'so-so', 'Crazy']
            },
            {
                label: 'CLASS',
                prop: 'class',
                options: ['warrior', 'mage', 'archer'],
                labels: ['Warrior', 'Mage', 'Archer']
            },
            {
                label: 'TYPE',
                prop: 'type',
                options: ['fire', 'water', 'elec', 'earth'],
                labels: ['Fire', 'Water', 'Elec', 'Earth']
            },
            {
                label: 'FOCUS',
                prop: 'focus',
                options: ['phys', 'skill', 'buff', 'util'],
                labels: ['Attack', 'Skill', 'Buff', 'Utility']
            }
        ];

        for (var y = 0; y < data.length; y++) {
            let d = data[y];
            d.buttons = [];
            var n = d.options.length;
            game.add.text(30, y * 500 + 230, d.label, outlineTextStyle);

            for (var i = 0; i < n; i++) {
                let btn = d.buttons[i] = new Button(Defs.GAME_WIDTH / n * (i + 0.5), y * 500 + 520);
                btn.toggle = true;
                btn.allowDepress = false;
                btn.index = i;
                btn.onChange = (pressed) => {
                    if (pressed) {
                        if (d.selected !== undefined) {
                            d.buttons[d.selected].setPressed(false);
                        }

                        State[d.prop] = d.options[btn.index];
                        d.selected = btn.index;
                    }

                    numSelected += (pressed? 1:-1);
                    if (numSelected === data.length) {
                        continueButton.disabled = false;
                    }
                };

                btn.sprite.addChild(new Phaser.Sprite(game, 0, -btn.sprite.height * 0.2, 'blank')).anchor.set(0.5);
                btn.sprite.addChild(new Phaser.Text(game, 0, btn.sprite.height * 0.3, d.labels[i], labelTextStyle)).anchor.set(0.5);
            }
        }
    },

    update: () => {
    },
}