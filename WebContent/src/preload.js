var preload = function(game){}

WebFontConfig = {
    active: function() { 
    	console.log("fonts loaded");
    	},

    google: {
      families: ['Galdeano']
    }
};


preload.prototype = {
	preload: function(){ 
		var text = "Loading Game";
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var t = game.add.text(game.world.centerX, game.world.centerY, text, style);
        t.anchor.set(0.5);
        
        game.load.spritesheet('buttonBeige', 'assets/images/button/beige.png', 190, 47);
        game.load.spritesheet('aiopaTitle', 'assets/images/Aiopa Title.png', 262, 110);
        game.load.image('conquestTitle', 'assets/images/Conquest Title.png');
        
        game.load.image('tile/plains', 'assets/images/tiles/ground/plains.png');
        
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
	},
  	create: function(){
		this.game.state.start("titleMenu");
	}
}