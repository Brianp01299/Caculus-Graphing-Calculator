//imports mathjs
import { create, all } from 'mathjs';
const math = create(all);

//require
import { createRequire } from "module";
const require = createRequire(import.meta.url);


//import imputs
const prompt = require('prompt-sync')();
//evalutes the derivative at an x and y (and returns it)
function evaluateDer(tx, ty, expression) {
	let scope = {x:tx,y:ty};
	return math.compile(expression).evaluate(scope);
	
}


//takes a point(x,y), a derivative and a delta, and calculates the slope at that point
//draws a line of size -dx,dx with slope m
//need graphics
//will need to be modified slightly for euler's methods, currently working for slope field
// maybe add a parameter for type of line.
//m = slope
function drawLine(x,y,der,dx) {
	let m = evaluateDer(x,y,der);
	//input for line
	//line(x-dx,y-m*dx,x+dx,y+m*dx)
	console.log(x,y,m);
}


//for i,j (x,y), inside the width, scales by step and draws a line there.1
function drawSlopeField(der,width,height,step,dx){
	for (let i=0;i<Math.floor(width/step);i++) {
		for (let j=0;j<Math.floor(height/step);j++) {
			drawLine(i*step,j*step,der,dx);
		}
	}
}

//takes in a derivate, number, init x and y and a step
//calculates eurlers method at each new point and returns an array of coordinates
//once the graphipcs function is built will draw a line.
function eulerMethod(der,num,x,y,dx) {
	var cords = [];
	let newy = y;
	for (let i = 0; i<num; i++) {
		newy=newy+evaluateDer(x+i*dx,newy,der,dx)*dx;
		cords.push([x+i*dx,newy]);
		//draw a line from previous coordinate to new coordinate
		//if i>0
			//line(cords[i-1][0],cords[i-1][1],cords[i][0],cords[i][1])
	}
	console.log(cords);
	return cords;
}

//converts an input to a num
function convertInputToNum(expression){
	return math.compile(prompt(expression)).evaluate();
}

drawSlopeField(prompt('Derivative:'),convertInputToNum("X:"),convertInputToNum("Y:"),convertInputToNum("Step:"),convertInputToNum("Size:"));
eulerMethod(prompt("Derivative"),convertInputToNum("num:"),convertInputToNum("init x:"),convertInputToNum("init y:"),convertInputToNum("dx:"));
