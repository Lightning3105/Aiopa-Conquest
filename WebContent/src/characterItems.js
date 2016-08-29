function character(x, y, key){
	Phaser.Sprite.call(this, game, x, y, key);
	this.pos = [x, y]
	this.width = 30 * v.scale;
	this.height = 3 * v.scale;
	this.anchor.set(0.5, 1)
	game.add.existing(this)
	
	this.doing = null;
	this.path = []
	this.speed = 1
}

character.prototype = Object.create(Phaser.Sprite.prototype);
character.prototype.constructor = character;
character.prototype.update = function() {
	this.width = 30 * v.scale;
	this.height = 30 * v.scale;
	this.x = this.pos[0] * v.scale + v.scrollX;
	this.y = this.pos[1] * v.scale + v.scrollY;
	
	if (this.x < 0 - mod/1.5 || this.x > v.gameWidth + mod/1.5) {
		this.visible = false
	}
	else if (this.y < 0 - mod/1.5 || this.y > v.gameHeight + mod/1.5) {
		this.visible = false
	}
	else {
		this.visible = true
	}
	
	if (this.doing == null && v.orders.length != 0){
		this.doing = v.orders[0]
		v.orders.splice(0, 1)
		t = [Math.round((this.pos[0])/30), Math.round((this.pos[1])/30)]
		console.log("gen", t, this.doing.object.tPos)
		getPath(t, this.doing.object.tPos, this)
	}
	
	if (this.path.length != 0){
		//console.log(this.path)
		this.pos[0] = this.path[0].x * 30
		this.pos[1] = this.path[0].y * 30
		this.path.splice(0, 1)
	}
	else{
		this.path = []
		this.doing = null
	}
};