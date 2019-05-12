import React from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceArea
} from "recharts";

class OverTime extends React.Component {
  render() {
    return (
      <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.name}</div>
          <div className="panel-body">
            <Graph api= {this.props.api} textfilter={this.props.textfilter} x={this.props.x} y={this.props.y}/>
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
      refAreaLeft: "",
      refAreaRight: "",
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.textfilter !== prevProps.textfilter) {
      this.fetchData();
    }
  }
  _resetSelectionState() {
    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: ""
    }));
  }
  filterTime() {
    let { refAreaLeft, refAreaRight} = this.state;
    //if the selected area has no width don't filter
    if (refAreaLeft === refAreaRight || refAreaRight === "") {
      this._resetSelectionState();
      return;
    }
    console.log("left date ", new Date(refAreaLeft))
    console.log("right date ", new Date(refAreaRight))
    //call calback
    this._resetSelectionState();
  }

  fetchData() {
    fetch(this.props.api + `?textfilter=${this.props.textfilter || ""}`)
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
  formatDate(time) {
    const date = new Date(time);
    return date.toLocaleTimeString("it-IT");
  }
  render() {
    const { refAreaLeft, refAreaRight } = this.state;
    return (
      <LineChart
        width={730}
        height={250}
        /*makeing the chart intercative*/
        onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
        onMouseMove={e =>
          this.state.refAreaLeft &&
          this.setState({ refAreaRight: e.activeLabel })
        }
        onMouseUp={this.filterTime.bind(this)}
        data={this.state.data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.x} tickFormatter={this.formatDate} allowDuplicatedCategory={false}/>
        <YAxis minTickGap={5} tickSize={3} />
        <Tooltip filterNull={true} labelFormatter={this.formatDate} />
        <Legend/>
        <Line type="monotone" dataKey={this.props.y} stroke="#8884d8" activeDot={true}/>
        {refAreaLeft && refAreaRight ? (
          <ReferenceArea
            x1={refAreaLeft}
            x2={refAreaRight}
            strokeOpacity={0.3}
          />
        ) : null}
        </LineChart>
      );
    }
  }


export default OverTime;
