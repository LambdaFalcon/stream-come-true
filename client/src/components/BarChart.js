import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
class BarVisual extends React.PureComponent {
  render() {
    const { textfilter, timefilter, onTextFilterChange } = this.props;
    return (
      <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.name}</div>
          <div className="panel-body">
            <Graph
              api={this.props.api}
              onTextFilterChange={onTextFilterChange}
              textfilter={textfilter}
              timefilter={timefilter}
              x={this.props.x}
              y={this.props.y}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.textfilter = "";
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.textfilter !== prevProps.textfilter) {
      this.fetchData();
    }
    if (this.props.timefilter !== prevProps.timefilter) {
      this.fetchData();
    }
  }

  fetchData() {
    fetch(
      this.props.api +
        `?textfilter=${this.props.textfilter || ""}` +
        (this.props.timefilter ? this.props.timefilter : "")
    )
      .then(res => {
        return res;
      })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        });
      });
  }

  changeTextFilter(keyword) {
    let { onTextFilterChange } = this.props;
    onTextFilterChange(keyword);
  }

  handleClick = data => {
    // this handler should only work for the keyword bar charts
    if(data.keyword){
      this.setState({
        textfilter: data.keyword
      });
      this.changeTextFilter(data.keyword);
    }
  };

  render() {
    const { textfilter } = this.state;
    return (
      <BarChart
        width={730}
        height={250}
        data={this.state.data}
        textfilter={textfilter}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.x} allowDuplicatedCategory={false} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey={this.props.y}
          fill="#8884d8"
          onClick={this.handleClick.bind(this)}
        />
      </BarChart>
    );
  }
}
export default BarVisual;
