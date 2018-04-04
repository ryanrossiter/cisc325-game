import game from './game';
import Defs from './defs';
import Utils from './utils';

let loadPromises = [];
export default {
    init: () => {
        game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
        game.scale.setUserScale(Defs.SCALE_RATIO, Defs.SCALE_RATIO);
    },
    
    preload: () => {
        // TODO: replace dummy sprites with actual sprites
        Utils.CreateDummySprite('_item', 140, 140, "#44764A");

        Utils.CreateDummySprite('blank', 10, 10, "#FFFFFF");

        // Load sprite from files listed in Defs.SPRITES
        for (const spriteName in Defs.SPRITES) {
            game.load.image(spriteName, Defs.SPRITES[spriteName]);
        }

        // Create sprites that are defined by pixel arrays in Defs.PIXEL_SPRITES
        for (const spriteName in Defs.PIXEL_SPRITES) {
            loadPromises.push(new Promise((resolve) => {
                let bmd = game.create.texture(spriteName, Defs.PIXEL_SPRITES[spriteName], Defs.PIXEL_SIZE, Defs.PIXEL_SIZE, 0, false);
                let i = new Image();
                i.onload = () => {
                    game.cache.addImage(spriteName, null, i);

                    i.onload = null;
                    resolve();
                }

                i.src = bmd.canvas.toDataURL("image/png");
            }));
        }

        Promise.all(loadPromises).then(() => {
            // After all sprites are loaded create spritesheets as defined in Defs.SPRITESHEETS
            for (const spriteName in Defs.SPRITESHEETS) {
                let data = Defs.SPRITESHEETS[spriteName];
                game.cache.addSpriteSheet(data.key, null, game.cache.getImage(spriteName),
                    data.frameWidth * Defs.PIXEL_SIZE, data.frameHeight * Defs.PIXEL_SIZE
                );
            }
        });
    },

    create: () => {
        // switch to next state
        game.state.start(Defs.INITIAL_STATE);
    },
}
