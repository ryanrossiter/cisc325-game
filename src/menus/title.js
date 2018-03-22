import game from '../game';
import State from '../state';
import Defs from '../defs';
import Utils from '../utils';

export default {
    create: () => {
        var titleSprite = game.add.sprite(Defs.GAME_WIDTH / 2, Defs.GAME_HEIGHT / 2, 'title');
        titleSprite.anchor.set(0.5);
        titleSprite.inputEnabled = true;
        titleSprite.events.onInputDown.add(() => {
            game.state.start("MainMenu");
        });
    },

    update: () => {
    },
}