import React from "react";
import ReactEcharts from "echarts-for-react";

const DAY = 24 * 60 * 60 * 1000;

class OverTime extends React.Component {
  render() {
    const {
      onChangeTimeInterval,
      textfilter,
      timefilter,
      bars,
      lines,
      api
    } = this.props;
    return (
      <div className="col-xs-6">
        <div className="panel panel-default">
          <div className="panel-heading">
            {this.props.icon} {this.props.name}
          </div>
          <div className="panel-body">
            <Graph
              api={api}
              textfilter={textfilter}
              timefilter={timefilter}
              onChangeTimeInterval={onChangeTimeInterval}
              refreshing={this.props.refreshing}
              labelX={this.props.labelX}
              labelY={this.props.labelY}
              bars={bars}
              lines={lines}
            />
          </div>
        </div>
      </div>
    );
  }
}
class Graph extends React.Component {
  static defaultProps = {
    bars: [],
    lines: []
  };
  constructor(props) {
    super(props);
    if (props.bars.length + props.lines.length < 1) {
      throw new Error("At least one bar or line needs to be defined");
    }
    this.state = {
      option: this.getDefaultOption(),
      data: [],
      coords: []
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
    if (this.props.refreshing !== prevProps.refreshing) {
      this.resetEchartsDrag();
    }
  }

  //calls this.props.onChangeTimeInterval
  changeTimeInterval() {
    let { onChangeTimeInterval } = this.props;
    let { coords, data } = this.state;
    if (coords.length === 2) {
      let dateTimeL = data[coords[0]].time;
      let dateTimeR = data[coords[1]].time;
      const fromDate = new Date(Math.min(dateTimeL, dateTimeR));
      const toDate = new Date(Math.max(dateTimeL, dateTimeR));
      onChangeTimeInterval(fromDate, toDate);
      this.setState({ coords: [] });
    }

    //call calback
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
    return date.toLocaleDateString("it-IT");
  }
  formatTime(time) {
    const date = new Date(time);
    return date.toLocaleTimeString("it-IT");
  }
  formatDateTime(time) {
    const date = new Date(time);
    return date.toLocaleString("it-IT");
  }
  /**
   *
   * @param {[series information]} params
   */
  formatTooltip(params) {
    let { option } = this.state;
    let timeAxis = option.xAxis[0].data;
    let index = params[0].dataIndex;

    let fromString = this.formatDateTime(timeAxis[index].actual);
    let toString = timeAxis[index + 1]
      ? this.formatDateTime(timeAxis[index + 1].actual)
      : "now";
    let ret = `<div>${fromString} - ${toString} </di>`;
    params.forEach(item => {
      ret += `<div>${item.seriesName}: ${item.value}</div>`;
    });
    return ret;
  }
  updateGraph(data) {
    const option = this.getDefaultOption();
    //note data.length is not always 100 it is usually in [99,101]

    //if time between first and last item is more than 24h we display dates instead of times
    if (data.length !== 0) {
      let first = data[0].time;
      let last = data[data.length - 1].time;
      option.xAxis[0].data = data.map(item => {
        return {
          value:
            last - first < DAY
              ? this.formatTime(item.time)
              : this.formatDate(item.time),
          actual: item.time
        };
      });
    } else {
      option.xAxis[0].data = [];
    }

    //updating data for all series
    option.series.forEach(item => {
      item.data = data.map(x => x[item.dataKey]);
    });
    this.setState({
      option: option,
      data: data
    });
  }
  /**
   * returns the echarts options that are not dependent on the fetched data
   */
  getDefaultOption() {
    let { bars, lines } = this.props;
    let series = [];
    lines.forEach(conf =>
      series.push({
        type: "line",
        name: conf.name,
        color: conf.color,
        dataKey: conf.dataKey,
        smooth: true,
        data: []
      })
    );
    bars.forEach(conf =>
      series.push({
        type: "bar",
        stack: conf.stack,
        name: conf.name,
        color: conf.color,
        dataKey: conf.dataKey,
        data: []
      })
    );
    return {
      title: {
        // text:'We could put a title here as well',
      },
      tooltip: {
        trigger: "axis",
        formatter: params => {
          return this.formatTooltip(params);
        }
      },
      //only displaying legend if we display more than one thing
      legend: series.length > 1 ? { orient: "horizontal" } : false,
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          axisLabel: {
            color: "rgb(102,102,102)"
          },
          name: "Time",
          nameLocation: "middle",
          data: [],
          nameTextStyle: {
            padding: [10, 0, 0, 0],
            color: "black"
          }
        }
      ],
      yAxis: [
        {
          type: "value",
          scale: true,
          name: "Count",
          nameLocation: "middle",
          nameTextStyle: {
            padding: [0, 0, 28, 0],
            color: "black"
          },
          axisLabel: {
            color: "rgb(102,102,102)"
          },
          min: 0,
          boundaryGap: [0.2, 0.2]
        }
      ],
      brush: {
        xAxisIndex: "all",
        brushLink: "all",
        outOfBrush: {
          colorAlpha: 0.1
        }
      },
      series: series
    };
  }
  setUpInteractions(c) {
    if (!this.props.refreshing) {
      c.dispatchAction({
        type: "takeGlobalCursor",
        key: "brush",
        brushOption: {
          brushType: "lineX",
          brushMode: "single"
        }
      });
    }

    c.on("brushSelected", params => {
      if (params.batch[0].areas.length === 1) {
        let area = params.batch[0].areas[0];
        this.setState({ coords: area.coordRange });
      }
    });
  }
  resetEchartsDrag() {
    let { refreshing } = this.props;

    this.echarts_react.getEchartsInstance().dispatchAction({
      type: "brush",
      command: "clear",
      areas: []
    });
    if (!refreshing) {
      //go back into drag mode
      this.echarts_react.getEchartsInstance().dispatchAction({
        type: "takeGlobalCursor",
        key: "brush",
        brushOption: {
          brushType: "lineX",
          brushMode: "single"
        }
      });
    } else {
      this.echarts_react.getEchartsInstance().dispatchAction({
        type: "takeGlobalCursor"
      });
    }
  }

  endDrag() {
    this.resetEchartsDrag();
    this.changeTimeInterval();
  }
  render() {
    return (
      <div onMouseUp={this.endDrag.bind(this)}>
        <ReactEcharts
          onChartReady={this.setUpInteractions.bind(this)}
          ref={e => {
            this.echarts_react = e;
          }}
          option={this.state.option}
        />
      </div>
    );
  }
}

export default OverTime;
