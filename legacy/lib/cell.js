var Cell = function(x,y,data) {
	this.look = {
		upperRight: [x-1,y+1],
		upperLeft: [x-1,y-1],
		bottomRight: [x+1,y+1],
		bottomLeft: [x+1,y-1],
		up: [x-1,y],
		down: [x+1,y],
		left: [x,y-1],
		right: [x,y+1],
	}
	this.visited = false
	this.marked = false
	this.x = x
	this.y = y 
	this.data = data 

	this.getNeighboBombCount = function(grid){
		function inBounds(x,y) {
			return x >= 0 && y >=0 && x < grid.length && y < grid.length
		}

		var neighbors = []

		for (var direction in this.look) {
			var x = this.look[direction][0]
			var y = this.look[direction][1]	

			if (inBounds(x,y)){

				var adj_cell = grid[x][y]	
				
				if (adj_cell.data){
					neighbors.push(adj_cell)
				}
			}
		}

		return neighbors.length
	}

	this.glow = function() {
		var c = document.getElementById(`${this.x},${this.y}`)
		c.className += ' glow'
	}
		
	this.mark = function() {
		if (this.marked) {
			var c = document.getElementById(`${this.x},${this.y}`)	
			c.classList.remove('mark')
			this.marked = false
		} else {
			this.marked = true
			var c = document.getElementById(`${this.x},${this.y}`)	
			c.className += ' mark'	
		}
	}
}

