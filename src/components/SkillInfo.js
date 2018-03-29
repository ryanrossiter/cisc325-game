import game from '../game';
import Defs from '../defs';
import InfoRow from './InfoRow';

const skillNameTextStyle = {
    "font": "Verdana",
    fill: "#111",
    fontSize: "70px",
    boundsAlignV: 'middle',
    wordWrap: true,
    wordWrapWidth: InfoRow.WIDTH * 0.6
};

const costTextStyle = {
    "font": "Verdana",
    fill: "#0A0A0A",
    fontSize: "65px",
    fontWeight: "bold"
};

export default class SkillInfo {
    constructor(skill) {
        this.skill = skill;
        this.group = new Phaser.Group(game, null);

        this.group.addChild(new Phaser.Sprite(game, InfoRow.HEIGHT / 2, InfoRow.HEIGHT / 2, skill.sprite)).anchor.set(0.5);
        this.group.addChild(new Phaser.Text(game, 0, 0, skill.name, skillNameTextStyle))
            .setTextBounds(InfoRow.WIDTH * 0.175, 0, InfoRow.WIDTH * 0.6, InfoRow.HEIGHT);
        this.group.addChild(new Phaser.Text(game, InfoRow.WIDTH * 0.95, InfoRow.HEIGHT / 2, skill.cost + "sp", costTextStyle)).anchor.set(1, 0.5);
    }
}