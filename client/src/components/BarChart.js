import React from "react"
import {BarChart,Bar,CartesianGrid,XAxis,YAxis,Tooltip,Legend} from "recharts"
class BarVisual extends React.PureComponent{
   
  render(){
    const {onTextFilterChange, textfilter, api} = this.props
      return(
        <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.name}
          </div>
          <div className="panel-body">
            <Graph api={this.props.api} textfilter={this.props.textfilter} x={this.props.x} y={this.props.y} onTextFilterChange={onTextFilterChange}/>
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
  }

  fetchData(){
    fetch(this.props.api + `?textfilter=${this.props.textfilter || ''}`)
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

  changeTextFilter(keyword) {
    let {onTextFilterChange} = this.props
    onTextFilterChange(keyword)
  }
  
  handleClick = (data) => {
    this.setState({
      textfilter: data.keyword
    });
    this.changeTextFilter(data.keyword)
  }
  
  render(){
    const { textfilter } = this.state;
    return(
      <BarChart width={730} height={250} data={this.state.data} textfilter={textfilter}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={this.props.x} allowDuplicatedCategory={false} />
      <YAxis />
      <Tooltip />
      <Legend />
<<<<<<< HEAD
      <Bar dataKey={this.props.y} fill="#8884d8" />
=======
      <Bar dataKey="count" fill="#8884d8" onClick={this.handleClick.bind(this)}/> 
>>>>>>> Made bar chart interactive
</BarChart>
      );
    }
}
export default BarVisual;
  