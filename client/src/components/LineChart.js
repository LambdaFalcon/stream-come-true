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
            "time": 2000,
            "count":2100
          },
          {
            "time": 3000,
            "count": 2200
          },
          {
            "time": 3200,
            "count": 2300
          },
          {
            "time": 3300,
            "count": 3400
          },
          {
            "name": 3400,
            "count": 2000
          },
          {
            "time": 3600,
            "count": 2200
          },
          {
            "time": 3800,
            "count":2500
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
        <XAxis dataKey="time" />
        <YAxis domain={[0, 10000]}/>
        <Tooltip/>
        <Legend/>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      );
    }
  }

  export default OverTime;
  