import game from '../game';
import State from '../state';
import Defs from '../defs';

export default class GroupSwipe {
    constructor(parentGroup, group, pageWidth, pageHeight, horizontal=false, maskPage=false, incrementSize=1, increments=null, dragCallback=(dist)=>{}) {
        this.dragging = false;
        this.pageWidth = pageWidth;
        this.pageHeight = pageHeight;
        this.horizontal = horizontal;
        this.increments = increments || Math.floor((horizontal? pageWidth : pageHeight) / incrementSize);
        this.incrementSize = incrementSize;
        this.dragCallback = dragCallback;
        this.group = group;
        this.swipeBox = parentGroup.add(new Phaser.Sprite(game, 0, 0, 'blank'));
        this.swipeBox.alpha = 0;
        this.dragStartX = this.dragStartY = 0;

        parentGroup.sendToBack(this.swipeBox);
        this.swipeBox.width = pageWidth;
        this.swipeBox.height = pageHeight;
        this.maskPage = maskPage;
        if (this.maskPage) {
            this.pageMask = parentGroup.addChild(new Phaser.Graphics(game, 0, 0));
            this.pageMask.beginFill(0xffffff);
            this.pageMask.drawRect(0, 0, pageWidth, pageHeight);
            group.mask = this.pageMask;
        }

        this.swipeBox.inputEnabled = true;
        this.swipeBox.input.enableDrag();
        this.swipeBox.input.setDragLock(this.horizontal, !this.horizontal); // disable vertical drag

        this.swipeBox.events.onDragStart.add(this.onDragStart, this);
        this.swipeBox.events.onDragStop.add(this.onDragStop, this);
    }

    setSwipeBoxAnchor(x, y) {
        this.swipeBox.anchor.set(x, y);
        if (this.maskPage) {
            this.pageMask.x = -this.swipeBox.anchor.x * this.pageWidth;
            this.pageMask.y = -this.swipeBox.anchor.y * this.pageHeight;
        }
    }

    _setGroupPos() {
        this.group.x = this.swipeBox.x + this.dragStartX;
        this.group.y = this.swipeBox.y + this.dragStartY;

        if (-this.group.x < 0) this.group.x = 0;
        else if (Math.ceil(-this.group.x / this.incrementSize) >= this.increments) this.group.x = -(this.increments - 1) * this.incrementSize;

        if (-this.group.y < 0) this.group.y = 0;
        else if (Math.ceil(-this.group.y / this.incrementSize) >= this.increments) this.group.y = -(this.increments - 1) * this.incrementSize;
    }

    update() {
        if (this.dragging) {
            this._setGroupPos();
        }
    }

    onDragStart() {
        this.dragging = true;
        this.dragStartX = this.group.x;
        this.dragStartY = this.group.y;
    }

    onDragStop() {
        this.dragging = false;
        this._setGroupPos();
        this.swipeBox.x = this.swipeBox.y = 0;

        var off = 0, dist = 0, incrementPressed = 0;
        if (this.horizontal) {
            off = Math.round(this.group.x / this.incrementSize);
            dist = Math.round(this.dragStartX / this.incrementSize) - off;
            incrementPressed = Math.floor((this.swipeBox.input.globalToLocal(this.swipeBox.input.downPoint).x - this.group.x) / this.incrementSize);
            game.add.tween(this.group).to({ x: off * this.incrementSize }, 300, Phaser.Easing.Quadratic.Out).start();
        } else {
            off = Math.round(this.group.y / this.incrementSize);
            dist = Math.round(this.dragStartY / this.incrementSize) - off;
            incrementPressed = Math.floor((this.swipeBox.input.globalToLocal(this.swipeBox.input.downPoint).y - this.group.y) / this.incrementSize);
            game.add.tween(this.group).to({ y: off * this.incrementSize }, 300, Phaser.Easing.Quadratic.Out).start();
        }

        this.dragCallback(Math.abs(dist), incrementPressed);
    }
}