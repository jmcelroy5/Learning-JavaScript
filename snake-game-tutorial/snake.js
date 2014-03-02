var draw = function(snakeToDraw, apple) {
	var drawableSnake = { color: "green", pixels: snakeToDraw};
	var drawableApple = { color: "red", pixels: [apple]};
	var drawableObjects = [drawableSnake, drawableApple];
	CHUNK.draw(drawableObjects);
}

var moveSegment = function(segment) {
	switch(segment.direction)  {
		case "down":
			return { top: segment.top + 1, left: segment.left};
			break;
		case "up":
			return { top: segment.top - 1, left: segment.left};
			break;
		case "right":
			return { top: segment.top, left: segment.left + 1 };
			break;
		case "left":
			return { top: segment.top, left: segment.left - 1 };
			break;
		default:
			return segment;	
	}
}

var segmentFurtherForwardThan = function(index, snake) {
		if (snake[index - 1] === undefined){
			return snake[index];
		} else{
			return snake[index - 1];
		}
}

var growSnake = function(snake) {
	var lastSegment = snake[snake.length - 1];
	snake.push( {top: lastSegment.top, left: lastSegment.left });
	return snake

}

var ate = function(snake, otherThing) {
		var head = snake[0];
		return CHUNK.detectCollisionBetween([head], otherThing);
}

var moveSnake = function(snake) {
	return snake.map(function(oldSegment, segmentIndex){
		var newSegment = moveSegment(oldSegment);
		newSegment.direction = segmentFurtherForwardThan(segmentIndex, snake).direction;
		return newSegment;
	});
}	

var advanceGame = function() {
	var newSnake = moveSnake(snake);

	if (ate(newSnake, snake)) {
		CHUNK.endGame();
		return CHUNK.flashMessage("Whoops! You ate yourself.");
		document.getElementById("score-box").innerHTML = "Score: " + score;
	}

	if (ate(newSnake, [apple])) {
		snake = growSnake(newSnake);
		apple = CHUNK.randomLocation();
		score += 10
		document.getElementById("score-box").innerHTML = "Score: " + score;
	}

	if (ate(newSnake, CHUNK.gameBoundaries())) {
		CHUNK.endGame();
		return CHUNK.flashMessage("Whoops! You hit a wall.");
		document.getElementById("score-box").innerHTML = "Score: " + score;
	}

	snake = newSnake
	draw(snake, apple);
}

var changeDirection = function(direction) {
	snake[0].direction = direction;
}

var score = 0;

var snake = [{ top: 1, left: 0, direction: "down"}, { top: 0, left: 0, direction: "down"}];

var apple = { top: 8, left: 10 };

CHUNK.executeNTimesPerSecond(advanceGame, 3);
CHUNK.onArrowKey(changeDirection);

