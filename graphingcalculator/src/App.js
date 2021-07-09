import './App.css';
import React from "react"
import Component from "react"
import { create, all } from 'mathjs';
const math = create(all);

// to do 
//2 optmiizing compilation of datapoints
//2.4 organize code
//(2.5) constants
//3 add slider for visualization
//4 scaling
//7/8 1 done
//7/9 2
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      "Derivative": 0,
      "dx":.5,
      "minX": 0,
      "minY":0,
      "maxX":10,
      "maxY":10,
      "dataX":[],
      "dataY":[],
      "arr":[],
      "y0":0,
      "counter":[0,0,0]
      //counter is an array of graph, sfg, and eulers so we know how many of each exist
      //add state variables to control number of textboxes for each div and use that when naming them
      //in order to make removal more efficient, assign the minus buttons next to them with the same number
    }
  }
  //using mathjs evaluates a mathematical expression
  evaluateDer(tx, ty, expression) {
    let scope = {x:tx,y:ty};
    return math.compile(expression).evaluate(scope);
  }

  produceDatePointsE(derivative) {
    //produces a set of data points stored in state variables dataX/Y to be visualized 
    //as an antiderivative using euler's method
    this.state.dataX = []
    this.state.dataY = []
    for (var i =  this.state.minX;i<this.state.maxX;i+=this.state.dx) {
      this.state.dataX.push(i)
      this.state.y0= this.state.y0+this.evaluateDer(i,this.state.y0,derivative)*this.state.dx;
      this.state.dataY.push(this.state.y0);
    }
  }
  produceDatePointsS(derivative) {
    //produces sets of 4 points (2x,2y) to generate a slope field stored 
    //in state virables arr
    var that =this
    that.state.arr = []
    for (var i =  that.state.minX;i<that.state.maxX;i+=that.state.dx) {
      for (var j = that.state.minY;j<that.state.maxY;j+=that.state.dx) {
        that.state.arr.push([i-that.state.dx/2,i+that.state.dx/2]);
        that.state.arr.push([j-that.evaluateDer(i,j,derivative)*that.state.dx/2,j+that.evaluateDer(i,j,derivative)*that.state.dx/2]);
      }
    }
  }
  make_trace({data, set_type = "scatter", set_mode = "lines"} = {}){
    //makes data points into correct format for visualization
    let dataPoint = [];
    for(let i = 0; i<data.length; i+=2){
      dataPoint.push({
                  x: data[i],
                  y: data[i+1],
                  mode: set_mode,
                  type: set_type,
                  name: 'y_' + i
              });
    }
    return dataPoint;
  }
  addBox(div,type){
      //dynamically adds a text box at the specified div
      var box = document.createElement("input");
      box.type = "text";
      box.id = div+String(this.state.counter[type]);
      this.state.counter[type]+=1;
      document.getElementById(div).appendChild(box);
      var button = document.createElement("input");
      button.type = "button";
      button.value = "-";
      button.id = div+String(this.state.counter[type])+'-';
      var that = this
      button.onclick = function() {
        that.removeBox(box.id)
        that.removeBox(button.id)
        that.removeBox(lineBreak.id)
      }
      document.getElementById(div).appendChild(button);
      const lineBreak = document.createElement('br');
      lineBreak.id = div+String(this.state.counter[type]) +'br';
      document.getElementById(div).appendChild(lineBreak);
  }
  removeBox(div) {
    var elem = document.getElementById(div);
    elem.parentNode.removeChild(elem);
  }

  graph() {
    //visualizes data points using plotly
    var graphDiv = document.getElementById('graph');
    //this.produceDatePointsE(document.getElementById("derivative").value);
    this.produceDatePointsS(document.getElementById("derivative").value);
    for (var i = 0;i<this.state.counter[2];i++) {
      if(typeof(document.getElementById("add2"+String(i))) != 'undefined' && document.getElementById("add2"+String(i)) != null){
        this.produceDatePointsE(document.getElementById("add2"+String(i)).value);
        this.state.arr.push(this.state.dataX)
        this.state.arr.push(this.state.dataY)
      }
    }

    var layout = {
      xaxis: {
        title: 'x',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'y',
        showline: false
      }
    };
    console.log(this.state.dataX)
    
    window.Plotly.newPlot(graphDiv, this.make_trace({data:this.state.arr,set_type:"scatter", set_mode : "lines"}), layout);
  }
  render() {
    //render function. Three different divs for different types of functions
    var that = this
    return (
      <div className="App">
         <header className="App-header">
         <div id = "SFG">
           <text> Slope Field Generator </text>
           <br />
           <text>dy/dx = </text>
           <input type ="text" id = "derivative"/>
           <br />
           <br />
         </div>
         <div id = "function">
           <text>Function Graphing</text>
           <div id = "add0"></div>
           <button onClick = {function(){that.addBox("add0",0)}}>+</button>
         </div>
         <div id = "Constants">
           <text>Constants</text>
           <div id = "add1"></div>
           <button onClick = {function(){that.addBox("add1",1)}}>+</button>
         </div>
         <div id = "Euler">
           <text>Euler's Method </text>

           <div id = "add2"></div>
           <button onClick = {function(){that.addBox("add2",2)}}>+</button>
         </div>
         <div id = "run">
          <button onClick = {function(){that.graph()}}> run </button>
         </div>
         
         <div id = "graph"></div>
        </header>
      </div>
    );
  }
}

export default App;
