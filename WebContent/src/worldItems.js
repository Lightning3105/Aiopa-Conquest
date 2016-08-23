function terrainTile(x, y, terrain){
	mod = 30 * v.scale;
	if (terrain == 0) {
		key = 'tile/water'
	}
	if (terrain == 1) {
		key = 'tile/sand'
	}
	if (terrain == 2) {
		key = 'tile/grass'
	}
	if (terrain == 3) {
		key = 'tile/forest'
	}
	if (terrain == 4) {
		key = 'tile/rock'
	}
	Phaser.Sprite.call(this, game, x * mod, y * mod, key);
	this.pos = [x, y];
	this.terrain = terrain;
	this.anchor.set(0.5, 0.5);
	this.width = mod
	this.height = mod
	game.add.existing(this);
}

terrainTile.prototype = Object.create(Phaser.Sprite.prototype);
terrainTile.prototype.constructor = terrainTile;
terrainTile.prototype.update = function() {
	mod = 30 * v.scale;
	this.width = mod;
	this.height = mod;
	this.x = this.pos[0] * mod + v.scrollX;
	this.y = this.pos[1] * mod + v.scrollY;
	
	if (this.x < 0 - mod/1.5 || this.x > v.gameWidth + mod/1.5) {
		this.visible = false
	}
	else if (this.y < 0 - mod/1.5 || this.y > v.gameHeight + mod/1.5) {
		this.visible = false
	}
	else {
		this.visible = true
	}
};

function shrub(tile, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	this.pos = [x, y];
	this.anchor.set(0.5, 0.5);
	tile.addChild(this)
	this.width = 40
	this.height = 40
	//game.add.existing(this);
	game.add.existing(this)
}

shrub.prototype = Object.create(Phaser.Sprite.prototype);
shrub.prototype.constructor = shrub;
shrub.prototype.update = function() {}

function tree(tile, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	this.pos = [x, y];
	this.anchor.set(0.5, 0.5);
	tile.addChild(this)
	this.width = 160
	this.height = 160
	//game.add.existing(this);
	game.add.existing(this)
}

tree.prototype = Object.create(Phaser.Sprite.prototype);
tree.prototype.constructor = tree;
tree.prototype.update = function() {}