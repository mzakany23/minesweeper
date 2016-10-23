var Game = function(size=10,bombs=20){
	Game.prototype.bombsPlaced = 0
	Game.prototype.size = size
	Game.prototype.bombs = bombs
	Game.prototype.visitedLookup = {}
	Game.prototype.flags = 0
}

Game.prototype.play = function(){
	Game.prototype.grid = Game.prototype.makeGrid(this.size,this.bombs)
	Game.prototype.placeBombs()
	Game.prototype.initGrid(this.size)
}

Game.prototype.reset = function() {
	var cont = document.getElementById('container')
	for (var i in this.grid) {
		for (var j in this.grid) {
			var c = this.grid[i][j]
			var dom = document.getElementById(`${i},${j}`)
			cont.removeChild(dom)
		}
	}
	this.bombs = this.bombsPlaced
	this.bombsPlaced = 0
	this.flags = 0
	document.getElementById('flags').innerHTML = 0
	Game.prototype.play()
}

Game.prototype.makeGrid = function(size,bombs) {
	var _grid = []
	var bombs = bombs/2
	
	for (var x=0;x<size;x++) {
		var row = []
		for (var y=0;y<size;y++) {
			row.push(new Cell(x,y,false))
		}
		_grid.push(row)
	}
	return _grid
}

Game.prototype.placeBombs = function() {
	while (this.bombs > 0){
		var xrand = Game.prototype.getRandomArbitrary(0,10)
		var yrand = Game.prototype.getRandomArbitrary(0,10)
		var cell = Game.prototype.grid[xrand][yrand]
		if (!cell.data) {
			cell.data = true
			this.bombsPlaced += 1
			this.bombs -= 1
		}
	}	

	document.getElementById('bombCount').innerHTML = `Bomb Count: ${Game.prototype.bombsPlaced}`
}

Game.prototype.initGrid = function(size){
	var page = document.getElementById('container')

	for (var i=0; i<size;i++){
		for (var j=0;j< size;j++) {
			var d = document.createElement('div')

			d.addEventListener('click',Game.prototype.calculateClick)
			document.addEventListener('contextmenu',Game.prototype.rightClick)
			d.setAttribute("id", `${i},${j}`);
			var p = document.createElement('p')
			var t = document.createTextNode(`${i},${j}`)
			p.appendChild(t)
			p.className += 'hide'
			d.appendChild(p)
			d.className += 'cell hovering'	
			page.appendChild(d)		
		}
	}
}

Game.prototype.inBounds = function(x,y){
	return x >= 0 && y >=0 && x < Game.prototype.grid.length && y < Game.prototype.grid.length
}

Game.prototype.getRandomArbitrary = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Game.prototype.getRing = function(cell){
	var blanks = []
	var hasNbs = []
	var grid = Game.prototype.grid

	for (var dir in cell.look){
		var l = cell.look[dir]
		var x = l[0]
				y = l[1]

		if (Game.prototype.inBounds(x,y)){
			var rc = grid[x][y]
			var bc = rc.getNeighboBombCount(grid)
			var cellVisited = Game.prototype.visitedLookup[`${cell.x},${cell.y}`] ? true : false

			if (bc === 0){
				Game.prototype.visitedLookup[`${rc.x},${rc.y}`] = true
				blanks.push(rc)
			} else {
				if (!rc.data){
					hasNbs.push(rc)
				}
			}
		}
	}

	return {blanks:blanks,hasNbs:hasNbs}
}

Game.prototype.blaze = function(type){
	var queue = type
	var leftover = {}

	while (queue.length > 0){
		var cell = queue.pop()

		if (!cell.visited){

			var obj = Game.prototype.getRing(cell)	
			
			if (obj.hasNbs.length > 0) {
				for (i in obj.hasNbs) {
					var mc = obj.hasNbs[i]
					leftover[`${mc.x},${mc.y}`] = true
				}
			}
			
			queue = queue.concat(obj.blanks)

			cell.glow()
			createText(cell.getNeighboBombCount(Game.prototype.grid),cell.x,cell.y)
			Game.prototype.grid[cell.x][cell.y].visited = true
		}
	}

	for (key in leftover) {
		var k = key.split(',')
		var x = k[0]
		var y = k[1]
		var c = this.grid[x][y]
		
		if (!c.visited) {
			createText(c.getNeighboBombCount(this.grid),x,y)	
		}
		Game.prototype.grid[c.x][c.y].visited = true
	}
}

Game.prototype.calculateClick = function(e) {
	if (!e.target.childNodes[0].innerHTML) {
		return
	}

	var t = (e.target.childNodes[0].innerHTML).split(',')
	var x = parseInt(t[0])
	var y = parseInt(t[1])

	var p = document.getElementById('current')

	var cell = Game.prototype.grid[x][y]
	
	if (cell.visited){return}

	if (cell.data){
		e.target.className += ' bomb'
		alert('Bomb!!!! Start over!')
		Game.prototype.reset()		
		
	} else {
		// find current cells bomb count
		var bc = cell.getNeighboBombCount(this.grid)

		// if has bombs
		if (bc > 0){
			createText(bc,cell.x,cell.y)
		} else {
			// blaze
			console.log('blaze the blanks')
			var ring = Game.prototype.getRing(cell)
			Game.prototype.blaze(ring.blanks)
		}
	}
	
	p.innerHTML = `x=${cell.x} y=${cell.y} bomb=${cell.data}`
	p.removeEventListener("click", Game.prototype.calculateClick , false);
	Game.prototype.grid[x][y].visited = true
}

Game.prototype.rightClick = function(e){
	e.preventDefault()
	if (!e.target.childNodes[0].innerHTML){return}
	var t = (e.target.childNodes[0].innerHTML).split(',')
	var x = parseInt(t[0]),y=parseInt(t[1])
	var y = parseInt(t[1])
	var cell = Game.prototype.grid[x][y]
	cell.mark()
	if (cell.marked) {
		Game.prototype.flags += 1	
	} else {
		Game.prototype.flags -= 1
	}
	
	document.getElementById('flags').innerHTML = Game.prototype.flags
}