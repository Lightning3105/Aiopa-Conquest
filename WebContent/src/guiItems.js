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
	
	if (this.y > 580){
		this.visible = false;
	}
	else{
		this.visible = true;
	}
	
	if (this.game.input.activePointer.leftButton.isDown) {
		p = [(this.x - v.scrollX)/mod, (this.y - v.scrollY)/mod]
		for (t in v.tiles.children){
			if (v.tiles.children[t].pos[0] == p[0] && v.tiles.children[t].pos[1] == p[1]){
				if (v.tMenu != null){
					v.tMenu.destroy()
				}
				v.selectedTile = v.tiles.children[t];
				v.tMenu = new tileMenu()
			}
		}
	}
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

function popButton(x, type){
	//Phaser.Button.call(this, game, x, 700, 'gui/blankButton', function(){}, this, 1, 0, 1, 0);
	var button = game.make.button(x, 650, 'gui/blankButton', function(){}, this, 1, 0, 0, 0);
	button.anchor.set(0.5, 0.5);
	button.width = 100;
	button.height = 100;
	
	button.onInputOver.add(function(){button.y += 4}, this)
	button.onInputOut.add(function(){button.y -= 4}, this)
	
	if (type == "buildings"){
		var iconKey = 'gui/buildingsIcon';
	}
	if (type == "units"){
		var iconKey = 'gui/unitsIcon';
	}
	if (type == "orders"){
		var iconKey = 'gui/ordersIcon';
	}
	if (type == "map"){
		var iconKey = 'gui/mapIcon';
	}
	var icon = new Phaser.Sprite(game, 0, 0, iconKey)
	icon.width = 30
	icon.height = 30
	icon.anchor.set(0.5, 0.5)
	button.addChild(icon)
	return button
}

function tileMenu(){
	this.pos = v.selectedTile.pos
	mod = 30 * v.scale
	this.size = [150, 250] //Calculate this later
	x = this.pos[0] * mod + v.scrollX + 20 * v.scale;
	y = this.pos[1] * mod + v.scrollY - 10/2;
	back = new Phaser.Graphics(game)
	back.beginFill(0xffce99);
	back.drawRoundedRect(0, 0, this.size[0], this.size[1], 12)
	back.endFill()
	key = back.generateTexture()
	Phaser.Sprite.call(this, game, x, y, key)
	game.add.existing(this);
	this.width = 1
	this.height = 1
	game.add.tween(this).to({ width: this.size[0], height: this.size[1] }, 500, null, true, 0);
	return this
}

tileMenu.prototype = Object.create(Phaser.Sprite.prototype);
tileMenu.prototype.constructor = tileMenu;
tileMenu.prototype.update = function() {
	mod = 30 * v.scale
	this.x = this.pos[0] * mod + v.scrollX + 20 * v.scale;
	this.y = this.pos[1] * mod + v.scrollY - this.height/2;
	
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