var assert = require('assert');

var grid = [[{"look":{"upperRight":[-1,1],"upperLeft":[-1,-1],"bottomRight":[1,1],"bottomLeft":[1,-1],"up":[-1,0],"down":[1,0],"left":[0,-1],"right":[0,1]},"visited":false,"x":0,"y":0,"data":false},{"look":{"upperRight":[-1,2],"upperLeft":[-1,0],"bottomRight":[1,2],"bottomLeft":[1,0],"up":[-1,1],"down":[1,1],"left":[0,0],"right":[0,2]},"visited":false,"x":0,"y":1,"data":true},{"look":{"upperRight":[-1,3],"upperLeft":[-1,1],"bottomRight":[1,3],"bottomLeft":[1,1],"up":[-1,2],"down":[1,2],"left":[0,1],"right":[0,3]},"visited":false,"x":0,"y":2,"data":false},{"look":{"upperRight":[-1,4],"upperLeft":[-1,2],"bottomRight":[1,4],"bottomLeft":[1,2],"up":[-1,3],"down":[1,3],"left":[0,2],"right":[0,4]},"visited":false,"x":0,"y":3,"data":false},{"look":{"upperRight":[-1,5],"upperLeft":[-1,3],"bottomRight":[1,5],"bottomLeft":[1,3],"up":[-1,4],"down":[1,4],"left":[0,3],"right":[0,5]},"visited":false,"x":0,"y":4,"data":false},{"look":{"upperRight":[-1,6],"upperLeft":[-1,4],"bottomRight":[1,6],"bottomLeft":[1,4],"up":[-1,5],"down":[1,5],"left":[0,4],"right":[0,6]},"visited":false,"x":0,"y":5,"data":false},{"look":{"upperRight":[-1,7],"upperLeft":[-1,5],"bottomRight":[1,7],"bottomLeft":[1,5],"up":[-1,6],"down":[1,6],"left":[0,5],"right":[0,7]},"visited":false,"x":0,"y":6,"data":true},{"look":{"upperRight":[-1,8],"upperLeft":[-1,6],"bottomRight":[1,8],"bottomLeft":[1,6],"up":[-1,7],"down":[1,7],"left":[0,6],"right":[0,8]},"visited":false,"x":0,"y":7,"data":false},{"look":{"upperRight":[-1,9],"upperLeft":[-1,7],"bottomRight":[1,9],"bottomLeft":[1,7],"up":[-1,8],"down":[1,8],"left":[0,7],"right":[0,9]},"visited":false,"x":0,"y":8,"data":false},{"look":{"upperRight":[-1,10],"upperLeft":[-1,8],"bottomRight":[1,10],"bottomLeft":[1,8],"up":[-1,9],"down":[1,9],"left":[0,8],"right":[0,10]},"visited":false,"x":0,"y":9,"data":false}],[{"look":{"upperRight":[0,1],"upperLeft":[0,-1],"bottomRight":[2,1],"bottomLeft":[2,-1],"up":[0,0],"down":[2,0],"left":[1,-1],"right":[1,1]},"visited":false,"x":1,"y":0,"data":false},{"look":{"upperRight":[0,2],"upperLeft":[0,0],"bottomRight":[2,2],"bottomLeft":[2,0],"up":[0,1],"down":[2,1],"left":[1,0],"right":[1,2]},"visited":false,"x":1,"y":1,"data":false},{"look":{"upperRight":[0,3],"upperLeft":[0,1],"bottomRight":[2,3],"bottomLeft":[2,1],"up":[0,2],"down":[2,2],"left":[1,1],"right":[1,3]},"visited":false,"x":1,"y":2,"data":true},{"look":{"upperRight":[0,4],"upperLeft":[0,2],"bottomRight":[2,4],"bottomLeft":[2,2],"up":[0,3],"down":[2,3],"left":[1,2],"right":[1,4]},"visited":false,"x":1,"y":3,"data":false},{"look":{"upperRight":[0,5],"upperLeft":[0,3],"bottomRight":[2,5],"bottomLeft":[2,3],"up":[0,4],"down":[2,4],"left":[1,3],"right":[1,5]},"visited":false,"x":1,"y":4,"data":false},{"look":{"upperRight":[0,6],"upperLeft":[0,4],"bottomRight":[2,6],"bottomLeft":[2,4],"up":[0,5],"down":[2,5],"left":[1,4],"right":[1,6]},"visited":false,"x":1,"y":5,"data":false},{"look":{"upperRight":[0,7],"upperLeft":[0,5],"bottomRight":[2,7],"bottomLeft":[2,5],"up":[0,6],"down":[2,6],"left":[1,5],"right":[1,7]},"visited":false,"x":1,"y":6,"data":true},{"look":{"upperRight":[0,8],"upperLeft":[0,6],"bottomRight":[2,8],"bottomLeft":[2,6],"up":[0,7],"down":[2,7],"left":[1,6],"right":[1,8]},"visited":false,"x":1,"y":7,"data":false},{"look":{"upperRight":[0,9],"upperLeft":[0,7],"bottomRight":[2,9],"bottomLeft":[2,7],"up":[0,8],"down":[2,8],"left":[1,7],"right":[1,9]},"visited":false,"x":1,"y":8,"data":false},{"look":{"upperRight":[0,10],"upperLeft":[0,8],"bottomRight":[2,10],"bottomLeft":[2,8],"up":[0,9],"down":[2,9],"left":[1,8],"right":[1,10]},"visited":false,"x":1,"y":9,"data":false}],[{"look":{"upperRight":[1,1],"upperLeft":[1,-1],"bottomRight":[3,1],"bottomLeft":[3,-1],"up":[1,0],"down":[3,0],"left":[2,-1],"right":[2,1]},"visited":false,"x":2,"y":0,"data":false},{"look":{"upperRight":[1,2],"upperLeft":[1,0],"bottomRight":[3,2],"bottomLeft":[3,0],"up":[1,1],"down":[3,1],"left":[2,0],"right":[2,2]},"visited":false,"x":2,"y":1,"data":false},{"look":{"upperRight":[1,3],"upperLeft":[1,1],"bottomRight":[3,3],"bottomLeft":[3,1],"up":[1,2],"down":[3,2],"left":[2,1],"right":[2,3]},"visited":false,"x":2,"y":2,"data":false},{"look":{"upperRight":[1,4],"upperLeft":[1,2],"bottomRight":[3,4],"bottomLeft":[3,2],"up":[1,3],"down":[3,3],"left":[2,2],"right":[2,4]},"visited":false,"x":2,"y":3,"data":false},{"look":{"upperRight":[1,5],"upperLeft":[1,3],"bottomRight":[3,5],"bottomLeft":[3,3],"up":[1,4],"down":[3,4],"left":[2,3],"right":[2,5]},"visited":false,"x":2,"y":4,"data":false},{"look":{"upperRight":[1,6],"upperLeft":[1,4],"bottomRight":[3,6],"bottomLeft":[3,4],"up":[1,5],"down":[3,5],"left":[2,4],"right":[2,6]},"visited":false,"x":2,"y":5,"data":false},{"look":{"upperRight":[1,7],"upperLeft":[1,5],"bottomRight":[3,7],"bottomLeft":[3,5],"up":[1,6],"down":[3,6],"left":[2,5],"right":[2,7]},"visited":false,"x":2,"y":6,"data":false},{"look":{"upperRight":[1,8],"upperLeft":[1,6],"bottomRight":[3,8],"bottomLeft":[3,6],"up":[1,7],"down":[3,7],"left":[2,6],"right":[2,8]},"visited":false,"x":2,"y":7,"data":false},{"look":{"upperRight":[1,9],"upperLeft":[1,7],"bottomRight":[3,9],"bottomLeft":[3,7],"up":[1,8],"down":[3,8],"left":[2,7],"right":[2,9]},"visited":false,"x":2,"y":8,"data":false},{"look":{"upperRight":[1,10],"upperLeft":[1,8],"bottomRight":[3,10],"bottomLeft":[3,8],"up":[1,9],"down":[3,9],"left":[2,8],"right":[2,10]},"visited":false,"x":2,"y":9,"data":false}],[{"look":{"upperRight":[2,1],"upperLeft":[2,-1],"bottomRight":[4,1],"bottomLeft":[4,-1],"up":[2,0],"down":[4,0],"left":[3,-1],"right":[3,1]},"visited":false,"x":3,"y":0,"data":false},{"look":{"upperRight":[2,2],"upperLeft":[2,0],"bottomRight":[4,2],"bottomLeft":[4,0],"up":[2,1],"down":[4,1],"left":[3,0],"right":[3,2]},"visited":false,"x":3,"y":1,"data":false},{"look":{"upperRight":[2,3],"upperLeft":[2,1],"bottomRight":[4,3],"bottomLeft":[4,1],"up":[2,2],"down":[4,2],"left":[3,1],"right":[3,3]},"visited":false,"x":3,"y":2,"data":false},{"look":{"upperRight":[2,4],"upperLeft":[2,2],"bottomRight":[4,4],"bottomLeft":[4,2],"up":[2,3],"down":[4,3],"left":[3,2],"right":[3,4]},"visited":false,"x":3,"y":3,"data":false},{"look":{"upperRight":[2,5],"upperLeft":[2,3],"bottomRight":[4,5],"bottomLeft":[4,3],"up":[2,4],"down":[4,4],"left":[3,3],"right":[3,5]},"visited":false,"x":3,"y":4,"data":false},{"look":{"upperRight":[2,6],"upperLeft":[2,4],"bottomRight":[4,6],"bottomLeft":[4,4],"up":[2,5],"down":[4,5],"left":[3,4],"right":[3,6]},"visited":false,"x":3,"y":5,"data":false},{"look":{"upperRight":[2,7],"upperLeft":[2,5],"bottomRight":[4,7],"bottomLeft":[4,5],"up":[2,6],"down":[4,6],"left":[3,5],"right":[3,7]},"visited":false,"x":3,"y":6,"data":true},{"look":{"upperRight":[2,8],"upperLeft":[2,6],"bottomRight":[4,8],"bottomLeft":[4,6],"up":[2,7],"down":[4,7],"left":[3,6],"right":[3,8]},"visited":false,"x":3,"y":7,"data":false},{"look":{"upperRight":[2,9],"upperLeft":[2,7],"bottomRight":[4,9],"bottomLeft":[4,7],"up":[2,8],"down":[4,8],"left":[3,7],"right":[3,9]},"visited":false,"x":3,"y":8,"data":false},{"look":{"upperRight":[2,10],"upperLeft":[2,8],"bottomRight":[4,10],"bottomLeft":[4,8],"up":[2,9],"down":[4,9],"left":[3,8],"right":[3,10]},"visited":false,"x":3,"y":9,"data":false}],[{"look":{"upperRight":[3,1],"upperLeft":[3,-1],"bottomRight":[5,1],"bottomLeft":[5,-1],"up":[3,0],"down":[5,0],"left":[4,-1],"right":[4,1]},"visited":false,"x":4,"y":0,"data":false},{"look":{"upperRight":[3,2],"upperLeft":[3,0],"bottomRight":[5,2],"bottomLeft":[5,0],"up":[3,1],"down":[5,1],"left":[4,0],"right":[4,2]},"visited":false,"x":4,"y":1,"data":false},{"look":{"upperRight":[3,3],"upperLeft":[3,1],"bottomRight":[5,3],"bottomLeft":[5,1],"up":[3,2],"down":[5,2],"left":[4,1],"right":[4,3]},"visited":false,"x":4,"y":2,"data":false},{"look":{"upperRight":[3,4],"upperLeft":[3,2],"bottomRight":[5,4],"bottomLeft":[5,2],"up":[3,3],"down":[5,3],"left":[4,2],"right":[4,4]},"visited":false,"x":4,"y":3,"data":false},{"look":{"upperRight":[3,5],"upperLeft":[3,3],"bottomRight":[5,5],"bottomLeft":[5,3],"up":[3,4],"down":[5,4],"left":[4,3],"right":[4,5]},"visited":false,"x":4,"y":4,"data":true},{"look":{"upperRight":[3,6],"upperLeft":[3,4],"bottomRight":[5,6],"bottomLeft":[5,4],"up":[3,5],"down":[5,5],"left":[4,4],"right":[4,6]},"visited":false,"x":4,"y":5,"data":false},{"look":{"upperRight":[3,7],"upperLeft":[3,5],"bottomRight":[5,7],"bottomLeft":[5,5],"up":[3,6],"down":[5,6],"left":[4,5],"right":[4,7]},"visited":false,"x":4,"y":6,"data":false},{"look":{"upperRight":[3,8],"upperLeft":[3,6],"bottomRight":[5,8],"bottomLeft":[5,6],"up":[3,7],"down":[5,7],"left":[4,6],"right":[4,8]},"visited":false,"x":4,"y":7,"data":false},{"look":{"upperRight":[3,9],"upperLeft":[3,7],"bottomRight":[5,9],"bottomLeft":[5,7],"up":[3,8],"down":[5,8],"left":[4,7],"right":[4,9]},"visited":false,"x":4,"y":8,"data":true},{"look":{"upperRight":[3,10],"upperLeft":[3,8],"bottomRight":[5,10],"bottomLeft":[5,8],"up":[3,9],"down":[5,9],"left":[4,8],"right":[4,10]},"visited":false,"x":4,"y":9,"data":false}],[{"look":{"upperRight":[4,1],"upperLeft":[4,-1],"bottomRight":[6,1],"bottomLeft":[6,-1],"up":[4,0],"down":[6,0],"left":[5,-1],"right":[5,1]},"visited":false,"x":5,"y":0,"data":false},{"look":{"upperRight":[4,2],"upperLeft":[4,0],"bottomRight":[6,2],"bottomLeft":[6,0],"up":[4,1],"down":[6,1],"left":[5,0],"right":[5,2]},"visited":false,"x":5,"y":1,"data":true},{"look":{"upperRight":[4,3],"upperLeft":[4,1],"bottomRight":[6,3],"bottomLeft":[6,1],"up":[4,2],"down":[6,2],"left":[5,1],"right":[5,3]},"visited":false,"x":5,"y":2,"data":false},{"look":{"upperRight":[4,4],"upperLeft":[4,2],"bottomRight":[6,4],"bottomLeft":[6,2],"up":[4,3],"down":[6,3],"left":[5,2],"right":[5,4]},"visited":false,"x":5,"y":3,"data":true},{"look":{"upperRight":[4,5],"upperLeft":[4,3],"bottomRight":[6,5],"bottomLeft":[6,3],"up":[4,4],"down":[6,4],"left":[5,3],"right":[5,5]},"visited":false,"x":5,"y":4,"data":false},{"look":{"upperRight":[4,6],"upperLeft":[4,4],"bottomRight":[6,6],"bottomLeft":[6,4],"up":[4,5],"down":[6,5],"left":[5,4],"right":[5,6]},"visited":false,"x":5,"y":5,"data":false},{"look":{"upperRight":[4,7],"upperLeft":[4,5],"bottomRight":[6,7],"bottomLeft":[6,5],"up":[4,6],"down":[6,6],"left":[5,5],"right":[5,7]},"visited":false,"x":5,"y":6,"data":false},{"look":{"upperRight":[4,8],"upperLeft":[4,6],"bottomRight":[6,8],"bottomLeft":[6,6],"up":[4,7],"down":[6,7],"left":[5,6],"right":[5,8]},"visited":false,"x":5,"y":7,"data":true},{"look":{"upperRight":[4,9],"upperLeft":[4,7],"bottomRight":[6,9],"bottomLeft":[6,7],"up":[4,8],"down":[6,8],"left":[5,7],"right":[5,9]},"visited":false,"x":5,"y":8,"data":true},{"look":{"upperRight":[4,10],"upperLeft":[4,8],"bottomRight":[6,10],"bottomLeft":[6,8],"up":[4,9],"down":[6,9],"left":[5,8],"right":[5,10]},"visited":false,"x":5,"y":9,"data":false}],[{"look":{"upperRight":[5,1],"upperLeft":[5,-1],"bottomRight":[7,1],"bottomLeft":[7,-1],"up":[5,0],"down":[7,0],"left":[6,-1],"right":[6,1]},"visited":false,"x":6,"y":0,"data":true},{"look":{"upperRight":[5,2],"upperLeft":[5,0],"bottomRight":[7,2],"bottomLeft":[7,0],"up":[5,1],"down":[7,1],"left":[6,0],"right":[6,2]},"visited":false,"x":6,"y":1,"data":false},{"look":{"upperRight":[5,3],"upperLeft":[5,1],"bottomRight":[7,3],"bottomLeft":[7,1],"up":[5,2],"down":[7,2],"left":[6,1],"right":[6,3]},"visited":false,"x":6,"y":2,"data":false},{"look":{"upperRight":[5,4],"upperLeft":[5,2],"bottomRight":[7,4],"bottomLeft":[7,2],"up":[5,3],"down":[7,3],"left":[6,2],"right":[6,4]},"visited":false,"x":6,"y":3,"data":false},{"look":{"upperRight":[5,5],"upperLeft":[5,3],"bottomRight":[7,5],"bottomLeft":[7,3],"up":[5,4],"down":[7,4],"left":[6,3],"right":[6,5]},"visited":false,"x":6,"y":4,"data":true},{"look":{"upperRight":[5,6],"upperLeft":[5,4],"bottomRight":[7,6],"bottomLeft":[7,4],"up":[5,5],"down":[7,5],"left":[6,4],"right":[6,6]},"visited":false,"x":6,"y":5,"data":false},{"look":{"upperRight":[5,7],"upperLeft":[5,5],"bottomRight":[7,7],"bottomLeft":[7,5],"up":[5,6],"down":[7,6],"left":[6,5],"right":[6,7]},"visited":false,"x":6,"y":6,"data":true},{"look":{"upperRight":[5,8],"upperLeft":[5,6],"bottomRight":[7,8],"bottomLeft":[7,6],"up":[5,7],"down":[7,7],"left":[6,6],"right":[6,8]},"visited":false,"x":6,"y":7,"data":false},{"look":{"upperRight":[5,9],"upperLeft":[5,7],"bottomRight":[7,9],"bottomLeft":[7,7],"up":[5,8],"down":[7,8],"left":[6,7],"right":[6,9]},"visited":false,"x":6,"y":8,"data":true},{"look":{"upperRight":[5,10],"upperLeft":[5,8],"bottomRight":[7,10],"bottomLeft":[7,8],"up":[5,9],"down":[7,9],"left":[6,8],"right":[6,10]},"visited":false,"x":6,"y":9,"data":false}],[{"look":{"upperRight":[6,1],"upperLeft":[6,-1],"bottomRight":[8,1],"bottomLeft":[8,-1],"up":[6,0],"down":[8,0],"left":[7,-1],"right":[7,1]},"visited":false,"x":7,"y":0,"data":false},{"look":{"upperRight":[6,2],"upperLeft":[6,0],"bottomRight":[8,2],"bottomLeft":[8,0],"up":[6,1],"down":[8,1],"left":[7,0],"right":[7,2]},"visited":false,"x":7,"y":1,"data":false},{"look":{"upperRight":[6,3],"upperLeft":[6,1],"bottomRight":[8,3],"bottomLeft":[8,1],"up":[6,2],"down":[8,2],"left":[7,1],"right":[7,3]},"visited":false,"x":7,"y":2,"data":false},{"look":{"upperRight":[6,4],"upperLeft":[6,2],"bottomRight":[8,4],"bottomLeft":[8,2],"up":[6,3],"down":[8,3],"left":[7,2],"right":[7,4]},"visited":false,"x":7,"y":3,"data":false},{"look":{"upperRight":[6,5],"upperLeft":[6,3],"bottomRight":[8,5],"bottomLeft":[8,3],"up":[6,4],"down":[8,4],"left":[7,3],"right":[7,5]},"visited":false,"x":7,"y":4,"data":false},{"look":{"upperRight":[6,6],"upperLeft":[6,4],"bottomRight":[8,6],"bottomLeft":[8,4],"up":[6,5],"down":[8,5],"left":[7,4],"right":[7,6]},"visited":false,"x":7,"y":5,"data":false},{"look":{"upperRight":[6,7],"upperLeft":[6,5],"bottomRight":[8,7],"bottomLeft":[8,5],"up":[6,6],"down":[8,6],"left":[7,5],"right":[7,7]},"visited":false,"x":7,"y":6,"data":false},{"look":{"upperRight":[6,8],"upperLeft":[6,6],"bottomRight":[8,8],"bottomLeft":[8,6],"up":[6,7],"down":[8,7],"left":[7,6],"right":[7,8]},"visited":false,"x":7,"y":7,"data":false},{"look":{"upperRight":[6,9],"upperLeft":[6,7],"bottomRight":[8,9],"bottomLeft":[8,7],"up":[6,8],"down":[8,8],"left":[7,7],"right":[7,9]},"visited":false,"x":7,"y":8,"data":false},{"look":{"upperRight":[6,10],"upperLeft":[6,8],"bottomRight":[8,10],"bottomLeft":[8,8],"up":[6,9],"down":[8,9],"left":[7,8],"right":[7,10]},"visited":false,"x":7,"y":9,"data":false}],[{"look":{"upperRight":[7,1],"upperLeft":[7,-1],"bottomRight":[9,1],"bottomLeft":[9,-1],"up":[7,0],"down":[9,0],"left":[8,-1],"right":[8,1]},"visited":false,"x":8,"y":0,"data":false},{"look":{"upperRight":[7,2],"upperLeft":[7,0],"bottomRight":[9,2],"bottomLeft":[9,0],"up":[7,1],"down":[9,1],"left":[8,0],"right":[8,2]},"visited":false,"x":8,"y":1,"data":false},{"look":{"upperRight":[7,3],"upperLeft":[7,1],"bottomRight":[9,3],"bottomLeft":[9,1],"up":[7,2],"down":[9,2],"left":[8,1],"right":[8,3]},"visited":false,"x":8,"y":2,"data":false},{"look":{"upperRight":[7,4],"upperLeft":[7,2],"bottomRight":[9,4],"bottomLeft":[9,2],"up":[7,3],"down":[9,3],"left":[8,2],"right":[8,4]},"visited":false,"x":8,"y":3,"data":false},{"look":{"upperRight":[7,5],"upperLeft":[7,3],"bottomRight":[9,5],"bottomLeft":[9,3],"up":[7,4],"down":[9,4],"left":[8,3],"right":[8,5]},"visited":false,"x":8,"y":4,"data":true},{"look":{"upperRight":[7,6],"upperLeft":[7,4],"bottomRight":[9,6],"bottomLeft":[9,4],"up":[7,5],"down":[9,5],"left":[8,4],"right":[8,6]},"visited":false,"x":8,"y":5,"data":false},{"look":{"upperRight":[7,7],"upperLeft":[7,5],"bottomRight":[9,7],"bottomLeft":[9,5],"up":[7,6],"down":[9,6],"left":[8,5],"right":[8,7]},"visited":false,"x":8,"y":6,"data":false},{"look":{"upperRight":[7,8],"upperLeft":[7,6],"bottomRight":[9,8],"bottomLeft":[9,6],"up":[7,7],"down":[9,7],"left":[8,6],"right":[8,8]},"visited":false,"x":8,"y":7,"data":false},{"look":{"upperRight":[7,9],"upperLeft":[7,7],"bottomRight":[9,9],"bottomLeft":[9,7],"up":[7,8],"down":[9,8],"left":[8,7],"right":[8,9]},"visited":false,"x":8,"y":8,"data":false},{"look":{"upperRight":[7,10],"upperLeft":[7,8],"bottomRight":[9,10],"bottomLeft":[9,8],"up":[7,9],"down":[9,9],"left":[8,8],"right":[8,10]},"visited":false,"x":8,"y":9,"data":false}],[{"look":{"upperRight":[8,1],"upperLeft":[8,-1],"bottomRight":[10,1],"bottomLeft":[10,-1],"up":[8,0],"down":[10,0],"left":[9,-1],"right":[9,1]},"visited":false,"x":9,"y":0,"data":true},{"look":{"upperRight":[8,2],"upperLeft":[8,0],"bottomRight":[10,2],"bottomLeft":[10,0],"up":[8,1],"down":[10,1],"left":[9,0],"right":[9,2]},"visited":false,"x":9,"y":1,"data":true},{"look":{"upperRight":[8,3],"upperLeft":[8,1],"bottomRight":[10,3],"bottomLeft":[10,1],"up":[8,2],"down":[10,2],"left":[9,1],"right":[9,3]},"visited":false,"x":9,"y":2,"data":true},{"look":{"upperRight":[8,4],"upperLeft":[8,2],"bottomRight":[10,4],"bottomLeft":[10,2],"up":[8,3],"down":[10,3],"left":[9,2],"right":[9,4]},"visited":false,"x":9,"y":3,"data":false},{"look":{"upperRight":[8,5],"upperLeft":[8,3],"bottomRight":[10,5],"bottomLeft":[10,3],"up":[8,4],"down":[10,4],"left":[9,3],"right":[9,5]},"visited":false,"x":9,"y":4,"data":false},{"look":{"upperRight":[8,6],"upperLeft":[8,4],"bottomRight":[10,6],"bottomLeft":[10,4],"up":[8,5],"down":[10,5],"left":[9,4],"right":[9,6]},"visited":false,"x":9,"y":5,"data":false},{"look":{"upperRight":[8,7],"upperLeft":[8,5],"bottomRight":[10,7],"bottomLeft":[10,5],"up":[8,6],"down":[10,6],"left":[9,5],"right":[9,7]},"visited":false,"x":9,"y":6,"data":false},{"look":{"upperRight":[8,8],"upperLeft":[8,6],"bottomRight":[10,8],"bottomLeft":[10,6],"up":[8,7],"down":[10,7],"left":[9,6],"right":[9,8]},"visited":false,"x":9,"y":7,"data":false},{"look":{"upperRight":[8,9],"upperLeft":[8,7],"bottomRight":[10,9],"bottomLeft":[10,7],"up":[8,8],"down":[10,8],"left":[9,7],"right":[9,9]},"visited":false,"x":9,"y":8,"data":false},{"look":{"upperRight":[8,10],"upperLeft":[8,8],"bottomRight":[10,10],"bottomLeft":[10,8],"up":[8,9],"down":[10,9],"left":[9,8],"right":[9,10]},"visited":false,"x":9,"y":9,"data":true}]]

describe('Grid', function() {
  describe('#blaze()', function() {
    it('should show all attached zerors', function() {
    	console.log(grid)
      // assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});