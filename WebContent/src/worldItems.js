function terrainTile(game, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	this.anchor.set(0.5, 0.5);
	game.add.existing(this)
}

terrainTile.prototype = Object.create(Phaser.Sprite.prototype);
terrainTile.prototype.constructor = terrainTile;
terrainTile.prototype.update = function() {
    //  Automatically called by World.update
};