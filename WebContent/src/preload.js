var preload = function(game){}

var WebFontConfig = {
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
        
        var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
        this.loadingText = game.add.text(game.world.centerX, game.world.centerY + 60, "0%", style)
        this.loadingText.anchor.set(0.5);
        
        game.load.spritesheet('buttonBeige', 'assets/images/button/beige.png', 190, 49);
        game.load.spritesheet('aiopaTitle', 'assets/images/Aiopa Title.png', 262, 110);
        game.load.image('conquestTitle', 'assets/images/Conquest Title.png');
        game.load.video('logo', 'assets/images/Lightopa Games Intro.mp4')
        
        game.load.image('tile/grass', 'assets/images/tiles/ground/grass.png');
        game.load.image('tile/rock', 'assets/images/tiles/ground/rock.png');
        game.load.image('tile/sand', 'assets/images/tiles/ground/sand.png');
        game.load.image('tile/water', 'assets/images/tiles/ground/water.png');
        game.load.image('tile/forest', 'assets/images/tiles/ground/forest.png');
        
        game.load.image('gui/selector', 'assets/images/gui/selector.png');
        game.load.spritesheet('gui/blankButton', 'assets/images/gui/blankButton.png', 45, 49);
        game.load.image('gui/buildingsIcon', 'assets/images/gui/buildingsIcon.png');
        game.load.image('gui/unitsIcon', 'assets/images/gui/unitsIcon.png');
        game.load.image('gui/ordersIcon', 'assets/images/gui/ordersIcon.png');
        game.load.image('gui/mapIcon', 'assets/images/gui/mapIcon.png');
        
        game.load.script('webfont', 'src/webfont.js');
	},
  	create: function(){
  		game.state.start("theGame")
  		/*video = game.add.video('logo');
  	    video.play(false);
  	    video.addToWorld();
  	    
  	    video.onComplete.add(function(){
			game.state.start("titleMenu")
		},
		this) */
	},
	
	loadUpdate: function() {
		// update loading text percent
		this.loadingText.setText(this.load.progress + "%");
	}
}