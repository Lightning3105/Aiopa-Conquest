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
	
	/*
	this.highlight = new Phaser.Graphics(game)
	this.highlight.beginFill(0xff0000, 100);
	this.highlight.lineStyle(2, 0xff0000, 1);
	this.highlight.drawRect(0, 0, mod, mod)
	this.highlight.endFill()
	this.highlight = this.highlight.generateTexture()
	this.highlight = new Phaser.Sprite(game, 0, 0, this.highlight)
	this.addChild(this.highlight) */
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
	
	/*if (v.selectedTile == this){
		this.highlight.visible = true
	}
	else{
		this.highlight.visible = false
	} */
	
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
	//tile.addChild(this)
	this.tile = tile
	this.size = [20, 20]
	//game.add.existing(this);
	this.type = "grass";
	game.add.existing(this)
}

shrub.prototype = Object.create(Phaser.Sprite.prototype);
shrub.prototype.constructor = shrub;
shrub.prototype.update = function() {
	mod = 30 * v.scale;
	this.width = this.size[0] * v.scale;
	this.height = this.size[1] * v.scale;
	this.x = this.tile.pos[0] * mod + v.scrollX + this.pos[0] * v.scale;
	this.y = this.tile.pos[1] * mod + v.scrollY + this.pos[1] * v.scale;
	
	this.visible = this.tile.visible
	/*if (this.x < 0 - mod/1.5 || this.x > v.gameWidth + mod/1.5) {
		this.visible = false
	}
	else if (this.y < 0 - mod/1.5 || this.y > v.gameHeight + mod/1.5) {
		this.visible = false
	}
	else {
		this.visible = true
	}*/
}

function tree(tile, x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	this.pos = [x, y];
	this.anchor.set(0.5, 1);
	//tile.addChild(this)
	this.tile = tile
	this.size = [80, 80]
	//game.add.existing(this);
	this.type = "tree";
	game.add.existing(this)
}

tree.prototype = Object.create(Phaser.Sprite.prototype);
tree.prototype.constructor = tree;
tree.prototype.update = function() {
	mod = 30 * v.scale;
	this.width = this.size[0] * v.scale;
	this.height = this.size[1] * v.scale;
	this.x = this.tile.pos[0] * mod + v.scrollX + this.pos[0] * v.scale;
	this.y = this.tile.pos[1] * mod + v.scrollY + this.pos[1] * v.scale;
	
	this.visible = this.tile.visible
}