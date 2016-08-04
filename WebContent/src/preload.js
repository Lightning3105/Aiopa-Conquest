var preload = function(game){}

preload.prototype = {
	preload: function(){ 
		var text = "Loading Game";
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var t = game.add.text(game.world.centerX, game.world.centerY, text, style);
        t.anchor.set(0.5);
        
        game.load.spritesheet('buttonBeige', 'assets/images/button/beige.png', 190, 47);
        game.load.spritesheet('aiopaTitle', 'assets/images/Aiopa Title.png', 189, 83);
        game.load.image('conquestTitle', 'assets/images/Conquest Title.png');
	},
  	create: function(){
		this.game.state.start("titleMenu");
	}
}