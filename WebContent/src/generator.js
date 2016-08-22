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