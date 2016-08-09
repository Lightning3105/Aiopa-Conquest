var theGame = function(game){}

theGame.prototype = {
		preload: function(){
	    },

		create: function(){
			console.log("game started");
			game.stage.backgroundColor = "#4488AA";
			t = new terrainTile(game, 500, 500, 'tile/plains');
		},
	    
	    render: function(){
	    	
	    },
	    
	    update: function(){
	    	
	    }
}