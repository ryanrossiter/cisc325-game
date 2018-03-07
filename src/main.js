import game from './game';
import State from './state';
import Defs from './defs';

export default {
    preload: () => {

    },

    create: () => {
        State.reset();
        
        game.stage.backgroundColor = "#90A0F5";

        game.add.sprite(0, 0, 'test');
    },

    update: () => {

    }
}