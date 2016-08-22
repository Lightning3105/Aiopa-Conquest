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

function popButton(x, type){
	//Phaser.Button.call(this, game, x, 700, 'gui/blankButton', function(){}, this, 1, 0, 1, 0);
	var button = game.make.button(x, 650, 'gui/blankButton', function(){}, this, 1, 0, 0, 0);
	console.log(button)
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
/*
popButton.prototype = Object.create(Phaser.Button.prototype);
popButton.prototype.constructor = popButton;
popButton.prototype.update = function() {} */