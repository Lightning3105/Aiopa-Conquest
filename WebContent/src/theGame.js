var theGame = function(game){}

theGame.prototype = {
		preload: function(){
	    },

		create: function(){
			console.log("game started");
			game.stage.backgroundColor = "#4488AA";
			map = generateNoise(v.width, v.height);
			var tiles = game.add.group()
			for (var y = 0; y < v.height; y++) {
				for (var x = 0; x < v.width; x++) {
					t = new terrainTile(x, y, map[x][y])
					tiles.add(t)
				}
			}
			
			for (t in tiles.children){
				if (tiles.children[t].terrain == 2){
					if (Math.random() > 0.5){
						s = new shrub(tiles.children[t], randomInt(-15, 15), randomInt(-15, 15), 'shrub/grass-' + randomInt(1, 4))
						tiles.children[t].addChild(s)
					}
				}
				if (tiles.children[t].terrain == 3){
					if (Math.random() > 0.5){
						s = new tree(tiles.children[t], randomInt(-15, 15), randomInt(-15, 15), 'tree/tree-' + randomInt(1, 1))
						tiles.children[t].addChild(s)
					}
				}
			}
			
			h = new hover();
			
			var popButtons = game.add.group();
			popButtons.add(popButton(70, "buildings"))
			popButtons.add(popButton(220, "units"))
			popButtons.add(popButton(370, "orders"))
			popButtons.add(popButton(520, "map"))
		},
	    
	    render: function(){
	    	
	    },
	    
	    update: function(){
	    	if (this.game.input.activePointer.isDown) {
	    	    if (this.game.origDragPoint) { // move the camera by the amount the mouse has moved since last update
	    	    	v.scrollX -= this.game.origDragPoint.x - this.game.input.activePointer.position.x;
	    	        v.scrollY -= this.game.origDragPoint.y - this.game.input.activePointer.position.y;
	    	    	checkMap()
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
	    			v.scrollX -= ((v.width * 30 * v.scale) - (v.width * 30 * (v.scale - 0.1)))/2
	    			v.scrollY -= ((v.height * 30 * v.scale) - (v.height * 30 * (v.scale - 0.1)))/2
	    		}
	    		else if (game.input.mouse.wheelDelta == Phaser.Mouse.WHEEL_DOWN){
	    			v.scale -= 0.1
	    			v.scrollX += ((v.width * 30 * v.scale) - (v.width * 30 * (v.scale - 0.1)))/2
	    			v.scrollY += ((v.height * 30 * v.scale) - (v.height * 30 * (v.scale - 0.1)))/2
	    			if (v.width * 30 * v.scale < v.gameWidth || v.height * 30 * v.scale < v.gameHeight){
	    				v.scale += 0.1
	    			}
	    		}
	    		checkMap()
	    	}

	    }
}