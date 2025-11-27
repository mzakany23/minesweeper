var Game = function(size=10,bombs=20){
	this.bombsPlaced = 0
	this.size = size
	this.bombs = bombs
	this.visitedLookup = {}
	this.flags = bombs
	this.bombsCovered = {}
	document.getElementById('container').style.width = (size*50)+50
	document.getElementById('checkBombs').addEventListener('click',this.checkBombs.bind(this))
}

Game.prototype.play = function(){
	this.grid = this.makeGrid(this.size,this.bombs)
	document.getElementById('flags').innerHTML = this.bombs
	this.placeBombs()
	document.getElementById('bombCount').innerHTML = `${this.bombsPlaced}`
	this.initGrid(this.size)
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
	this.flags = this.bombs
	document.getElementById('bombSubmitForm').classList.add('hide')
	document.getElementById('flags').innerHTML = 0
	this.play()
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
		var xrand = this.getRandomArbitrary(0,this.size)
		var yrand = this.getRandomArbitrary(0,this.size)
		var cell = this.grid[xrand][yrand]
		if (!cell.data) {
			cell.data = true
			this.bombsPlaced += 1
			this.bombs -= 1
		}
	}
}

Game.prototype.initGrid = function(size){
	
	var page = document.getElementById('container')

	for (var i=0; i<size;i++){
		for (var j=0;j< size;j++) {
			var d = document.createElement('div')
			d.addEventListener('click',this.calculateClick.bind(this))
			d.addEventListener('contextmenu',this.rightClick.bind(this))
			
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
	return x >= 0 && y >=0 && x < this.grid.length && y < this.grid.length
}

Game.prototype.getRandomArbitrary = function(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

Game.prototype.getRing = function(cell){
	var blanks = []
	var hasNbs = []
	var grid = this.grid

	for (var dir in cell.look){
		var l = cell.look[dir]
		var x = l[0]
				y = l[1]

		if (this.inBounds(x,y)){
			var rc = grid[x][y]
			var bc = rc.getNeighboBombCount(grid)
			var cellVisited = this.visitedLookup[`${cell.x},${cell.y}`] ? true : false

			if (bc === 0){
				this.visitedLookup[`${rc.x},${rc.y}`] = true
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

			var obj = this.getRing(cell)	
			
			if (obj.hasNbs.length > 0) {
				for (i in obj.hasNbs) {
					var mc = obj.hasNbs[i]
					leftover[`${mc.x},${mc.y}`] = true
				}
			}
			
			queue = queue.concat(obj.blanks)

			cell.glow()
			createText(cell.getNeighboBombCount(this.grid),cell.x,cell.y)
			this.grid[cell.x][cell.y].visited = true
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
		this.grid[c.x][c.y].visited = true
	}
}

Game.prototype.checkBombs = function() {
	var c = 0
	for (var key in this.bombsCovered){
		var bomb = this.bombsCovered[key]
		if (bomb === true){c += 1}
	}
	alert(`You uncovered ${c} bombs out of ${this.bombsPlaced} bombs.`)
	this.reset()
}

Game.prototype.calculateClick = function(e) {
	if (!e.target.childNodes[0].innerHTML) {return}

	var t = (e.target.childNodes[0].innerHTML).split(',')
	var x = parseInt(t[0])
	var y = parseInt(t[1])

	var p = document.getElementById('current')

	var cell = this.grid[x][y]
	
	if (cell.visited){return}

	if (cell.data){
		e.target.className += ' bomb'
		alert('Bomb!!!! Start over!')
		this.reset()		
		
	} else {
		// find current cells bomb count
		var bc = cell.getNeighboBombCount(this.grid)

		// if has bombs
		if (bc > 0){
			createText(bc,cell.x,cell.y)
		} else {
			// blaze
			console.log('blaze the blanks')
			var ring = this.getRing(cell)
			this.blaze(ring.blanks)
		}
	}
	
	p.innerHTML = `x=${cell.x} y=${cell.y} bomb=${cell.data}`
	p.removeEventListener("click", this.calculateClick , false);
	this.grid[x][y].visited = true
}

Game.prototype.getCell = function(e){
	var t = (e.target.childNodes[0].innerHTML).split(',')
	var x = parseInt(t[0]),y=parseInt(t[1])
	var y = parseInt(t[1])
	return this.grid[x][y]
}

Game.prototype.coverBomb = function(cell) {
	if (cell.data) {
		this.bombsCovered[`${cell.x},${cell.y}`] = true
	}
}

Game.prototype.uncoverBomb = function(cell) {
	if (this.bombsCovered[`${cell.x},${cell.y}`]) {
		this.bombsCovered[`${cell.x},${cell.y}`] = false	
	}
}

Game.prototype.rightClick = function(e){
	var f = this.flags
	e.preventDefault()

	if (!e.target.childNodes[0].innerHTML){return}
	
	var cell = this.getCell(e)
	
	if (f > 0 && !cell.marked){
		cell.mark()
		this.coverBomb(cell)

	 	if (cell.marked) {
			this.flags -= 1	
		} else {
			this.flags += 1
		}
	} else if (cell.marked){
		cell.mark()
		this.flags += 1
		this.uncoverBomb(cell)
	}
	
	if (this.flags ===0){
		document.getElementById('bombSubmitForm').classList.remove('hide')
	} else {
		document.getElementById('bombSubmitForm').classList.add('hide')
	}

	document.getElementById('flags').innerHTML = this.flags
}