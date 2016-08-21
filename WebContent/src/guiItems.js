function hover(){
	mod = 30 * v.scale;
	Phaser.Sprite.call(this, game, 0, 0, 'tile/water');
	this.width = mod
	this.height = mod
	this.anchor.set(0.5, 0.5);
	game.add.existing(this);
}

hover.prototype = Object.create(Phaser.Sprite.prototype);
hover.prototype.constructor = hover;
hover.prototype.update = function() {
	mod = 30 * v.scale;
	this.width = mod
	this.height = mod
	
	this.x = Math.round(game.input.x / mod) * mod + game.camera.x
	this.y = Math.round(game.input.y / mod) * mod + game.camera.y
};