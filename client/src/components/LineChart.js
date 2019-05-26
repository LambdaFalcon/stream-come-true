import React from "react";

import {
  Line,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  Label
} from "recharts";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter, faReddit } from '@fortawesome/free-brands-svg-icons'
library.add(faTwitter, faReddit)

class OverTime extends React.Component {
  render() {
    const {onChangeTimeInterval, textfilter,timefilter, x, y, api} = this.props
    return (
      <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.icon} {this.props.name}</div>
          <div className="panel-body">
            <Graph 
            api={api} 
            textfilter={textfilter} 
            timefilter={timefilter} 
            onChangeTimeInterval={onChangeTimeInterval} 
            x={x} 
            y={y}
            sentiment={this.props.sentiment}
            refreshing={this.props.refreshing}
            labelX={this.props.labelX}
            labelY={this.props.labelY}  
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
      //stores the value of where we start the drag process
      refAreaLeft: "",
      //stores the value of where we end the drag prrocess
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
    if(this.props.timefilter !== prevProps.timefilter){
      this.fetchData()
    }
  }
  //disables removes the selection rectangle
  _resetSelectionState() {
    this.setState(() => ({
      refAreaLeft: "",
      refAreaRight: ""
    }));
  }
  //calls this.props.onChangeTimeInterval
  changeTimeInterval() {
    let {onChangeTimeInterval} = this.props
    let { refAreaLeft, refAreaRight} = this.state;
    //if the from and to time are the same or there is no onChangeTimeInterval callback
    //we return immediately
    if (refAreaLeft === refAreaRight || refAreaRight === "" || !onChangeTimeInterval ) {
      this._resetSelectionState();
      return;
    }
    const fromDate = new Date(Math.min(refAreaLeft, refAreaRight))
    const toDate = new Date(Math.max(refAreaLeft, refAreaRight))
    //call calback
    onChangeTimeInterval(fromDate, toDate)
    this._resetSelectionState();
  }

  fetchData() {
    fetch(this.props.api + `?textfilter=${this.props.textfilter || ""}` + (this.props.timefilter ? this.props.timefilter : ""))
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
        /*making the chart interactive*/
        onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
        onMouseMove={e =>
          this.state.refAreaLeft &&
          this.setState({ refAreaRight: e.activeLabel })
        }
        onMouseUp={this.changeTimeInterval.bind(this)}
        data={this.state.data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={this.props.x} tickFormatter={this.formatDate} allowDuplicatedCategory={false} allowDataOverflow={false} minTickGap={7} tick={{fontSize: 9}}>
          <Label value={this.props.labelX} offset={-3} position="insideBottom"/>
        </XAxis>
        <YAxis minTickGap={5} tickSize={3} tick={{fontSize: 9}}>
          <Label value={this.props.labelY} offset={10} position="insideLeft" angle={-90}/>
        </YAxis>
        <Tooltip filterNull={true} labelFormatter={this.formatDate} separator=":" offset={10} active={true}/>

        {/* line for data and optionally lines for sentiment */}
        <Line type="monotone" dataKey={this.props.y} stroke="#8884d8" activeDot={true} dot={false}/>
        {this.props.sentiment && !this.props.refreshing && <Line type="monotone" dataKey={`positive_${this.props.y}`} stroke={"green"} strokeDasharray={"3 3"} strokeWidth={0.5} activeDot={true} dot={false}/>}
        {this.props.sentiment && !this.props.refreshing && <Line type="monotone" dataKey={`negative_${this.props.y}`} stroke={"red"} strokeDasharray={"3 3"} strokeWidth={0.5} activeDot={true} dot={false}/>}

        {/*the reference area is a rectangle representing the new time selection*/}
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
