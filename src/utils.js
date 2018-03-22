import game from './game';
import Defs from './defs';

export default {
	CreateDialog: (w, h, r) => {
		r = r || 2;
		let dialog = [];
		for (var y = 0; y < h; y++) {
			let line = '';
			for (var x = 0; x < w; x++) {
				if (x + y < r || w-1 - x + y < r || x + h-1 - y < r || w-1 - x + h-1 - y < r)
					line += '.';
				else if (x == 0 || y == 0 || x == w-1 || y == h-1
					|| x + y == r || w-1 - x + y == r || x + h-1 - y == r || w-1 - x + h-1 - y == r)
					line += '0';
				else line += 'F'; 
			}
			dialog.push(line);
		}

		return game.create.texture(null, dialog, Defs.PIXEL_SIZE, Defs.PIXEL_SIZE, 0, false);
	},

	DrawRoundedRect: (ctx, x, y, width, height, radius=5, fill=true, stroke=true) => {
        if (typeof radius === 'number') {
            radius = {tl: radius, tr: radius, br: radius, bl: radius};
        } else {
            var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
            for (var side in defaultRadius) {
                radius[side] = radius[side] || defaultRadius[side];
            }
        }
        ctx.beginPath();
        ctx.moveTo(x + radius.tl, y);
        ctx.lineTo(x + width - radius.tr, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
        ctx.lineTo(x + width, y + height - radius.br);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
        ctx.lineTo(x + radius.bl, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
        ctx.lineTo(x, y + radius.tl);
        ctx.quadraticCurveTo(x, y, x + radius.tl, y);
        ctx.closePath();

        ctx.save();
		ctx.clip();
		ctx.lineWidth *= 2;
        if (fill) {
            ctx.fill();
        }
        if (stroke) {
            ctx.stroke();
        }
        ctx.restore();
        ctx.lineWidth /= 2;
    },

	// Should only be used in a preload method because generating an image and adding to cache is async
	CreateDummySprite: (name, w, h, color="#FFFFFF") => {
		let bmd = game.add.bitmapData(w, h);
		bmd.ctx.beginPath();
		bmd.ctx.rect(0, 0, w, h);
		bmd.ctx.fillStyle = color;
		bmd.ctx.fill();
		game.load.imageFromBitmapData(name, bmd);
	}
};