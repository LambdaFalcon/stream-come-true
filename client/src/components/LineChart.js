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
            <Graph api= {this.props.api}/>
          </div>
        </div>
      </div>
      );
    }
  }
  class Graph extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: []
      }
    }

    componentWillUpdate(){
      this.fetchData()
    }
  
    componentWillMount(){
      this.fetchData()
    }

    fetchData(){
      fetch(this.props.api + `?textfilter=${this.props.textfilter || ''}`)
      .then(res => {
        console.log(res);
        return res;
      })
      .then(res=>res.json())
      .then(res=>{
        this.setState({
            data: res
        });
      });
    }
    formatDate(time){
        const date =  new Date(time);
        return date.toLocaleTimeString("it-IT");
    }
    render(){
      return(
        <LineChart width={730} height={250} data={this.state.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={this.formatDate}/>
        <YAxis/>
        <Tooltip/>
        <Legend/>
        <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      );
    }
  }

  export default OverTime;
  