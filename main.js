//using a stack taking in a string expression and evaluates it substituting in x and y
//currently just returning 1 in order for testing
import 'mathjs'

function evaluateDer(x, y, expression) {
	const code1 = math.compile('sqrt(3^2 + 4^2)')
	code1.evaluate()  // 5
	console.log(code1)
}


//takes a point(x,y), a derivative and a delta, and calculates the slope at that point
//draws a line of size -dx,dx with slope m
//need graphics
//will need to be modified slightly for euler's methods, currently working for slope field
// maybe add a parameter for type of line.
//m = slope
function drawLine(x,y,der,dx) {
	m = evaluateDer(x,y,der)
	//input for line
	//console.log(x-dx,y-m*dx,x+dx,y+m*dx)
	//console.log(x,y,m,dx,m*dx)
}


//for i,j (x,y), inside the width, scales by step and draws a line there.1
function drawSlopeField(der,width,height,step,dx){
	for (i=0;i<Math.floor(width/step);i++) {
		for (j=0;j<Math.floor(height/step);j++) {
			drawLine(i*step,j*step,der,dx)
		}
	}
}



drawSlopeField(1,10,10,1,.1)