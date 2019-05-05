import React from "react"
import {Line,LineChart,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from 'recharts'

class OverTime extends React.Component{
    render(){
      return(
        <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
            <Graph data= {this.props.data}/>
          </div>
        </div>
      </div>
      );
    }
  }
  class Graph extends React.Component{
    constructor(props){
      super(props);
      this.api = this.props.data
      this.state = {
        data: [
          {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400,
            "amt": 2400
          },
          {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398,
            "amt": 2210
          },
          {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800,
            "amt": 2290
          },
          {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908,
            "amt": 2000
          },
          {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800,
            "amt": 2181
          },
          {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800,
            "amt": 2500
          },
          {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300,
            "amt": 2100
          }
        ]
      }
    }

    
    fetchData(){
      fetch(this.api.concat("?timeframe=10s"))
      .then(res=>{
        var new_data = this.state.data
        var apend_data = new_data.append(res[0])
        this.State({
            data: apend_data
        });
      });
    }
    render(){
      return(
        <LineChart width={600} height={250} data={this.state.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip/>
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
      );
    }
  }

  export default OverTime;
  