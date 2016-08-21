var theGame = function(game){}

theGame.prototype = {
		preload: function(){
	    },

		create: function(){
			console.log("game started");
			game.stage.backgroundColor = "#4488AA";
			map = generateNoise(v.width, v.height);
			for (var y = 0; y < v.height; y++) {
				for (var x = 0; x < v.width; x++) {
					t = new terrainTile(x, y, map[x][y]);
				}
			}
			h = new hover();
		},
	    
	    render: function(){
	    	
	    },
	    
	    update: function(){
	    	console.log(v.scrollX, v.scrollY, 30 * v.scale)
	    	if (this.game.input.activePointer.isDown) {
	    	    if (this.game.origDragPoint) { // move the camera by the amount the mouse has moved since last update
	    	      v.scrollX -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
	    	      v.scrollY -= this.game.origDragPoint.y - this.game.input.activePointer.position.y;
	    	    }
	    	  // set new drag origin to current position
	    	  this.game.origDragPoint = this.game.input.activePointer.position.clone();
	    	}
	    	else {
	    	  this.game.origDragPoint = null;
	    	};
	    	
	    	game.input.mouse.mouseWheelCallback = mouseWheel;
	    	function mouseWheel(event) {
	    		if (game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_UP){
	    			v.scale += 0.1
	    		}
	    		else if (game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_DOWN){
	    			v.scale -= 0.1
	    			if (v.width * 30 * v.scale < v.gameWidth || v.height * 30 * v.scale < v.gameHeight){
	    				v.scale += 0.1
	    			}
	    		}
	    	}

	    }
}