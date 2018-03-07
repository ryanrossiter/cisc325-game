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
				else line += '8'; 
			}
			dialog.push(line);
		}

		return game.create.texture(null, dialog, Defs.PIXEL_SIZE, Defs.PIXEL_SIZE, 0, false);
	}
};