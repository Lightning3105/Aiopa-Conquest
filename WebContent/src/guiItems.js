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
		v.cancelMouse = true;
	}
	if (v.cancelMouse){
		this.visible = false;
	}
	else{
		this.visible = true;
	}
	
	if (this.game.input.activePointer.leftButton.isDown && !v.cancelMouse) {
		p = [Math.round((this.x - v.scrollX)/mod), Math.round((this.y - v.scrollY)/mod)]
		console.log(p)
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

function selectedOutline(){
	mod = 30 * v.scale;
	this.gen = function(){
		var out = new Phaser.Graphics(game)
		out.beginFill(0xff0000, 0.3);
		out.lineStyle(1 * v.scale, 0xff0000, 1);
		out.drawRect(0, 0, mod, mod)
		out.endFill()
		out = out.generateTexture()
		return out
	}
	Phaser.Sprite.call(this, game, 0, 0, this.gen());
	this.anchor.set(0.5, 0.5);
	this.width = mod
	this.height = mod
	game.add.existing(this);
}

selectedOutline.prototype = Object.create(Phaser.Sprite.prototype);
selectedOutline.prototype.constructor = selectedOutline;
selectedOutline.prototype.update = function() {
	mod = 30 * v.scale;
	this.width = mod;
	this.height = mod;
	this.key = this.gen()
	if (v.selectedTile != null){
		this.x = v.selectedTile.pos[0] * mod + v.scrollX;
		this.y = v.selectedTile.pos[1] * mod + v.scrollY;
		
		if (this.x < 0 - mod/1.5 || this.x > v.gameWidth + mod/1.5) {
			this.visible = false
		}
		else if (this.y < 0 - mod/1.5 || this.y > v.gameHeight + mod/1.5) {
			this.visible = false
		}
		else {
			this.visible = true
		}
	}
	else{
		this.visible = false
	}
};

function popButton(x, typ){
	//Phaser.Button.call(this, game, x, 700, 'gui/blankButton', function(){}, this, 1, 0, 1, 0);
	var button = game.make.button(x, 650, 'gui/blankButton', function(){}, this, 1, 0, 0, 0);
	button.anchor.set(0.5, 0.5);
	button.width = 100;
	button.height = 100;
	
	button.onInputOver.add(function(){button.y += 4}, this)
	button.onInputOut.add(function(){button.y -= 4}, this)
	
	if (typ == "buildings"){
		var iconKey = 'gui/buildingsIcon';
	}
	if (typ == "units"){
		var iconKey = 'gui/unitsIcon';
	}
	if (typ == "orders"){
		var iconKey = 'gui/ordersIcon';
	}
	if (typ == "map"){
		var iconKey = 'gui/mapIcon';
	}
	var icon = new Phaser.Sprite(game, 0, 0, iconKey)
	icon.width = 30
	icon.height = 30
	icon.anchor.set(0.5, 0.5)
	button.addChild(icon)
	return button
}

function harvestButton(menu, y, typ){
	Phaser.Button.call(this, game, 100, y, 'buttonBeige', function(){}, this, 1, 0, 1, 0);
	this.typ = typ;
	this.menu = menu;
	//var button = game.make.button(x, 650, 'gui/blankButton', function(){}, this, 1, 0, 0, 0);
	this.anchor.set(0.5, 0.5);
	this.width = 180;
	this.height = (47 / 190) * this.width;
	
	this.onInputOver.add(function(){this.y += 4}, this)
	this.onInputOut.add(function(){this.y -= 4}, this)
	this.onInputDown.add(this.press, this)
	
	if (typ == "grass"){
		var iconKey = 'gui/harvestIcon';
		this.label = "Harvest Grass"
	}
	if (typ == "tree"){
		var iconKey = 'gui/chopIcon';
		this.label = "Chop Tree"
	}
	var icon = new Phaser.Sprite(game, -70, 0, iconKey)
	icon.width = 30
	icon.height = 30
	icon.anchor.set(0.5, 0.5)
	this.addChild(icon)
	
	style = {
			'font': 'Galdeano', 
			'fill': 'black', 
			'fontSize': ((this.width - (40/190 * this.width)) / this.label.length) * 2
		}
	var text = new Phaser.Text(game, -40, 0, this.label, style);
	//while(text.height > this.height-30 && text.fontSize > 0) {  text.fontSize--;  text.updateText();}
	text.anchor.set(0, 0.49);
	this.addChild(text);
	return this
}

harvestButton.prototype = Object.create(Phaser.Button.prototype);
harvestButton.prototype.constructor = harvestButton;
harvestButton.prototype.update = function() {}
harvestButton.prototype.press = function() {
	console.log("PRESSED")
	for (i in this.menu.tiles){
		if (this.menu.tiles[i].typ == this.typ){
			v.orders.push({
				name: this.label,
				object: this.menu.tiles[i],
			})
		}
	}
} 



function tileMenu(){
	this.pos = v.selectedTile.pos
	mod = 30 * v.scale
	this.size = [200, 300] //Calculate this later
	x = this.pos[0] * mod + v.scrollX + 20 * v.scale;
	y = this.pos[1] * mod + v.scrollY - 1/2;
	back = new Phaser.Graphics(game)
	back.beginFill(0xffce99);
	back.drawRoundedRect(0, 0, this.size[0], this.size[1], 12)
	back.endFill()
	key = back.generateTexture()
	Phaser.Sprite.call(this, game, x, y, key)
	game.add.existing(this);
	this.width = 1
	this.height = 1
	game.add.tween(this).to({ width: this.size[0], height: this.size[1] }, 250, null, true, 0);
	
	this.tiles = []
	for (i in v.layered.children){
		if (v.layered.children[i].tile == v.selectedTile){
			this.tiles.push(v.layered.children[i])
		}
	}
	for (i in v.ground.children){
		if (v.ground.children[i].tile == v.selectedTile){
			this.tiles.push(v.ground.children[i])
		}
	}
	
	for (i in this.tiles){
		b = new harvestButton(this, 30 + 100*i, this.tiles[i].typ)
		//this.buttons.add(b)
		this.addChild(b)
	}
	
	return this
}

tileMenu.prototype = Object.create(Phaser.Sprite.prototype);
tileMenu.prototype.constructor = tileMenu;
tileMenu.prototype.update = function() {
	mod = 30 * v.scale
	this.x = this.pos[0] * mod + v.scrollX + 20 * v.scale;
	this.y = this.pos[1] * mod + v.scrollY - this.height/2;
	
	if (this.x < 0 - this.width || this.x > v.gameWidth + this.width) {
		this.visible = false
	}
	else if (this.y < 0 - this.height || this.y > v.gameHeight + this.height) {
		this.visible = false
	}
	else {
		this.visible = true
	}
	
	r = new Phaser.Rectangle(this.x, this.y, this.width, this.height)
	if (r.contains(game.input.x, game.input.y)){
		v.cancelMouse = true;
	}
};