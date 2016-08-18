var theGame = function(game){}

theGame.prototype = {
		preload: function(){
	    },

		create: function(){
			console.log("game started");
			game.world.setBounds(0, 0, v.width * 30 * v.scale, v.width * 30 * v.scale);
			game.stage.backgroundColor = "#4488AA";
			map = generateNoise(v.width, v.height);
			for (var y = 0; y < v.height; y++) {
				for (var x = 0; x < v.width; x++) {
					t = new terrainTile(game, x, y, map[x][y]);
				}
			}
			
		},
	    
	    render: function(){
	    	
	    },
	    
	    update: function(){
	    	if (this.game.input.activePointer.isDown) {
	    	    if (this.game.origDragPoint) { // move the camera by the amount the mouse has moved since last update
	    	      this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
	    	      this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
	    	      console.log(this.game.origDragPoint.x - this.game.input.activePointer.position.x);
	    	    }
	    	  // set new drag origin to current position
	    	  this.game.origDragPoint = this.game.input.activePointer.position.clone();
	    	}
	    	else {
	    	  this.game.origDragPoint = null;
	    	}
	    }
}