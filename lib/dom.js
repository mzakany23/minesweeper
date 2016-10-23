
function createText(s,x,y){
		var el = document.getElementById(`${x},${y}`)
		var p = document.createElement('p')
		var t = document.createTextNode(s)
		p.appendChild(t)
		var color
		if (s === 0 || s === 1) {
			color = 'goldfish'
		} else if (s === 2) {
			color = 'bass'
		} else if (s === 3) {
			color = 'marlin'
		} else {
			color = 'tom-seleck'
		}

		p.className += 'numbers' + ' ' + color
		el.appendChild(p)	
}

function paintBombCount(cells){
	for (var i in cells){
		var cell = cells[i]
		if (Game.prototype.inBounds(cell.x,cell.y)){
			var bc = cell.getNeighboBombCount(grid) 
			createText(bc,cell.x,cell.y)	
		}
	}
}
