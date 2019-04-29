import React from "react";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import JqxChart from "jqwidgets-scripts/jqwidgets-react-tsx/jqxchart";

import config from "../../config";

const { api } = config;

class LineChart extends React.PureComponent {
  constructor(props) {
    super(props);

    const n = 100;
    const data = [...Array(n).keys()].map(n => ({
      date: new Date(n),
      count: (Math.random() + 0.5) * n
    }));

    this.state = {
      width: "100%",
      data,
      xAxis: {
        dataField: "date",
        showGridLines: false,
        formatFunction: function(d) {
          return new Date(d).toDateString();
        }
      },
      seriesGroups: [
        {
          type: "line",
          seriesGapPercent: 0,
          valueAxis: { minValue: 0, description: "count" },
          series: [{ dataField: "count", displayText: "count" }]
        }
      ]
    };
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    fetch(`${api}/milestone1`)
      .then(res => res.json())
      .then(res => res.aggregations.posts_over_time.buckets)
      .then(res =>
        res.map(({ key, doc_count }) => ({
          date: new Date(key),
          count: doc_count
        }))
      )
      .then(res => {
        this.setState({
          data: res
        });
      });
  }

  render() {
    return (
      <JqxChart
        style={{ width: 1600, height: 500 }}
        title={"Posts over time"}
        description={""}
        enableAnimations={true}
        source={this.state.data}
        xAxis={this.state.xAxis}
        seriesGroups={this.state.seriesGroups}
        colorScheme={"scheme02"}
      />
    );
  }
}

export default LineChart;
