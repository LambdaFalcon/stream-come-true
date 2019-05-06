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
            <Graph api={this.props.api}/>
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
    this.textfilter = "";
  }

  componentDidUpdate(prevProps) {
    if (this.props.textfilter !== this.textfilter) {
      this.fetchData();
      this.textfilter = this.props.textfilter;
    }
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

  
  render(){
    return(
      <BarChart width={730} height={250} data={this.state.data}>
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
  