function generateNoise(width, height){
	var gen = new SimplexNoise(v.seed);
	
	function noise(nx, ny) {
		  // Rescale from -1.0:+1.0 to 0.0:1.0
		  return gen.noise2D(nx, ny) / 2 + 0.5;
		}
	
	var map = [];
	for (var y = 0; y < height; y++) {
		if (map[y] == undefined){
			map[y] = [];
		};
		for (var x = 0; x < width; x++) {      
			var nx = x/width - 0.5, ny = y/height - 0.5;
			//map[y][x] = noise(nx, ny);
			n = noise(nx, ny);
			if (n < 0.1){ // water
				map[y][x] = 0;
			}
			else if (n < 0.15){ // sand
				map[y][x] = 1;
			}
			else if (n < 0.55 && n < 0.6){ // forest
				map[y][x] = 3;
			}
			else if (n < 0.9){ // grass
				map[y][x] = 2;
			}
			else if (n <= 1){ // rock
				map[y][x] = 4;
			};
		}
	}
	console.log("MAP:");
	console.log(map);
	return map;
}

function randomInt(min,max)
{
	out = Math.floor(Math.random()*(max-min+1)+min);
    return out
}

function getWalls(){
	v.levelHit = []
	for (var x = 0; x < v.width; x++) {
		v.levelHit.push([])
		for (var y = 0; y < v.height; y++) {
			v.levelHit[x].push("-")
		}
	}
	for (i in v.tiles.children){
		if (v.tiles.children[i].terrain == 4 || v.tiles.children[i].terrain == 0){
			v.levelHit[v.tiles.children[i].pos[0]][v.tiles.children[i].pos[1]] = 1;
		}
		else{
			v.levelHit[v.tiles.children[i].pos[0]][v.tiles.children[i].pos[1]] = 0;
		}
	}
}

function getPath(start, end, character){
	console.log("get path")
	getWalls();
	console.log("got walls")
	var easystar = new EasyStar.js();
	easystar.setGrid(v.levelHit);
	easystar.setAcceptableTiles([0]);
	easystar.enableDiagonals();
	
	var outPath = null;
	
	easystar.findPath(start[0], start[1], end[0], end[1], function( path ) {
        if (path === null) {
	        console.log("The path to the destination \
                           point was not found.");
	    } 
        else{
        	outPath = []
        	for (p in path){
        		if (p != path.length-1){
        			p = parseInt(p)
	        		/*point = path[p]
		        	dx = point.x - old.x
		    		dy = point.y - old.y
		    		dh = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
		    		dm = character.speed / dh
		    		cx = dx / dm
		    		cy = dy / dm
		    		console.log(point)*/
		    		//path.splice(p+1, 0, {x: point.x + cy, y: point.y + cy})
        			midx = (path[p].x + path[p + 1].x) / 2
        			midy = (path[p].y + path[p + 1].y) / 2
        			outPath.push(path[p])
        			outPath.push({x: midx, y: midy})
        		}
        		else{
        			outPath.push(path[p])
        		}
        	}
        }
        character.path = outPath;
        /*else {
	    	for (var i = 0; i < path.length; i++){
	    		console.log("P: " + i + ", \
                             X: " + path[i].x + ", \
                             Y: " + path[i].y);
	    	}
	    } */
	});
	easystar.calculate();
}