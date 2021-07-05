import logo from './logo.svg';
import './App.css';
import React from "react"
import Component from "react"
//import Plotly from "plotly"
import { create, all } from 'mathjs';
const math = create(all);


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      "Derivative": 0,
        "dx":1,
      "minX": 0,
      "minY":0,
      "maxX":10,
      "maxY":100,
      "dataX":[],
      "dataY":[],
      "arr":[],
      "y0":0
    }
  }
  evaluateDer(tx, ty, expression) {
    let scope = {x:tx,y:ty};
    return math.compile(expression).evaluate(scope);
  }

  produceDatePointsE(derivative) {
    this.state.dataX = []
    this.state.dataY = []
    for (var i =  this.state.minX;i<this.state.maxX;i+=this.state.dx) {
      this.state.dataX.push(i)
      this.state.y0= this.state.y0+this.evaluateDer(i,this.state.y0,derivative)*this.state.dx;
      this.state.dataY.push(this.state.y0);
    }
  }
  produceDatePointsS(derivative) {
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

  graph() {
    var graphDiv = document.getElementById('graph')
    this.produceDatePointsE(document.getElementById("derivative").value)
    this.produceDatePointsS(document.getElementById("derivative").value)

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
    this.state.arr.push(this.state.dataX)
    this.state.arr.push(this.state.dataY)
    window.Plotly.newPlot(graphDiv, this.make_trace({data:this.state.arr,set_type:"scatter", set_mode : "lines"}), layout);
  }
  render() {
    var that = this
    return (
      <div className="App">
        <header className="App-header">
         <input type ="text" id = "derivative"/>
         <button onClick = {function(){that.graph()}}> run </button>
         <div id = "graph"></div>
        </header>
      </div>
    );
  }
}

export default App;
