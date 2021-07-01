import logo from './logo.svg';
import './App.css';
import React from "react"
import Component from "react"
//import Plotly from "plotly"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      "Derivative": 0,
      "const1" : 0,
      "minX": 0,
      "minY":0,
      "maxX":100,
      "maxy":100,
      "dataX":[],
      "dataY":[]
    }
  }
  produceDatePoints() {
    this.state.dataX = []
    this.state.dataY = []
    for (var i =  this.state.minX;i<this.state.maxX;i++) {
      this.state.dataX.push(i)
      this.state.dataY.push(i)
    }
  }

  graph() {
    var graphDiv = document.getElementById('graph')
    this.produceDatePoints()
    var data = [{
      x : this.state.dataX,
      y : this.state.dataY,
      type: 'scatter'
    }];

    var layout = {
      title: 'Sales Growth',
      xaxis: {
        title: 'Year',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Percent',
        showline: false
      }
    };
    window.Plotly.newPlot(graphDiv, data, layout);
  }
  render() {
    var that = this
    return (
      <div className="App">
        <header className="App-header">
         <input type ="text"/>
         <button onClick = {function(){that.graph()}}> run </button>
         <div id = "graph">

         </div>
        </header>
      </div>
    );
  }
}

export default App;
