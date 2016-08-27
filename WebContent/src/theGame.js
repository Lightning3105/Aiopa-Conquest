var theGame = function(game){}

theGame.prototype = {
		preload: function(){
	    },

		create: function(){
			console.log("game started");
			game.stage.backgroundColor = "#4488AA";
			map = generateNoise(v.width, v.height);
			v.tiles = game.add.group()
			for (var y = 0; y < v.height; y++) {
				for (var x = 0; x < v.width; x++) {
					t = new terrainTile(x, y, map[x][y])
					v.tiles.add(t)
				}
			}
			
			v.ground = game.add.group()
			v.layered = game.add.group()
			for (t in v.tiles.children){
				if (v.tiles.children[t].terrain == 2){
					if (Math.random() > 0.5){
						s = new shrub(v.tiles.children[t], randomInt(-5, 5), randomInt(-5, 5), 'shrub/grass-' + randomInt(1, 4))
						v.ground.add(s)
						//v.tiles.children[t].addChild(s)
					}
				}
				if (v.tiles.children[t].terrain == 3){
					if (Math.random() > 0.5){
						s = new tree(v.tiles.children[t], randomInt(-5, 5), randomInt(-5, 0), 'tree/tree-' + randomInt(1, 1))
						v.layered.add(s)
						//v.tiles.children[t].addChild(s)
					}
				}
			}
			
			h = new hover();
			
			s = new selectedOutline()
			
			game.world.bringToTop(v.tiles)
			game.world.bringToTop(v.ground)
			game.world.bringToTop(s)
			game.world.bringToTop(h)
			game.world.bringToTop(v.layered)
			
			var popButtons = game.add.group();
			popButtons.add(popButton(70, "buildings"))
			popButtons.add(popButton(220, "units"))
			popButtons.add(popButton(370, "orders"))
			popButtons.add(popButton(520, "map"))
		},
	    
	    render: function(){
	    	/*if (v.selectedTile != null){
	    		this.game.debug.spriteInfo(v.selectedTile, 10, 10, 'f000000')
	    		var rect = new Phaser.Rectangle(v.selectedTile.x, v.selectedTile.y, 30 * v.scale, 30 * v.scale);
	    		this.game.debug.geom(rect, 'ff00000')
	    	}*/
	    },
	    
	    update: function(){
	    	v.layered.sort('y', Phaser.Group.SORT_ASCENDING);
	    	if (this.game.input.activePointer.middleButton.isDown) {
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
	    	
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
	    		v.scrollX += 5
	    		checkMap()
	    	}
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
	    		v.scrollX -= 5
	    		checkMap()
	    	}
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.W)){
	    		v.scrollY += 5
	    		checkMap()
	    	}
	    	if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
	    		v.scrollY -= 5
	    		checkMap()
	    	}
	    	
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