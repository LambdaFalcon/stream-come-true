import React from "react"
import {BarChart,Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from "recharts"
class BarVisual extends React.PureComponent{
    
  render(){
      return(
        <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
            <Graph data={this.props.data}/>
          </div>
        </div>
      </div>
      );
    }
  }

class Graph extends React.Component{
  constructor(props){
    super(props);
    this.api = this.props.data;
    this.state = {
      data: [
        {
          "keyword":"android",
          "count": 4000,
        },
        {
          "kwyqord": "apple",
          "count": 3000 
        },
        {
          "keyword": "microsoft",
          "count": 8000,
        },
        {
          "keyword": "Java",
          "count": 3000
        },
        {
          "keyword": "C++",
          "count": 3200,
        },
        {
          "keyword": "Pascal",
          "count": 3000,
        },
        {
          "keyword": "Spring",
          "count": 100,
        }
      ]
    }
  }
  render(){
    return(
      <BarChart width={600} height={250} data={this.state.data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="keyword" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
</BarChart>
    );
  }
}
export default BarVisual;
  