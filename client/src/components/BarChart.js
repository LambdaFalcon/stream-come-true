import React from "react"
import {BarChart,Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from "recharts"
class BarVisual extends React.PureComponent{
   
  render(){
    const {textfilter, timefilter} = this.props
      return(
        <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
            <Graph api={this.props.api} textfilter={textfilter} timefilter={timefilter} x={this.props.x} y={this.props.y}/>
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

  componentDidMount(){
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.textfilter !== prevProps.textfilter) {
      this.fetchData();
    }
    if(this.props.timefilter !== prevProps.timefilter){
      this.fetchData()
    }
  }

  fetchData(){
    fetch(this.props.api + `?textfilter=${this.props.textfilter || ""}` + (this.props.timefilter ? this.props.timefilter : ""))
    .then(res => {
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
      <XAxis dataKey={this.props.x} allowDuplicatedCategory={false} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={this.props.y} fill="#8884d8" />
</BarChart>
    );
  }
}
export default BarVisual;
  