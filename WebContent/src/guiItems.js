function hover(){
	mod = 30 * v.scale;
	Phaser.Sprite.call(this, game, 0, 0, 'gui/selector');
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
	
	this.x = Math.round((game.input.x - (v.scrollX % mod)) / mod) * mod + (v.scrollX % mod)
	this.y = Math.round((game.input.y - (v.scrollY % mod)) / mod) * mod + (v.scrollY % mod)
};

function checkMap(){
    if (v.scrollX > 0 + v.scale * 15){
  	  v.scrollX = 0 + v.scale * 15;
    }
    if (v.scrollY > 0 + v.scale * 15){
  	  v.scrollY = 0 + v.scale * 15;
    }
    if (v.scrollX < (-v.width * 30 * v.scale) + v.gameWidth + v.scale * 15){
  	  v.scrollX = (-v.width * 30 * v.scale) + v.gameWidth + v.scale * 15
    }
    if (v.scrollY < (-v.width * 30 * v.scale) + v.gameHeight + v.scale * 15){
  	  v.scrollY = (-v.width * 30 * v.scale) + v.gameHeight + v.scale * 15
    }
}