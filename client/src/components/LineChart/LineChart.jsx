import React from "react";

import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/styles/jqx.material-purple.css";
import JqxChart from "jqwidgets-scripts/jqwidgets-react-tsx/jqxchart";

class LineChart extends React.PureComponent {
  constructor(props) {
    super(props);

    const n = 100;
    const data = [...Array(n).keys()].map(n => ({
      date: new Date(n),
      value: (Math.random() + 0.5) * n
    }));

    this.state = {
      width: "100%",
      source: data,
      xAxis: { dataField: "date" },
      seriesGroups: [
        {
          type: "line",
          seriesGapPercent: 0,
          valueAxis: { minValue: 0, description: "count" },
          series: [{ dataField: "value", displayText: "count" }]
        }
      ]
    };
  }

  render() {
    return (
      <JqxChart
        style={{ width: 850, height: 500 }}
        title={"Posts over time"}
        description={""}
        enableAnimations={true}
        source={this.state.source}
        xAxis={this.state.xAxis}
        seriesGroups={this.state.seriesGroups}
        colorScheme={"scheme02"}
      />
    );
  }
}

export default LineChart;
