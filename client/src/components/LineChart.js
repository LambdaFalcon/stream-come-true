import React from "react";
import ReactEcharts from "echarts-for-react";

class OverTime extends React.Component {
  render() {
    const {
      onChangeTimeInterval,
      textfilter,
      timefilter,
      x,
      y,
      api
    } = this.props;
    return (
      <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">{this.props.name}</div>
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
      option: this.getDefaultOption(),
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
    if (this.props.timefilter !== prevProps.timefilter) {
      this.fetchData();
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
    let { onChangeTimeInterval } = this.props;
    let { refAreaLeft, refAreaRight } = this.state;
    //if the from and to time are the same or there is no onChangeTimeInterval callback
    //we return immediately
    if (
      refAreaLeft === refAreaRight ||
      refAreaRight === "" ||
      !onChangeTimeInterval
    ) {
      this._resetSelectionState();
      return;
    }
    const fromDate = new Date(Math.min(refAreaLeft, refAreaRight));
    const toDate = new Date(Math.max(refAreaLeft, refAreaRight));
    //call calback
    onChangeTimeInterval(fromDate, toDate);
    this._resetSelectionState();
  }

  fetchData() {
    fetch(
      this.props.api +
        `?textfilter=${this.props.textfilter || ""}` +
        (this.props.timefilter ? this.props.timefilter : "")
    )
      .then(res => res.json())
      .then(res => {
        this.updateGraph(res);
      });
  }
  formatDate(time) {
    const date = new Date(time);
    return date.toLocaleTimeString("it-IT");
  }
  updateGraph(data) {
    const option = this.getDefaultOption();
    //note data.lengt is not always 100 it is usually in [99,101]
    option.xAxis[0].data = data.map(item => this.formatDate(item.time));
    option.series[0].data = data.map(item => item.count);
    option.series[1].data = data.map(item => item.positive_count);
    option.series[2].data = data.map(item => item.negative_count);

    this.setState({
      option: option
    });
  }
  getDefaultOption() {
    return {
      title: {
        // text:'We could put a title here as well',
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      dataZoom: {
        show: false,
        start: 0,
        end: 100
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: []
        }
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "abcd",
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      series: [
        {
          name: "count",
          color: "rgb(117,108,206)",
          type: "line",
          smooth: true,
          data: []
        },
        {
          name: "positive",
          type: "line",
          color: "#E9C46A",
          smooth: true,
          data: []
        },
        {
          name: "negative",
          type: "line",
          color: "#2A9D8F",
          smooth: true,
          data: []
        }
      ]
    };
  }

  render() {
    return <ReactEcharts ref="echarts_react" option={this.state.option} />;
  }
}

export default OverTime;
