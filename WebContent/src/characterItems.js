function character(x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	this.pos = [x, y]
	this.width = 80 * v.scale;
	this.height = 80 * v.scale;
	game.add.existing(this)
}

character.prototype = Object.create(Phaser.Sprite.prototype);
character.prototype.constructor = character;
character.prototype.update = function() {
	this.width = 80 * v.scale;
	this.height = 80 * v.scale;
	this.x = this.pos[0] + v.scrollX;
	this.y = this.pos[1] + v.scrollY;
	
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